'use client';

import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

const Spinner = ({ loading }) => {
  return (
    <ClipLoader
      color="#0ea5e9" // plumber-themed blue
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Plumbing Services"
    />
  );
};

export default Spinner;
