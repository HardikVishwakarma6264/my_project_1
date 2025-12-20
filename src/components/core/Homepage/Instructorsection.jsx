// import React from "react";
// import { FaArrowRight } from "react-icons/fa";
// import Highlight from "./Highlight"; // Update path
// import Button from "./Button"; // Update path
// import image from "../../../images/img_7.jpg"; // Update path

// const InstructorSection = () => {
//   return (
//     <div className="mt-12 w-full bg-richblack-900 flex flex-col md:flex-row items-center justify-center gap-6 px-6 md:px-20 py-16 ">
//       {/* Left Image Section */}
//       <div className="w-full md:w-[45%] flex justify-center  ml-[90px]">
//         <img
//           src={image}
//           alt="Instructor"
//           className="rounded-lg  w-[600px] h-[650px] object-cover shadow-[10px_5px_0px_0px_white]"
//         />
//       </div>

//       {/* Right Content Section */}
//       <div className="w-full md:w-[45%] flex flex-col gap-6 text-white ">
//         {/* Heading */}
//         <h2 className="text-4xl font-semibold">
//           Become an <br/><Highlight text="Instructor" />
//         </h2>

//         {/* Description */}
//         <p className="text-richblack-300 text-lg leading-relaxed">
//           Instructors from around the world teach millions of students on<br/>
//           HardikNotion. We provide the tools and skills to teach what you <br/> love.
//         </p>

//         {/* CTA Button */}
//         <div className="w-fit">
//           <Button active={true} linkTo="/signup">
//             <div className="flex items-center gap-2">
//               Start Learning Today
//               <FaArrowRight />
//             </div>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InstructorSection;


import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Highlight from "./Highlight"; // Update path
import Button from "./Button"; // Update path
import image from "../../../images/img_7.jpg"; // Update path

const InstructorSection = () => {
  return (
    <div className="mt-12 w-full bg-richblack-900 flex flex-col md:flex-row items-center justify-center gap-6 px-6 md:px-20 md:py-16">
      {/* Left Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={image}
          alt="Instructor"
          className="rounded-lg w-full max-w-[500px] object-cover shadow-[20px_20px_60px_rgba(255,255,255,0.25)]"
        />
      </div>

      {/* Right Content Section */}
      <div className="w-full md:w-1/2 flex flex-col gap-6 text-white text-center md:text-left">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-semibold">
          Become an <br />
          <Highlight text="Instructor" />
        </h2>

        {/* Description */}
        <p className="text-richblack-300 text-base sm:text-lg leading-relaxed">
          Instructors from around the world teach millions of students on <br/>HardikNotion. 
          We provide the tools and skills to teach what you<br/> love.
        </p>

        {/* CTA Button */}
        <div className="w-fit mx-auto md:mx-0">
          <Button active={true} linkTo="/signup">
            <div className="flex items-center gap-2">
              Start Learning Today
              <FaArrowRight />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;



