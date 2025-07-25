'use client';

import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

// Displays plumber service images in a lightbox gallery
const ServiceImages = ({ images }) => {
  console.log(images); // Confirm structure of service images

  return (
    <Gallery>
      <section className="bg-blue-50 p-4">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width="1000"
              height="600"
            >
              {({ ref, open }) => (
                <Image
                  src={images[0]}
                  alt="Plumbing Service"
                  className="object-cover h-[400px] mx-auto rounded-xl cursor-pointer"
                  ref={ref}
                  onClick={open}
                  width={1800}
                  height={400}
                  priority={true}
                  unoptimized // Use if using external image links
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`${
                    images.length === 3 && index === 2
                      ? "col-span-2"
                      : "col-span-1"
                  }`}
                >
                  <Item
                    original={image}
                    thumbnail={image}
                    width="1000"
                    height="600"
                  >
                    {({ ref, open }) => (
                      <Image
                        src={image}
                        alt={`Plumbing Work ${index + 1}`}
                        className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                        ref={ref}
                        onClick={open}
                        width={1800}
                        height={400}
                        unoptimized
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default ServiceImages;
