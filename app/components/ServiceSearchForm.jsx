'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

const ServiceSearchForm = () => {
  const [location, setLocation] = useState('');
  const [serviceType, setServiceType] = useState('All');

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location === '' && serviceType === 'All') {
      router.push('/services');
    } else {
      const query = `?location=${location}&serviceType=${serviceType}`;
      router.push(`/services/search-results${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
    >
      <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
        <label htmlFor="location" className="sr-only">Location</label>
        <input
          type="text"
          id="location"
          placeholder="Enter City or Area"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="w-full md:w-2/5 md:pl-2">
        <label htmlFor="service-type" className="sr-only">Service Type</label>
        <select
          id="service-type"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pipe Repair">Pipe Repair</option>
          <option value="Drain Cleaning">Drain Cleaning</option>
          <option value="Leak Detection">Leak Detection</option>
          <option value="Water Heater">Water Heater</option>
          <option value="Bathroom Fittings">Bathroom Fittings</option>
          <option value="Kitchen Plumbing">Kitchen Plumbing</option>
          <option value="Emergency Plumbing">Emergency Plumbing</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};

export default ServiceSearchForm;
