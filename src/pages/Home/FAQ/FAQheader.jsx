const FAQheader = () => {
    return (
        <section className="px-4 pt-12 md:pt-16">
            <div className="container mx-auto flex flex-col items-center text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8BA63D]">
                    Need Help?
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#002B2B] md:text-4xl">
                    Frequently Asked Questions
                </h2>

                <p className="mb-10 mt-4 max-w-3xl text-sm leading-6 text-gray-600 md:text-base md:leading-7">
                    Find quick answers about parcel
                    booking, delivery charges,
                    coverage, tracking, and other
                    ZapShift services.
                </p>
            </div>
        </section>
    );
};

export default FAQheader;