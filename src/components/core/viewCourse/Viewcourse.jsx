

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Outlet, useParams, useNavigate } from "react-router-dom";
// import {
//   setCompletedLectures,
//   setCourseSectionData,
//   setEntireCourseData,
//   setTotalNoOfLectures,
// } from "../../../slices/viewCourseSlice";
// import { getfulldetailofcourse } from "../../../services/operations/coursedetailapi";

// import Viewsidebar from "./Viewsidebar";
// import Coursereviewmodle from "./Coursereviewmodle";

// const Viewcourse = () => {
//   const [reviewmodal, setreviewmodal] = useState(false);
//   const { courseId } = useParams();
//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const setcoursespecificdata = async () => {
//       try {
//         const coursedata = await getfulldetailofcourse(courseId, token);
//         console.log("mata mat ka data dekh->",coursedata);
//         if (!coursedata || !coursedata.courseDetails) return;

//         const sectionData = coursedata.courseDetails.coursecontent || [];
//         dispatch(setCourseSectionData(sectionData));
//         dispatch(setEntireCourseData(coursedata.courseDetails));
//         dispatch(setCompletedLectures(coursedata.completedVideos
//  || []));
//         console.log("raw completevideo from API:", coursedata.completedVideos);


//         let lectureCount = 0;
//         sectionData.forEach((sec) => {
//           lectureCount += sec?.subsection?.length || 0;
//         });
//         dispatch(setTotalNoOfLectures(lectureCount));

//         // ✅ Only navigate if not already in a sub-section
//         const url = window.location.pathname;
//         if (
//           !url.includes("/section/") &&
//           sectionData.length > 0 &&
//           sectionData[0].subsection?.length > 0
//         ) {
//           navigate(
//             `/view-course/${coursedata.courseDetails._id}/section/${sectionData[0]._id}/sub-section/${sectionData[0].subsection[0]._id}`
//           );
//         }
//       } catch (err) {
//         console.error("Error fetching course data:", err);
//       }
//     };

//     setcoursespecificdata();
//   }, [courseId, token, dispatch, navigate]);

//   return (
//     <>
//       <div className="flex w-full min-h-screen">
//         {/* Sidebar */}
        
//           <Viewsidebar setreviewmodal={setreviewmodal} />
       

//         {/* Video / Content Area */}
//         <div className="flex-1 bg-[#121212] p-4">
//           <Outlet />
//         </div>
//       </div>

//       {/* Review Modal */}
//       {reviewmodal && <Coursereviewmodle setreviewmodal={setreviewmodal} />}
//     </>
//   );
// };

// export default Viewcourse;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../../../slices/viewCourseSlice";
import { getfulldetailofcourse } from "../../../services/operations/coursedetailapi";

import Viewsidebar from "./Viewsidebar";
import Coursereviewmodle from "./Coursereviewmodle";

const Viewcourse = () => {
  const [reviewmodal, setreviewmodal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // 👈 new
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const setcoursespecificdata = async () => {
      const coursedata = await getfulldetailofcourse(courseId, token);
      if (!coursedata?.courseDetails) return;

      const sectionData = coursedata.courseDetails.coursecontent || [];
      dispatch(setCourseSectionData(sectionData));
      dispatch(setEntireCourseData(coursedata.courseDetails));
      dispatch(setCompletedLectures(coursedata.completedVideos || []));

      let lectureCount = 0;
      sectionData.forEach((sec) => (lectureCount += sec?.subsection?.length || 0));
      dispatch(setTotalNoOfLectures(lectureCount));

      const url = window.location.pathname;
      if (
        !url.includes("/section/") &&
        sectionData.length &&
        sectionData[0].subsection?.length
      ) {
        navigate(
          `/view-course/${coursedata.courseDetails._id}/section/${sectionData[0]._id}/sub-section/${sectionData[0].subsection[0]._id}`
        );
      }
    };
    setcoursespecificdata();
  }, [courseId, token, dispatch, navigate]);

  return (
    <>
      <div className="flex min-h-screen bg-[#121212]">
        {/* Mobile Hamburger */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden absolute top-[70px] left-5 z-20 p-2 bg-yellow-400 rounded"
        >
          ☰
        </button>

        {/* Sidebar */}
        <div
          className={`
            fixed md:static z-30 h-full bg-gray-950
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            w-64
          `}
        >
          <Viewsidebar setreviewmodal={setreviewmodal} closeSidebar={() => setSidebarOpen(false)} />
        </div>

        {/* Video / Content */}
        <div className="flex-1 min-w-0 p-5">
          <Outlet />
        </div>
      </div>

      {reviewmodal && <Coursereviewmodle setreviewmodal={setreviewmodal} />}
    </>
  );
};

export default Viewcourse;

