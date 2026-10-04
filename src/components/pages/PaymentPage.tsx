import {
  useMemo,
  useState
} from "react";

import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

import {
  createPaymentOrder,
  verifyPayment
} from "../../services/registrationApi";

import type {
  RegistrationStartResponse
} from "../../types/registration";


type LocationState = {
  registration?: RegistrationStartResponse;
};


type RazorpayPaymentResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};


declare global {

  interface Window {

    Razorpay: new (
      options: Record<string, unknown>
    ) => {
      open: () => void;
    };

  }

}


export default function PaymentPage() {

  const navigate =
    useNavigate();


  const location =
    useLocation();


  const {
    registrationId
  } =
    useParams();


  const registration =
    useMemo(
      () =>
        resolveRegistration(
          location.state as
            LocationState | null,
          registrationId
        ),
      [
        location.state,
        registrationId
      ]
    );


  const [
    processingPayment,
    setProcessingPayment
  ] =
    useState(false);


  const [
    paymentError,
    setPaymentError
  ] =
    useState<string | null>(
      null
    );


  async function startPayment() {

    if (!registration) {
      return;
    }


    try {

      setProcessingPayment(
        true
      );


      setPaymentError(
        null
      );


      /*
       * Create Razorpay order.
       *
       * Backend determines the trusted
       * amount from PendingRegistration.
       */
      const order =
        await createPaymentOrder(
          registration.registrationId
        );


      /*
       * Load Razorpay checkout script.
       */
      const loaded =
        await loadRazorpayScript();


      if (!loaded) {

        throw new Error(
          "Unable to load Razorpay Checkout. Please try again."
        );
      }


      /*
       * Razorpay Checkout configuration.
       */
      const options: Record<string, unknown> = {

        key:
          order.keyId,

        amount:
          order.amountPaise,

        currency:
          order.currency,

        name:
          "MoJaX",

        description:
          registration.planName,

        order_id:
          order.razorpayOrderId,


        prefill: {

          email:
            registration.email
        },


        notes: {

          registrationId:
            registration.registrationId,

          planCode:
            registration.planCode,

          organizationName:
            registration.organizationName
        },


        theme: {

          color:
            "#2859a7"
        },


        /*
         * Razorpay calls this after the
         * checkout succeeds.
         *
         * We then call our backend to
         * verify the HMAC signature.
         */
        handler: async function (
          response:
            RazorpayPaymentResponse
        ) {

          try {

            setProcessingPayment(
              true
            );


            setPaymentError(
              null
            );


            const verification =
              await verifyPayment({

                registrationId:
                  registration
                    .registrationId,

                razorpayOrderId:
                  response
                    .razorpay_order_id,

                razorpayPaymentId:
                  response
                    .razorpay_payment_id,

                razorpaySignature:
                  response
                    .razorpay_signature
              });


            if (
              !verification.verified
            ) {

              throw new Error(
                "Payment could not be verified."
              );
            }


            /*
             * Registration has now been
             * activated by the backend.
             */
            sessionStorage.removeItem(
              "mojax.pendingRegistration"
            );


            navigate(
              "/login",
              {

                replace:
                  true,

                state: {

                  registrationComplete:
                    true,

                  paymentComplete:
                    true,

                  email:
                    registration.email
                }
              }
            );

          } catch (error) {

            setPaymentError(

              error instanceof Error
                ? error.message
                : "Payment verification failed."

            );


            setProcessingPayment(
              false
            );
          }
        },


        /*
         * User manually closes Checkout.
         */
        modal: {

          ondismiss: function () {

            setProcessingPayment(
              false
            );

          },

          escape:
            true
        }
      };


      const razorpay =
        new window.Razorpay(
          options
        );


      razorpay.open();


      /*
       * Don't reset processingPayment here.
       *
       * It will be reset either:
       *
       * - when modal is dismissed
       * - verification fails
       * - page redirects after success
       */

    } catch (error) {

      setPaymentError(

        error instanceof Error
          ? error.message
          : "Unable to start payment."

      );


      setProcessingPayment(
        false
      );
    }
  }


  /*
   * ============================================================
   * REGISTRATION NOT AVAILABLE
   * ============================================================
   */

  if (!registration) {

    return (

      <div className="payment-page">

        <div className="payment-card">


          <div
            className=
              "payment-status-icon warning"
          >

            !

          </div>


          <div className="payment-brand">

            MoJaX

          </div>


          <h1>

            Registration not found

          </h1>


          <p className="payment-description">

            We could not find your pending
            registration information.

            Please start the registration
            process again.

          </p>


          <button
            type="button"
            className=
              "registration-primary-button"
            onClick={
              () =>
                navigate(
                  "/register"
                )
            }
          >

            Start Registration

          </button>

        </div>

      </div>
    );
  }


  /*
   * ============================================================
   * FREE PLAN
   * ============================================================
   *
   * Normally the registration page should
   * activate the FREE plan directly and
   * therefore this page shouldn't be reached.
   */

  if (
    registration.amount === 0
  ) {

    return (

      <div className="payment-page">

        <div className="payment-card">


          <div className="payment-brand">

            MoJaX

          </div>


          <div className="payment-step">

            FREE PLAN

          </div>


          <h1>

            No payment required

          </h1>


          <p className="payment-description">

            Your selected MoJaX plan is free.

            Razorpay payment is not required
            for this registration.

          </p>


          <div className="payment-summary">


            <PaymentRow
              label="Organization"
              value={
                registration
                  .organizationName
              }
            />


            <PaymentRow
              label="Plan"
              value={
                registration.planName
              }
            />


            <PaymentRow
              label="Project scans"
              value={
                String(
                  registration.scanLimit
                )
              }
            />


            <PaymentRow
              label="Amount"
              value="FREE"
              strong
            />


          </div>


          <button
            type="button"
            className=
              "registration-primary-button"
            onClick={
              () =>
                navigate(
                  "/login"
                )
            }
          >

            Continue to Login

          </button>

        </div>

      </div>
    );
  }


  /*
   * ============================================================
   * PAID PLAN
   * ============================================================
   */

  return (

    <div className="payment-page">

      <div className="payment-card">


        {/* BRAND */}

        <div className="payment-brand">

          MoJaX

        </div>


        {/* STEP */}

        <div className="payment-step">

          STEP 4 OF 4

        </div>


        <h1>

          Complete your payment

        </h1>


        <p className="payment-description">

          Review your subscription details
          and complete the payment securely
          using Razorpay.

        </p>


        {/* PAYMENT SUMMARY */}

        <div className="payment-summary">


          <PaymentRow
            label="Organization"
            value={
              registration
                .organizationName
            }
          />


          <PaymentRow
            label="Plan"
            value={
              registration.planName
            }
          />


          <PaymentRow
            label="Project scans"
            value={
              String(
                registration.scanLimit
              )
            }
          />


          <PaymentRow
            label="Email"
            value={
              registration.email
            }
          />


          <div
            className="payment-divider"
          />


          <PaymentRow
            label="Amount"
            value={
              `₹${formatAmount(
                registration.amount
              )}`
            }
            strong
          />


        </div>


        {/* REGISTRATION STATUS */}

        <div className="payment-pending">

          <span
            className=
              "payment-pending-dot"
          />


          Registration status:
          {" "}

          <strong>

            {
              formatStatus(
                registration.status
              )
            }

          </strong>

        </div>


        {/* ERROR */}

        {paymentError && (

          <div
            className=
              "registration-error"
          >

            {paymentError}

          </div>

        )}


        {/* PAY BUTTON */}

        <button
          type="button"
          className=
            "payment-button active"
          disabled={
            processingPayment
          }
          onClick={
            startPayment
          }
        >

          {
            processingPayment
              ?
              "Processing..."
              :
              `Pay ₹${formatAmount(
                registration.amount
              )}`
          }

        </button>


        <p className="payment-note">

          Your payment is processed securely
          by Razorpay.

          Your MoJaX account will be activated
          only after the payment response has
          been verified by our server.

        </p>


        {/* REGISTRATION ID */}

        <div
          className=
            "payment-registration-id"
        >

          Registration ID:
          {" "}

          <code>

            {
              registration
                .registrationId
            }

          </code>

        </div>


      </div>

    </div>
  );
}


