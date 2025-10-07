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
      <div className="text-4xl font-semibold text-center">
        Unlock the <Highlight text={"Power of Code"} />
      </div>

      <p className="text-center text-[#6e7983] text-base mt-3 text-[20px]">
        Learn to build anything you can imagine
      </p>

      {/* Tabs */}
      <div className="flex flex-row justify-center mt-6 gap-4 rounded-full bg-[#36383a] m-2 py-1">
        {tabName.map((element, index) => {
          return (
            <div
              key={index}
              className={`text-[16px] flex flex-row items-center gap-2 
                ${
                  currentTab === element
                    ? "bg-[#2d2e30] text-[#ced8e1] font-medium"
                    : "bg-richblack-200 text-[#7a8d9f]"
                } 
                rounded-full transition-all duration-200 cursor-pointer 
                hover:bg-[#36383a] hover:text-[#6e7983] px-7 py-2`}
              onClick={() => setMyCards(element)}
            >
              {element}
            </div>
          );
        })}
      </div>

      {/* Courses */}
      <div className="h-[170px]">
        <div className="flex gap-10 flex-row justify-center absolute right-[400px] ml-[350px]">
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





