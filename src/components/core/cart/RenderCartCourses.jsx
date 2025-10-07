// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { removeFromCart } from "../../../slices/cartSlice";
// import RatingStars from "../Homepage/common/RatingStars";
// import { FaStar } from "react-icons/fa";
// import avgRating from "../../../utils/avgRating";

// const RenderCartCourses = () => {
//   const { cart } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   return (
//     <div className="space-y-6">
//       {cart.map((course) => (
//         <div
//           key={course._id}
//           className="flex items-start gap-4 bg-gray-900 rounded-lg p-4 shadow-md"
//         >
//           <img
//             src={course?.thumbnail}
//             alt={course?.courseName}
//             className="w-28 h-20 object-cover rounded-md"
//           />

//           <div className="flex-1">
//             <p className="text-lg font-semibold">{course?.courseName}</p>
//             <p className="text-gray-400 text-sm">{course?.category?.name}</p>

            

// <div className="flex items-center gap-2 mt-2">
//   {(() => {
//     const average = avgRating(course?.ratingandreview);

//     return (
//       <>
//         <span className="text-yellow-400 font-semibold">
//           {average?.toFixed(1) || 0}
//         </span>
//         <RatingStars
//           count={5}
//           size={20}
//           edit={false}
//           isHalf={true}
//           activeColor="#FFD700"
//           value={average || 0}
//         />
//         <span className="text-gray-400 text-sm">
//           ({course?.ratingandreview?.length || 0} Reviews)
//         </span>
//       </>
//     );
//   })()}
// </div>




//             <div className="flex items-center justify-between mt-4">
//               <button
//                 onClick={() => dispatch(removeFromCart(course._id))}
//                 className="text-pink-500 hover:text-pink-600 font-semibold flex items-center gap-1"
//               >
//                 <span>Remove</span>
//               </button>

//               <p className="text-yellow-400 font-bold text-lg">
//                 Rs. {course?.price}
//               </p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RenderCartCourses;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../../slices/cartSlice";
import RatingStars from "../Homepage/common/RatingStars";
import avgRating from "../../../utils/avgRating";

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="space-y-6">
      {cart.map((course) => {
        const average = avgRating(course?.ratingandreview);
        return (
          <div
            key={course._id}
            className="
              flex flex-col sm:flex-row
              items-start sm:items-center
              gap-4 bg-gray-900 rounded-lg p-4 shadow-md
            "
          >
            {/* Thumbnail */}
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="w-full sm:w-28 h-40 sm:h-20 object-cover rounded-md"
            />

            {/* Details */}
            <div className="flex-1 w-full">
              <p className="text-lg font-semibold break-words">
                {course?.courseName}
              </p>
              <p className="text-gray-400 text-sm">{course?.category?.name}</p>

              {/* Rating */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-yellow-400 font-semibold">
                  {average?.toFixed(1) || 0}
                </span>
                <RatingStars
                  count={5}
                  size={18}
                  edit={false}
                  isHalf
                  activeColor="#FFD700"
                  value={average || 0}
                />
                <span className="text-gray-400 text-sm">
                  ({course?.ratingandreview?.length || 0} Reviews)
                </span>
              </div>

              {/* Bottom Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-3">
                <button
                  onClick={() => dispatch(removeFromCart(course._id))}
                  className="text-pink-500 hover:text-pink-600 font-semibold"
                >
                  Remove
                </button>
                <p className="text-yellow-400 font-bold text-lg">
                  ₹ {course?.price}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RenderCartCourses;

