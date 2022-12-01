import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  courseDetail: {},
  courseCategories: [],
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
    getCourseCategories: (state, { payload }) => {
      state.courseCategories = payload;
    },
  },
});

export const { getCourses, getCourseDetail, getCourseCategories } =
  courseReducer.actions;

export default courseReducer.reducer;
