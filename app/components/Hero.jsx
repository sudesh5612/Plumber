import React from 'react';
import ServiceSearchForm from './ServiceSearchForm'; // Updated name if form also changes

function Hero() {
  return (
    <>
      {/* Hero */}
      <section className="bg-blue-700 py-20 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Get Reliable Plumbing Services
            </h1>
            <p className="my-4 text-xl text-white">
              Fast, affordable, and professional plumbing solutions at your doorstep.
            </p>
          </div>
          {/* Form Component */}
          <ServiceSearchForm />
        </div>
      </section>
    </>
  );
}

export default Hero;
