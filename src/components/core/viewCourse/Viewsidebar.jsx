


// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { IoArrowBackOutline } from "react-icons/io5";
// import { FaChevronDown } from "react-icons/fa";

// const Viewsidebar = ({ setreviewmodal }) => {
//   const [activestate, setactivestate] = useState("");
//   const [videobaractive, setvideobaraactive] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { sectionId, subsectionId } = useParams();

//   const {
//     courseSectionData,
//     courseEntireData,
//     completedLectures,
//   } = useSelector((state) => state.viewCourse);

//  useEffect(() => {
//   const setactiveflag = () => {
//     if (!courseSectionData.length) return;

//     const currentsectionindex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );

//     const currentsubsectionindex =
//       courseSectionData[currentsectionindex]?.subsection.findIndex(
//         (data) => data._id === subsectionId
//       );

//     const activesubsectionid =
//       courseSectionData[currentsectionindex]?.subsection?.[currentsubsectionindex]?._id;

//     setactivestate(courseSectionData[currentsectionindex]?._id);
//     setvideobaraactive(activesubsectionid);
//   };

//   setactiveflag();
// }, [courseSectionData, sectionId, subsectionId]);




//   return (
//     <div className="w-[280px] h-screen bg-richblack-800 text-white flex flex-col">
//       {/* Header */}
//       <div className="flex items-center justify-between px-4 py-3 border-b border-richblack-700">
//         <button
//           onClick={() => navigate("/dashboard/enrolled-courses")}
//           className="text-lg hover:text-yellow-400 transition"
//         >
//           <IoArrowBackOutline size={22} />
//         </button>
//         <button
//           onClick={() => setreviewmodal(true)}
//           className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition"
//         >
//           Add Review
//         </button>
//       </div>

//       {/* Course Info */}
//       <div className="px-4 py-3 border-b border-richblack-700">
//         <p className="font-semibold text-lg">
//           {courseEntireData?.coursename}
//         </p>
//         <p className="text-xs mt-1 text-gray-500">
//           {completedLectures?.length} Lectures Completed
//         </p>
//       </div>

//       {/* Sections */}
//       <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-richblack-600 scrollbar-track-richblack-800">
//         {courseSectionData.map((course, index) => (
//           <div key={index} className="border-b border-richblack-700">
//             {/* Section Header */}
//             <div
//               onClick={() =>
//                 setactivestate(
//                   activestate === course?._id ? "" : course?._id
//                 )
//               }
//               className={`flex justify-between items-center px-4 py-3 cursor-pointer text-sm font-medium ${
//                 activestate === course?._id
//                   ? "bg-richblack-700 text-yellow-400"
//                   : "hover:bg-richblack-700"
//               }`}
//             >
//               <span>{course?.sectionname}</span>
//               {/* Icon with rotation */}
//               <FaChevronDown
//                 className={`text-xs transform transition-transform duration-300 ${
//                   activestate === course?._id ? "rotate-180" : "rotate-0"
//                 }`}
//               />
//             </div>

//             {/* Subsections */}
//             {activestate === course?._id && (
//               <div className="bg-richblack-900">
                
//                 {course.subsection.map((topic, idx) => (
//   <div
//     key={idx}
//     onClick={() => {
//       navigate(
//         `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
//       );
//       setvideobaraactive(topic?._id);
//     }}
//     className={`flex items-center gap-3 px-6 py-3 cursor-pointer text-sm transition ${
//       videobaractive === topic._id
//         ? "bg-yellow-400 text-black font-semibold"
//         : "hover:bg-richblack-700"
//     }`}
//   >
    
//     <input
//   type="checkbox"
//   checked={completedLectures.some(
//     (id) => id.toString() === topic?._id?.toString()
//   )}
//   readOnly
//   className="
//     white            
//     h-5 w-5                      
//     rounded-md                    
//     border-2 border-gray-300      
//     bg-gray-900                  
//     transition-all duration-200   
//     hover:border-yellow-400       
//     focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1
//     cursor-pointer
//   "
// />

//     <p>{topic.title}</p>
//   </div>
// ))}

//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Viewsidebar;


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";

const Viewsidebar = ({ setreviewmodal, closeSidebar }) => {
  const [activestate, setactivestate] = useState("");
  const [videobaractive, setvideobaraactive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subsectionId } = useParams();

  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  useEffect(() => {
    if (!courseSectionData.length) return;

    const currentsectionindex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentsubsectionindex =
      courseSectionData[currentsectionindex]?.subsection.findIndex(
        (data) => data._id === subsectionId
      );
    const activesubsectionid =
      courseSectionData[currentsectionindex]?.subsection?.[currentsubsectionindex]?._id;

    setactivestate(courseSectionData[currentsectionindex]?._id);
    setvideobaraactive(activesubsectionid);
  }, [courseSectionData, sectionId, subsectionId]);

  return (
    <div
      className="
        w-64 md:w-[280px] h-full md:h-screen
        bg-richblack-800 text-white flex flex-col
        shadow-lg
      "
    >
      {/* Mobile Close button */}
      <div className="md:hidden flex justify-end p-2">
        <button
          onClick={closeSidebar}
          className="text-yellow-400 text-2xl hover:text-yellow-300"
        >
          ✕
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-richblack-700">
        <button
          onClick={() => navigate("/dashboard/enrolled-courses")}
          className="text-lg hover:text-yellow-400 transition"
        >
          <IoArrowBackOutline size={22} />
        </button>
        <button
          onClick={() => setreviewmodal(true)}
          className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition"
        >
          Add Review
        </button>
      </div>

      {/* Course Info */}
      <div className="px-4 py-3 border-b border-richblack-700">
        <p className="font-semibold text-lg">
          {courseEntireData?.coursename}
        </p>
        <p className="text-xs mt-1 text-gray-400">
          {completedLectures?.length} Lectures Completed
        </p>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-richblack-600 scrollbar-track-richblack-800">
        {courseSectionData.map((course) => (
          <div key={course._id} className="border-b border-richblack-700">
            {/* Section Header */}
            <div
              onClick={() =>
                setactivestate(
                  activestate === course?._id ? "" : course?._id
                )
              }
              className={`flex justify-between items-center px-4 py-3 cursor-pointer text-sm font-medium ${
                activestate === course?._id
                  ? "bg-richblack-700 text-yellow-400"
                  : "hover:bg-richblack-700"
              }`}
            >
              <span>{course?.sectionname}</span>
              <FaChevronDown
                className={`text-xs transform transition-transform duration-300 ${
                  activestate === course?._id ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            {/* Subsections */}
            {activestate === course?._id && (
              <div className="bg-richblack-900">
                {course.subsection.map((topic) => (
                  <div
                    key={topic._id}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                      );
                      setvideobaraactive(topic?._id);
                      closeSidebar?.(); // close on mobile tap
                    }}
                    className={`flex items-center gap-3 px-6 py-3 cursor-pointer text-sm transition ${
                      videobaractive === topic._id
                        ? "bg-yellow-400 text-black font-semibold"
                        : "hover:bg-richblack-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.some(
                        (id) => id.toString() === topic?._id?.toString()
                      )}
                      readOnly
                      className="h-5 w-5 rounded-md border-2 border-gray-300 bg-gray-900 transition-all duration-200 hover:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 cursor-pointer"
                    />
                    <p>{topic.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Viewsidebar;
