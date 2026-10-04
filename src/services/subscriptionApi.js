import { apiGet } from "./apiFetch";
export async function getSubscription(organizationId) {
    return apiGet(`/api/v1/organizations/${organizationId}/subscription`);
}
