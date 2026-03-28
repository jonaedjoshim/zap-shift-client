import React from "react"

const AboutTab = ({ tab, activeTab, setActiveTab }) => {
  return (
    <button
      onClick={() => setActiveTab(tab.id)}
      className={`px-5 py-2 cursor-pointer text-sm md:text-base transition-all duration-300 
        ${activeTab === tab.id 
          ? "bg-[#CAEB66] rounded-full text-black shadow-md" 
          : "text-gray-500 hover:text-black hover:bg-gray-100 rounded-full"}
      `}
    >
      {tab.title}
    </button>
  )
}

export default AboutTab