import React from 'react';
import reviews from '../../../../assets/json/reviews.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import ReviewCard from './ReviewCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const ReviewCarousel = () => {
    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-4">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={1}
                    spaceBetween={0}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: false,
                    }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        el: '.custom-pagination',
                        clickable: true,
                        renderBullet: (index, className) => {
                            return `<span class="${className} w-2.5! h-2.5! bg-gray-400!"></span>`;
                        },
                    }}
                    navigation={{
                        nextEl: '.custom-next',
                        prevEl: '.custom-prev',
                    }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="review-swiper pb-20!"
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id} className="transition-all duration-500">
                            {({ isActive }) => (
                                <div className={`transition-all duration-500 flex justify-center ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-40 blur-[1px]'}`}>
                                    <ReviewCard review={review} isActive={isActive} />
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="flex items-center mx-auto max-w-64 justify-center gap-2 lg:gap-8 -mt-5">
                    <button className="custom-prev group size-12 flex items-center justify-center px-4 rounded-full bg-white shadow-md hover:bg-lime-300 transition-all duration-300 cursor-pointer">
                        <FaChevronLeft />
                    </button>

                    <div className="custom-pagination flex items-center gap-1 lg:gap-2"></div>

                    <button className="custom-next group size-12 flex items-center justify-center px-4 rounded-full bg-white shadow-md hover:bg-lime-300 transition-all duration-300 cursor-pointer">
                        <FaChevronRight />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ReviewCarousel;