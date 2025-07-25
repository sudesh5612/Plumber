import connectDB from "@/app/config/database";
import Service from "../../models/service";
import Link from "next/link";
import ServiceCard from "@/app/components/ServiceCard";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import ServiceSearchForm from "@/app/components/ServiceSearchForm";

const SearchResultsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const { location, serviceType } = params;

  await connectDB();

  const locationPattern = new RegExp(location, "i");

  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ],
  };

  if (serviceType && serviceType !== "All") {
    const typePattern = new RegExp(serviceType, "i");
    query.type = typePattern;
  }

  const servicesQueryResults = await Service.find(query).lean();

  const services = servicesQueryResults.map(service => ({
    _id: service._id.toString(),
    name: service.name || '',
    description: service.description || '',
    type: service.type || '',
    location: {
      street: service.location?.street || '',
      city: service.location?.city || '',
      state: service.location?.state || '',
      zipcode: service.location?.zipcode || ''
    },
    rates: {
      hourly: service.rates?.hourly || 0,
      daily: service.rates?.daily || 0
    },
    seller_info: {
      name: service.seller_info?.name || '',
      email: service.seller_info?.email || '',
      phone: service.seller_info?.phone || ''
    },
    images: service.images || [],
    is_featured: service.is_featured || false,
    createdAt: service.createdAt ? service.createdAt.toString() : null,
    updatedAt: service.updatedAt ? service.updatedAt.toString() : null
  }));

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-width-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <ServiceSearchForm />
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link href='/services' className="flex items-center text-blue-500 hover:underline mb-3">
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back To Services
          </Link>

          <h1 className="text-2xl mb-4">Search Results</h1>

          {services.length === 0 ? (
            <p>No plumbing services found for your search.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
