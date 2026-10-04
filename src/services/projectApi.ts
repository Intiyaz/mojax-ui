import {
  apiGet,
  apiPost
} from "./apiFetch";


export type Project = {
  id: string;

  organizationId?: string;

  name: string;

  description?: string;

  repositoryUrl?: string;

  sourceLocation?: string;

  createdAt?: string;

  updatedAt?: string;
};


export type CreateProjectRequest = {
  name: string;

  description?: string;

  repositoryUrl?: string;

  sourceLocation?: string;

  organizationId?: string;
};


/*
 * ============================================================
 * GET ALL PROJECTS
 * ============================================================
 *
 * JWT is automatically added by apiGet().
 */

export async function getProjects():
Promise<Project[]> {

  return apiGet<Project[]>(
    "/api/v1/projects"
  );
}


/*
 * ============================================================
 * GET PROJECT
 * ============================================================
 */

export async function getProject(
  projectId: string
):
Promise<Project> {

  if (!projectId) {

    throw new Error(
      "Project id is required."
    );
  }


  return apiGet<Project>(
    `/api/v1/projects/${projectId}`
  );
}


/*
 * ============================================================
 * CREATE PROJECT
 * ============================================================
 */

export async function createProject(
  request: CreateProjectRequest
):
Promise<Project> {

  return apiPost<Project>(
    "/api/v1/projects",
    request
  );
}