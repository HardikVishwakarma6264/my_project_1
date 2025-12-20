

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createRating } from "../../../services/operations/coursedetailapi";
import RatingStars from "../Homepage/common/RatingStars";

const Coursereviewmodle = ({ setreviewmodal }) => {
  const { user, token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // ⭐️ NEW: local state for live star highlight
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setValue("courseexperience", "");
    setValue("courserating", 0);
  }, [setValue]);

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courserating,
        review: data.courseexperience,
      },
      token
    );
    setreviewmodal(false);
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);          // UI ke liye
    setValue("courserating", newRating); // form ke liye
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setreviewmodal(false)}
      />
      <div className="relative bg-gray-900 text-white rounded-2xl shadow-xl border border-richblack-600 w-full max-w-lg p-6 z-10">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-richblack-700 pb-3">
          <h2 className="text-lg font-semibold">Add Review</h2>
          <button
            onClick={() => setreviewmodal(false)}
            className="text-gray-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center mt-6 text-center">
          <img
            src={user?.image}
            alt="user"
            className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
          />
          <p className="mt-2 font-medium text-lg">
            {user?.firstname} {user?.lastname}
          </p>
          <p className="text-sm text-gray-400">Posting Publicly</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-5">
          <div className="flex justify-center">
            <RatingStars
              count={5}
              value={rating}           // 👈 current value pass karo
              onChange={ratingChanged} // 👈 click handler
              size={32}
              activeColor="#facc15"
            />
          </div>

          <div>
            <label htmlFor="courseexperience" className="block text-sm font-medium mb-2">
              Add your Experience
            </label>
            <textarea
              id="courseexperience"
              placeholder="Share your experience with this course..."
              {...register("courseexperience", { required: true })}
              className="w-full min-h-[120px] rounded-lg p-3 bg-richblack-800 text-black outline-none border border-richblack-600 focus:border-yellow-400 transition"
            />
            {errors.courseexperience && (
              <span className="text-red-400 text-sm">Please add your experience</span>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setreviewmodal(false)}
              className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Coursereviewmodle;

