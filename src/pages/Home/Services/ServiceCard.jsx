const ServiceCard = ({
    service,
    Icon,
}) => {
    return (
        <article className="group h-full rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#CAEB66] hover:shadow-xl">
            <div className="flex h-full flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F4F7F8] text-[#03373D] transition group-hover:bg-white/70">
                    <Icon className="text-2xl" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-[#03373D]">
                    {service.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500 transition group-hover:text-[#03373D]/80 md:text-base">
                    {service.description}
                </p>
            </div>
        </article>
    );
};

export default ServiceCard;