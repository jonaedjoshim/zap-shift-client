const FeatureCard = ({
    title,
    description,
    image,
}) => {
    return (
        <article className="flex flex-col items-center gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:flex-row md:p-8">
            <img
                src={image}
                alt=""
                className="h-32 w-32 shrink-0 object-contain md:h-40 md:w-40"
            />

            <div
                className="hidden h-34 border-l border-dashed border-[#03373D]/30 md:block md:mx-8 lg:mx-12"
                aria-hidden="true"
            />

            <div className="max-w-2xl text-center md:text-left">
                <h3 className="text-xl font-semibold text-[#03373D] md:text-2xl">
                    {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500 md:text-base md:leading-7">
                    {description}
                </p>
            </div>
        </article>
    );
};

export default FeatureCard;