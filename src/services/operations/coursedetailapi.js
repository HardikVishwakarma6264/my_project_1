import { toast } from "react-hot-toast";
import { updateCompletedLectures } from "../../slices/viewCourseSlice";
import { apiconnector } from "../apiconnector";
import { courseEndpoints } from "../apis";

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
  GET_FULL_DETAIL_OF_COURSE,
  INSTRUCTOR_DASHBOARD,
  
} = courseEndpoints;



/* ================================================
-----   GET full COURSE DETAILS (Public)
=================================================== */

export const getfulldetailofcourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...");
  

  let result = null;

  try {
    const response = await apiconnector(
      "POST",
      GET_FULL_DETAIL_OF_COURSE,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    // console.log("COURSE_FULL_DETAILS_API_RESPONSE ----------", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    // console.log("COURSE_FULL_DETAILS_API_API_ERROR ----------", error);
    result = error.response?.data;
    toast.error(error.response?.data?.message);
  }

  toast.dismiss(toastId);
  

  return result;
};


/* ================================================
-----   GET COURSE DETAILS (Public)
=================================================== */
export const getCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading course details...");
  let result = null;
  try {
    const response = await apiconnector("GET", `${COURSE_DETAILS_API}/${courseId}`);
    if (response?.data?.success) {
      result = response.data.data;
    }
  } catch (error) {
    console.error("COURSE_DETAILS_API ERROR:", error);
    toast.error("Could not fetch course details");
  }
  toast.dismiss(toastId);
  return result;
};


/* ===================================================
---------   GET COURSE CATEGORIES
=================================================== */
export const getCourseCategories = async () => {
  let result = [];
  try {
    const response = await apiconnector("GET", COURSE_CATEGORIES_API);
    if (response?.data?.success) {
      result = response.data.data;
    }
  } catch (error) {
    console.error("COURSE_CATEGORIES_API ERROR:", error);
    toast.error("Could not fetch categories");
  }
  return result;
};

/* ===================================================
....   CREATE COURSE (Instructor)
=================================================== */
export const createCourse = async (formdata, token) => {
  const toastId = toast.loading("Creating , please wait...");
  let result = null;
  try {
    const response = await apiconnector("POST", CREATE_COURSE_API, formdata, {
      Authorization: `Bearer ${token}`,
    });
    if (response?.data?.success) {
      result = response.data.data;
      toast.success("Section 1 completed!");
    }
  } catch (error) {
    console.error("CREATE_COURSE_API ERROR:", error);
    toast.error("Could not create course");
  }
  toast.dismiss(toastId);
  return result;
};

/* ===================================================
----------   EDIT COURSE
=================================================== */
export const editCourse = async (courseData, token) => {
  const toastId = toast.loading("Updating course...");
  let result = null;
  try {
    const response = await apiconnector("PUT", EDIT_COURSE_API, courseData, {
      Authorization: `Bearer ${token}`,
    });
    if (response?.data?.success) {
      result = response.data.data;
      toast.success("Course updated successfully!");
    }
  } catch (error) {
    console.error("EDIT_COURSE_API ERROR:", error);
    toast.error("Could not update course");
  }
  toast.dismiss(toastId);
  return result;
};

/* ===================================================
---------   DELETE COURSE
=================================================== */
export const deleteCourse = async (courseid, token) => {
  const toastId = toast.loading("Deleting course...");
  let success = false;
  try {
    const response = await apiconnector("DELETE", DELETE_COURSE_API, { courseid }, {
      Authorization: `Bearer ${token}` 
    });

    if (response?.data?.success) {
      success = true;
      toast.success("Course deleted successfully!");
    }
  } catch (error) {
    console.error("DELETE_COURSE_API ERROR:", error);
    toast.error("Could not delete course");
  }
  toast.dismiss(toastId);
  return success;
};

/* ===================================================
   GET ALL INSTRUCTOR COURSES
=================================================== */
export const getInstructorCourses = async (token) => {
  const toastId = toast.loading("Loading your courses...");
  let result = [];
  try {
    const response = await apiconnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
      Authorization: `Bearer ${token}`,
    });
    if (response?.data?.success) {
      result = response.data.data;
    }
  } catch (error) {
    console.error("GET_ALL_INSTRUCTOR_COURSES_API ERROR:", error);
    toast.error("Could not fetch instructor courses");
  }
  toast.dismiss(toastId);
  return result;
};

/* ===================================================
--------   FULL COURSE DETAILS (For Enrolled Student)
=================================================== */
export const getFullCourseDetailsAuth = async (courseId, token) => {
  const toastId = toast.loading("Loading course...");
  let result = null;
  try {
    const response = await apiconnector(
      "POST",
      GET_FULL_COURSE_DETAILS,
      { courseId },
      { Authorization: `Bearer ${token}` }
    );
    if (response?.data?.success) {
  result = {
    coursedetails: response.data.data,
  };
}

  } catch (error) {
    console.error("FULL_COURSE_DETAILS ERROR:", error);
    toast.error("Could not load course");
  }
  toast.dismiss(toastId);
  return result;
};

/* ===================================================
....   CREATE SECTION
=================================================== */
export const createsection = async (data, token) => {
  const toastId = toast.loading("Adding section...");
  let result = null;
  try {
    const response = await apiconnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (response?.data?.success) {
      result = response.data.data; // ✅ now backend sends `data`
      toast.success("Section added successfully!");
    }
  } catch (error) {
    console.error("CREATE_SECTION_API ERROR:", error);
    toast.error("Could not add section");
  }
  toast.dismiss(toastId);
  return result;
};

