

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import avgRating from "../../utils/avgRating";
import Ratingstars from "../../components/core/Homepage/common/RatingStars";

const Course_Card = ({ course, height }) => {
  const [avgreviercount, setavgreviewcount] = useState(0);

  useEffect(() => {
    const count = avgRating(course.ratingandreview);
    setavgreviewcount(count);
  }, [course]);

  return (
    <div className="w-full max-w-[700px] mx-auto my-6 p-4">
      <Link to={`/courses/${course._id}`}>
        <div className=" md:flex-row gap-4">
          {/* Image */}
          <div className="flex-shrink-0 w-full md:w-[500px]">
            <img
              src={course?.thumbnail}
              alt="course ka img"
              className={`w-full h-auto rounded-2xl object-cover`}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between">
            <p className="text-xl md:text-2xl font-semibold">{course?.coursename}</p>
            <p className="text-lg md:text-xl text-white">
              By {course?.instructor?.firstname} {course?.instructor?.lastname}
            </p>

           
            <div className="flex items-center gap-3 mt-2">
  <span>{avgreviercount?.toFixed(1) || 0}</span>
  <Ratingstars value={avgreviercount} readOnly={true} />  {/* ⭐ ye change */}
  <span>{course?.ratingandreview?.length} Ratings</span>
</div>

            <p className="text-lg md:text-xl font-bold mt-2">Rs.{course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Course_Card;
