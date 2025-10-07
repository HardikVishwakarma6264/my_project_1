

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { FiEdit, FiTrash, FiClock, FiCheckCircle } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { apiconnector } from "../../../services/apiconnector";
// import { instructorcourse } from "../../../services/apis";
// import Confirmationmodel from "./2nd_section/Confirmationmodel";
// import { deleteCourse } from "../../../services/operations/coursedetailapi";

// const MyCourse = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [modalData, setModalData] = useState(null);
//   const navigate = useNavigate();

//   const { token } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const fetchInstructorCourses = async () => {
//       try {
//         const response = await apiconnector(
//           "GET",
//           instructorcourse.INSTRUCTOR_COURSE,
//           null,
//           { Authorization: `Bearer ${token}` }
//         );

//         if (response.data.success) {
//           setCourses(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInstructorCourses();
//   }, [token]);

//   const handleCourseDelete = async (courseid) => {
//     const success = await deleteCourse(courseid, token);
//     if (success) {
//       setCourses((prev) => prev.filter((course) => course._id !== courseid));
//     }
//     setShowModal(false);
//   };

//   const showDeleteModal = (id) => {
//     setModalData({
//       text1: "Do you want to delete this course?",
//       text2: "All data related to this course will be deleted.",
//       btn1text: "Delete",
//       btn2text: "Cancel",
//       btn1handler: () => handleCourseDelete(id),
//       btn2handler: () => setShowModal(false),
//     });
//     setShowModal(true);
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-white">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
//         <h1 className="text-4xl font-extrabold tracking-tight">My Courses</h1>
//         <button
//           onClick={() => navigate("/dashboard/add-course")}
//           className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition"
//           aria-label="Add New Course"
//         >
//           + New
//         </button>
//       </div>

//       {loading ? (
//         <p className="text-gray-400 text-center text-lg mt-16">Loading courses...</p>
//       ) : courses.length === 0 ? (
//         <p className="text-gray-400 text-center text-lg mt-16">
//           You have not published any course yet.
//         </p>
//       ) : (
//         <>
//           {/* Table Header */}
//           <div className="hidden sm:grid grid-cols-5 gap-6 text-gray-400 text-sm font-semibold mb-6 px-2 select-none">
//             <p className="col-span-2">COURSE</p>
//             <p className="text-center">DURATION</p>
//             <p className="text-center">PRICE</p>
//             <p className="text-center">ACTION</p>
//           </div>

//           {/* Course List */}
//           <div className="space-y-8">
//             {courses.map((course) => (
//               <div
//                 key={course._id}
//                 className="bg-gray-900 rounded-xl p-5 shadow-lg flex flex-col sm:grid sm:grid-cols-5 gap-6 hover:shadow-yellow-400/50 transition-shadow"
//               >
//                 {/* Course Info */}
//                 <div className="flex items-start gap-5 col-span-2">
//                   <img
//                     src={course.thumbnail}
//                     alt={course.coursename}
//                     className="w-32 h-20 rounded-lg object-cover shadow-md"
//                   />
//                   <div className="flex flex-col justify-between">
//                     <p className="text-xl font-semibold truncate max-w-[280px]">{course.coursename}</p>
//                     <p className="text-gray-400 text-sm truncate max-w-[280px]">
//                       {course.whatwillyoulearn}
//                     </p>
//                     <p className="text-gray-500 text-xs mt-2 hidden sm:block">
//                       Created: {new Date(course.createdAt).toLocaleDateString()}
//                     </p>
//                     {/* Status Badge */}
//                     <div
//                       className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold mt-3
//                         ${
//                           course.status === "Draft"
//                             ? "bg-red-600 text-white"
//                             : "bg-green-600 text-white"
//                         }
//                       `}
//                     >
//                       {course.status === "Draft" ? <FiClock /> : <FiCheckCircle />}
//                       <span>{course.status || "Draft"}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Duration */}
//                 <div className="text-gray-300 text-sm sm:text-center flex flex-col justify-center mt-5 sm:mt-0">
//                   <span className="block sm:hidden font-semibold mb-1">Duration:</span>
//                   {course?.coursecontent?.[0]?.subsection?.[0]?.timeduration || "N/A"}
//                 </div>

//                 {/* Price */}
//                 <div className="text-yellow-400 font-semibold sm:text-center text-sm flex flex-col justify-center mt-5 sm:mt-0">
//                   <span className="block sm:hidden font-semibold mb-1">Price:</span>
//                   ₹{course.price}
//                 </div>

//                 {/* Actions */}
//                 {/* Actions */}
// <div className="flex sm:justify-center gap-6 text-xl mt-4 sm:mt-0">
//   <button
//     onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
//     className="hover:text-yellow-400 transition-colors transform hover:scale-110 duration-200"
//     aria-label={`Edit ${course.coursename}`}
//   >
//     <FiEdit />
//   </button>
//   <button
//     onClick={() => showDeleteModal(course._id)}
//     className="hover:text-red-500 transition-colors transform hover:scale-110 duration-200"
//     aria-label={`Delete ${course.coursename}`}
//   >
//     <FiTrash />
//   </button>
// </div>

