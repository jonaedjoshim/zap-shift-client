import React from 'react';

const FAQheader = () => {
    return (
        <section className="px-4 pt-16 md:pt-24">
            <div className="container mx-auto flex flex-col items-center text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-[#002B2B] mb-6">
                    Frequently Asked Question (FAQ)
                </h1>
                <p className="text-gray-600 text-sm md:text-lg max-w-3xl leading-relaxed mb-10">
                    Find answers to common questions about our reliable, fast parcel delivery services.
                    From tracking your packages to understanding delivery charges, we are here to help you get moving without any hassle!
                </p>

            </div>
        </section>
    );
};

export default FAQheader;