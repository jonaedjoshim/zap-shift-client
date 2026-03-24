const ServiceCard = ({ service, Icon }) => {
    return (
        <div className="rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:bg-lime-400 hover:text-black hover:cursor-pointer">
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100">
                    <Icon className="text-2xl text-primary" />
                </div>
                <h3 className="text-lg font-semibold">
                    {service.title}
                </h3>
                <p className="text-sm opacity-80">
                    {service.description}
                </p>
            </div>
        </div>
    );
};

export default ServiceCard;