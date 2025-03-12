import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types";
import { LoginResponse } from "../types/api";

const initialState: UserState = {
  id: null,
  name: "",
  email: "",
  entities: [],
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest: (
      state,
      _: PayloadAction<{ email: string; password: string }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: () => {
      //   localStorage.removeItem("user"); // Not sure how it works
      return { ...initialState };
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  userSlice.actions;

export default userSlice.reducer;
