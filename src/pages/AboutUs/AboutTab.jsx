const AboutTab = ({
  tab,
  activeTab,
  setActiveTab,
}) => {
  const isActive =
    activeTab === tab.id;

  return (
    <button
      type="button"
      onClick={() =>
        setActiveTab(tab.id)
      }
      aria-pressed={isActive}
      className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 md:text-base ${isActive
          ? "bg-[#CAEB66] text-[#03373D]"
          : "text-gray-500 hover:bg-gray-100 hover:text-[#03373D]"
        }`}
    >
      {tab.title}
    </button>
  );
};

export default AboutTab;