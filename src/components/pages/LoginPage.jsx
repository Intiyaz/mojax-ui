import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { login } from "../../services/authApi";
import { useOrganization } from "../../context/OrganizationContext";
export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { refreshOrganization } = useOrganization();
    const state = location.state;
    const [email, setEmail] = useState(state?.email ?? "");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    /*
     * Prefill email after registration/payment.
     */
    useEffect(() => {
        if (state?.email
            &&
                !email) {
            setEmail(state.email);
        }
    }, [
        state?.email,
        email
    ]);
    async function handleSubmit(event) {
        event.preventDefault();
        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }
        if (!password) {
            setError("Please enter your password.");
            return;
        }
        try {
            setSubmitting(true);
            setError(null);
            /*
             * authApi.login(...)
             *
             * This calls:
             *
             * POST /api/v1/auth/login
             *
             * and stores the JWT.
             */
            await login(email.trim(), password);
            /*
             * Authentication succeeded.
             */
            await refreshOrganization();
            navigate("/dashboard", {
                replace: true
            });
        }
        catch (err) {
            setError(getLoginError(err));
        }
        finally {
            setSubmitting(false);
        }
    }
    return (<div className="login-page">


      {/* BACKGROUND DECORATIONS */}

      <div className="login-decoration decoration-one"/>


      <div className="login-decoration decoration-two"/>


      {/* BACK TO HOME */}

      <button type="button" className="login-home-link" onClick={() => navigate("/")}>

        ← Back to Home

      </button>


      <div className="login-layout">


        {/* ===================================================
            LEFT SIDE
            =================================================== */}

        <section className="login-story">


          {/* BRAND */}

          <div className="login-brand">

            <div className="login-brand-icon">

              M

            </div>


            <div>

              <strong>

                MoJaX

              </strong>


              <span>

                MODERN JAVA EXPERIENCE

              </span>

            </div>

          </div>


          {/* STORY */}

          <div className="login-kicker">

            ENTERPRISE JAVA MODERNIZATION

          </div>


          <h1>

            Modernize.
            <br />

            Secure.
            <br />

            Move Forward.

          </h1>


          <p>

            MoJaX helps teams assess legacy Java
            applications, identify modernization
            opportunities, understand technical and
            security risks, and generate actionable
            remediation guidance.

          </p>


          {/* FLOW */}

          <div className="login-flow">


            <div className="login-flow-item">

              <span>

                01

              </span>


              <strong>

                Assess

              </strong>

            </div>


            <div className="login-flow-item">

              <span>

                02

              </span>


              <strong>

                Analyze

              </strong>

            </div>


            <div className="login-flow-item">

              <span>

                03

              </span>


              <strong>

                Prioritize

              </strong>

            </div>


            <div className="login-flow-item">

              <span>

                04

              </span>


              <strong>

                Modernize

              </strong>

            </div>

          </div>


          {/* PRINCIPLE */}

          <div className="login-principle">

            <span>

              ◆

            </span>


            <div>

              <strong>

                Evidence-driven modernization

              </strong>


              <p>

                Deterministic analysis,
                modernization intelligence,
                security assessment and
                actionable reporting.

              </p>

            </div>

          </div>

        </section>


        {/* ===================================================
            RIGHT SIDE
            =================================================== */}

        <main className="login-card">


          <div className="login-card-top">


            <div className="login-card-icon">

              ↗

            </div>


            <h2>

              Welcome to MoJaX

            </h2>


            <p>

              Sign in to continue to your
              MoJaX workspace.

            </p>

          </div>


          {/* ===============================================
            REGISTRATION SUCCESS
            =============================================== */}

          {state?.registrationComplete
            &&
                (<div className="login-success">

                <strong>

                  Account created successfully.

                </strong>


                <p>

                  {state.paymentComplete
                        ?
                            "Payment verified. You can now sign in."
                        :
                            state.freePlan
                                ?
                                    "Your Free plan is ready. You can now sign in."
                                :
                                    "You can now sign in."}

                </p>

              </div>)}


          {/* ===============================================
            LOGIN FORM
            =============================================== */}

          <form className="login-form" onSubmit={handleSubmit}>


            {/* EMAIL */}

            <label>

              <span>

                Email address

              </span>


              <input type="email" value={email} placeholder="you@company.com" autoComplete="email" disabled={submitting} onChange={event => {
            setEmail(event.target.value);
            setError(null);
        }}/>

            </label>


            {/* PASSWORD */}

            <label>

              <span>

                Password

              </span>


              <input type="password" value={password} placeholder="Enter your password" autoComplete="current-password" disabled={submitting} onChange={event => {
            setPassword(event.target.value);
            setError(null);
        }}/>

            </label>


            {/* ERROR */}

            {error
            &&
                (<div className="login-error">

                  {error}

                </div>)}


            {/* SIGN IN */}

            <button type="submit" className="login-submit" disabled={submitting}>

              {submitting
            ?
                "Signing in..."
            :
                "Sign in to MoJaX"}


              {!submitting
            &&
                (<span>

                    →

                  </span>)}

            </button>

          </form>


          {/* ===============================================
            CREATE ACCOUNT
            =============================================== */}

          <div className="login-register">

            <span>

              Don't have a MoJaX account?

            </span>


            <button type="button" onClick={() => navigate("/register")}>

              Create account

            </button>

          </div>


          {/* ===============================================
            SECURE ACCESS NOTICE
            =============================================== */}

          <div className="demo-login-notice">

            <span>

              SECURE ACCESS

            </span>


            <p>

              Your account provides secure access
              to your organization's projects,
              assessments and modernization reports.

            </p>

          </div>

        </main>

      </div>

    </div>);
}
/*
 * =============================================================
 * LOGIN ERROR MESSAGE
 * =============================================================
 */
function getLoginError(error) {
    if (error instanceof Error) {
        const message = error.message
            .toLowerCase();
        if (message.includes("invalid email")
            ||
                message.includes("invalid username")
            ||
                message.includes("bad credentials")
            ||
                message.includes("unauthorized")
            ||
                message.includes("401")) {
            return "Invalid email or password.";
        }
        return error.message;
    }
    return "Unable to sign in. Please try again.";
}
