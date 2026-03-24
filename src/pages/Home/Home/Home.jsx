import React from 'react';
import Banner from '../Banner/Banner';
import ServicesSection from '../Services/ServicesSection';
import HowItWorks from '../HowItWorks/HowItWorks';
import Brands from '../Brands/Brands';
import Features from '../Features/Features';

const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <ServicesSection />
      <Brands />
      <Features/>
    </div>
  );
};

export default Home;