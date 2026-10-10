import { apiGet, apiPost } from "./apiFetch";
/*
 * ============================================================
 * GET ASSESSMENTS
 * ============================================================
 */
export async function getAssessments() {
    return apiGet("/api/v1/assessments");
}
/*
 * ============================================================
 * GET ONE ASSESSMENT
 * ============================================================
 */
export async function getAssessment(assessmentId) {
    if (!assessmentId) {
        throw new Error("Assessment id is required.");
    }
    return apiGet(`/api/v1/assessments/${assessmentId}`);
}
/*
 * ============================================================
 * RUN ASSESSMENT
 * ============================================================
 */
export async function runAssessment(
    projectId,
    agentCode,
    parameters = {}
) {

    if (!projectId) {

        throw new Error(
            "Project id is required."
        );
    }


    if (!agentCode) {

        throw new Error(
            "Agent code is required."
        );
    }


    return apiPost(
        "/api/v1/assessments",
        {
            projectId,
            agentCode,
            parameters
        }
    );
}