//               </div>
//             ))}
//           </div>
//         </>
//       )}

//       {/* Confirmation Modal */}
//       {showModal && modalData && <Confirmationmodel modaldata={modalData} />}
//     </div>
//   );
// };

// export default MyCourse;


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiEdit, FiTrash, FiClock, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { apiconnector } from "../../../services/apiconnector";
import { instructorcourse } from "../../../services/apis";
import Confirmationmodel from "./2nd_section/Confirmationmodel";
import { deleteCourse } from "../../../services/operations/coursedetailapi";

const MyCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchInstructorCourses = async () => {
      try {
        const response = await apiconnector(
          "GET",
          instructorcourse.INSTRUCTOR_COURSE,
          null,
          { Authorization: `Bearer ${token}` }
        );
        if (response.data.success) {
          setCourses(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInstructorCourses();
  }, [token]);

  const handleCourseDelete = async (courseid) => {
    const success = await deleteCourse(courseid, token);
    if (success) {
      setCourses((prev) => prev.filter((course) => course._id !== courseid));
    }
    setShowModal(false);
  };

  const showDeleteModal = (id) => {
    setModalData({
      text1: "Do you want to delete this course?",
      text2: "All data related to this course will be deleted.",
      btn1text: "Delete",
      btn2text: "Cancel",
      btn1handler: () => handleCourseDelete(id),
      btn2handler: () => setShowModal(false),
    });
    setShowModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
        <h1 className="text-4xl font-extrabold tracking-tight">My Courses</h1>
        <button
          onClick={() => navigate("/dashboard/add-course")}
          className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition"
          aria-label="Add New Course"
        >
          + New
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-center text-lg mt-16">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-gray-400 text-center text-lg mt-16">
          You have not published any course yet.
        </p>
      ) : (
        <>
          {/* Table Header – hidden on small screens */}
          <div className="hidden sm:grid grid-cols-5 gap-6 text-gray-400 text-sm font-semibold mb-6 px-2 select-none">
            <p className="col-span-2">COURSE</p>
            <p className="text-center">DURATION</p>
            <p className="text-center">PRICE</p>
            <p className="text-center">ACTION</p>
          </div>

          {/* Course List */}
          <div className="space-y-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-gray-900 rounded-xl p-5 shadow-lg flex flex-col sm:grid sm:grid-cols-5 gap-6 hover:shadow-yellow-400/50 transition-shadow"
              >
                {/* Course Info */}
                <div className="flex items-start gap-5 col-span-2">
                  <img
                    src={course.thumbnail}
                    alt={course.coursename}
                    className="w-32 h-20 rounded-lg object-cover shadow-md"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-xl font-semibold truncate max-w-[280px]">
                      {course.coursename}
                    </p>
                    <p className="text-gray-400 text-sm truncate max-w-[280px]">
                      {course.whatwillyoulearn}
                    </p>
                    <p className="text-gray-500 text-xs mt-2 hidden sm:block">
                      Created: {new Date(course.createdAt).toLocaleDateString()}
                    </p>
                    {/* Status Badge */}
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold mt-3
                        ${
                          course.status === "Draft"
                            ? "bg-red-600 text-white"
                            : "bg-green-600 text-white"
                        }`}
                    >
                      {course.status === "Draft" ? <FiClock /> : <FiCheckCircle />}
                      <span>{course.status || "Draft"}</span>
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div className="text-gray-300 text-sm sm:text-center flex flex-col justify-center mt-5 sm:mt-0">
                  <span className="block sm:hidden font-semibold mb-1">Duration:</span>
                  {course?.coursecontent?.[0]?.subsection?.[0]?.timeduration || "N/A"}
                </div>

                {/* Price */}
                <div className="text-yellow-400 font-semibold sm:text-center text-sm flex flex-col justify-center mt-5 sm:mt-0">
                  <span className="block sm:hidden font-semibold mb-1">Price:</span>
                  ₹{course.price}
                </div>

                {/* Actions */}
                <div className="flex sm:justify-center gap-6 text-xl mt-4 sm:mt-0">
                  <button
                    onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                    className="hover:text-yellow-400 transition-colors transform hover:scale-110 duration-200"
                    aria-label={`Edit ${course.coursename}`}
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => showDeleteModal(course._id)}
                    className="hover:text-red-500 transition-colors transform hover:scale-110 duration-200"
                    aria-label={`Delete ${course.coursename}`}
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Confirmation Modal */}
      {showModal && modalData && <Confirmationmodel modaldata={modalData} />}
    </div>
  );
};

export default MyCourse;
