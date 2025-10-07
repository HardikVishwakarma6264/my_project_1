// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   step: 1,
//   course: null,
//   editCourse: false,
//   paymentLoading: false,
// };

// const courseSlice = createSlice({
//   name: "course",
//   initialState,
//   reducers: {
//     setStep: (state, action) => {
//       state.step = action.payload;
//     },
//     setCourse: (state, action) => {
//       state.course = action.payload;
//     },
//     setEditCourse: (state, action) => {
//       state.editCourse = action.payload;
//     },
//     setPaymentLoading: (state, action) => {
//       state.paymentLoading = action.payload;
//     },
//     resetCourseState: (state) => {
//       state.step = 1;
//       state.course = null;
//       state.editCourse = false;
//     },
//   },
// });

// export const {
//   setStep,
//   setCourse,
//   setEditCourse,
//   setPaymentLoading,
//   resetCourseState,
// } = courseSlice.actions;

// export default courseSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  course: null,
  editCourse: false,
  paymentLoading: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setEditCourse: (state, action) => {
      state.editCourse = action.payload;
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload;
    },
    resetCourseState: (state) => {
      state.step = 1;
      state.course = null;
      state.editCourse = false;
    },

    // ✅ Add these new reducers
    // updateSection: (state, action) => {
    //   const updatedSection = action.payload; // section object with updated subsections
    //   if (state.course && state.course.coursecontent) {
    //     const sectionIndex = state.course.coursecontent.findIndex(
    //       (sec) => sec._id === updatedSection._id
    //     );
    //     if (sectionIndex !== -1) {
    //       state.course.coursecontent[sectionIndex] = updatedSection;
    //     }
    //   }
    // },

    // updateSubsection: (state, action) => {
    //   const { sectionId, updatedSubsection } = action.payload;
    //   if (state.course && state.course.coursecontent) {
    //     const sectionIndex = state.course.coursecontent.findIndex(
    //       (sec) => sec._id === sectionId
    //     );
    //     if (sectionIndex !== -1) {
    //       const subsectionIndex = state.course.coursecontent[
    //         sectionIndex
    //       ].subsection.findIndex((sub) => sub._id === updatedSubsection._id);
    //       if (subsectionIndex !== -1) {
    //         state.course.coursecontent[sectionIndex].subsection[
    //           subsectionIndex
    //         ] = updatedSubsection;
    //       }
    //     }
    //   }
    // },

    // deleteSubsection: (state, action) => {
    //   const { sectionId, subsectionId } = action.payload;
    //   if (state.course && state.course.coursecontent) {
    //     const sectionIndex = state.course.coursecontent.findIndex(
    //       (sec) => sec._id === sectionId
    //     );
    //     if (sectionIndex !== -1) {
    //       state.course.coursecontent[sectionIndex].subsection =
    //         state.course.coursecontent[sectionIndex].subsection.filter(
    //           (sub) => sub._id !== subsectionId
    //         );
    //     }
    //   }
    // },
  },
});

export const {
  setStep,
  setCourse,
  setEditCourse,
  setPaymentLoading,
  resetCourseState,
  updateSection,
  updateSubsection,
  deleteSubsection,
} = courseSlice.actions;

export default courseSlice.reducer;

