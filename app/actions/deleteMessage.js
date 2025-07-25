'use server';

import connectDB from "../config/database";
import Message from "../models/Message";
import { getSessionUser } from "../utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteMessage(messageId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;
  await connectDB();

  const message = await Message.findById(messageId);

  // Only allow the plumber (recipient) to delete their messages
  if (message.recipient.toString() !== userId) {
    throw new Error('Unauthorized access');
  }

  await message.deleteOne();

  // Refresh the inbox/messages section if needed
  revalidatePath('/', 'layout');
}

export default deleteMessage;
