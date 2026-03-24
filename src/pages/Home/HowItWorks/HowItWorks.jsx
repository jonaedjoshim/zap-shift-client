import WorkCard from "./WorkCard";
import works from "../../../data/howItWorks.json";

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">
          How it Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {works.map((item, index) => (
            <WorkCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;