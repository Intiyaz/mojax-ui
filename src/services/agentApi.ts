import {
  apiGet
} from "./apiFetch";


export type AgentDefinition = {
  id?: string;

  code: string;

  name: string;

  description?: string;

  category?: string;

  enabled?: boolean;

  version?: string;
};


/*
 * ============================================================
 * GET ALL AGENTS
 * ============================================================
 */

export async function getAgents():
Promise<AgentDefinition[]> {

  return apiGet<AgentDefinition[]>(
    "/api/v1/agents"
  );
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

export async function getAgent(
  agentCode: string
):
Promise<AgentDefinition> {

  if (!agentCode) {

    throw new Error(
      "Agent code is required."
    );
  }


  return apiGet<AgentDefinition>(
    `/api/v1/agents/${encodeURIComponent(
      agentCode
    )}`
  );
}