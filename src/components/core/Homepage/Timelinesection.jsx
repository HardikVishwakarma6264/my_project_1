


import React from "react";
import Logo1 from "../../../images/img_1.jpg";
import Logo2 from "../../../images/img_2.png";
import Logo3 from "../../../images/img_3.png";
import Logo4 from "../../../images/img_4.png";
import timelineimage from "../../../images/img_5.jpg";

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo4,
    heading: "Solve the problem",
    Description: "Fully committed to the success company",
  },
];

const Timelinesection = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-12 items-center w-[90%] max-w-7xl mx-auto py-12">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col gap-10 relative">
        {timeline.map((element, index) => (
          <div className="flex flex-row gap-6 relative" key={index}>
            {/* Dotted line */}
            {index !== timeline.length - 1 && (
              <span className="absolute left-[25px] top-[50px] w-0 h-[80px] border-l-2 border-dotted border-gray-400"></span>
            )}

            {/* Icon */}
            <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full shadow-md z-10">
              <img src={element.Logo} alt="logo" className="w-6 h-6" />
            </div>

            {/* Text */}
            <div>
              <h2 className="font-semibold text-lg sm:text-xl">{element.heading}</h2>
              <p className="text-sm sm:text-base text-gray-600">{element.Description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Section */}
      <div className="relative w-full lg:w-1/2 flex justify-center">
        {/* <img
          src={timelineimage}
          alt="timeline"
          className="rounded-lg shadow-xl w-full max-h-[500px] object-cover"
        /> */}
        <img
  src={timelineimage}
  alt="timeline"
  className="
    rounded-lg 
    w-full max-h-[500px] object-cover
    shadow-[-10px_-10px_30px_0_rgba(59,130,246,0.5)]
  "
/>


        {/* Overlay */}
        <div className="absolute bg-gray-800 flex flex-col sm:flex-row justify-between text-white uppercase py-5 px-6 sm:py-7 sm:px-10 left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 rounded-lg shadow-md w-[90%] max-w-[400px]">
          {/* Box 1 */}
          <div className="flex flex-row gap-4 items-center sm:border-r border-gray-600 pr-6 mb-4 sm:mb-0">
            <p className="text-3xl font-bold">0</p>
            <p className="text-green-300 text-sm leading-tight">
              Years of Experience
            </p>
          </div>

          {/* Box 2 */}
          <div className="flex flex-row gap-4 items-center pl-0 sm:pl-6">
            <p className="text-3xl font-bold">0</p>
            <p className="text-green-300 text-sm leading-tight">
              Type of Courses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timelinesection;




