import React from "react";
import ServiceCard from "../components/ServiceCard"; 
import connectDB from "../config/database";
import Service from "../models/service"; 
import Pagination from "../components/pagination";

const ServicesPage = async ({ searchParams: { page = 1, pageSize = 9 } }) => {
  await connectDB();
  const skip = (page - 1) * pageSize;
  const total = await Service.countDocuments({});

  const services = await Service.find({}).skip(skip).limit(pageSize);
  const showPagination = total > pageSize;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {services.length === 0 ? (
          <p>No plumbing services found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, id) => (
              <div key={id}>
                <ServiceCard key={service._id} service={service} />
              </div>
            ))}
          </div>
        )}
        {showPagination && (
          <Pagination
            page={parseInt(page)}
            pageSize={parseInt(pageSize)}
            totalItems={total}
          />
        )}
      </div>
    </section>
  );
};

export default ServicesPage;
