import { useEffect } from "react";
import AOS from "aos";

import Banner from "../Banner/Banner";
import Brands from "../Brands/Brands";
import Review from "../CustomerReview/Review/Review";
import FAQ from "../FAQ/FAQ";
import Features from "../Features/Features";
import HowItWorks from "../HowItWorks/HowItWorks";
import MerchantCTA from "../MerchantCTA/MerchantCTA";
import ServicesSection from "../Services/ServicesSection";

const Home = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="space-y-4 md:space-y-8">
      <div data-aos="fade-up">
        <Banner />
      </div>

      <div data-aos="fade-up">
        <HowItWorks />
      </div>

      <div data-aos="fade-up">
        <ServicesSection />
      </div>

      <div data-aos="fade-up">
        <Brands />
      </div>

      <div data-aos="fade-up">
        <Features />
      </div>

      <div data-aos="fade-up">
        <MerchantCTA />
      </div>

      <div data-aos="fade-up">
        <Review />
      </div>

      <div data-aos="fade-up">
        <FAQ />
      </div>
    </div>
  );
};

export default Home;