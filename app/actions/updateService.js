"use server";

import connectDB from "../config/database";
import Service from "../models/service"
import { getSessionUser } from "../utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateService(serviceId, formData) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("Plumber ID is required");
  }

  const { userId } = sessionUser;
  const existingService = await Service.findById(serviceId);

  if (!existingService) {
    throw new Error(`Service with ID ${serviceId} not found`);
  }

  // Verify the plumber owns the service listing
  const serviceOwnerId = existingService.owner?.toString() || "";
  if (serviceOwnerId !== userId) {
    throw new Error(`Unauthorized. Plumber ${userId} does not own service ${serviceOwnerId}`);
  }

  const serviceData = {
    category: formData.get("category"), // e.g., "Leak Repair", "Installation"
    title: formData.get("title"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    duration: formData.get("duration"), // estimated time like "2 hours"
    pricing: {
      hourly: formData.get("pricing.hourly"),
      fixed: formData.get("pricing.fixed"),
    },
    tools_required: formData.getAll("tools_required"),
    contact_info: {
      name: formData.get("contact_info.name"),
      email: formData.get("contact_info.email"),
      phone: formData.get("contact_info.phone"),
    },
    owner: userId,
  };

  const updatedService = await Service.findByIdAndUpdate(
    serviceId,
    serviceData
  );

  revalidatePath("/", "layout");

  redirect(`/services/${updatedService._id}`);
}
