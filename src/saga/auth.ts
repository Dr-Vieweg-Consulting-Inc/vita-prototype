// import { RootState } from "@reduxjs/toolkit/query";
import { put, race, select, take } from "redux-saga/effects";
import { Entity, RootState, LoginResponse, RegisterResponse } from "../types";
import { loginRequest, logout, registerRequest } from "../actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { loginRequestAPI, registerRequestAPI } from "../api";
import {
  loginFailure,
  loginSuccess,
  registerFailure,
  registerSuccess,
} from "../reducer/user";
// import { LoginResponse, RegisterResponse } from "../types/api";

export function* auth() {
  while (true) {
    const isAuthenticated: boolean = yield select(
      (state: RootState) => state.user.isAuthenticated
    );

    // console.log("selecting...");

    if (isAuthenticated) yield handleLogout();
    else yield race([handleLogin(), handleRegister()]);
  }
}

function* handleLogin() {
  const { payload }: PayloadAction<{ email: string; password: string }> =
    yield take(loginRequest.type);

  //   console.log("just show paylaod: ", payload);

  try {
    const response: LoginResponse = yield loginRequestAPI(
      payload.email,
      payload.password
    );

    // console.log("show the response correctly!!! ", response);

    yield put(loginSuccess(response));
  } catch (e: any) {
    //

    // console.log("show 000 e", e.message);

    yield put(loginFailure(e.message));
  }
}

function* handleRegister() {
  // console.log("okayu");

  const {
    payload: { firstName, lastName, email, password },
  }: PayloadAction<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }> = yield take(registerRequest.type);

  // console.log("register requested! --- ", payload);

  try {
    const response: RegisterResponse = yield registerRequestAPI(
      firstName,
      lastName,
      email,
      password
    );

    // console.log("just show me the response? ", response);

    yield put(
      registerSuccess({
        ...response,
        firstName,
        lastName,
        email,
      })
    );
  } catch (e: any) {
    //

    // console.log("show the error here: ", e.message);

    yield put(registerFailure(e.message));
  }
}

function* handleLogout() {
  yield take(logout.type);

  // TODO: Add logic to handle server response
}
