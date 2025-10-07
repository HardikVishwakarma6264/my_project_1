// import { createSlice } from "@reduxjs/toolkit";


// const initialState = {
//   signupdata: null,
//   token: localStorage.getItem("token")
//     ? JSON.parse(localStorage.getItem("token")) 
//     : null,
//     user: localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user"))
//     : null,

// };
// const authslice = createSlice({
//   name: "auth",
//   initialState: { signupData: null, token: null, user: null },
//   reducers: {
//     setSignupData: (state, action) => {
//       state.signupData = action.payload;
//     },
//     setToken: (state, action) => {
//       state.token = action.payload;
//     },

// setUser: (state, action) => {
//   if (action.payload) {
//     state.user = {
//       ...action.payload,
//       accountType:
//         action.payload.accountType || action.payload.accounttype,
//     };
//   } else {
//     state.user = null; // logout case
//   }
// },


//   },
// });

// export const { setToken, setSignupData, setUser } = authslice.actions;
// export default authslice.reducer;








import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const authslice = createSlice({
  name: "auth",
  initialState, // ✅ Use the variable you created above
  reducers: {
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      if (action.payload) {
        state.user = {
          ...action.payload,
          accountType:
            action.payload.accountType || action.payload.accounttype,
        };
      } else {
        state.user = null; // logout case
      }
    },
  },
});

export const { setToken, setSignupData, setUser } = authslice.actions;
export default authslice.reducer;

















