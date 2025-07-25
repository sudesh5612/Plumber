import React from 'react';
import Hero from './components/Hero';
import InfoBoxes from './components/InfoBoxes';
import HomeServices from './components/HomeServices';
import connectDB from './config/database';
import FeaturedServices from './components/FeaturedServices';

function HomePage() {
  connectDB();
  return (
    <>
    <Hero/>
    <InfoBoxes/>
    <FeaturedServices/>
    <HomeServices/>
    </>
  )
}

export default HomePage;