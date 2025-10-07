

import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/swiper-bundle.css"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/autoplay"

import { FreeMode, Autoplay, Pagination } from "swiper/modules"
import { ratingandreviewdetail } from "../../services/apis"
import { apiconnector } from "../../services/apiconnector"
import RatingStars from "../../components/core/Homepage/common/RatingStars"

const ReviewSliderdo = () => {
  const [review, setReview] = useState([])

  useEffect(() => {
    const fetchAllReview = async () => {
      try {
        const { data } = await apiconnector(
          "GET",
          ratingandreviewdetail.RATING_AND_REVIEW
        )
        if (data?.success) {
          setReview(data.data)
        }
      } catch (err) {
        console.log("Error while fetching reviews", err)
      }
    }

    fetchAllReview()
  }, [])

  return (
    <div className="w-full min-h-[250px] text-white">
      {review.length === 0 ? (
        <p className="text-center text-gray-400">No reviews found...</p>
      ) : (
        <Swiper
          // 👇 responsive breakpoints
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          freeMode={true}
          loop={review.length > 4}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="!w-full !h-full"
        >
          {review.map((item, index) => (
            <SwiperSlide
              key={index}
              className="min-w-[260px] min-h-[210px] bg-gradient-to-b from-gray-800 to-gray-900 p-5 rounded-xl shadow-lg hover:scale-[1.03] transition-transform duration-300"
            >
              {/* User Info */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={
                    item?.user?.image
                      ? item.user.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                          `${item?.user?.firstname ?? ""} ${
                            item?.user?.lastname ?? ""
                          }`.trim()
                        )}`
                  }
                  alt="profile pic"
                  className="h-12 w-12 object-cover rounded-full border border-gray-600"
                />
                <div>
                  <p className="font-semibold text-lg">
                    {item?.user?.firstname ?? "Anonymous"}{" "}
                    {item?.user?.lastname ?? ""}
                  </p>
                  <p className="text-base text-gray-200 italic">
                    {item?.course?.coursename ?? "No course"}
                  </p>
                </div>
              </div>

              {/* ⭐ Rating */}
              <div className="flex items-center gap-2 mb-3 mt-6">
                <RatingStars
                  value={item?.rating ?? 0}
                  readOnly={true}
                  size={22}
                />
                <span className="text-yellow-400 text-sm font-semibold">
                  {item?.rating ?? 0}/5
                </span>
              </div>

              {/* Review Text */}
              <p className="text-base text-gray-300 line-clamp-4 mt-5">
                {item?.review ?? "No review provided."}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}

export default ReviewSliderdo