/*
 * ==============================================================
 * PAYMENT ROW
 * ==============================================================
 */

function PaymentRow({
  label,
  value,
  strong = false
}: {

  label: string;

  value: string;

  strong?: boolean;

}) {

  return (

    <div className="payment-row">

      <span>

        {label}

      </span>


      {
        strong
          ?
          (

            <strong
              className=
                "payment-total"
            >

              {value}

            </strong>

          )
          :
          (

            <strong>

              {value}

            </strong>

          )
      }

    </div>
  );
}


/*
 * ==============================================================
 * RESOLVE REGISTRATION
 * ==============================================================
 *
 * First try React Router state.
 *
 * If the user refreshes the browser,
 * Router state may disappear.
 *
 * Therefore sessionStorage acts as
 * the fallback.
 */

function resolveRegistration(

  state:
    LocationState | null,

  registrationId?:
    string

): RegistrationStartResponse | null {


  /*
   * Try router state.
   */
  if (
    state?.registration
    &&
    (
      !registrationId
      ||
      state.registration
        .registrationId
        === registrationId
    )
  ) {

    return state.registration;
  }


  /*
   * Try sessionStorage.
   */
  try {

    const stored =
      sessionStorage.getItem(
        "mojax.pendingRegistration"
      );


    if (!stored) {

      return null;
    }


    const parsed =
      JSON.parse(
        stored
      ) as RegistrationStartResponse;


    /*
     * Protect against opening a payment URL
     * belonging to a different registration.
     */
    if (
      registrationId
      &&
      parsed.registrationId
        !== registrationId
    ) {

      return null;
    }


    return parsed;

  } catch {

    return null;
  }
}


