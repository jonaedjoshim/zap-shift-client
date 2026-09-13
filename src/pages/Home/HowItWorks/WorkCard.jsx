import { FaTruckFast } from "react-icons/fa6";

const WorkCard = ({
    item,
    step,
}) => {
    return (
        <article className="group h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-5 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F2F8DE] text-[#71852F] transition group-hover:bg-[#CAEB66]">
                    <FaTruckFast className="text-lg" />
                </div>

                <span className="text-sm font-bold text-gray-300">
                    0{step}
                </span>
            </div>

            <h3 className="text-lg font-semibold text-[#03373D]">
                {item.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
                {item.description}
            </p>
        </article>
    );
};

export default WorkCard;