export type SubscriptionPlan = {
  code: string;
  name: string;
  scanLimit: number;
  price: number;
  currency: string;
};


export type RegistrationStartRequest = {
  name: string;
  email: string;
  password: string;
  organizationName: string;
  planCode: string;
};


export type RegistrationStartResponse = {
  registrationId: string;
  email: string;
  organizationName: string;
  planCode: string;
  planName: string;
  scanLimit: number;
  amount: number;
  currency: string;
  status: string;
};