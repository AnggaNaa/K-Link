import { createSlice } from "@reduxjs/toolkit";
import { setAuthToken } from "../../libs/api";
import { IAUTH } from "../../interface/auth";

const initialAuthState: IAUTH = {
  id: 0,
  email: "",
  firstname: "",
  lastname: "",
  username: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    AUTH_LOGIN: (state, action) => {
      const { id, email, firstname, lastname, username } = action.payload.user;

      const { token } = action.payload;

      setAuthToken(token);
      localStorage.setItem("token", token);

      state.id = id;
      state.username = username;
      state.firstname = firstname;
      state.email = email;
      state.lastname = lastname;
    },
    AUTH_CHECK: (state, action) => {
      const { id, email, firstname, username, lastname } = action.payload.user;

      state.id = id;
      state.email = email;
      state.firstname = firstname;
      state.username = username;
      state.lastname = lastname;
      // state.threads = threads;
    },
    AUTH_ERROR: () => {
      localStorage.removeItem("token");
    },
    AUTH_LOGOUT: () => {
      localStorage.removeItem("token");

      return initialAuthState;
    },
  },
});
