import { useState } from "react";

import data from "../../assets/json/about.json";
import AboutTab from "./AboutTab";

const AboutUs = () => {
  const [activeTab, setActiveTab] =
    useState("story");

  const activeContent =
    data.tabs.find(
      (tab) =>
        tab.id === activeTab
    );

  return (
    <section className="mx-auto max-w-7xl rounded-3xl bg-white p-6 shadow-sm md:p-10 lg:p-14">
      <div
        data-aos="fade-up"
        className="border-b border-gray-200 pb-8"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8BA63D]">
          About ZapShift
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#03373D] md:text-4xl">
          {data.heading}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 md:text-base md:leading-7">
          {data.slogan}
        </p>
      </div>

      <div
        className="flex flex-wrap gap-2 py-7"
        data-aos="fade-up"
      >
        {data.tabs.map((tab) => (
          <AboutTab
            key={tab.id}
            tab={tab}
            activeTab={activeTab}
            setActiveTab={
              setActiveTab
            }
          />
        ))}
      </div>

      {activeContent && (
        <div
          key={activeTab}
          data-aos="fade-up"
          className="max-w-5xl space-y-5 text-sm leading-7 text-gray-600 md:text-base md:leading-8"
        >
          {activeContent.content.map(
            (text, index) => (
              <p key={index}>
                {text}
              </p>
            )
          )}
        </div>
      )}
    </section>
  );
};

export default AboutUs;