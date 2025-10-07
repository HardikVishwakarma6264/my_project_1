

import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Highlight from "../components/core/Homepage/Highlight";
import Ctabutton from "../components/core/Homepage/Button";
import video_1 from "../images/video_1.mp4";
import Codeblocks from "../components/core/Homepage/Codeblocks";
import Timelinesection from "../components/core/Homepage/Timelinesection";
import Learninglanguagesection from "../components/core/Homepage/Learninglanguagesection";
import Instructorsection from "../components/core/Homepage/Instructorsection";
import Exploremore from "../components/core/Homepage/Exploremore";
import Footer from "../components/core/Homepage/Footer";

const Home = () => {
  return (
    <div>
      {/* section_1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white">  
        
        {/* Become Instructor Button */}
        <Link to="/signup">
          <div
            className="group mt-2 p-1 mx-auto rounded-full bg-[#272626] font-bold 
               transition-all duration-200 hover:scale-95 w-fit"
          >
            <div className="relative flex flex-row items-center gap-3 rounded-full px-1 py-[2px] text-[#6e7983] bg-[#0f0f0f] overflow-hidden">
              {/* Rotating Gradient Border */}
              <span className="absolute inset-0 rounded-full p-[5px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-spin-slow"></span>

              {/* Button Content */}
              <div className="relative flex items-center gap-2 rounded-full bg-[#0f0f0f] px-6 sm:px-10 py-[5px] text-sm sm:text-base">
                <p>Become an Instructor</p>
                <FaArrowRight />
              </div>
            </div>
          </div>
        </Link>

        {/* Heading */}
        <div className="text-center text-2xl sm:text-4xl font-semibold mt-4 px-4">
          Empower Your Future with
          <Highlight text={"Coding Skills"} />
        </div>

        {/* Subheading */}
        <div className="mt-4 w-[90%] sm:w-[70%] md:w-[50%] text-center text-sm sm:text-lg font-bold text-[#6e7983]">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and take our resources, including hands-on
          projects, quizzes, and personalized feedback from instructors.
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8">
          <Ctabutton active={true} linkto={"/signup"}>
            Learn More
          </Ctabutton>

          <Ctabutton active={false} linkto={"/signup"}>
            Book a Demo
          </Ctabutton>
        </div>

        {/* Video Section with Glow */}
        <div className="relative inline-block my-11 mx-3 w-full max-w-[1050px]">
          {/* Blurred Circle Glow at Top Center */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 sm:w-64 h-40 sm:h-64 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 blur-3xl opacity-50"></div>

          {/* Video Container with Soft Shadow */}
          <div className="relative rounded-md shadow-[20px_20px_60px_rgba(255,255,255,0.25)]">
            <video
              muted
              loop
              autoPlay
              className="w-full h-auto rounded-md object-cover"
            >
              <source src={video_1} type="video/mp4" />
            </video>
          </div>
        </div>
        

        {/* Codeblocks Section */}
       <div className="w-full">
  <Codeblocks
    position={"lg:flex-row"}
    heading={
      <div className="text-2xl sm:text-4xl font-semibold">
        Unlock Your
        <Highlight text={"coding potential"} />
        <br /> with our online courses
      </div>
    }
    subheading={`Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.`}
    ctabtn1={{
      btntext: "Try it yourself",
      linkto: "/signup",
      active: true,
    }}
    ctabtn2={{
      btntext: "Learn more",
      linkto: "/login",
      active: false,
    }}
    codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<title>HardikNotion</title>\n<link rel="style" href="style.css">\n</head>\n<meta charset="UTF-8">\n<p>HardikNotion</p>\n<h1>Empower Your Futhure</h1>\n</body>`}
    codecolor={"text-white"}     // 👈 code text white
    circlecolor={"bg-yellow-300"} // 👈 circle yellow
  />
</div>




<div className="w-full gap-11">
  <Codeblocks
    position={"lg:flex-row-reverse"}
    heading={
      <div className="text-2xl sm:text-4xl font-semibold">
        Start
        <br />
        <Highlight text={"coding in seconds"} />
      </div>
    }
    subheading={
      "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
    }
    ctabtn1={{
      btntext: "Continue Lesson",
      linkto: "/signup",
      active: true,
    }}
    ctabtn2={{
      btntext: "Learn more",
      linkto: "/login",
      active: false,
    }}
    codeblock={`import React from "react"\nimport abo_1 from "../images/abo_1.jpg";\nimport Abovequote from "../Abovequote"\nfunction App() {\nconst { user }=(state) => state.auth)\nreturn (\n<div className="flex-col font-inter">\n<Navbar />\n<Routes>\n<Route path="/" element={<Home />} />\n<Route path="/login"element={<Login />}/>`}
    codecolor={"text-white"}    // 👈 code text white
    circlecolor={"bg-pink-300"}  // 👈 circle pink
  />
</div>


        <Exploremore />
      </div>

      {/* section_2 */}
      <div className="bg-white text-black mt-4">
        <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between mx-auto gap-10">
          {/* Top Empty Spacer */}
          <div className="h-[100px] sm:h-[180px]"></div>

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 text-white">
            <Ctabutton active={true} linkto={"/signup"}>
              <div className="flex items-center gap-3">
                Explore Full Catalog
                <FaArrowRight />
              </div>
            </Ctabutton>

            <Ctabutton active={false} linkto={"/signup"}>
              <div>Learn more</div>
            </Ctabutton>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex flex-col lg:flex-row gap-5 mb-10 mt-[50px] lg:mt-[95px] justify-evenly">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold w-full lg:w-[35%] text-center lg:text-left">
              Get the Skills you need for a{" "}
              <Highlight text={"Job that is in demand"} />
            </div>

            <div className="flex flex-col gap-6 w-full lg:w-[35%] items-center lg:items-start text-center lg:text-left">
              <div className="text-sm sm:text-base">
                The modern HardikNotion dictates its own terms. Today, to be a competitive
                specialist requires more than professional skills.
              </div>

              <Ctabutton active={true} linkto={"/signup"}>
                <div>Learn more</div>
              </Ctabutton>
            </div>
          </div>

          <Timelinesection />
          <Learninglanguagesection />
        </div>
      </div>

      <Instructorsection />
      <Footer />
    </div>
  );
};

export default Home;

