import {
    Swiper,
    SwiperSlide,
} from "swiper/react";
import {
    Autoplay,
    Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";

const banners = [
    {
        id: 1,
        image: bannerImg1,
        alt: "Fast parcel delivery and easy pickup service",
    },
    {
        id: 2,
        image: bannerImg2,
        alt: "Quick doorstep parcel delivery service",
    },
    {
        id: 3,
        image: bannerImg3,
        alt: "Reliable nationwide parcel delivery",
    },
];

const Banner = () => {
    return (
        <section
            className="mx-auto w-full max-w-7xl overflow-hidden rounded-3xl bg-white shadow-sm"
            aria-label="Delivery highlights"
        >
            <Swiper
                modules={[
                    Autoplay,
                    Pagination,
                ]}
                loop
                speed={800}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction:
                        false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper"
            >
                {banners.map(
                    (banner) => (
                        <SwiperSlide
                            key={
                                banner.id
                            }
                        >
                            <div className="h-55 w-full sm:h-75 md:h-100 lg:h-125">
                                <img
                                    src={
                                        banner.image
                                    }
                                    alt={
                                        banner.alt
                                    }
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </SwiperSlide>
                    )
                )}
            </Swiper>
        </section>
    );
};

export default Banner;