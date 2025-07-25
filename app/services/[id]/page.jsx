import ServiceHeaderImage from "@/app/components/ServiceHeaderImage";
import ServiceDetails from "@/app/components/ServiceDetails";
import connectDB from "@/app/config/database";
import Service from "../../models/service";
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import ServiceImages from "@/app/components/ServiceImages";
import BookmarkButton from "@/app/components/BookmarkButton";
import ShareButtons from "@/app/components/ShareButtons";
import ServiceContactForm from "@/app/components/ServiceContactForm";

const ServicePage = async ({ params }) => {
  await connectDB();
  const serviceParams = await params;
  const service = await Service.findById(serviceParams.id).lean();

  if (!service) {
    return (
      <div className="container m-auto py-10 px-6">
        <p className="text-red-500">Service not found.</p>
        <Link href="/services" className="text-blue-500 underline">
          <FaArrowLeft className="inline-block mr-1" /> Back to Services
        </Link>
      </div>
    );
  }

  // Serialize the service object (plumber version)
  const serializedService = {
    _id: service._id.toString(),
    owner: service.owner?.toString(),
    name: service.name,                      // e.g., "Pipe Leak Fix"
    category: service.category,              // e.g., "Emergency Plumbing"
    description: service.description,
    location: {
      street: service.location?.street,
      city: service.location?.city,
      state: service.location?.state,
      zipcode: service.location?.zipcode,
    },
    pricing: {
      baseRate: service.pricing?.baseRate,
      hourlyRate: service.pricing?.hourlyRate,
      flatRate: service.pricing?.flatRate,
    },
    duration: service.duration,              // e.g., "1-2 hours"
    availability: service.availability || [],// e.g., ["Monday", "Tuesday"]
    seller_info: {
      name: service.seller_info?.name,
      email: service.seller_info?.email,
      phone: service.seller_info?.phone,
    },
    images: service.images || [],
    is_featured: service.is_featured,
    createdAt: service.createdAt?.toString(),
    updatedAt: service.updatedAt?.toString(),
  };

  return (
    <>
      <ServiceHeaderImage image={serializedService.images[0]} />

      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/services"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Services
          </Link>
        </div>
      </section>

      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <ServiceDetails service={serializedService} />

            <aside className="space-y-4">
              <BookmarkButton service={serializedService} />
              <ShareButtons service={serializedService} />
              <ServiceContactForm service={serializedService} />
            </aside>
          </div>
        </div>
      </section>

      <ServiceImages images={serializedService.images} />
    </>
  );
};

export default ServicePage;
