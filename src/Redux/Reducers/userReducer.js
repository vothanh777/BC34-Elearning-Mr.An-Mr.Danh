import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userCredentials: null,
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
