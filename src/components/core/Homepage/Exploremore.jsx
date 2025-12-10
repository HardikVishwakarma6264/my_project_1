import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import Highlight from "./Highlight";
import Coursecard from "./Coursecard";

const tabName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div>
      <div className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center leading-snug">
  Unlock the <Highlight text={"Power of Code"} />
</div>


      <p className="text-center text-[#6e7983] 
      text-base sm:text-lg md:text-xl lg:text-2xl
      mt-3 text-[20px]">
        Learn to build anything you can imagine
      </p>

      {/* Tabs */}
     <div className="flex flex-wrap sm:flex-row justify-center mt-6 gap-3 sm:gap-4 rounded-full bg-[#36383a] m-2 py-2 px-3 overflow-x-auto">
  {tabName.map((element, index) => {
    return (
      <div
        key={index}
        className={`text-sm sm:text-[16px]
          flex items-center gap-2 whitespace-nowrap
          ${
            currentTab === element
              ? "bg-[#595c63] text-[#eaedef] font-medium"
              : "bg-richblack-200 text-[#9da3a8]"
          }
          rounded-full transition-all duration-200 cursor-pointer 
          hover:bg-[#36383a] hover:text-[#e3e6e9] px-5 sm:px-7 py-2`}
        onClick={() => setMyCards(element)}
      >
        {element}
      </div>
    );
  })}
</div>


      {/* Courses */}
      <div className="h-[170px]">
        <div className="flex gap-10  justify-center absolute right-[400px] ml-[350px]">
          {courses.map((element, index) => (
            <Coursecard
              key={index}
              carddata={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          ))}
        </div>
      </div>




    </div>
  );
};

export default ExploreMore;

// flex flex-col lg:flex-row gap-5 lg:gap-8 justify-center mx-auto max-w-6xl px-4 items-stretch




