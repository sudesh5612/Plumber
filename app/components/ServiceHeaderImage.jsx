const ServiceHeaderImage = ({ image }) => {
  return (
    // <!-- Plumber Service Header Image -->
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <img
            src={image}
            alt="Plumbing service preview"
            className="object-contain h-[400px] w-full"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceHeaderImage;
