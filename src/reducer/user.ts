import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, UserStatus } from "../types";
import { LoginResponse } from "../types/api";

const initialState: UserState = {
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  entities: [],
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
  status: null,
  activeEntityId: null,
};

// const initialState: UserState = {
//   id: 97,
//   firstName: "User97",
//   lastName: "Last97",
//   email: "user97@example.com",
//   entities: [{
//       id: 13,
//       name: string;
//       // industry: string;
//       // country: string;
//       roles: Role[];
//   }
//   ],
//   isAuthenticated: true,
//   token: "dummy",
//   loading: false,
//   error: null,
//   status: UserStatus.Active,
// };

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
        // TODO: Let server decide active entity id
        activeEntityId: Math.min(
          ...action.payload.entities.map((entity) => entity.id)
        ),
        isAuthenticated: true,
        loading: false,
      };
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerRequest: (
      state,
      _: PayloadAction<{
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<LoginResponse>) => {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: () => {
      //   localStorage.removeItem("user"); // Not sure how it works
      return { ...initialState };
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
