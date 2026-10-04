import { apiGet } from "./apiFetch";
/*
 * ============================================================
 * GET ALL AGENTS
 * ============================================================
 */
export async function getAgents() {
    return apiGet("/api/v1/agents");
}
/*
 * ============================================================
 * GET AGENT
 * ============================================================
 *
 * Keep this only if your backend supports:
 *
 * GET /api/v1/agents/{code}
 */
export async function getAgent(agentCode) {
    if (!agentCode) {
        throw new Error("Agent code is required.");
    }
    return apiGet(`/api/v1/agents/${encodeURIComponent(agentCode)}`);
}
