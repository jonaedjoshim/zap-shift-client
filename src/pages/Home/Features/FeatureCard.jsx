const FeatureCard = ({ title, description, image }) => {
    return (
        <div className="flex flex-col md:flex-row items-center p-8 rounded-2xl bg-white gap-6 md:gap-0">
            <img
                src={image}
                alt={title}
                className="w-45 h-45  object-contain shrink-0"
            />
            <div className="hidden md:block h-34 border-l border-dashed border-[#03373D] mx-12"></div>
            <div className="text-center md:text-left max-w-2xl">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                    {title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-gray-500">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default FeatureCard;