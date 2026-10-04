export async function getOrganizationDashboard(organizationId) {
    const response = await fetch(`/api/v1/organizations/${organizationId}/dashboard`);
    if (!response.ok) {
        throw new Error(`Unable to load dashboard: ${response.status}`);
    }
    return response.json();
}
async function parseResponse(response) {
    if (!response.ok) {
        let message = `${response.status} ${response.statusText}`;
        try {
            const error = await response.json();
            if (error?.message) {
                message = error.message;
            }
        }
        catch {
            // ignore JSON parse failure
        }
        throw new Error(message);
    }
    return response.json();
}
// -----------------------------------------------------
// Agents
// -----------------------------------------------------
export async function listAgents() {
    const response = await fetch("/api/v1/agents");
    if (!response.ok) {
        throw new Error(`Failed to load agents: ${response.status}`);
    }
    return response.json();
}
// -----------------------------------------------------
// ORGANIZATIONS
// -----------------------------------------------------
export async function listOrganizations() {
    const response = await fetch("/api/v1/organizations");
    return parseResponse(response);
}
export async function createOrganization(request) {
    const response = await fetch("/api/v1/organizations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    });
    return parseResponse(response);
}
// -----------------------------------------------------
// PROJECTS
// -----------------------------------------------------
export async function listProjects(organizationId) {
    const url = organizationId
        ? `/api/v1/projects?organizationId=${organizationId}`
        : "/api/v1/projects";
    const response = await fetch(url);
    return parseResponse(response);
}
export async function createProject(request) {
    const response = await fetch("/api/v1/projects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    });
    return parseResponse(response);
}
// -----------------------------------------------------
// ASSESSMENTS
// -----------------------------------------------------
export async function listAssessments(projectId, agentCode) {
    const params = new URLSearchParams();
    if (projectId) {
        params.set("projectId", projectId);
    }
    if (agentCode) {
        params.set("agentCode", agentCode);
    }
    const query = params.toString();
    const url = query
        ? `/api/v1/assessments?${query}`
        : "/api/v1/assessments";
    const response = await fetch(url);
    return parseResponse(response);
}
export async function getAssessment(id) {
    const response = await fetch(`/api/v1/assessments/${id}`);
    return parseResponse(response);
}
export async function runAssessment(projectId, agentCode) {
    const response = await fetch("/api/v1/assessments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            projectId,
            agentCode
        })
    });
    return parseResponse(response);
}
// -----------------------------------------------------
// DASHBOARD
// -----------------------------------------------------
export async function getDashboardSummary() {
    const response = await fetch("/api/v1/dashboard/summary");
    return parseResponse(response);
}
