"use server";

import { getSessionUser } from "../utils/getSessionUser";
import connectDB from "../config/database";
import Message from "../models/Message";

async function addMessage(previousState, formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const recipient = formData.get("recipient");

  if (userId === recipient) {
    return { error: "You cannot send a service request to yourself" };
  }

  const newMessage = new Message({
    sender: userId,
    recipient,
    serviceType: formData.get("serviceType"), // e.g., Drain Cleaning, Pipe Installation
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("body"),
  });

  await newMessage.save();
  return { submitted: true };
}

export default addMessage;
