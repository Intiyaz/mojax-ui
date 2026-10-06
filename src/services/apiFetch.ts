//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
const API_BASE_URL = "https://engineeringai-java-modernization.victoriouscliff-8a4c40e2.southindia.azurecontainerapps.io";
//const API_BASE_URL = "http://localhost:8080";
export class ApiError extends Error {

  status: number;

  body?: unknown;


  constructor(
    message: string,
    status: number,
    body?: unknown
  ) {

    super(message);

    this.name =
      "ApiError";

    this.status =
      status;

    this.body =
      body;
  }
}


/*
 * ==============================================================
 * PUBLIC API REQUEST
 * ==============================================================
 *
 * Use this for:
 *
 * /auth/login
 * /registration/start
 * /plans
 * /payments/create-order
 * /payments/verify
 *
 * No JWT is attached.
 */

export async function publicApiFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {

  const headers =
    buildHeaders(
      options.headers,
      false
    );


  const response =
    await fetch(
      buildUrl(path),
      {
        ...options,
        headers
      }
    );


  if (!response.ok) {

    await throwApiError(
      response
    );
  }


  return response;
}


/*
 * ==============================================================
 * AUTHENTICATED API REQUEST
 * ==============================================================
 *
 * Automatically sends:
 *
 * Authorization: Bearer <JWT>
 */

export async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {

  const token =
    getAccessToken();


  /*
   * User is attempting to access a protected
   * endpoint without having a JWT.
   */
  if (!token) {

    clearAuthentication();

    redirectToLogin();

    throw new ApiError(
      "Authentication is required.",
      401
    );
  }


  const headers =
    buildHeaders(
      options.headers,
      true
    );


  const response =
    await fetch(
      buildUrl(path),
      {
        ...options,
        headers
      }
    );


  /*
   * JWT missing, invalid or expired.
   */
  if (
    response.status === 401
  ) {

    clearAuthentication();

    redirectToLogin();

    throw new ApiError(
      "Your session has expired. Please sign in again.",
      401
    );
  }


  /*
   * Valid JWT but access denied.
   */
  if (
    response.status === 403
  ) {

    const body =
      await readResponseBody(
        response
      );


    throw new ApiError(
      extractErrorMessage(
        body,
        "You do not have permission to access this organization."
      ),
      403,
      body
    );
  }


  if (!response.ok) {

    await throwApiError(
      response
    );
  }


  return response;
}


/*
 * ==============================================================
 * JSON HELPERS
 * ==============================================================
 */

export async function apiGet<T>(
  path: string
): Promise<T> {

  const response =
    await apiFetch(
      path,
      {
        method: "GET"
      }
    );


  return readJson<T>(
    response
  );
}


export async function apiPost<TResponse>(
  path: string,
  body?: unknown
): Promise<TResponse> {

  const response =
    await apiFetch(
      path,
      {
        method: "POST",

        body:
          body === undefined
            ? undefined
            : JSON.stringify(
                body
              )
      }
    );


  return readJson<TResponse>(
    response
  );
}


export async function apiPut<TResponse>(
  path: string,
  body?: unknown
): Promise<TResponse> {

  const response =
    await apiFetch(
      path,
      {
        method: "PUT",

        body:
          body === undefined
            ? undefined
            : JSON.stringify(
                body
              )
      }
    );


  return readJson<TResponse>(
    response
  );
}


export async function apiPatch<TResponse>(
  path: string,
  body?: unknown
): Promise<TResponse> {

  const response =
    await apiFetch(
      path,
      {
        method: "PATCH",

        body:
          body === undefined
            ? undefined
            : JSON.stringify(
                body
              )
      }
    );


  return readJson<TResponse>(
    response
  );
}


export async function apiDelete(
  path: string
): Promise<void> {

  await apiFetch(
    path,
    {
      method: "DELETE"
    }
  );
}


/*
 * ==============================================================
 * PUBLIC JSON HELPERS
 * ==============================================================
 */

export async function publicApiGet<T>(
  path: string
): Promise<T> {

  const response =
    await publicApiFetch(
      path,
      {
        method: "GET"
      }
    );


  return readJson<T>(
    response
  );
}


export async function publicApiPost<TResponse>(
  path: string,
  body?: unknown
): Promise<TResponse> {

  const response =
    await publicApiFetch(
      path,
      {
        method: "POST",

        body:
          body === undefined
            ? undefined
            : JSON.stringify(
                body
              )
      }
    );


  return readJson<TResponse>(
    response
  );
}


