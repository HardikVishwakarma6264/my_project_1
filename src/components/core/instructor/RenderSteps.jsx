


import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from "./CourseInformationForm";
import CourseBuilderForm from "./2nd_section/CourseBuilderForm";
import PublishCourse from "./3rd_section/PublishCourse";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ];

  return (
    <>
      {/* Steps Bar */}
      <div className="flex justify-between items-center mb-10 relative max-w-3xl mx-auto">
        {steps.map((item, index) => (
          <div key={item.id} className="flex flex-col items-center w-full">
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full border-2 font-semibold
                ${
                  step === item.id
                    ? "border-yellow-400 text-yellow-400 bg-transparent"
                    : step > item.id
                    ? "border-yellow-500 text-black"
                    : "border-richblack-600 text-richblack-400"
                }`}
            >
              {step > item.id ? <FaCheck className="text-yellow-300" /> : item.id}
            </div>
            <span
              className={`mt-2 text-sm ${
                step === item.id ? "text-white font-medium" : "text-richblack-400"
              }`}
            >
              {item.title}
            </span>
            {index !== steps.length - 1 && (
              <div
                className="absolute top-6 w-1/4 border-t-2 border-dashed border-richblack-600"
                style={{ left: `${(index + 1) * 33.3 - 13}%` }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Render the current step form */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
};

export default RenderSteps;
