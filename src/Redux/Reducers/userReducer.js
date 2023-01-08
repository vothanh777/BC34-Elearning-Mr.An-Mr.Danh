import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userCredentials: null,
  myCourses: [],
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    signIn: (state, { payload }) => {
      state.userCredentials = payload;
    },
    getMyCourses: (state, { payload }) => {
      state.myCourses = [...payload];
    },
    removeCourse: (state, { payload }) => {
      state.myCourses = state.myCourses.filter(
        (course) => course.maKhoaHoc === payload
      );
    },
  },
});

export const { signIn, getMyCourses, removeCourse } = userReducer.actions;

export default userReducer.reducer;
