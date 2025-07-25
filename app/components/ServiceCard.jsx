import React from "react";
import Link from "next/link";
import {
  FaMoneyBill,
  FaMapMarker,
  FaToolbox,
  FaClock,
  FaListAlt,
} from "react-icons/fa";

function ServiceCard({ service }) {
  const getRateDisplay = () => {
    const hourly = service.rates?.hourly;
    const fixed = service.rates?.fixed;

    if (hourly && fixed)
      return `₹${hourly.toLocaleString()} - ₹${fixed.toLocaleString()}`;
    if (hourly) return `₹${hourly.toLocaleString()} / hr`;
    if (fixed) return `₹${fixed.toLocaleString()} fixed`;
    return "Contact for Price";
  };

  return (
    <div className="rounded-xl shadow-md relative">
      <Link href={`/services/${service._id}`}>
        <img
          src={service.images?.[0] || "/plumber/default-plumber.jpg"}
          alt={service.name}
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto rounded-t-xl object-cover"
        />
      </Link>

      <div className="p-4">
        {/* Service Type and Title */}
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600 flex items-center gap-2">
            <FaListAlt /> {service.type}
          </div>
          <h3 className="text-xl font-bold">{service.name}</h3>
        </div>

        {/* Price Display */}
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {getRateDisplay()}
        </h3>

        {/* Service Hours and Experience */}
        <div className="flex justify-center gap-4 text-gray-600 mb-4 text-sm">
          <p className="flex items-center gap-1">
            <FaClock /> {service.service_hours || "N/A"}
          </p>
          <p className="flex items-center gap-1">
            <FaToolbox /> {service.experience_years} yrs
          </p>
        </div>

        <div className="border border-gray-100 mb-5"></div>

        {/* Location and Link */}
        <div className="flex flex-col lg:flex-row justify-between mb-4">
          {service.location?.city && service.location?.state && (
            <div className="flex items-center gap-2 mb-4 lg:mb-0 text-orange-700">
              <FaMapMarker />
              <span>
                {service.location?.city}, {service.location?.state}
              </span>
            </div>
          )}
          <Link
            href={`/services/${service._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
