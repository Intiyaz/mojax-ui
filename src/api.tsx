import type {
  Organization,
  Project,
  Assessment,
  DashboardSummary,
  Agent
} from "./types";

import type {
  OrganizationDashboard
} from "./types";

export async function getOrganizationDashboard(
  organizationId: string
): Promise<OrganizationDashboard> {

  const response =
    await fetch(
      `/api/v1/organizations/${organizationId}/dashboard`
    );


  if (!response.ok) {

    throw new Error(
      `Unable to load dashboard: ${response.status}`
    );
  }


  return response.json();
}

async function parseResponse<T>(
  response: Response
): Promise<T> {

  if (!response.ok) {

    let message =
      `${response.status} ${response.statusText}`;

    try {

      const error = await response.json();

      if (error?.message) {
        message = error.message;
      }

    } catch {
      // ignore JSON parse failure
    }

    throw new Error(message);
  }

  return response.json();
}

// -----------------------------------------------------
// Agents
// -----------------------------------------------------

export async function listAgents():
Promise<Agent[]> {

  const response =
    await fetch("/api/v1/agents");

  if (!response.ok) {
    throw new Error(
      `Failed to load agents: ${response.status}`
    );
  }

  return response.json();
}

// -----------------------------------------------------
// ORGANIZATIONS
// -----------------------------------------------------

export async function listOrganizations():
Promise<Organization[]> {

  const response =
    await fetch("/api/v1/organizations");

  return parseResponse<Organization[]>(
    response
  );
}


export async function createOrganization(
  request: {
    name: string;
    description?: string;
  }
): Promise<Organization> {

  const response =
    await fetch(
      "/api/v1/organizations",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(request)
      }
    );

  return parseResponse<Organization>(
    response
  );
}


// -----------------------------------------------------
// PROJECTS
// -----------------------------------------------------

export async function listProjects(
  organizationId?: string
): Promise<Project[]> {

  const url =
    organizationId
      ? `/api/v1/projects?organizationId=${organizationId}`
      : "/api/v1/projects";

  const response =
    await fetch(url);

  return parseResponse<Project[]>(
    response
  );
}


export async function createProject(
  request: {
    organizationId: string;
    name: string;
    description?: string;
    repositoryUrl: string;
    defaultBranch?: string;
  }
): Promise<Project> {

  const response =
    await fetch(
      "/api/v1/projects",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(request)
      }
    );

  return parseResponse<Project>(
    response
  );
}


// -----------------------------------------------------
// ASSESSMENTS
// -----------------------------------------------------

export async function listAssessments(
  projectId?: string,
  agentCode?: string
): Promise<Assessment[]> {

  const params =
    new URLSearchParams();

  if (projectId) {
    params.set(
      "projectId",
      projectId
    );
  }

  if (agentCode) {
    params.set(
      "agentCode",
      agentCode
    );
  }

  const query =
    params.toString();

  const url =
    query
      ? `/api/v1/assessments?${query}`
      : "/api/v1/assessments";

  const response =
    await fetch(url);

  return parseResponse<Assessment[]>(
    response
  );
}


export async function getAssessment(
  id: string
): Promise<Assessment> {

  const response =
    await fetch(
      `/api/v1/assessments/${id}`
    );

  return parseResponse<Assessment>(
    response
  );
}


export async function runAssessment(
  projectId: string,
  agentCode: string
): Promise<Assessment> {

  const response =
    await fetch(
      "/api/v1/assessments",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          projectId,
          agentCode
        })
      }
    );

  return parseResponse<Assessment>(
    response
  );
}


// -----------------------------------------------------
// DASHBOARD
// -----------------------------------------------------

export async function getDashboardSummary():
Promise<DashboardSummary> {

  const response =
    await fetch(
      "/api/v1/dashboard/summary"
    );

  return parseResponse<DashboardSummary>(
    response
  );
}