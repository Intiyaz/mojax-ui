import { apiGet, apiPost } from "./apiFetch";
/*
 * ============================================================
 * GET ALL PROJECTS
 * ============================================================
 *
 * JWT is automatically added by apiGet().
 */
export async function getProjects() {
    return apiGet("/api/v1/projects");
}
/*
 * ============================================================
 * GET PROJECT
 * ============================================================
 */
export async function getProject(projectId) {
    if (!projectId) {
        throw new Error("Project id is required.");
    }
    return apiGet(`/api/v1/projects/${projectId}`);
}
/*
 * ============================================================
 * CREATE PROJECT
 * ============================================================
 */
export async function createProject(request) {
    return apiPost("/api/v1/projects", request);
}
