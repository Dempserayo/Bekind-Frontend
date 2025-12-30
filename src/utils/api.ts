const API_BASE_URL = "https://dev.apinetbo.bekindnetwork.com";
const API_V1_BASE_URL = "https://dev.api.bekindnetwork.com";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  accessToken?: string;
  [key: string]: any;
}

/**
 * Makes an API request with optional authentication token
 */
async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== "undefined" 
    ? localStorage.getItem("authToken") 
    : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * Login API call
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/api/Authentication/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    let errorMessage = `Error ${response.status}: ${response.statusText}`;
    try {
      const errorData = await response.json();
      // Try to extract error message from various possible formats
      errorMessage = 
        errorData.message || 
        errorData.error || 
        errorData.errors?.join?.(", ") ||
        (typeof errorData === "string" ? errorData : JSON.stringify(errorData)) ||
        errorMessage;
    } catch (e) {
      // If response is not JSON, try to get text
      try {
        const text = await response.text();
        if (text) errorMessage = text;
      } catch (e2) {
        // Keep default error message
      }
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

/**
 * Get admin list of actions (paginated)
 */
export async function getAdminActions(pageNumber: number = 1, pageSize: number = 10) {
  return apiRequest(
    `${API_V1_BASE_URL}/api/v1/actions/admin-list?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
}

/**
 * Create a new action
 */
export async function createAction(data: FormData | Record<string, any>) {
  const token = typeof window !== "undefined" 
    ? localStorage.getItem("authToken") 
    : null;

  const headers: HeadersInit = {};
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // If FormData, don't set Content-Type (browser will set it with boundary)
  if (!(data instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const body = data instanceof FormData 
    ? data 
    : JSON.stringify(data);

  const response = await fetch(
    `${API_V1_BASE_URL}/api/v1/actions/admin-add`,
    {
      method: "POST",
      headers,
      body,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

