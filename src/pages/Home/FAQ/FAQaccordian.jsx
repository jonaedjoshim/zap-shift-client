import React, { useState, useRef, useEffect } from 'react';
import faqData from '../../../assets/json/faq.json';
import { FaArrowRight } from 'react-icons/fa';
import AOS from 'aos';

const FAQaccordian = () => {
    const [showAll, setShowAll] = useState(false);
    const extraRef = useRef(null);
    const [height, setHeight] = useState(0);
    const firstFaqs = faqData.slice(0, 5);
    const extraFaqs = faqData.slice(5);
    const toggleShowAll = () => setShowAll(!showAll);
    useEffect(() => {
        if (extraRef.current) {
            setHeight(extraRef.current.scrollHeight);
        }
        AOS.refreshHard();
    }, [showAll]);

    return (
        <section className="px-4 pb-16 md:pb-24">
            <div className="container mx-auto max-w-4xl flex flex-col items-center">
                <div className="w-full space-y-4 mb-10">
                    {firstFaqs.map((item, index) => (
                        <div
                            key={item.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 80}
                            className="collapse collapse-arrow rounded-xl border border-gray-200 bg-white"
                        >
                            <input type="radio" name="faq-accordion" defaultChecked={index === 0} className="peer" />
                            <div className="collapse-title text-base font-semibold transition-all peer-checked:border-b peer-checked:border-dashed peer-checked:border-gray-400">
                                {item.question}
                            </div>
                            <div className="collapse-content overflow-hidden transition-all duration-300 max-h-0 peer-checked:max-h-96">
                                <p className="text-gray-700 text-sm md:text-base leading-relaxed pt-4">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div
                        ref={extraRef}
                        className="overflow-hidden transition-all duration-500"
                        style={{ maxHeight: showAll ? `${height}px` : '0px' }}
                    >
                        {extraFaqs.map((item, index) => (
                            <div
                                key={item.id}
                                data-aos="fade-up"
                                data-aos-delay={(index + 5) * 80}
                                className="collapse collapse-arrow rounded-xl border border-gray-200 bg-white mt-4"
                            >
                                <input type="radio" name="faq-accordion" className="peer" />
                                <div className="collapse-title text-base font-semibold transition-all peer-checked:border-b peer-checked:border-dashed peer-checked:border-gray-400">
                                    {item.question}
                                </div>
                                <div className="collapse-content overflow-hidden transition-all duration-300 max-h-0 peer-checked:max-h-96">
                                    <p className="text-gray-700 text-sm md:text-base leading-relaxed pt-4">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    data-aos="zoom-in"
                    data-aos-delay="200"
                    onClick={toggleShowAll}
                    className="join mt-4"
                >
                    <span className="btn join-item rounded-xl bg-lime-400 text-black px-6 hover:bg-lime-500 transition-all">
                        {showAll ? 'See Less FAQ’s' : 'See More FAQ’s'}
                    </span>
                    <span
                        className={`btn btn-circle join-item rounded-full bg-black text-lime-400 transform transition-transform duration-300 ${showAll ? '-rotate-225' : '-rotate-45'
                            }`}
                    >
                        <FaArrowRight />
                    </span>
                </button>

            </div>
        </section>
    );
};

export default FAQaccordian;