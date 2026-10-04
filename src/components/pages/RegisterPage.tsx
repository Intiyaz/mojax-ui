import {
  FormEvent,
  useEffect,
  useMemo,
  useState
} from "react";

import "../styles/register.css";

import {
  useNavigate
} from "react-router-dom";

import {
  getPlans,
  startRegistration
} from "../../services/registrationApi";

import type {
  RegistrationStartRequest,
  SubscriptionPlan
} from "../../types/registration";


type RegistrationForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  organizationName: string;
  planCode: string;
};


const initialForm: RegistrationForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  organizationName: "",
  planCode: ""
};


export default function RegisterPage() {

  const navigate =
    useNavigate();


  const [
    step,
    setStep
  ] =
    useState(1);


  const [
    form,
    setForm
  ] =
    useState<RegistrationForm>(
      initialForm
    );


  const [
    plans,
    setPlans
  ] =
    useState<SubscriptionPlan[]>(
      []
    );


  const [
    loadingPlans,
    setLoadingPlans
  ] =
    useState(true);


  const [
    submitting,
    setSubmitting
  ] =
    useState(false);


  const [
    error,
    setError
  ] =
    useState<string | null>(
      null
    );


  useEffect(() => {

    loadPlans();

  }, []);


  async function loadPlans() {

    try {

      setLoadingPlans(true);
      setError(null);


      const data =
        await getPlans();


      setPlans(
        data
      );


      if (
        data.length > 0
      ) {

        setForm(
          current => ({
            ...current,

            planCode:
              current.planCode ||
              data[0].code
          })
        );
      }

    } catch (err) {

      setError(
        getErrorMessage(
          err,
          "Unable to load plans."
        )
      );

    } finally {

      setLoadingPlans(false);
    }
  }


  const selectedPlan =
    useMemo(
      () =>
        plans.find(
          plan =>
            plan.code ===
            form.planCode
        ),
      [
        plans,
        form.planCode
      ]
    );


  function updateField(
    field:
      keyof RegistrationForm,
    value: string
  ) {

    setForm(
      current => ({
        ...current,
        [field]: value
      })
    );


    setError(null);
  }


  function goToOrganization() {

    if (
      !form.name.trim()
    ) {

      setError(
        "Please enter your name."
      );

      return;
    }


    if (
      !isValidEmail(
        form.email
      )
    ) {

      setError(
        "Please enter a valid email address."
      );

      return;
    }


    if (
      form.password.length < 8
    ) {

      setError(
        "Password must contain at least 8 characters."
      );

      return;
    }


    if (
      form.password !==
      form.confirmPassword
    ) {

      setError(
        "Passwords do not match."
      );

      return;
    }


    setError(null);
    setStep(2);
  }


  function goToPlans() {

    if (
      !form.organizationName
        .trim()
    ) {

      setError(
        "Please enter your organization name."
      );

      return;
    }


    setError(null);
    setStep(3);
  }


  async function submitRegistration(
    event: FormEvent
  ) {

    event.preventDefault();


    if (
      !form.planCode
    ) {

      setError(
        "Please select a plan."
      );

      return;
    }


    try {

      setSubmitting(true);
      setError(null);


      const request:
        RegistrationStartRequest = {

        name:
          form.name.trim(),

        email:
          form.email
            .trim()
            .toLowerCase(),

        password:
          form.password,

        organizationName:
          form.organizationName
            .trim(),

        planCode:
          form.planCode
      };


      const registration =
        await startRegistration(
          request
        );


      sessionStorage.setItem(
        "mojax.pendingRegistration",
        JSON.stringify(
          registration
        )
      );


      navigate(
        `/payment/${registration.registrationId}`,
        {
          state: {
            registration
          }
        }
      );

    } catch (err) {

      setError(
        getErrorMessage(
          err,
          "Registration could not be started."
        )
      );

    } finally {

      setSubmitting(false);
    }
  }


  return (
    <div className="registration-page">

      <div className="registration-shell">

        <RegistrationBrand />


        <main className="registration-card">

          <RegistrationProgress
            step={step}
          />


          {error && (

            <div className="registration-error">

              {error}

            </div>

          )}


          {step === 1 && (

            <AccountStep

              form={form}

              updateField={
                updateField
              }

              onNext={
                goToOrganization
              }

            />

          )}


          {step === 2 && (

            <OrganizationStep

              organizationName={
                form.organizationName
              }

              onChange={
                value =>
                  updateField(
                    "organizationName",
                    value
                  )
              }

              onBack={
                () => setStep(1)
              }

              onNext={
                goToPlans
              }

            />

          )}


          {step === 3 && (

            <PlanStep

              plans={plans}

              selectedPlanCode={
                form.planCode
              }

              selectedPlan={
                selectedPlan
              }

              loading={
                loadingPlans
              }

              submitting={
                submitting
              }

              onSelect={
                code =>
                  updateField(
                    "planCode",
                    code
                  )
              }

              onBack={
                () => setStep(2)
              }

              onSubmit={
                submitRegistration
              }

            />

          )}

        </main>

      </div>

    </div>
  );
}


