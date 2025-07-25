'use server';

import connectDB from '../config/database';
import Message from '../models/Message';
import { getSessionUser } from '../utils/getSessionUser';

async function getUnreadMessageCount() {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return { error: 'Plumber user ID is required' };
  }

  const { userId } = sessionUser;

  // Count all unread messages for the logged-in plumber
  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });

  return { count };
}

export default getUnreadMessageCount;
