import ServiceCard from "@/app/components/ServiceCard";
import connectDB from "@/app/config/database";
import User from "@/app/models/User";
import { getSessionUser } from "@/app/utils/getSessionUser";
import { redirect } from "next/navigation";

const SavedServicesPage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    redirect('/api/auth/signin');
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId).populate('bookmarks');

  if (!user) {
    return (
      <section className="px-4 py-6">
        <div className="container lg:container m-auto px-4 py-6">
          <h1 className="text-2xl mb-4">Saved Services</h1>
          <p>User not found.</p>
        </div>
      </section>
    );
  }

  const { bookmarks } = user;

  const serializedBookmarks = bookmarks.map(service => ({
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
    owner: service.owner?.toString() || '',
    createdAt: service.createdAt ? service.createdAt.toString() : null,
    updatedAt: service.updatedAt ? service.updatedAt.toString() : null
  }));

  return (
    <>
      <section className="px-4 py-6">
        <div className="container lg:container m-auto px-4 py-6">
          <h1 className="text-2xl mb-4">Saved Plumbing Services</h1>
          {serializedBookmarks.length === 0 ? (
            <p>No saved services found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {serializedBookmarks.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SavedServicesPage;