function RegistrationBrand() {

  return (
    <aside className="registration-brand">

      <div className="registration-logo">
        MoJaX
      </div>


      <h1>
        Modernize Java with intelligence.
      </h1>


      <p>
        Assess Java applications,
        identify modernization opportunities,
        understand security risks and produce
        actionable remediation guidance.
      </p>


      <div className="registration-brand-points">

        <span>
          Java modernization
        </span>

        <span>
          PQC readiness
        </span>

        <span>
          Enterprise assessment
        </span>

        <span>
          Actionable reports
        </span>

      </div>

    </aside>
  );
}


function RegistrationProgress({
  step
}: {
  step: number;
}) {

  return (
    <div className="registration-progress">

      <ProgressItem
        number={1}
        label="Account"
        active={step >= 1}
        current={step === 1}
      />


      <ProgressLine
        active={step >= 2}
      />


      <ProgressItem
        number={2}
        label="Organization"
        active={step >= 2}
        current={step === 2}
      />


      <ProgressLine
        active={step >= 3}
      />


      <ProgressItem
        number={3}
        label="Plan"
        active={step >= 3}
        current={step === 3}
      />


      <ProgressLine
        active={false}
      />


      <ProgressItem
        number={4}
        label="Payment"
        active={false}
        current={false}
      />

    </div>
  );
}


function ProgressItem({
  number,
  label,
  active,
  current
}: {
  number: number;
  label: string;
  active: boolean;
  current: boolean;
}) {

  return (
    <div
      className={
        [
          "registration-progress-item",

          active
            ? "active"
            : "",

          current
            ? "current"
            : ""
        ]
          .filter(Boolean)
          .join(" ")
      }
    >

      <span className="registration-progress-number">
        {number}
      </span>

      <span>
        {label}
      </span>

    </div>
  );
}


function ProgressLine({
  active
}: {
  active: boolean;
}) {

  return (
    <div
      className={
        `registration-progress-line ${
          active
            ? "active"
            : ""
        }`
      }
    />
  );
}


function AccountStep({
  form,
  updateField,
  onNext
}: {
  form: RegistrationForm;

  updateField: (
    field:
      keyof RegistrationForm,
    value: string
  ) => void;

  onNext: () => void;
}) {

  return (
    <section className="registration-step">

      <div className="registration-step-heading">

        <span className="registration-kicker">
          STEP 1 OF 4
        </span>

        <h2>
          Create your account
        </h2>

        <p>
          Enter the details you will use
          to access MoJaX.
        </p>

      </div>


      <div className="registration-form">

        <FormField
          label="Full Name"
          value={form.name}
          placeholder="Your name"
          onChange={
            value =>
              updateField(
                "name",
                value
              )
          }
        />


        <FormField
          label="Email"
          type="email"
          value={form.email}
          placeholder="you@company.com"
          onChange={
            value =>
              updateField(
                "email",
                value
              )
          }
        />


        <div className="registration-field-grid">

          <FormField
            label="Password"
            type="password"
            value={form.password}
            placeholder="Minimum 8 characters"
            onChange={
              value =>
                updateField(
                  "password",
                  value
                )
            }
          />


          <FormField
            label="Confirm Password"
            type="password"
            value={
              form.confirmPassword
            }
            placeholder="Repeat password"
            onChange={
              value =>
                updateField(
                  "confirmPassword",
                  value
                )
            }
          />

        </div>


        <div className="registration-actions right">

          <button
            type="button"
            className="registration-primary-button"
            onClick={onNext}
          >
            Continue
            <span>→</span>
          </button>

        </div>

      </div>

    </section>
  );
}


