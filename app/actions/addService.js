'use server';

import { getSessionUser } from "../utils/getSessionUser";
import connectDB from "../config/database";
import Service from "../models/service"; 
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "../config/cloudinary";

async function addService(formData) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  // Get images from form
  const images = formData.getAll("images").filter((image) => image.name !== "");

  // Prepare data for plumbing service
  const serviceData = {
    provider: userId,
    serviceType: formData.get("serviceType"), // e.g., "Pipe Repair", "Drain Cleaning"
    title: formData.get("title"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    serviceCharges: {
      basic: formData.get("serviceCharges.basic"),
      advanced: formData.get("serviceCharges.advanced"),
      emergency: formData.get("serviceCharges.emergency"),
    },
    contact: {
      name: formData.get("contact.name"),
      email: formData.get("contact.email"),
      phone: formData.get("contact.phone"),
    },
  };

  // Upload images to Cloudinary
  const imageUrls = [];
  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    const imageBase64 = imageData.toString("base64");

    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        folder: "plumberServices",
      }
    );

    imageUrls.push(result.secure_url);
  }

  serviceData.images = imageUrls;

  const newService = new Service(serviceData);
  await newService.save();

  revalidatePath("/", "layout");
  redirect(`/services/${newService._id}`);
}

export default addService;
