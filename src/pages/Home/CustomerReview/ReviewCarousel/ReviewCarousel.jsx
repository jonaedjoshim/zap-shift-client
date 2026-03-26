import React from 'react';
import reviews from '../../../../assets/json/reviews.json';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ReviewCard from './ReviewCard';

const ReviewCarousel = () => {
    return (
        <div className="flex flex-col items-center">

            <div className="w-full max-w-300">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    spaceBetween={24}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        nextEl: '.custom-next',
                        prevEl: '.custom-prev',
                    }}
                    pagination={{
                        el: '.custom-pagination',
                        clickable: true,
                    }}
                    className="review-swiper"
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id}>
                            <ReviewCard review={review} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="flex items-center justify-center gap-6 mt-10">
                <button className="custom-prev w-10 h-10 p-5 rounded-full bg-gray-200 hover:bg-lime-500 cursor-pointer transition flex items-center justify-center">
                    ❮
                </button>

                <div className="custom-pagination flex items-center gap-1.5"></div>

                <button className="custom-next w-10 h-10 px-5 rounded-full bg-gray-200 hover:bg-lime-500 cursor-pointer transition flex items-center justify-center">
                    ❯
                </button>
            </div>

        </div>
    );
};

export default ReviewCarousel;