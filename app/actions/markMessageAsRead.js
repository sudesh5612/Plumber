"use server";

import { getSessionUser } from "../utils/getSessionUser";
import connectDB from "../config/database";
import Message from "../models/Message";
import { revalidatePath } from "next/cache";

export default async function markMessageAsRead(messageId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("Plumber user ID is required");
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);
  if (!message) throw new Error("Service inquiry not found");

  // Ensure the plumber is the intended recipient of the message
  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorized access to message");
  }

  // Toggle the read status of the message
  message.read = !message.read;

  // Revalidate plumber's message inbox
  revalidatePath('/messages', 'page');

  await message.save();
  return message.read;
}
