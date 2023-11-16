import { createSlice } from "@reduxjs/toolkit";
import { IAUTH } from "../../interface/auth";

const initialThreadSlice: { userThreads: IAUTH[] } = { userThreads: [] };

export const userThreadSlice = createSlice({
  name: "users",
  initialState: initialThreadSlice,
  reducers: {
    GET_USER_THREADS: (state, action) => {
      state.userThreads = action.payload;
    },
  },
});
