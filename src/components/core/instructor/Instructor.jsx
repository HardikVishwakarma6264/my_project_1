

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { instructordashboard } from "../../../services/operations/coursedetailapi";
// import { apiconnector } from "../../../services/apiconnector";
// import { instructorcourse } from "../../../services/apis";
// import { Link, useNavigate } from "react-router-dom";
// import Instructorchart from "./Instructorchart";
// import RatingStars from "../Homepage/common/RatingStars";
// import GetAvgRating from "../../../utils/avgRating";

// const Instructor = () => {
//   const [instructordata, setinstructordata] = useState([]);
//   const [courses, setcourses] = useState([]);
//   const { token, user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getcoursedata = async () => {
//       const dashboard = await instructordashboard(token);
//       const res = await apiconnector(
//         "GET",
//         instructorcourse.INSTRUCTOR_COURSE,
//         null,
//         { Authorization: `Bearer ${token}` }
//       );
//       if (Array.isArray(dashboard)) setinstructordata(dashboard);
//       if (res?.data?.data) setcourses(res.data.data);
//     };
//     getcoursedata();
//   }, [token]);

//   const totalAmount = instructordata.reduce(
//     (a, c) => a + (c.totalamountgernerated || 0),
//     0
//   );
//   const totalStudents = instructordata.reduce(
//     (a, c) => a + (c.totalstudentenrolled || 0),
//     0
//   );

  


//   // ---------- Empty state ----------
//   if (courses.length === 0) {
//     return (
//       <div className="flex min-h-screen flex-col items-center justify-center bg-[#0e0e0e] text-white">
//         <h1 className="mb-3 text-2xl font-semibold">Hi {user?.firstname} 👋</h1>
//         <p className="mb-6 text-gray-400">
//           You haven’t created any course yet.
//         </p>
//         <button
//           onClick={() => navigate("/dashboard/add-course")}
//           className="rounded-lg bg-yellow-400 px-6 py-2 font-semibold text-black hover:bg-yellow-300"
//         >
//           Create Course
//         </button>
//       </div>
//     );
//   }

//   // ---------- Main Dashboard ----------
//   return (
//     <div className="min-h-screen bg-[#0e0e0e] px-6 py-8 text-white">
//       {/* Greeting */}
//       <div className="mb-8 ml-[250px]">
//         <h1 className="text-3xl font-semibold">
//           Hi {user?.firstname} <span className="ml-1">👋</span>
//         </h1>
//         <p className="text-gray-400">Let's start something new</p>
//       </div>

//       {/* === Top section: Chart & Stats side-by-side === */}
//       <div className="mb-10 gap-11 flex flex-row items-center justify-center">
//         {/* Chart */}
//         <div className="rounded-2xl bg-gray-950 p-6 shadow">
//           <Instructorchart courses={instructordata} width={800} height={400} />
//         </div>

