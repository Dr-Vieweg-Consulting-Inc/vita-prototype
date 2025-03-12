import { all } from "redux-saga/effects";
import { auth } from "./auth";
// import { sceneSaga } from "./sceneSaga";

export default function* saga() {
  yield all([auth()]);
}
