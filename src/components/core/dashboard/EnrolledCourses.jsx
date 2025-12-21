


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserEnrolledCourses } from "../../../services/operations/authapi";
import ProgressBar from "@ramonak/react-progress-bar";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const navigate = useNavigate();

  const fetchEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
      // console.log("dekane ke liye jo data ya->", response);
    } catch (error) {
      // console.log("Unable to fetch enrolled courses", error);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-white md:p-6 p-1 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">📚 Enrolled Courses</h1>

      {/* Loading State */}
      {!enrolledCourses ? (
        <div className="text-gray-400">Loading...</div>
      ) : !enrolledCourses.length ? (
        <p className="text-gray-300">You have not enrolled in any course yet</p>
      ) : (
        <div className="overflow-x-auto ">
          <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-gray-300 text-left text-sm md:text-base">
              <tr>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Progress</th>
              </tr>
            </thead>
            <tbody>
              {enrolledCourses.map((course) => (
                <tr
                  key={course._id || course.coursename}
                  className="border-t border-gray-700 hover:bg-gray-800 transition"
                >
                  {/* Course Info */}
                  <td
                    className="px-4 py-4 flex items-center gap-4 cursor-pointer hover:bg-gray-700 rounded transition"
                    onClick={() => {
                      const courseId = course?._id;
                      const sectionId = course?.coursecontent?.[0]?._id;
                      const subSectionId =
                        course?.coursecontent?.[0]?.subsection?.[0]?._id;

                      if (courseId && sectionId && subSectionId) {
                        navigate(
                          `/view-course/${courseId}/section/${sectionId}/sub-section/${subSectionId}`
                        );
                      } else {
                        console.warn(
                          "Course/section/subsection ID missing for navigation"
                        );
                      }
                    }}
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.coursename}
                      className="w-20 h-14 object-cover rounded-md shadow-md hidden md:block"
                    />
                    <div>
                      <p className="font-semibold text-white">
                        {course.coursename}
                      </p>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {course.coursedescription}
                      </p>
                    </div>
                  </td>

                  {/* Duration */}
                  <td className="px-4 py-4 text-gray-300">
                    {course.coursecontent
                      ?.flatMap((section) => section.subsection || [])
                      .map((sub) => sub.timeduration)
                      .filter(Boolean) // null/undefined remove
                      .join(" | ") || "N/A"}
                  </td>

                  {/* Progress */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-gray-400">
                        {course.progressPercentage || 0}%
                      </p>
                      <ProgressBar
                        completed={course.progressPercentage || 0}
                        height="8px"
                        bgColor="#22c55e"
                        baseBgColor="#374151"a
                        isLabelVisible={false}
                        borderRadius="4px"
                      />
                    </div>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;


