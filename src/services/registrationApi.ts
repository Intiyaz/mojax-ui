import type {
  RegistrationStartRequest,
  RegistrationStartResponse,
  SubscriptionPlan
} from "../types/registration";


//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const API_BASE_URL = "https://engineeringai-java-modernization.victoriouscliff-8a4c40e2.southindia.azurecontainerapps.io";
//const API_BASE_URL = "http://localhost:8080";
export async function login(
  email: string,
  password: string
) {

  const response =
    await fetch(
      `${API_BASE_URL}/api/v1/auth/login`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          email,
          password
        })
      }
    );


  if (!response.ok) {

    throw new Error(
      "Invalid email or password."
    );
  }


  return response.json();
}

export async function getPlans():
Promise<SubscriptionPlan[]> {

  const response =
    await fetch(
      `${API_BASE_URL}/api/v1/plans`
    );


  if (!response.ok) {

    const message =
      await readError(response);

    throw new Error(
      message || "Unable to load subscription plans."
    );
  }


  return response.json();
}


export async function startRegistration(
  request: RegistrationStartRequest
): Promise<RegistrationStartResponse> {

  const response =
    await fetch(
      `${API_BASE_URL}/api/v1/registration/start`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify(
          request
        )
      }
    );


  if (!response.ok) {

    const message =
      await readError(response);

    throw new Error(
      message || "Unable to start registration."
    );
  }


  return response.json();
}


async function readError(
  response: Response
): Promise<string> {

  try {

    const contentType =
      response.headers.get(
        "content-type"
      );


    if (
      contentType?.includes(
        "application/json"
      )
    ) {

      const body =
        await response.json();


      return (
        body.message ??
        body.error ??
        body.detail ??
        JSON.stringify(body)
      );
    }


    return await response.text();

  } catch {

    return "";
  }
}

export type RegistrationActivationResponse = {
  registrationId: string;

  userId: string;

  organizationId: string;

  subscriptionId: string;

  email: string;

  organizationName: string;

  planCode: string;

  scanLimit: number;

  scansUsed: number;

  status: string;
};


export async function activateRegistration(
  registrationId: string
): Promise<RegistrationActivationResponse> {

  const response =
    await fetch(
      `${API_BASE_URL}/api/v1/registration/${registrationId}/activate`,
      {
        method: "POST"
      }
    );


  if (!response.ok) {

    const message =
      await readError(response);

    throw new Error(
      message ||
      "Unable to activate registration."
    );
  }


  return response.json();
}

export type CreatePaymentOrderResponse = {
  paymentTransactionId: string;
  registrationId: string;
  razorpayOrderId: string;
  keyId: string;
  amount: number;
  amountPaise: number;
  currency: string;
  status: string;
};

export async function createPaymentOrder(
  registrationId: string
): Promise<CreatePaymentOrderResponse> {

  const response =
    await fetch(
      `${API_BASE_URL}/api/v1/payments/create-order`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          registrationId
        })
      }
    );


  if (!response.ok) {

    const message =
      await readError(response);

    throw new Error(
      message || "Unable to create payment order."
    );
  }


  return response.json();
}

export type VerifyPaymentRequest = {

  registrationId: string;

  razorpayOrderId: string;

  razorpayPaymentId: string;

  razorpaySignature: string;
};


export type VerifyPaymentResponse = {

  verified: boolean;

  registrationId: string;

  paymentTransactionId: string;

  userId: string;

  organizationId: string;

  subscriptionId: string;

  paymentId: string;

  status: string;
};


export async function verifyPayment(
  request: VerifyPaymentRequest
): Promise<VerifyPaymentResponse> {

  const response =
    await fetch(
      `${API_BASE_URL}/api/v1/payments/verify`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify(
            request
          )
      }
    );


  if (!response.ok) {

    const message =
      await readError(
        response
      );


    throw new Error(
      message ||
      "Payment verification failed."
    );
  }


  return response.json();
}