/* ===================================================
....   UPDATE SECTION
=================================================== */
export const updatesection = async (data, token) => {
  const toastId = toast.loading("Updating section...");
  let result = null;
  try {
    const response = await apiconnector("PUT", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (response?.data?.success) {
      result = response.data.data; // ✅ updated to match backend
      toast.success("Section updated successfully!");
    }
  } catch (error) {
    console.error("UPDATE_SECTION_API ERROR:", error);
    toast.error("Could not update section");
  }
  toast.dismiss(toastId);
  return result;
};

/* ===================================================
------   DELETE SECTION
=================================================== */
export const deleteSection = async ({ sectionid, courseid, token }) => {
  const toastId = toast.loading("Deleting section...");
  let result = null;
  try {
    const response = await apiconnector(
      "DELETE",
      DELETE_SECTION_API,
      { sectionid, courseid },  // ✅ backend ke body ke hisaab se bhejna
      { Authorization: `Bearer ${token}` }
    );

    if (response?.data?.success) {
      result = response.data.data; // ✅ ab ye updated course milega
      toast.success("Section deleted!");
    }
  } catch (error) {
    console.error("DELETE_SECTION_API ERROR:", error);
    toast.error("Could not delete section");
  }
  toast.dismiss(toastId);
  return result;
};


/* ===================================================
------   CREATE SUBSECTION
=================================================== */

export const createSubSection = async (data, token) => {
  const toastId = toast.loading("Adding lecture...");
  let result = null;

  try {
    const response = await apiconnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    // console.log("CREATE_SUBSECTION_API RESPONSE:", response);

    if (response?.status === 200 && response?.data?.updatedSection) {
      result = response.data.updatedSection;
      toast.success("Lecture added successfully!");
    } else {
      toast.error("Could not add lecture");
    }
  } catch (error) {
    // console.error("CREATE_SUBSECTION_API ERROR:", error);
    toast.error("Could not add lecture");
  }

  toast.dismiss(toastId);
  return result;
};






/* ===================================================
----   UPDATE SUBSECTION
=================================================== */
export const updateSubSection = async (data, token) => {
  const toastId = toast.loading("Updating lecture...");
  let result = null;

  try {
    const response = await apiconnector("PUT", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    // console.log("UPDATE_SUBSECTION_API RESPONSE:", response);

    if (response?.status === 200 && response?.data?.subsection) {
      result = response.data.subsection;
      toast.success("Lecture updated successfully!");
    } else {
      toast.error("Could not update lecture");
    }
  } catch (error) {
    // console.error("UPDATE_SUBSECTION_API ERROR:", error);
    toast.error("Could not update lecture");
  }

  toast.dismiss(toastId);
  return result;
};


/* ===================================================
-----   DELETE SUBSECTION
=================================================== */
export const deleteSubSection = async (data, token) => {
  const toastId = toast.loading("Deleting lecture...");
  let result = null;
  try {
    const response = await apiconnector("DELETE", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (response?.data?.success) {
      result = response.data.data;  // ✅ backend me `data` key se match karega
      toast.success("Lecture deleted!");
    }
  } catch (error) {
    // console.error("DELETE_SUBSECTION_API ERROR:", error);
    toast.error("Could not delete lecture");
  }
  toast.dismiss(toastId);
  return result;
};


/* ===================================================
-----------   LECTURE COMPLETION
=================================================== */


export const markLectureAsComplete = async (data, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "POST",
      LECTURE_COMPLETION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    // console.log("MARK_LECTURE_AS_COMPLETE_API RESPONSE:", response);

    // ensure the API sent something meaningful
    if (!response?.data) {
      throw new Error(response?.data?.error || "No data in response");
    }

    // ✅ just return the data (could include {success, message, alreadyCompleted})
    return response.data;
  } catch (error) {
    console.error("MARK_LECTURE_AS_COMPLETE_API ERROR:", error);
    toast.error(error?.message || "Something went wrong");
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};


/* ===================================================
 -----------  CREATE RATING
=================================================== */
export const createRating = async (data, token) => {
  const toastId = toast.loading("Submitting rating...");
  let result = null;
  try {
    const response = await apiconnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (response?.data?.success) {
      result = response.data.data;
      toast.success("Thank you for your feedback!");
    }
  } catch (error) {
    console.error("CREATE_RATING_API ERROR:", error);

    // agar already review kiya hai
    if (error?.response?.status === 400) {
      toast(error.response.data.message || "You have already reviewed this course");
    } else {
      toast.error("Could not submit rating");
    }
  }
  toast.dismiss(toastId);
  return result;
};


export async function instructordashboard(token) {
const toastid=toast.loading("Loading...");
let result=[];
try{
  const response = await apiconnector("GET", INSTRUCTOR_DASHBOARD,null, {
      Authorization: `Bearer ${token}`,
    });
    // console.log("GET INSTRUCTOR RESULT",response); 
    result=response?.data?.courses

}catch(error){
  // console.log("GET INSTRUCTOR API ERROR",error);
  toast.error("could not get instructor data");
}
toast.dismiss(toastid);
return result;
}

