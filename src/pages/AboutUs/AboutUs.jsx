import { useState } from "react";

import data from "../../assets/json/about.json";
import AboutTab from "./AboutTab";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("story");

  const activeContent = data.tabs.find(
    (tab) => tab.id === activeTab
  );

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="rounded-2xl bg-white p-6 md:p-10">
        <h1
          className="mb-2 text-3xl font-bold text-teal-900 md:text-4xl"
          data-aos="fade-up"
        >
          {data.heading}
        </h1>

        <p
          className="mb-6 max-w-2xl text-gray-500"
          data-aos="fade-up"
        >
          {data.slogan}
        </p>

        <div
          className="mb-6 flex flex-wrap border-t border-dashed pt-4"
          data-aos="fade-up"
        >
          {data.tabs.map((tab) => (
            <AboutTab
              key={tab.id}
              tab={tab}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>

        {activeContent && (
          <div
            key={activeTab}
            className="space-y-4 text-gray-600 transition-opacity duration-500 ease-in-out"
            data-aos="zoom-in"
          >
            {activeContent.content.map((text, index) => (
              <p key={index}>
                {text}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUs;