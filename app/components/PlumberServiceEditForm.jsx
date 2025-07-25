'use client'

import updateService from "../actions/updateService"; // You’ll need to rename this action

const PlumberServiceEditForm = ({ service }) => {
  const updateServiceById = updateService.bind(null, service._id);

  return (
    <form action={updateServiceById}>
      <h2 className="text-3xl text-center font-semibold mb-6">Edit Plumbing Service</h2>

      {/* Service Type */}
      <div className="mb-4">
        <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Service Type</label>
        <select
          id="type"
          name="type"
          className="border rounded w-full py-2 px-3"
          required
          defaultValue={service.type}
        >
          <option value="Repair">Repair</option>
          <option value="Installation">Installation</option>
          <option value="Inspection">Inspection</option>
          <option value="Emergency">Emergency</option>
        </select>
      </div>

      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Service Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="border rounded w-full py-2 px-3"
          placeholder="e.g. Water Heater Installation"
          required
          defaultValue={service.title}
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
        <textarea
          id="description"
          name="description"
          className="border rounded w-full py-2 px-3"
          rows="4"
          placeholder="Describe the service in detail"
          defaultValue={service.description}
        ></textarea>
      </div>

      {/* Location */}
      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">Location</label>
        <input
          type="text"
          name="location.street"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Street"
          defaultValue={service?.location?.street || ""}
        />
        <input
          type="text"
          name="location.city"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="City"
          required
          defaultValue={service?.location?.city || ""}
        />
        <input
          type="text"
          name="location.state"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="State"
          required
          defaultValue={service?.location?.state || ""}
        />
        <input
          type="text"
          name="location.zipcode"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Zipcode"
          defaultValue={service?.location?.zipcode || ""}
        />
      </div>

      {/* Tools Used */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Tools/Equipment Used</label>
        <input
          type="text"
          name="tools"
          className="border rounded w-full py-2 px-3"
          placeholder="e.g. Pipe Cutter, Wrench, Plunger"
          defaultValue={service?.tools || ""}
        />
      </div>

      {/* Pricing */}
      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">Rates</label>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <label htmlFor="rate_hourly" className="mr-2">Hourly</label>
            <input
              type="number"
              id="rate_hourly"
              name="rates.hourly"
              className="border rounded w-full py-2 px-3"
              defaultValue={service?.rates?.hourly || ""}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="rate_fixed" className="mr-2">Fixed</label>
            <input
              type="number"
              id="rate_fixed"
              name="rates.fixed"
              className="border rounded w-full py-2 px-3"
              defaultValue={service?.rates?.fixed || ""}
            />
          </div>
        </div>
      </div>

      {/* Technician Info */}
      <div className="mb-4">
        <label htmlFor="tech_name" className="block text-gray-700 font-bold mb-2">Technician Name</label>
        <input
          type="text"
          id="tech_name"
          name="technician.name"
          className="border rounded w-full py-2 px-3"
          placeholder="Name"
          defaultValue={service?.technician?.name || ""}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="tech_phone" className="block text-gray-700 font-bold mb-2">Technician Phone</label>
        <input
          type="tel"
          id="tech_phone"
          name="technician.phone"
          className="border rounded w-full py-2 px-3"
          placeholder="Phone"
          defaultValue={service?.technician?.phone || ""}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="tech_email" className="block text-gray-700 font-bold mb-2">Technician Email</label>
        <input
          type="email"
          id="tech_email"
          name="technician.email"
          className="border rounded w-full py-2 px-3"
          placeholder="Email address"
          defaultValue={service?.technician?.email || ""}
        />
      </div>

      {/* Submit */}
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full"
          type="submit"
        >
          Update Service
        </button>
      </div>
    </form>
  );
};

export default PlumberServiceEditForm;
