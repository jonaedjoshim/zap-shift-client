import { FaTruck } from "react-icons/fa";

const WorkCard = ({ item }) => {
    return (
        <div className="bg-base-100 border border-[#03373D] rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
            <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <FaTruck className="text-xl text-primary" />
                </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">
                {item.title}
            </h3>
            <p className="text-sm opacity-70">
                {item.description}
            </p>
        </div>
    );
};

export default WorkCard;