'use server';


import connectDB from "../config/database";
import Service from "../models/service"
import { getSessionUser } from "../utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteService(serviceId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;
  await connectDB();

  const service = await Service.findById(serviceId); // renamed
  if (!service) throw new Error('Service not found');

  // Verify that the service belongs to the logged-in plumber
  if (service.owner.toString() !== userId) {
    throw new Error('Unauthorized access');
  }

  // Extract public IDs from Cloudinary URLs
  const publicIds = service.images.map((imageUrl) => {
    const parts = imageUrl.split('/');
    return parts.at(-1).split('.').at(0);
  });

  // Delete associated images from Cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy('plumberservices/' + publicId); // folder name updated
    }
  }

  // Delete the service record from the database
  await service.deleteOne();

  // Refresh the services page or dashboard
  revalidatePath('/', 'layout');
}

export default deleteService;
