import { APIResponse, LoginResponse } from "../types/api";

const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3005"
    : "https://express-prototype.onrender.com";

// console.log("show this::: ", import.meta.env.MODE);

const REQUEST_TIMEOUT = 10000;

async function postRequest<T extends APIResponse>(
  path: string,
  data: any
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE_URL}/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json();
      console.log("show all: ", response, errorData);
      throw new Error(errorData.error || "Login failed");
    }

    return (await response.json()) as T;
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }
    throw new Error(error.message || "Network error");
  }
}

export async function loginRequestAPI(email: string, password: string) {
  return await postRequest<LoginResponse>("login", { email, password });
}
