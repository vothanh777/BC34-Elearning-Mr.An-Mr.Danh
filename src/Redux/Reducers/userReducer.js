import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userCredentials: {},
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    signIn: (state, { payload }) => {
      state.userCredentials = payload;
    },
  },
});

export const { signIn } = userReducer.actions;

export default userReducer.reducer;
