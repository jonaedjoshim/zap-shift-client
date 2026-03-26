import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";

const Banner = () => {
    const banners = [bannerImg1, bannerImg2, bannerImg3];
    return (
        <div className="w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-xl">
            <Swiper
                modules={[Autoplay, Pagination]}
                loop={true}
                speed={800}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper"
            >
                {banners.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="w-full h-55 sm:h-75 md:h-100 lg:h-[500px]">
                            <img
                                src={img}
                                alt={`banner-${index}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;