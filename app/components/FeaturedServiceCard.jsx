import Link from 'next/link';
import {
  FaTools,
  FaUserTie,
  FaMapMarkedAlt,
  FaMoneyBill,
  FaMapMarker,
} from 'react-icons/fa';

const FeaturedServiceCard = ({ service }) => {
  const getRateDisplay = () => {
    const { rates } = service;

    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/job`;
    }
  };

  return (
    <div className='bg-white rounded-xl shadow-md relative flex flex-col'>
      <Link href={`/services/${service._id}`}>
        <img
          src={`${service.images[0]}`}
          alt="Plumbing Service"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto rounded-t-xl propertythumb"
        />
      </Link>
      <div className='p-6'>
        <h3 className='text-xl font-bold'>{service.name}</h3>
        <div className='text-gray-600 mb-4'>{service.category}</div>
        <h3 className='absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          ₹{getRateDisplay()}
        </h3>

        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <FaTools className='inline-block mr-2' /> {service.service_type}{' '}
            <span className='md:hidden lg:inline'>Type</span>
          </p>
          <p>
            <FaUserTie className='inline-block mr-2' /> {service.experience}+ yrs{' '}
            <span className='md:hidden lg:inline'>Experience</span>
          </p>
          <p>
            <FaMapMarkedAlt className='inline-block mr-2' />
            {service.coverage_area}{' '}
            <span className='md:hidden lg:inline'>Area</span>
          </p>
        </div>

        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          {service.rates.nightly && (
            <p>
              <FaMoneyBill className='inline mr-2' /> Per Job
            </p>
          )}
          {service.rates.weekly && (
            <p>
              <FaMoneyBill className='inline mr-2' /> Weekly
            </p>
          )}
          {service.rates.monthly && (
            <p>
              <FaMoneyBill className='inline mr-2' /> Monthly
            </p>
          )}
        </div>

        <div className='border border-gray-200 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <FaMapMarker className='text-lg text-orange-700' />
            <span className='text-orange-700'>
              {service.location.city}, {service.location.state}
            </span>
          </div>
          <Link
            href={`/services/${service._id}`}
            className='h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedServiceCard;
