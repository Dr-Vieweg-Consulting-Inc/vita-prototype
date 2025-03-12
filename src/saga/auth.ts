// import { RootState } from "@reduxjs/toolkit/query";
import { put, select, take } from "redux-saga/effects";
import { Entity, RootState } from "../types";
import { loginRequest, logout } from "../actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { loginRequestAPI } from "../api";
import { loginFailure, loginSuccess } from "../reducer/user";
import { LoginResponse } from "../types/api";

export function* auth() {
  while (true) {
    const isAuthenticated: boolean = yield select(
      (state: RootState) => state.user.isAuthenticated
    );

    // console.log("selecting...");

    if (isAuthenticated) yield handleLogout();
    else yield handleLogin();
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

    console.log("show 000 e", e.message);

    yield put(loginFailure(e.message));
  }
}

function* handleLogout() {
  yield take(logout.type);

  // TODO: Add logic to handle server response
}
