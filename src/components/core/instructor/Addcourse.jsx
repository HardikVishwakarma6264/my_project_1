

import React from "react";
import RenderSteps from "./RenderSteps";

const Addcourse = () => {
  return (
    <div className="min-h-screen bg-richblack-900 text-white">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto gap-8 md:px-4 sm:px-6 md:py-8">
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-11 text-center lg:text-left">
            Add Course
          </h1>
          <RenderSteps />
        </div>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-[450px]">
          <div className="sticky top-10 bg-gray-800 md:p-6 p-2 rounded-2xl shadow-md">
            <p className="text-lg font-semibold mb-4 text-yellow-50 flex items-center gap-2">
              ⚡ Course Upload Tips
            </p>
            <ul className="list-disc list-inside space-y-3 text-base text-richblack-300">
              <li>Set the Course Price option or make it free.</li>
              <li>Standard size for the course thumbnail is 1024×576.</li>
              <li>Video section controls the course overview video.</li>
              <li>Course Builder is where you create &amp; organize a course.</li>
              <li>Add Topics in the Course Builder to create lessons, quizzes, and assignments.</li>
              <li>Additional Data section info shows on the course page.</li>
              <li>Make Announcements to notify important updates.</li>
              <li>Send notes to all enrolled students at once.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Addcourse;

