import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./Reducers/courseReducer";
import userReducer from "./Reducers/userReducer";

const store = configureStore({
  reducer: {
    courseReducer: courseReducer,
    userReducer: userReducer,
  },
});

export default store;
