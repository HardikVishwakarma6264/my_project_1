



import React from "react";
import image_8 from "../../../images/img_8.png";
import image_9 from "../../../images/img_9.png";

const Coursecard = ({ carddata, currentCard, setCurrentCard }) => {
  const isActive = currentCard === carddata.heading;

  return (
    <div
      className={`w-full sm:w-[48%] lg:w-[30%] min-h-[280px] sm:min-h-[320px] lg:min-h-[350px] p-5 mt-5 rounded-xl shadow-lg border 
        ${isActive ? "bg-white shadow-[10px_6px_0px_0px_Black]" : "bg-black"}
        transition-all duration-300 cursor-pointer flex flex-col justify-between`}
      onClick={() => setCurrentCard(carddata.heading)}
    >
      {/* Top Section */}
      <div>
        <h3 className={`text-xl sm:text-2xl md:text-3xl font-semibold ${isActive ? "text-black" : "text-white"}`}>
          {carddata.heading}
        </h3>
        <p className={`text-sm sm:text-base md:text-lg mt-3 ${isActive ? "text-gray-700" : "text-richblack-300"}`}>
          {carddata.description}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex flex-row items-center">
          <img src={image_8} alt="icon" className="w-5 h-5 sm:w-6 sm:h-6 rounded-xl" />
          <span
            className={`text-xs sm:text-sm px-2 sm:px-3 ${isActive ? "text-blue-800" : "text-richblack-200"}`}
          >
            {carddata.level}
          </span>
        </div>

        <div className="flex flex-row items-center">
          <img src={image_9} alt="icon" className="w-5 h-5 sm:w-6 sm:h-6 rounded-xl" />
          <span
            className={`text-xs sm:text-sm px-2 sm:px-4 ${isActive ? "text-blue-800" : "text-richblack-200"}`}
          >
            {carddata.lessionNumber} Lessons
          </span>
        </div>
      </div>
    </div>
  );
};

export default Coursecard;