/*
 * ==============================================================
 * TOKEN STORAGE
 * ==============================================================
 */

export function getAccessToken():
string | null {

  return localStorage.getItem(
    "mojax.accessToken"
  );
}


export function setAccessToken(
  token: string
): void {

  localStorage.setItem(
    "mojax.accessToken",
    token
  );
}


export function removeAccessToken():
void {

  localStorage.removeItem(
    "mojax.accessToken"
  );
}


/*
 * ==============================================================
 * AUTH CLEANUP
 * ==============================================================
 */

export function clearAuthentication():
void {

  localStorage.removeItem(
    "mojax.accessToken"
  );


  /*
   * Existing MoJaX organization selection.
   *
   * We can rename this later from mojaup → mojax.
   */
  localStorage.removeItem(
    "mojax.organizationId"
  );
}


/*
 * ==============================================================
 * HEADERS
 * ==============================================================
 */

function buildHeaders(
  existingHeaders:
    HeadersInit | undefined,

  authenticated: boolean
): Headers {

  const headers =
    new Headers(
      existingHeaders
    );


  /*
   * Only add JSON content type when one
   * has not already been supplied.
   *
   * This is important if we later upload
   * multipart/form-data files.
   */
  if (
    !headers.has(
      "Content-Type"
    )
  ) {

    headers.set(
      "Content-Type",
      "application/json"
    );
  }


  headers.set(
    "Accept",
    "application/json"
  );


  if (authenticated) {

    const token =
      getAccessToken();


    if (token) {

      headers.set(
        "Authorization",
        `Bearer ${token}`
      );
    }
  }


  return headers;
}


/*
 * ==============================================================
 * URL
 * ==============================================================
 */

function buildUrl(
  path: string
): string {

  /*
   * Allow callers to supply an absolute URL.
   */
  if (
    path.startsWith(
      "http://"
    )
    ||
    path.startsWith(
      "https://"
    )
  ) {

    return path;
  }


  if (!path.startsWith("/")) {

    path =
      "/" + path;
  }


  return (
    API_BASE_URL
    + path
  );
}


/*
 * ==============================================================
 * JSON RESPONSE
 * ==============================================================
 */

async function readJson<T>(
  response: Response
): Promise<T> {

  /*
   * Useful for APIs returning 204.
   */
  if (
    response.status === 204
  ) {

    return undefined as T;
  }


  const text =
    await response.text();


  if (!text) {

    return undefined as T;
  }


  try {

    return JSON.parse(
      text
    ) as T;

  } catch {

    throw new ApiError(
      "The server returned an invalid JSON response.",
      response.status,
      text
    );
  }
}


/*
 * ==============================================================
 * ERROR HANDLING
 * ==============================================================
 */

async function throwApiError(
  response: Response
): Promise<never> {

  const body =
    await readResponseBody(
      response
    );


  const message =
    extractErrorMessage(
      body,
      `Request failed with status ${response.status}.`
    );


  throw new ApiError(
    message,
    response.status,
    body
  );
}


async function readResponseBody(
  response: Response
): Promise<unknown> {

  try {

    const text =
      await response.text();


    if (!text) {
      return null;
    }


    try {

      return JSON.parse(
        text
      );

    } catch {

      return text;
    }

  } catch {

    return null;
  }
}


function extractErrorMessage(
  body: unknown,
  fallback: string
): string {

  if (
    typeof body === "string"
    &&
    body.trim()
  ) {

    return body;
  }


  if (
    typeof body === "object"
    &&
    body !== null
  ) {

    const value =
      body as Record<
        string,
        unknown
      >;


    if (
      typeof value.message
        === "string"
      &&
      value.message
    ) {

      return value.message;
    }


    if (
      typeof value.detail
        === "string"
      &&
      value.detail
    ) {

      return value.detail;
    }


    if (
      typeof value.error
        === "string"
      &&
      value.error
    ) {

      return value.error;
    }
  }


  return fallback;
}


/*
 * ==============================================================
 * LOGIN REDIRECT
 * ==============================================================
 */

function redirectToLogin():
void {

  /*
   * Avoid reloading /login repeatedly.
   */
  if (
    window.location.pathname
      !== "/login"
  ) {

    window.location.href =
      "/login";
  }
}