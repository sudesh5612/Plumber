'use client'

import { FaWrench, FaToolbox, FaCheck, FaClock, FaTimes } from "react-icons/fa";
import ServiceMap from "./ServiceMap"; // You can rename this to ServiceMap if desired

const ServiceDetails = ({ service }) => {
  return (
    <>
      <main>
        <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
          <div className="text-gray-500 mb-2 capitalize">{service.category}</div>
          <h1 className="text-3xl font-bold mb-4">{service.name}</h1>

          <div className="text-gray-500 mb-4 flex items-center justify-center md:justify-start">
            <i className="fa-solid fa-location-dot text-lg text-blue-700 mr-2"></i>
            <p className="text-blue-700">
              {service.location.street}, {service.location.city} {service.location.zipcode}
            </p>
          </div>

          <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
            Pricing & Availability
          </h3>
          <div className="flex flex-col md:flex-row justify-around">
            <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
              <div className="text-gray-500 mr-2 font-bold">Hourly Rate</div>
              <div className="text-2xl font-bold text-blue-500">
                {service.rates.hourly ? (
                  `₹${service.rates.hourly.toLocaleString()}`
                ) : (
                  <FaTimes className="text-red-700" />
                )}
              </div>
            </div>

            <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
              <div className="text-gray-500 mr-2 font-bold">Half Day</div>
              <div className="text-2xl font-bold text-blue-500">
                {service.rates.halfDay ? (
                  `₹${service.rates.halfDay.toLocaleString()}`
                ) : (
                  <FaTimes className="text-red-700" />
                )}
              </div>
            </div>

            <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
              <div className="text-gray-500 mr-2 font-bold">Full Day</div>
              <div className="text-2xl font-bold text-blue-500">
                {service.rates.fullDay ? (
                  `₹${service.rates.fullDay.toLocaleString()}`
                ) : (
                  <FaTimes className="text-red-700" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-bold mb-6">Service Details</h3>
          <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
            <p>
              <FaWrench className="inline-block mr-2" />
              {service.tools.length}
              <span className="hidden sm:inline"> Tools</span>
            </p>
            <p>
              <FaToolbox className="inline-block mr-2" />
              {service.experience}+ yrs
              <span className="hidden sm:inline"> Experience</span>
            </p>
            <p>
              <FaClock className="inline-block mr-2" />
              {service.availability}
              <span className="hidden sm:inline"> Availability</span>
            </p>
          </div>
          <p className="text-gray-500 mb-4">{service.description}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-bold mb-6">Services Offered</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none space-y-2">
            {service.services.map((item, index) => (
              <li key={index}>
                <FaCheck className="inline-block text-green-600 mr-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Map */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <PropertyMap property={service} />
        </div>
      </main>
    </>
  );
};

export default ServiceDetails;