function OrganizationStep({
  organizationName,
  onChange,
  onBack,
  onNext
}: {
  organizationName: string;

  onChange: (
    value: string
  ) => void;

  onBack: () => void;

  onNext: () => void;
}) {

  return (
    <section className="registration-step">

      <div className="registration-step-heading">

        <span className="registration-kicker">
          STEP 2 OF 4
        </span>

        <h2>
          Your organization
        </h2>

        <p>
          Projects, assessments and scan usage
          will belong to this organization.
        </p>

      </div>


      <div className="registration-form">

        <FormField
          label="Organization Name"
          value={organizationName}
          placeholder="Example Technologies"
          onChange={onChange}
        />


        <div className="registration-info-card">

          <strong>
            Multiple users supported
          </strong>

          <p>
            Additional users can later be added
            to the same organization. Your plan
            is based on project scans rather than
            the number of users.
          </p>

        </div>


        <div className="registration-actions">

          <button
            type="button"
            className="registration-secondary-button"
            onClick={onBack}
          >
            ← Back
          </button>


          <button
            type="button"
            className="registration-primary-button"
            onClick={onNext}
          >
            Choose Plan
            <span>→</span>
          </button>

        </div>

      </div>

    </section>
  );
}


function PlanStep({
  plans,
  selectedPlanCode,
  selectedPlan,
  loading,
  submitting,
  onSelect,
  onBack,
  onSubmit
}: {
  plans: SubscriptionPlan[];

  selectedPlanCode: string;

  selectedPlan?: SubscriptionPlan;

  loading: boolean;

  submitting: boolean;

  onSelect: (
    code: string
  ) => void;

  onBack: () => void;

  onSubmit: (
    event: FormEvent
  ) => void;
}) {

  return (
    <form
      className="registration-step"
      onSubmit={onSubmit}
    >

      <div className="registration-step-heading">

        <span className="registration-kicker">
          STEP 3 OF 4
        </span>

        <h2>
          Choose your scan plan
        </h2>

        <p>
          Select the number of project scans
          your organization needs.
        </p>

      </div>


      {loading ? (

        <div className="registration-loading">
          Loading plans...
        </div>

      ) : (

        <div className="plan-grid">

          {plans.map(
            plan => (

              <button
                key={plan.code}
                type="button"
                className={
                  `plan-card ${
                    selectedPlanCode
                      === plan.code
                      ? "selected"
                      : ""
                  }`
                }
                onClick={
                  () =>
                    onSelect(
                      plan.code
                    )
                }
              >

                <div className="plan-card-top">

                  <span className="plan-name">
                    {plan.name}
                  </span>


                  {selectedPlanCode
                    === plan.code && (

                    <span className="plan-selected">
                      ✓
                    </span>

                  )}

                </div>


                <div className="plan-price">

                  <span className="plan-currency">
                    ₹
                  </span>

                  <strong>
                    {formatAmount(
                      plan.price
                    )}
                  </strong>

                </div>


                <div className="plan-description">

                  Up to{" "}
                  <strong>
                    {plan.scanLimit}
                  </strong>
                  {" "}
                  project scans

                </div>


                <div className="plan-users">

                  Multiple organization users

                </div>

              </button>

            )
          )}

        </div>

      )}


      {selectedPlan && (

        <div className="registration-order-summary">

          <div>

            <span>
              Selected plan
            </span>

            <strong>
              {selectedPlan.name}
            </strong>

          </div>


          <div>

            <span>
              Scan allowance
            </span>

            <strong>
              {selectedPlan.scanLimit}
            </strong>

          </div>


          <div>

            <span>
              Amount
            </span>

            <strong>
              ₹
              {formatAmount(
                selectedPlan.price
              )}
            </strong>

          </div>

        </div>

      )}


      <div className="registration-actions">

        <button
          type="button"
          className="registration-secondary-button"
          onClick={onBack}
          disabled={submitting}
        >
          ← Back
        </button>


        <button
          type="submit"
          className="registration-primary-button"
          disabled={
            submitting ||
            loading ||
            !selectedPlan
          }
        >

          {submitting
            ? "Creating Registration..."
            : "Continue to Payment"}

          {!submitting && (
            <span>→</span>
          )}

        </button>

      </div>

    </form>
  );
}


function FormField({
  label,
  value,
  type = "text",
  placeholder,
  onChange
}: {
  label: string;

  value: string;

  type?: string;

  placeholder?: string;

  onChange: (
    value: string
  ) => void;
}) {

  return (
    <label className="registration-field">

      <span>
        {label}
      </span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={
          type === "password"
            ? "new-password"
            : undefined
        }
        onChange={
          event =>
            onChange(
              event.target.value
            )
        }
      />

    </label>
  );
}


function isValidEmail(
  email: string
) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(
      email.trim()
    );
}


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


function getErrorMessage(
  error: unknown,
  fallback: string
) {

  return error instanceof Error
    ? error.message
    : fallback;
}