//         {/* Stats */}
//         <div className="rounded-2xl bg-gray-950 p-6 shadow flex flex-col h-[540px] w-[300px] items-center">
//           <h3 className="mb-4 font-medium text-4xl text-gray-200">
//             Statistics
//           </h3>
//           <div className="space-y-3 text-gray-300">
//             <div className="flex flex-col">
//               <span className="mt-5 text-2xl">Total Courses </span>
//               <span className="font-semibold text-white text-3xl mt-1 ml-[50px] ">
//                 {courses.length}
//               </span>
//             </div>
//             <div className="flex flex-col">
//               <span className="mt-5 text-2xl">Total Students</span>
//               <span className="font-semibold text-white text-3xl mt-1 ml-[50px] ">
//                 {totalStudents}
//               </span>
//             </div>
//             <div className="flex flex-col">
//               <span className="mt-5 text-2xl">Total Income</span>
//               <span className="font-semibold text-white text-3xl mt-1 ml-3 ">
//                 ₹{totalAmount.toLocaleString()}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* === Your Courses === */}
//       <div className="rounded-2xl bg-gray-950 p-6 shadow h-[400px] w-[1180px] ml-[250px]">
//         <div className="mb-6 flex items-center justify-between">
//           <p className="text-lg font-medium text-gray-200">Your Courses</p>
//           <Link
//             to="/dashboard/my-courses"
//             className="text-sm font-semibold text-yellow-400 hover:underline"
//           >
//             View All
//           </Link>
//         </div>

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {courses.slice(0, 3).map((course) => {
//              console.log("Course reviews:", course?.ratingandreview);
//             const avgReviewCount = GetAvgRating(course?.ratingandreview || []);
           

//             return (
//               <div
//                 key={course._id}
//                 className="overflow-hidden rounded-xl bg-[#262626] shadow hover:shadow-lg transition"
//               >
//                 <img
//                   src={course.thumbnail}
//                   alt={course.coursename}
//                   className="h-60 w-full object-cover"
//                 />
//                 <div className="p-4">
//                   <p className="mb-2 text-xl font-bold">{course.coursename}</p>

//                   {/* ⭐ Ratings & Reviews */}
//                   <div className="flex items-center gap-2 mb-2">
//   <span className="text-yellow-400 font-bold">
//     {avgReviewCount?.toFixed(1) || "0.0"}
//   </span>
//   <RatingStars value={avgReviewCount} readOnly={true} size={18} />
//   <span className="text-gray-400 text-sm">
//     ({course?.ratingandreview?.length || 0} reviews)
//   </span>
// </div>


//                   {/* 👥 Students & 💰 Price */}
//                   <div className="flex items-center text-base text-gray-300">
//                     <span>{course.studentenrolled.length} Students</span>
//                     <span className="mx-3">|</span>
//                     <span>₹ {course.price}</span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Instructor;




import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { instructordashboard } from "../../../services/operations/coursedetailapi";
import { apiconnector } from "../../../services/apiconnector";
import { instructorcourse } from "../../../services/apis";
import { Link, useNavigate } from "react-router-dom";
import Instructorchart from "./Instructorchart";
import RatingStars from "../Homepage/common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";

const Instructor = () => {
  const [instructordata, setinstructordata] = useState([]);
  const [courses, setcourses] = useState([]);
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const getcoursedata = async () => {
      const dashboard = await instructordashboard(token);
      const res = await apiconnector(
        "GET",
        instructorcourse.INSTRUCTOR_COURSE,
        null,
        { Authorization: `Bearer ${token}` }
      );
      if (Array.isArray(dashboard)) setinstructordata(dashboard);
      if (res?.data?.data) setcourses(res.data.data);
    };
    getcoursedata();
  }, [token]);

  const totalAmount = instructordata.reduce(
    (a, c) => a + (c.totalamountgernerated || 0),
    0
  );
  const totalStudents = instructordata.reduce(
    (a, c) => a + (c.totalstudentenrolled || 0),
    0
  );

  // ---------- Empty state ----------
  if (courses.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0e0e0e] text-white">
        <h1 className="mb-3 text-2xl font-semibold">Hi {user?.firstname} 👋</h1>
        <p className="mb-6 text-gray-400">
          You haven’t created any course yet.
        </p>
        <button
          onClick={() => navigate("/dashboard/add-course")}
          className="rounded-lg bg-yellow-400 px-6 py-2 font-semibold text-black hover:bg-yellow-300"
        >
          Create Course
        </button>
      </div>
    );
  }

  // ---------- Main Dashboard ----------
  return (
    <div className="min-h-screen bg-[#0e0e0e] px-4 sm:px-6 py-8 text-white">
      {/* Greeting */}
      <div className="mb-8 text-center lg:text-left lg:ml-64">
        <h1 className="text-3xl font-semibold">
          Hi {user?.firstname} <span className="ml-1">👋</span>
        </h1>
        <p className="text-gray-400">Let's start something new</p>
      </div>

      {/* === Chart & Stats === */}
      <div className="mb-10 flex flex-col lg:flex-row gap-8 items-center justify-center">
        {/* Chart */}
        <div className="rounded-2xl bg-gray-950 p-6 shadow w-full lg:max-w-4xl">
          <Instructorchart courses={instructordata} />
        </div>

        {/* Stats */}
        <div className="rounded-2xl bg-gray-950 p-6 shadow flex flex-col w-full max-w-sm">
          <h3 className="mb-4 font-medium text-4xl text-gray-200 text-center">
            Statistics
          </h3>
          <div className="space-y-6 text-gray-300">
            <div className="flex flex-col items-center">
              <span className="text-2xl">Total Courses</span>
              <span className="font-semibold text-white text-3xl">
                {courses.length}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl">Total Students</span>
              <span className="font-semibold text-white text-3xl">
                {totalStudents}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl">Total Income</span>
              <span className="font-semibold text-white text-3xl">
                ₹{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* === Your Courses === */}
      <div className="rounded-2xl bg-gray-950 p-6 shadow w-full max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-lg font-medium text-gray-200">Your Courses</p>
          <Link
            to="/dashboard/my-courses"
            className="text-sm font-semibold text-yellow-400 hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 3).map((course) => {
            const avgReviewCount = GetAvgRating(course?.ratingandreview || []);
            return (
              <div
                key={course._id}
                className="overflow-hidden rounded-xl bg-gray-950 shadow hover:shadow-lg transition"
              >
                <img
                  src={course.thumbnail}
                  alt={course.coursename}
                  className="h-60 w-full object-cover"
                />
                <div className="p-4">
                  <p className="mb-2 text-xl font-bold">{course.coursename}</p>

                  {/* ⭐ Ratings & Reviews */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-400 font-bold">
                      {avgReviewCount?.toFixed(1) || "0.0"}
                    </span>
                    <RatingStars value={avgReviewCount} readOnly={true} size={18} />
                    <span className="text-gray-400 text-sm">
                      ({course?.ratingandreview?.length || 0} reviews)
                    </span>
                  </div>

                  {/* 👥 Students & 💰 Price */}
                  <div className="flex items-center text-base text-gray-300">
                    <span>{course.studentenrolled.length} Students</span>
                    <span className="mx-3">|</span>
                    <span>₹ {course.price}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Instructor;
