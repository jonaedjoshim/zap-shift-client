import works from "../../../data/howItWorks.json";
import WorkCard from "./WorkCard";

const HowItWorks = () => {
  return (
    <section className="px-4 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl font-bold text-[#03373D] md:text-3xl">
            How It Works
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 md:text-base">
            Send your parcel in a few
            simple steps, from booking
            to safe delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {works.map(
            (item, index) => (
              <WorkCard
                key={
                  item.id ??
                  item.title
                }
                item={
                  item
                }
                step={
                  index +
                  1
                }
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;