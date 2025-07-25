import connectDB from "../config/database";
import Service from "../models/service";
import FeaturedServiceCard from "./FeaturedServiceCard";

const FeaturedServices = async () => {
  await connectDB();

  const services = await Service.find({
    is_featured: true,
  }).lean();

  return services.length > 0 ? (
    <section className='bg-blue-50 px-4 pt-6 pb-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
          Featured Plumbing Services
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {services.map((service) => (
            <FeaturedServiceCard key={service._id} service={service} />
          ))}
        </div>
      </div>
    </section>
  ) : null;
};

export default FeaturedServices;
