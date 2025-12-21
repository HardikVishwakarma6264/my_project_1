

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CiCirclePlus } from "react-icons/ci";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { setCourse, setStep } from "../../../../slices/courseSlice";
import { createsection, updatesection } from "../../../../services/operations/coursedetailapi";

import NestedView from "./NestedView";

const CourseBuilderForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [editsection, seteditsection] = useState(null);
  const [loading, setloading] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const canceledit = () => {
    seteditsection(null);
    setValue("sectionName", "");
  };

  const goback = () => {
    dispatch(setStep(1));
    seteditsection(null);
  };

  const gotonext = () => {
    if (!course?.coursecontent?.length) {
      toast.error("Please add at least one section");
      return;
    }
    if (course.coursecontent.some((s) => s.subsection.length === 0)) {
      toast.error("Please add at least one subsection in each section");
      return;
    }
    dispatch(setStep(3));
  };

  const onsubmit = async (data) => {
    setloading(true);
    let result;
    if (editsection) {
      result = await updatesection(
        { sectionname: data.sectionName, sectionid: editsection, courseid: course._id },
        token
      );
    } else {
      result = await createsection(
        { sectionname: data.sectionName, courseid: course._id },
        token
      );
    }
    if (result) {
      dispatch(setCourse(result));
      seteditsection(null);
      setValue("sectionName", "");
    }
    setloading(false);
  };

  const handlechangededitsectionname = (id, name) => {
    if (editsection === id) return canceledit();
    seteditsection(id);
    setValue("sectionName", name);
  };

  return (
    <div className="max-w-2xl mx-auto bg-richblack-800 md:p-8 p-2 rounded-lg border border-richblack-700 shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Course Builder</h2>

      <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">
        <div>
          <label htmlFor="sectionName" className="block mb-2 text-sm font-medium">
            Section Name <sup className="text-pink-300">*</sup>
          </label>
          <input
            id="sectionName"
            placeholder="Add section name"
            {...register("sectionName", { required: true })}
            className="w-full rounded-md border border-richblack-500 bg-richblack-900 p-3 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.sectionName && (
            <span className="text-red-400 text-sm">Section Name is required</span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 bg-yellow-500 text-richblack-900 rounded-md font-medium hover:bg-yellow-600 transition-all disabled:opacity-50"
          >
            {editsection ? "Update Section" : "Create Section"}
            <CiCirclePlus size={22} />
          </button>

          {editsection && (
            <button
              type="button"
              onClick={canceledit}
              className="text-sm text-gray-300 hover:text-white underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course?.coursecontent?.length > 0 && (
        <div className="mt-8">
          <NestedView handlechangededitsectionname={handlechangededitsectionname} />
        </div>
      )}

      <div className="flex justify-between mt-10">
        <button
          onClick={goback}
          className="rounded-md px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white"
        >
          Back
        </button>
        <button
          onClick={gotonext}
          className="flex items-center gap-2 px-5 py-2 bg-yellow-500 text-richblack-900 hover:bg-yellow-600 rounded-md font-medium transition-all"
        >
          Next <MdKeyboardArrowRight size={22} />
        </button>
      </div>
    </div>
  );
};

export default CourseBuilderForm;

