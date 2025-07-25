import addService from "../actions/addService";

const ServiceAddForm = () => {
  return (
    <>
      <form action={addService}>
        <h2 className="text-3xl text-center font-semibold mb-6">
          Add Plumbing Service
        </h2>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
            Service Category
          </label>
          <select
            id="category"
            name="category"
            className="border rounded w-full py-2 px-3"
            required
          >
            <option value="Leak Repair">Leak Repair</option>
            <option value="Drain Cleaning">Drain Cleaning</option>
            <option value="Pipe Installation">Pipe Installation</option>
            <option value="Water Heater Repair">Water Heater Repair</option>
            <option value="Emergency Plumbing">Emergency Plumbing</option>
            <option value="Inspection">Inspection</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Service Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="e.g. Emergency Leak Repair"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="border rounded w-full py-2 px-3"
            rows="4"
            placeholder="Briefly describe your plumbing service"
          ></textarea>
        </div>

        <div className="mb-4 bg-blue-50 p-4">
          <label className="block text-gray-700 font-bold mb-2">Service Area</label>
          <input
            type="text"
            id="city"
            name="location.city"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="City"
            required
          />
          <input
            type="text"
            id="state"
            name="location.state"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="State"
            required
          />
          <input
            type="text"
            id="zipcode"
            name="location.zipcode"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Zipcode"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="available_days" className="block text-gray-700 font-bold mb-2">
            Available Days
          </label>
          <input
            type="text"
            id="available_days"
            name="availability.days"
            className="border rounded w-full py-2 px-3"
            placeholder="e.g. Mon - Sat"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="available_time" className="block text-gray-700 font-bold mb-2">
            Available Time
          </label>
          <input
            type="text"
            id="available_time"
            name="availability.time"
            className="border rounded w-full py-2 px-3"
            placeholder="e.g. 9am - 7pm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Service Rate (₹)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="border rounded w-full py-2 px-3"
            placeholder="e.g. 1500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="provider_name" className="block text-gray-700 font-bold mb-2">
            Plumber's Name
          </label>
          <input
            type="text"
            id="provider_name"
            name="provider.name"
            className="border rounded w-full py-2 px-3"
            placeholder="e.g. Raj Plumbing Services"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="provider_phone" className="block text-gray-700 font-bold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="provider_phone"
            name="provider.phone"
            className="border rounded w-full py-2 px-3"
            placeholder="Phone"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="provider_email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="provider_email"
            name="provider.email"
            className="border rounded w-full py-2 px-3"
            placeholder="Email address"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="images" className="block text-gray-700 font-bold mb-2">
            Service Images (optional)
          </label>
          <input
            type="file"
            id="images"
            name="images"
            className="border rounded w-full py-2 px-3"
            accept="image/*"
            multiple
          />
        </div>

        <div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Service
          </button>
        </div>
      </form>
    </>
  );
};

export default ServiceAddForm;