/*
 * ==============================================================
 * LOAD RAZORPAY SCRIPT
 * ==============================================================
 */

function loadRazorpayScript():
Promise<boolean> {

  return new Promise(
    resolve => {


      /*
       * Already available.
       */
      if (
        typeof window.Razorpay
        !== "undefined"
      ) {

        resolve(
          true
        );

        return;
      }


      /*
       * Check whether another part of
       * the app already added the script.
       */
      const existingScript =
        document.querySelector(
          'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
        );


      if (existingScript) {

        /*
         * It may already be loaded.
         */
        if (
          typeof window.Razorpay
          !== "undefined"
        ) {

          resolve(
            true
          );

          return;
        }


        existingScript.addEventListener(
          "load",
          () => {

            resolve(
              typeof window.Razorpay
              !== "undefined"
            );

          },
          {
            once: true
          }
        );


        existingScript.addEventListener(
          "error",
          () => {

            resolve(
              false
            );

          },
          {
            once: true
          }
        );


        return;
      }


      /*
       * Add Razorpay Checkout.
       */
      const script =
        document.createElement(
          "script"
        );


      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";


      script.async =
        true;


      script.onload =
        () => {

          resolve(
            typeof window.Razorpay
            !== "undefined"
          );

        };


      script.onerror =
        () => {

          resolve(
            false
          );

        };


      document.body.appendChild(
        script
      );
    }
  );
}


/*
 * ==============================================================
 * FORMAT AMOUNT
 * ==============================================================
 */

function formatAmount(
  amount: number
) {

  return new Intl.NumberFormat(
    "en-IN",
    {
      maximumFractionDigits: 0
    }
  ).format(
    amount ?? 0
  );
}


/*
 * ==============================================================
 * FORMAT STATUS
 * ==============================================================
 */

function formatStatus(
  status?: string
) {

  if (!status) {
    return "Pending";
  }


  return status
    .replaceAll(
      "_",
      " "
    )
    .toLowerCase()
    .replace(
      /\b\w/g,
      character =>
        character.toUpperCase()
    );
}