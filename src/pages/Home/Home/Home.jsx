import React from 'react';
import Banner from '../Banner/Banner';
import ServicesSection from '../Services/ServicesSection';
import HowItWorks from '../HowItWorks/HowItWorks';

const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <ServicesSection />
    </div>
  );
};

export default Home;