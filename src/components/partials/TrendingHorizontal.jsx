import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

const TrendingHorizontal = ({ data }) => {
  return (
    <div className="relative w-full px-[1.3vw]">
      <Swiper
        spaceBetween={20}
        modules={[Navigation]}
        navigation
        slidesPerView={5}
        breakpoints={{
          768: {
            slidesPerView: 5,
          },
          480: {
            slidesPerView: 3,
          },
          320: {
            slidesPerView: 2,
          },
        }}
        className="py-5 w-full flex gap-3 overflow-hidden"
      >
        {data.length > 0 ? (
          data.map((d, i) => {
            return (
              <SwiperSlide
                key={i}
                className="w-[25vw] rounded-md sm:rounded-xl overflow-hidden"
              >
                <Link
                  to={`/${d.media_type}/details/${d.id}`}
                  key={i}
                  className="box relative min-w-[16vw] h-[49vh] bg-purple-900"
                >
                  <img
                    className="w-full h-full object-cover"
                    src={
                      d.poster_path
                        ? `https://image.tmdb.org/t/p/original/${d.poster_path}`
                        : noimage
                    }
                    alt=""
                  />
                </Link>
              </SwiperSlide>
            );
          })
        ) : (
          <h1 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2  text-center text-[2.2vw] text-white whitespace-nowrap">
            Nothing to show.
          </h1>
        )}
      </Swiper>
    </div>
  );
};

export default TrendingHorizontal;
