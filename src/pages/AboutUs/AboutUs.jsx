import React, { useEffect, useState } from "react"
import data from "../../assets/json/about.json"
import AboutTab from "./AboutTab"
import AOS from "aos"
import "aos/dist/aos.css"

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("story")

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" })
  }, [])

  const activeContent = data.tabs.find(tab => tab.id === activeTab)

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-2xl p-6 md:p-10">
        <h1
          className="text-3xl md:text-4xl font-bold text-teal-900 mb-2"
          data-aos="fade-up"
        >
          {data.heading}
        </h1>

        <p className="text-gray-500 max-w-2xl mb-6" data-aos="fade-up">
          {data.slogan}
        </p>

        <div
          className="border-t border-dashed pt-4 flex flex-wrap mb-6"
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

        <div
          className="space-y-4 text-gray-600 transition-opacity duration-500 ease-in-out"
          key={activeTab}
          data-aos="zoom-in"
        >
          {activeContent.content.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutUs