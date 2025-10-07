const BASE_URL= process.env.REACT_APP_BASE_URL

export const categories={
  CATEGORIES_API:BASE_URL+"/course/showallcategory"
}

export const sendotps={
  SEND_OTP:BASE_URL+"/auth/sendotp"
}

export const resetpassword={
  RESET_PASSWORD:BASE_URL+"/auth/reset-password-token"
}

export const updatepassword={
  UPDATE_PASSWORDS:BASE_URL+"/auth/reset-password"
}

export const signup={
  SIGNUPJI:BASE_URL+"/auth/signup"
}

export const login={
  LOGINJI:BASE_URL+"/auth/login"
}

export const imageupdate={
  IMAGE_UPDATE:BASE_URL+"/auth/update-image"
}

export const updateprofile={
  UPDATE_PROFILE:BASE_URL+"/profile/updateprofile"
}

export const passwordupdate={
  PASSWORD_UPDATE:BASE_URL+"/auth/changepassword"
}

export const accountdelete={
  ACCOUNT_DELETE:BASE_URL+"/profile/deleteaccount"
}

export const courseenrolled={
  ENROLLED_COURSE:BASE_URL+"/profile/getenrolledcourse"
}

export const instructorcourse={
  INSTRUCTOR_COURSE:BASE_URL+"/course/getinstructorcourses"
}

export const categorydetails={
  CATEGORIES_DETAIL:BASE_URL+"/course/categorypagedetail"
}

export const ratingandreviewdetail={
  RATING_AND_REVIEW:BASE_URL+"/course/getreview"
}




export const courseEndpoints = {
  
  CREATE_COURSE_API: BASE_URL + "/course/createcourse",
  CREATE_SECTION_API:BASE_URL +"/course/createsection",
  UPDATE_SECTION_API:BASE_URL +"/course/updatesection",
  DELETE_SECTION_API:BASE_URL +"/course/deletesection",
  DELETE_SUBSECTION_API:BASE_URL +"/course/deletesubsection",
  CREATE_SUBSECTION_API:BASE_URL +"/course/createsubsection",
  UPDATE_SUBSECTION_API:BASE_URL +"/course/updateSubsection",
  EDIT_COURSE_API:BASE_URL +"/course/editcourse",
  DELETE_COURSE_API:BASE_URL +"/course/deletecourse",
  GET_FULL_COURSE_DETAILS:BASE_URL +"/course/getcoursedetail",
  COURSE_DETAILS_API:BASE_URL+"/course/courseaccessdetail",
  GET_FULL_DETAIL_OF_COURSE:BASE_URL +"/course/getfulldetailofcourse",
  CREATE_RATING_API:BASE_URL +"/course/createrating",
  LECTURE_COMPLETION_API:BASE_URL +"/course/updatecourseprogress",
  INSTRUCTOR_DASHBOARD:BASE_URL+"/profile/instructordashboard",
  

 
};

export const paymentenroll={
  COURSE_PAYMENT_API:BASE_URL +"/payment/capturepayment",
  COURSE_VARIFY_API :BASE_URL +"/payment/verifypayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API :BASE_URL+"/payment/paymentsuccessemail",
}