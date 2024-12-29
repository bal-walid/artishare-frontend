import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError,
} from "@/app/_errors/main";
import { serverAddress } from "@/app/_config/main";

export async function fetchData<T>(input: RequestInfo, init?: RequestInit) {
  if (!init) init = {};

  if (!init.headers) {
    init.headers = {};
  }

  init.headers = {
    ...init.headers,
    Accept: "application/json",
  };

  init.credentials = "include";

  const token = localStorage.getItem("authToken");
  if (token) {
    init.headers = {
      ...init.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(serverAddress + "/api" + input, init);

    if (response.status === 204 && init.method === "DELETE") {
      return true;
    }

    if (response.ok) {
      return response.json() as Promise<T>;
    } else {
      const errorBody = await response.json();
      const errorMessage = errorBody.error;
      switch (response.status) {
        case 401:
          throw new UnauthorizedError(errorMessage);
        case 409:
          throw new ConflictError(errorMessage);
        case 400:
          throw new BadRequestError(errorMessage);
        case 403:
          throw new ForbiddenError(errorMessage);
        case 404:
          throw new NotFoundError(errorMessage);
        case 500:
          throw new InternalServerError(errorMessage);
        default:
          throw new Error(
            `Request failed with status: ${response.status} message: ${errorMessage}`
          );
      }
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
