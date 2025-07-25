"use server";

import { getSessionUser } from "../utils/getSessionUser";
import connectDB from "../config/database";
import { revalidatePath } from "next/cache";
import User from "../models/User";

export default async function bookmarkService(serviceId) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;
  const user = await User.findById(userId);

  let isBookmarked = user.bookmarks.includes(serviceId);
  let message;

  if (isBookmarked) {
    // If already bookmarked, remove it
    user.bookmarks.pull(serviceId);
    message = "Service bookmark removed";
    isBookmarked = false;
  } else {
    // If not bookmarked, add it
    user.bookmarks.push(serviceId);
    message = "Service bookmarked";
    isBookmarked = true;
  }

  await user.save();
  revalidatePath("/services/saved", "page");

  return {
    message,
    isBookmarked,
  };
}
