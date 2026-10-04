import {
  apiGet
} from "./apiFetch";


export type Subscription = {

  subscriptionId: string;

  organizationId: string;

  planCode: string;

  scanLimit: number;

  scansUsed: number;

  scansRemaining: number;

  amountPaid: number;

  currency: string;

  activatedAt: string;
};


export async function getSubscription(
  organizationId: string
): Promise<Subscription> {

  return apiGet<Subscription>(
    `/api/v1/organizations/${organizationId}/subscription`
  );
}