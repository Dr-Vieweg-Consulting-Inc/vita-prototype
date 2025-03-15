import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types/api";
import { postRequest } from "./utils";

export async function loginRequestAPI(email: string, password: string) {
  return await postRequest<LoginRequest, LoginResponse>("login", {
    email,
    password,
  } as LoginRequest);
}

export async function registerRequestAPI(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  return await postRequest<RegisterRequest, RegisterResponse>("register", {
    firstName,
    lastName,
    email,
    password,
  } as RegisterRequest);
}
