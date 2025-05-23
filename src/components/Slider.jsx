
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = () => {
    return (
        <div className="container mx-auto px-2 xl:px-0 my-10">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
                loop={true}
                spaceBetween={20}
                slidesPerView={1}
            >
                {/* Slide 1: Product Recommendations */}
                <SwiperSlide>
                    <div className="relative h-[300px] md:h-[450px] lg:h-[460px] xl:h-[570px] 2xl:h-[620px] flex items-center justify-center">
                        <img
                            src="https://wallpapers.com/images/hd/question-mark-pictures-wtuxsfnncxyx6s63.jpg"
                            alt="Add a Query"
                            className="absolute inset-0 w-full h-full object-center 2xl:object-cover brightness-50"
                        />
                        <div className="relative text-center text-white px-6 py-8">
                            <h2 className="text-3xl font-extrabold mb-4">
                                Have a Question? Add a Query!
                            </h2>
                            <p className="text-lg">
                                Ask about any product and get recommendations from the community.
                            </p>
                        </div>
                    </div>
                </SwiperSlide>


                {/* Slide 2: Add a Query */}
                <SwiperSlide>
                    <div className="relative h-[300px] md:h-[450px] lg:h-[460px] xl:h-[570px] 2xl:h-[620px] flex items-center justify-center">
                        <img
                            src="https://i.ibb.co.com/Phhwxrc/pngtree-online-product-recommendations-3d-illustration-of-suggested-products-picture-image-3950780.png"
                            alt="Product Recommendations"
                            className="absolute inset-0 w-full h-full object-center 2xl:object-cover brightness-50"
                        />
                        <div className="relative text-center text-white px-6 py-8">
                            <h2 className="text-3xl font-extrabold mb-4">
                                Product Recommendations
                            </h2>
                            <p className="text-lg">
                                Find the best products based on user reviews and expert suggestions.
                            </p>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3: Explore Recommendations */}
                <SwiperSlide>
                    <div className="relative h-[300px] md:h-[450px] lg:h-[460px] xl:h-[570px] 2xl:h-[620px] flex items-center justify-center">
                        <img
                            src="https://c0.wallpaperflare.com/preview/80/452/981/advice-answer-ask-assistance.jpg"
                            alt="Explore Recommendations"
                            className="absolute inset-0 w-full h-full object-center 2xl:object-cover brightness-50"
                        />
                        <div className="relative text-center text-white px-6 py-8">
                            <h2 className="text-3xl font-extrabold mb-4">
                                See What Others Recommend
                            </h2>
                            <p className="text-lg">
                                Check out product recommendations from others and make informed choices.
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;
