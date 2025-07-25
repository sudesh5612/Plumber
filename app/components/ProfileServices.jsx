"use client";
import Link from "next/link";
import Image from "next/image";
import deleteService from "../actions/deleteService";
import { toast } from "react-toastify";
import { useState } from "react";

const ProfileServices = ({ services }) => {
  const [serviceList, setServiceList] = useState(services);

  if (!Array.isArray(serviceList)) {
    console.error("Expected services to be an array, but got:", serviceList);
    return <p>Something went wrong.</p>;
  }

  if (serviceList.length === 0) {
    return <p>No services found.</p>;
  }

  // Helper function to get a valid image source
  const getImageSource = (service) => {
    if (!service.images || !service.images[0]) {
      return "/images/no-service.jpg"; // Fallback image
    }

    const firstImage = service.images[0];
    if (firstImage.startsWith("http://") || firstImage.startsWith("https://")) {
      return firstImage;
    }
    if (firstImage.startsWith("/")) {
      return firstImage;
    }
    return `/images/${firstImage}`;
  };

  const handleDeleteService = async (serviceId) => {
    const confirmed = window.confirm("Are you sure you want to delete this service?");
    if (!confirmed) return;

    try {
      const deleteById = deleteService.bind(null, serviceId);
      await deleteById();
      toast.success("Service deleted");

      const updatedList = serviceList.filter((s) => s._id !== serviceId);
      setServiceList(updatedList);
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {serviceList.map((service) => (
        <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <Link href={`/services/${service._id}`}>
            <div className="relative h-48 w-full">
              <Image
                src={getImageSource(service)}
                alt={service.name || "Service Image"}
                fill
                className="object-cover hover:scale-105 transition-transform duration-200"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </Link>
          <div className="p-4">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {service.name || "Unnamed Service"}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                {service.location && (
                  <>
                    {service.location.street} {service.location.city}{" "}
                    {service.location.state}
                  </>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/services/${service._id}/edit`}
                className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDeleteService(service._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 transition-colors"
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileServices;
