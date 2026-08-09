 

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Autoplay } from 'swiper/modules';
import CourseCard from './Course_Card';

const Courseslider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          modules={[FreeMode, Autoplay]}
          freeMode={true}
          loop={true}
          speed={6000} // 👈 slow smooth speed (increase/decrease as needed)
          autoplay={{
            delay: 0, // 👈 continuous flow (no pause)
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          spaceBetween={-50}
          
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 10 },
            1024: { slidesPerView: 3, spaceBetween: 10 },
          }}
          className="w-full px-4"
        >
          {Courses.map((course, index) => (
            <SwiperSlide key={index}>
              <CourseCard course={course} height={'h-[300px]'} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No Course Found</p>
      )}
    </>
  );
};

export default Courseslider;

