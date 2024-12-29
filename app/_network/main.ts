import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError,
} from "@/app/_errors/main";
import { serverAddress } from "@/app/_config/main";

//this is will be used as the main function to fetch data from the server
export async function fetchData<T>(input: RequestInfo, init?: RequestInit) {
  if (!init) init = {};

  // Ensure headers are defined and add necessary headers
  if (!init.headers) {
    init.headers = {};
  }

  // Add required Laravel Sanctum headers
  init.headers = {
    ...init.headers,
    Accept: "application/json", // Required by Sanctum
  };

  // Include cookies for authentication
  init.credentials = "include";

  // Add Bearer token if user is authenticated
  const token = localStorage.getItem("authToken"); // Replace with your token retrieval logic
  if (token) {
    init.headers = {
      ...init.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(serverAddress + input, init);

    if (response.status === 204 && init.method === "DELETE") {
      return true;
    }

    if (response.ok) {
      return response.json() as Promise<T>;
    } else {
      // Handle error responses
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
