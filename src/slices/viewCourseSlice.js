import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseSectionData:[],
  courseEntireData:{},
  completedLectures: [],
  totalNoOfLectures: 0,
};

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    // Set all sections of the course
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload;
    },

    // Set complete course data
    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload;
    },

    // Set total number of lectures
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload;
    },

    // Set completed lectures array
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload;
    },

    // Update completed lectures (add new one)
    updateCompletedLectures: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload];
    },
  },
});

// Export actions
export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = viewCourseSlice.actions;

// Export reducer
export default viewCourseSlice.reducer;
