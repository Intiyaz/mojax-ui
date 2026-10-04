import { apiGet, publicApiPost, setAccessToken } from "./apiFetch";
export async function login(email, password) {
    const result = await publicApiPost("/api/v1/auth/login", {
        email,
        password
    });
    setAccessToken(result.accessToken);
    if (result.organizationId) {
        localStorage.setItem("mojax.organizationId", result.organizationId);
    }
    return result;
}
export async function getCurrentUser() {
    return apiGet("/api/v1/auth/me");
}
export function logout() {
    localStorage.removeItem("mojax.accessToken");
    localStorage.removeItem("mojax.organizationId");
    window.location.href =
        "/login";
}
