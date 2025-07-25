import Image from "next/image";
import connectDB from "../config/database";
import { getSessionUser } from "../utils/getSessionUser";
//import profile from '@/public/images/profile.jpeg';
import User from "../models/User";
import Service from "../models/service";
import ProfileServices from "../components/ProfileServices"; // <- new component for listing plumber's services
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    redirect('/api/auth/signin');
  }

  const { userId } = sessionUser;

  const [user, rawServices] = await Promise.all([
    User.findById(userId).lean(),
    Service.find({ owner: userId }).lean(),
  ]);

  if (!user) {
    throw new Error("User not found in database");
  }

  const services = rawServices.map(service => ({
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
    owner: service.owner.toString(),
    createdAt: service.createdAt ? service.createdAt.toString() : null,
    updatedAt: service.updatedAt ? service.updatedAt.toString() : null
  }));

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profile}
                  width={100}
                  height={100}
                  alt="profile"
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name:</span> {user.username}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email:</span> {user.email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Plumbing Services</h2>
              <ProfileServices services={services} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;