// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import {resetCourseState, setStep} from "../../../../slices/courseSlice";
// import { COURSE_STATUS } from '../../../../utils/constants';
// import { useNavigate } from 'react-router-dom';
// import { editCourse } from '../../../../services/operations/coursedetailapi';


// const PublishCourse = () => {
//   const { register, handleSubmit, watch , setValue,getValues} = useForm();
//   const isPublic = watch('public'); // watch checkbox state
//   const { course } = useSelector((state) => state.course);
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   useEffect(()=>{
//     if(course?.status === COURSE_STATUS.PUBLISHER){
//       setValue("public",true);
//     }
//   },[]);

//   const goBack = () => {
//     dispatch(setStep(2));
//   };

//   const onSubmit = () => {
//     handlecoursepublish();
//   };

//   const gotocourses = () => {
//     dispatch(resetCourseState());
//     navigate("/dashboard/my-courses");
//   }


//   const handlecoursepublish=async()=>{
//     if(course?.status === COURSE_STATUS.PUBLISHER && getValues("public")=== true ||
//   (course.status === COURSE_STATUS.DRAFT && getValues("public")===false)
//   ){
//     gotocourses();
//     return;
//   }

//   const formdata=new FormData();
//   formdata.append("courseid",course._id);
//   const coursestatus=getValues("public") ? COURSE_STATUS.PUBLISHER : COURSE_STATUS.DRAFT;
//   formdata.append("status",coursestatus);

//   const result =await editCourse(formdata,token);
//   if(result){
//     gotocourses();
//   }


//   }

//   return (
//     <div className="rounded-2xl  bg-gray-800 p-6 space-y-6 w-[700px]">
//       <p className="text-[23px] font-semibold text-richblack-5">Publish Settings</p>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Checkbox Section */}
//         <div className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             id="public"
//             {...register("public")}
//             className="h-6 w-6 accent-yellow-50"
//           />
//           <label htmlFor="public" className="text-gray-400">
//             Make this course as public
//           </label>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end space-x-4">
//           <button
//             type="button"
//             onClick={goBack}
//             className="px-4 py-2 rounded-md bg-gray-600 text-richblack-200 hover:bg-richblack-600 transition"
//           >
//             Back
//           </button>

//           <button
//             type="submit"
//             disabled={!isPublic}
//             className={`px-4 py-2 rounded-md text-black font-medium transition
//               ${isPublic ? 'bg-yellow-500 hover:bg-yellow-300' : 'bg-yellow-500 cursor-not-allowed'}
//             `}
//           >
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PublishCourse;


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
    <div className="max-w-xl mx-auto rounded-2xl bg-gray-900 p-8 shadow-lg border">
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

