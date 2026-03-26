import React, { useEffect } from 'react';
import AOS from 'aos';

import Banner from '../Banner/Banner';
import ServicesSection from '../Services/ServicesSection';
import HowItWorks from '../HowItWorks/HowItWorks';
import Brands from '../Brands/Brands';
import Features from '../Features/Features';
import MerchantCTA from '../MerchantCTA/MerchantCTA';
import Review from '../CustomerReview/Review/Review';
import FAQ from '../FAQ/FAQ';

const Home = () => {

  useEffect(() => {
    AOS.refreshHard();
  }, []);

  return (
    <div>
      <div data-aos="fade-up"><Banner /></div>
      <div data-aos="fade-up" data-aos-delay="100"><HowItWorks /></div>
      <div data-aos="fade-up" data-aos-delay="200"><ServicesSection /></div>
      <div data-aos="fade-up" data-aos-delay="300"><Brands /></div>
      <div data-aos="fade-up" data-aos-delay="400"><Features /></div>
      <div data-aos="fade-up" data-aos-delay="500"><MerchantCTA /></div>
      <div data-aos="fade-up" data-aos-delay="600"><Review /></div>
      <div data-aos="fade-up" data-aos-delay="700"><FAQ /></div>
    </div>
  );
};

export default Home;