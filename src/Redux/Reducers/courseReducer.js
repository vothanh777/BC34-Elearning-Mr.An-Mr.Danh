import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  courseDetail: {},
};

const courseReducer = createSlice({
  name: "courseReducer",
  initialState,
  reducers: {
    getCourses: (state, { payload }) => {
      state.courses = payload;
    },
    getCourseDetail: (state, { payload }) => {
      state.courseDetail = payload;
    },
  },
});

export const { getCourses, getCourseDetail } = courseReducer.actions;

export default courseReducer.reducer;
