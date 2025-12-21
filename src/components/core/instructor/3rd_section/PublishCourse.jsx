


import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetCourseState, setStep } from "../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { editCourse } from "../../../../services/operations/coursedetailapi";

const PublishCourse = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
  } = useForm();
  const isPublic = watch("public");

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHER) {
      setValue("public", true);
    }
  }, [course, setValue]);

  const goBack = () => dispatch(setStep(2));

  const gotoCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const handleCoursePublish = async () => {
    // If nothing changed, just exit
    if (
      (course?.status === COURSE_STATUS.PUBLISHER && getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      gotoCourses();
      return;
    }

    const formData = new FormData();
    formData.append("courseid", course._id);
    formData.append(
      "status",
      getValues("public") ? COURSE_STATUS.PUBLISHER : COURSE_STATUS.DRAFT
    );

    const result = await editCourse(formData, token);
    if (result) gotoCourses();
  };

  const onSubmit = () => handleCoursePublish();

  return (
    <div className="max-w-xl mx-auto rounded-2xl bg-gray-900 md:p-8 p-2 shadow-lg border">
      <h2 className="text-2xl font-semibold text-white mb-6">Publish Settings</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Public checkbox */}
        <div className="flex items-center gap-3">
          <input
            id="public"
            type="checkbox"
            {...register("public")}
            className="h-5 w-5 rounded border border-gray-400 bg-richblack-900 text-yellow-400 focus:ring-yellow-400"
          />
          <label htmlFor="public" className="text-gray-300">
            Make this course public
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={goBack}
            className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-500 transition"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={!isPublic}
            className={`px-4 py-2 rounded-md font-medium text-black transition 
              ${isPublic ? "bg-yellow-500 hover:bg-yellow-400" : "bg-yellow-500 opacity-60 cursor-not-allowed"}
            `}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;

