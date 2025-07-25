import ServiceEditForm from "@/app/components/ServiceEditForm";
import connectDB from "@/app/config/database";
import Service from "../../../models/service";

const ServiceEditPage = async ({ params }) => {
  const resolvedParams = await params;
  console.log('Full params object:', resolvedParams);
  console.log('params.id value:', resolvedParams.id);

  await connectDB();

  const serviceId = resolvedParams.id;

  if (!serviceId || serviceId === "id") {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold mb-4">Invalid Service ID</h1>
        <p>Received ID: "{serviceId}"</p>
      </div>
    );
  }

  const serviceDoc = await Service.findById(serviceId).lean();

  if (!serviceDoc) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Service Not Found
      </h1>
    );
  }

  // Convert to plain object and serialize ObjectIds
  const service = {
    ...serviceDoc,
    _id: serviceDoc._id.toString(),
    owner: serviceDoc.owner?.toString(),
    // Convert additional ObjectId fields if needed
  };

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <ServiceEditForm service={service} />
        </div>
      </div>
    </section>
  );
};

export default ServiceEditPage;
