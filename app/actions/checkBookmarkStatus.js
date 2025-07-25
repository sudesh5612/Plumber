"use server";

import { getSessionUser } from "../utils/getSessionUser";
import connectDB from "../config/database";
import User from "../models/User";

export default async function checkBookmarkStatus(serviceId) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;
  const user = await User.findById(userId);

  const isBookmarked = user.bookmarks.includes(serviceId);

  return { isBookmarked };
}
