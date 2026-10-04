import {
  apiGet,
  publicApiPost,
  setAccessToken
} from "./apiFetch";


export type LoginResponse = {
  accessToken: string;

  tokenType: string;

  expiresIn: number;

  expiresAt: string;

  userId: string;

  email: string;

  displayName: string;

  organizationId: string;
};


export type CurrentUserResponse = {
  userId: string;

  email: string;

  displayName: string;

  organizationId: string;

  organizationName: string;
};


export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {

  const result =
    await publicApiPost<LoginResponse>(
      "/api/v1/auth/login",
      {
        email,
        password
      }
    );


  setAccessToken(
    result.accessToken
  );


  if (
    result.organizationId
  ) {

    localStorage.setItem(
      "mojax.organizationId",
      result.organizationId
    );
  }


  return result;
}


export async function getCurrentUser():
Promise<CurrentUserResponse> {

  return apiGet<CurrentUserResponse>(
    "/api/v1/auth/me"
  );
}


export function logout() {

  localStorage.removeItem(
    "mojax.accessToken"
  );

  localStorage.removeItem(
    "mojax.organizationId"
  );


  window.location.href =
    "/login";
}