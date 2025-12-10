import React from "react";
import image_8 from "../../../images/img_8.png";
import image_9 from "../../../images/img_9.png";

const Coursecard = ({ carddata, currentCard, setCurrentCard }) => {
  const isActive = currentCard === carddata.heading;

  return (
    <div
      // Mobile: full width. Laptop (lg): about 30% width for 3 cards in a row.
      // Removed fixed sm/lg width classes as the parent will control layout.
      className={`w-full lg:w-[30%] min-h-[350px] p-5 mt-5 rounded-xl shadow-lg border 
        ${isActive 
          ? "bg-white shadow-[10px_6px_0px_0px_Black]" 
          : "bg-black border-richblack-800"} 
        transition-all duration-300 cursor-pointer flex flex-col justify-between`}
      onClick={() => setCurrentCard(carddata.heading)}
    >
      {/* Top Section */}
      <div>
        <h3 className={`text-2xl font-semibold ${isActive ? "text-black" : "text-white"}`}>
          {carddata.heading}
        </h3>
        <p className={`text-base mt-3 ${isActive ? "text-gray-700" : "text-richblack-300"}`}>
          {carddata.description}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-dashed border-richblack-500">
        <div className="flex flex-row items-center">
          <img src={image_8} alt="icon" className="w-5 h-5 rounded-xl" />
          <span
            className={`text-sm px-2 ${isActive ? "text-blue-800" : "text-richblack-200"}`}
          >
            {carddata.level}
          </span>
        </div>

        <div className="flex flex-row items-center">
          <img src={image_9} alt="icon" className="w-5 h-5 rounded-xl" />
          <span
            className={`text-sm px-2 ${isActive ? "text-blue-800" : "text-richblack-200"}`}
          >
            {carddata.lessionNumber} Lessons
          </span>
        </div>
      </div>
    </div>
  );
};

export default Coursecard;