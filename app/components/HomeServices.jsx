import React from 'react';
import connectDB from '../config/database';
import Service from '../models/service'; 
import ServiceCard from './ServiceCard'; 
import Link from 'next/link';

const HomeServices = async () => {
  await connectDB();  
  const recentServices = await Service.find({}).sort({ createdAt: -1 }).limit(3).lean();

  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Plumbing Services
          </h2>

          {recentServices.length === 0 ? (
            <p>No services found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {recentServices.map((service, id) => (
                <div key={id}>
                  <ServiceCard key={service._id} service={service} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className='m-auto max-w-lg my-6 px-6'>
        <Link
          href='/services'
          className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
        >
          View All Services
        </Link>
      </section>
    </>
  );
};

export default HomeServices;
