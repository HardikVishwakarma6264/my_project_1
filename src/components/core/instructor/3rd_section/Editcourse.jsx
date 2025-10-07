import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from "../RenderSteps";
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import { getFullCourseDetailsAuth } from '../../../../services/operations/coursedetailapi';

const Editcourse = () => {
const dispatch=useDispatch();
const {course}=useSelector((state)=>state.course);
const {token}=useSelector((state)=>state.auth);
const {courseid}=useParams();
const [loading,setloading]=useState();


useEffect(()=>{
  const populatecoursedetail=async()=>{
    const result=await getFullCourseDetailsAuth(courseid,token)
    console.log("COURSE RESULT a gaya:", result);
    if(result?.coursedetails){
      dispatch(setEditCourse(true));
      dispatch(setCourse(result?.coursedetails));
    }
  }
populatecoursedetail();
},[])


  return (
    <div className="min-h-screen bg-richblack-900 text-white">
      <div className="flex max-w-7xl mx-auto gap-8 px-6 py-8">
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-11 ml-[-50px]">Edit Course</h1>
          {
            course ? <RenderSteps /> : <p className="text-white">Course not found</p>
          }
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-[450px] ">
          <div className="sticky top-10 bg-gray-800 p-6 rounded-2xl shadow-md ml-[-20px]">
            <p className="text-lg font-semibold mb-4 text-yellow-50 flex items-center gap-2">
              ⚡ Course Upload Tips
            </p>
            <ul className="list-disc list-inside space-y-3 text-base text-richblack-300">
              <li>Set the Course Price option or make it free.</li>
              <li>Standard size for the course thumbnail is 1024×576.</li>
              <li>Video section controls the course overview video.</li>
              <li>Course Builder is where you create & organize a course.</li>
              <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
              <li>Information from the Additional Data section shows up on the course single page.</li>
              <li>Make Announcements to notify any important updates.</li>
              <li>Notes to all enrolled students at once.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editcourse