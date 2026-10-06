import {
    FormEvent,
    useEffect,
    useRef,
    useState
} from "react";

import { Link } from "react-router-dom";

import "../styles/contact.css";


type ContactCategory =
    | "PRODUCT_QUERY"
    | "TECHNICAL_ISSUE"
    | "FEEDBACK"
    | "OTHER";


type ContactResponse = {
    referenceNumber: string;
    status: string;
    createdAt: string;
};


declare global {

    interface Window {

        turnstile?: {

            render: (
                container: HTMLElement,
                options: {
                    sitekey: string;
                    theme?: "light" | "dark" | "auto";
                    size?: "normal" | "compact";
                    callback?: (token: string) => void;
                    "expired-callback"?: () => void;
                    "error-callback"?: () => void;
                }
            ) => string;

            reset: (
                widgetId?: string
            ) => void;
        };
    }
}


//const API_BASE_URL = "http://localhost:8080";
const  API_BASE_URL = "https://engineeringai-java-modernization.victoriouscliff-8a4c40e2.southindia.azurecontainerapps.io";

const TURNSTILE_SITE_KEY = "0x4AAAAAAFOPXeB37RiQRRrh";


export default function ContactUsPage() {

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [category, setCategory] =
        useState<ContactCategory>(
            "PRODUCT_QUERY"
        );

    const [subject, setSubject] =
        useState("");

    const [message, setMessage] =
        useState("");

    const [captchaToken, setCaptchaToken] =
        useState("");

    const [captchaError, setCaptchaError] =
        useState("");

    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState<ContactResponse | null>(
            null
        );


    const captchaContainerRef =
        useRef<HTMLDivElement | null>(
            null
        );

    const widgetIdRef =
        useRef<string | null>(
            null
        );


    /*
     * -------------------------------------------------------
     * Load Cloudflare Turnstile
     * -------------------------------------------------------
     */
    useEffect(() => {

        if (!TURNSTILE_SITE_KEY) {

            setCaptchaError(
                "CAPTCHA configuration is unavailable."
            );

            return;
        }


        function renderCaptcha() {

            if (
                !window.turnstile ||
                !captchaContainerRef.current ||
                widgetIdRef.current
            ) {

                return;
            }


            widgetIdRef.current =
                window.turnstile.render(
                    captchaContainerRef.current,
                    {

                        sitekey:
                            TURNSTILE_SITE_KEY,

                        theme: "light",

                        size: "normal",

                        callback: token => {

                            setCaptchaToken(
                                token
                            );

                            setCaptchaError("");
                        },

                        "expired-callback":
                            () => {

                                setCaptchaToken("");

                                setCaptchaError(
                                    "Verification expired. Please verify again."
                                );
                            },

                        "error-callback":
                            () => {

                                setCaptchaToken("");

                                setCaptchaError(
                                    "Verification failed. Please try again."
                                );
                            }
                    }
                );
        }


        /*
         * Script already loaded.
         */
        if (window.turnstile) {

            renderCaptcha();

            return;
        }


        /*
         * Avoid loading the script twice.
         */
        const existingScript =
            document.querySelector(
                'script[data-mojax-turnstile="true"]'
            );


        if (existingScript) {

            const interval =
                window.setInterval(
                    () => {

                        if (
                            window.turnstile
                        ) {

                            window.clearInterval(
                                interval
                            );

                            renderCaptcha();
                        }

                    },
                    150
                );


            return () => {

                window.clearInterval(
                    interval
                );
            };
        }


        const script =
            document.createElement(
                "script"
            );


        script.src =
            "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

        script.async = true;

        script.defer = true;

        script.dataset.mojaxTurnstile =
            "true";


        script.onload =
            renderCaptcha;


        document.head.appendChild(
            script
        );

    }, []);


    /*
     * -------------------------------------------------------
     * Submit
     * -------------------------------------------------------
     */
    async function submit(
        event: FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        setError("");
        setCaptchaError("");
        setSuccess(null);


        if (!captchaToken) {

            setCaptchaError(
                "Please complete the verification."
            );

            return;
        }


        setSubmitting(true);


        try {

            const response =
                await fetch(
                    `${API_BASE_URL}/api/v1/contact-requests`,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            name: name.trim(),
                            email: email
                                .trim()
                                .toLowerCase(),
                            category,
                            subject:
                                subject.trim(),
                            message:
                                message.trim(),

                            /*
                             * Verified by backend.
                             */
                            captchaToken
                        })
                    }
                );


            if (!response.ok) {

                let message =
                    "We could not submit your request. Please try again.";


                try {

                    const data =
                        await response.json();


                    if (
                        typeof data?.message ===
                        "string"
                    ) {

                        message =
                            data.message;
                    }

                } catch {

                    // Keep default message.
                }


                throw new Error(
                    message
                );
            }


            const data:
                ContactResponse =
                await response.json();


            setSuccess(data);


            /*
             * Clear query-specific fields.
             */
            setSubject("");
            setMessage("");

            setCaptchaToken("");


            if (
                window.turnstile &&
                widgetIdRef.current
            ) {

                window.turnstile.reset(
                    widgetIdRef.current
                );
            }


        } catch (exception) {

            setError(

                exception instanceof Error
                    ? exception.message
                    : "We could not submit your request."

            );


            /*
             * CAPTCHA tokens are single-use.
             */
            setCaptchaToken("");


            if (
                window.turnstile &&
                widgetIdRef.current
            ) {

                window.turnstile.reset(
                    widgetIdRef.current
                );
            }


        } finally {

            setSubmitting(false);
        }
    }


    function newRequest() {

        setSuccess(null);
        setError("");
        setCaptchaError("");
        setCaptchaToken("");


        if (
            window.turnstile &&
            widgetIdRef.current
        ) {

            window.turnstile.reset(
                widgetIdRef.current
            );
        }
    }


    return (

        <div className="contact-page">


            {/* =============================================
                NAVIGATION
               ============================================= */}

            <header className="contact-nav">

                <Link
                    to="/"
                    className="contact-brand"
                >

                    <div className="contact-brand-symbol">

                        <span className="contact-brand-java">
                            J
                        </span>

                        <span className="contact-brand-arrow">
                            ↻
                        </span>

                    </div>


                    <div className="contact-brand-copy">

                        <strong>
                            MoJaX Dev
                        </strong>

                        <span>
                            MODERNIZE JAVA APPLICATIONS
                        </span>

                    </div>

                </Link>


                <nav>

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/learn/java-evolution">
                        Java Guide
                    </Link>

                    <Link to="/learn/pqc-history">
                        PQC Guide
                    </Link>

                    <Link
                        to="/login"
                        className="contact-signin"
                    >
                        Sign In
                    </Link>

                </nav>

            </header>


            {/* =============================================
                MAIN
               ============================================= */}

            <main className="contact-main">


                {/* LEFT COLUMN */}

                <section className="contact-intro">

                    <span className="contact-kicker">
                        CONTACT MOJAX
                    </span>


                    <h1>
                        How can we
                        <span>
                            {" "}help?
                        </span>
                    </h1>


                    <p className="contact-intro-text">

                        Have a question about MoJaX,
                        experiencing an issue, or want
                        to suggest an improvement?

                        Send us the details and we will
                        create a support reference for
                        your request.

                    </p>


                    <div className="contact-help-grid">


                        <div className="contact-help-card product">

                            <div className="contact-help-icon">
                                ?
                            </div>

                            <div>

                                <strong>
                                    Product Questions
                                </strong>

                                <p>
                                    Ask about Java modernization,
                                    assessments, plans or MoJaX
                                    capabilities.
                                </p>

                            </div>

                        </div>


                        <div className="contact-help-card technical">

                            <div className="contact-help-icon">
                                ⚙
                            </div>

                            <div>

                                <strong>
                                    Technical Issues
                                </strong>

                                <p>
                                    Report problems with projects,
                                    scans, assessments or reports.
                                </p>

                            </div>

                        </div>


                        <div className="contact-help-card feedback">

                            <div className="contact-help-icon">
                                ✦
                            </div>

                            <div>

                                <strong>
                                    Feedback
                                </strong>

                                <p>
                                    Share ideas that could make
                                    MoJaX better for enterprise
                                    engineering teams.
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="contact-security-note">

                        <span>
                            ◆
                        </span>

                        <div>

                            <strong>
                                Please don't include source code or secrets
                            </strong>

                            <p>
                                Never send passwords, access tokens,
                                private keys or confidential source code
                                through this form.
                            </p>

                        </div>

                    </div>

                </section>



                {/* RIGHT COLUMN */}

                <section className="contact-form-panel">

                    {success ? (

                        <div className="contact-success">

                            <div className="contact-success-icon">
                                ✓
                            </div>


                            <span className="contact-success-kicker">
                                REQUEST RECEIVED
                            </span>


                            <h2>
                                Thank you for contacting MoJaX.
                            </h2>


                            <p>
                                Your request has been successfully
                                registered. Please keep the reference
                                number below for future communication.
                            </p>


                            <div className="contact-reference">

                                <span>
                                    REFERENCE NUMBER
                                </span>

                                <strong>
                                    {success.referenceNumber}
                                </strong>

                            </div>


                            <div className="contact-success-meta">

                                <span>
                                    Status
                                </span>

                                <strong>
                                    {success.status}
                                </strong>

                            </div>


                            <button
                                type="button"
                                onClick={newRequest}
                                className="contact-another-button"
                            >

                                Send another message

                            </button>

                        </div>

                    ) : (

                        <form
                            onSubmit={submit}
                            className="contact-form"
                        >

                            <div className="contact-form-heading">

                                <span>
                                    SEND A MESSAGE
                                </span>

                                <h2>
                                    Tell us how we can help.
                                </h2>

                                <p>
                                    Fields marked with * are required.
                                </p>

                            </div>


                            <div className="contact-field-row">


                                <label className="contact-field">

                                    <span>
                                        Your name *
                                    </span>

                                    <input
                                        required
                                        maxLength={150}
                                        value={name}
                                        onChange={
                                            event =>
                                                setName(
                                                    event.target.value
                                                )
                                        }
                                        placeholder="Your name"
                                        autoComplete="name"
                                    />

                                </label>



                                <label className="contact-field">

                                    <span>
                                        Work email *
                                    </span>

                                    <input
                                        required
                                        type="email"
                                        maxLength={255}
                                        value={email}
                                        onChange={
                                            event =>
                                                setEmail(
                                                    event.target.value
                                                )
                                        }
                                        placeholder="you@company.com"
                                        autoComplete="email"
                                    />

                                </label>

                            </div>



                            <label className="contact-field">

                                <span>
                                    How can we help? *
                                </span>

                                <select
                                    value={category}
                                    onChange={
                                        event =>
                                            setCategory(
                                                event.target
                                                    .value as ContactCategory
                                            )
                                    }
                                >

                                    <option value="PRODUCT_QUERY">
                                        Product question
                                    </option>

                                    <option value="TECHNICAL_ISSUE">
                                        Technical issue
                                    </option>

                                    <option value="FEEDBACK">
                                        Feedback / suggestion
                                    </option>

                                    <option value="OTHER">
                                        Other
                                    </option>

                                </select>

                            </label>



                            <label className="contact-field">

                                <span>
                                    Subject *
                                </span>

                                <input
                                    required
                                    maxLength={255}
                                    value={subject}
                                    onChange={
                                        event =>
                                            setSubject(
                                                event.target.value
                                            )
                                    }
                                    placeholder="Briefly describe your request"
                                />

                            </label>



                            <label className="contact-field">

                                <div className="contact-message-label">

                                    <span>
                                        Message *
                                    </span>

                                    <small>
                                        {message.length}/10000
                                    </small>

                                </div>

                                <textarea
                                    required
                                    maxLength={10000}
                                    rows={7}
                                    value={message}
                                    onChange={
                                        event =>
                                            setMessage(
                                                event.target.value
                                            )
                                    }
                                    placeholder="Describe your question, issue or feedback..."
                                />

                            </label>



                            {/* CLOUDFLARE TURNSTILE */}

                            <div className="contact-captcha">

                                <div className="contact-captcha-title">

                                    <span>
                                        Security verification
                                    </span>

                                    <small>
                                        Helps us prevent automated spam.
                                    </small>

                                </div>


                                <div
                                    ref={
                                        captchaContainerRef
                                    }
                                    className="contact-turnstile"
                                />


                                {
                                    captchaError && (

                                        <div className="contact-field-error">
                                            {captchaError}
                                        </div>

                                    )
                                }

                            </div>



                            {
                                error && (

                                    <div
                                        className="contact-error"
                                        role="alert"
                                    >

                                        <span>
                                            !
                                        </span>

                                        {error}

                                    </div>

                                )
                            }



                            <button
                                type="submit"
                                className="contact-submit-button"
                                disabled={
                                    submitting ||
                                    !captchaToken
                                }
                            >

                                {
                                    submitting
                                        ? (
                                            <>
                                                <span className="contact-spinner" />
                                                Sending...
                                            </>
                                        )
                                        : (
                                            <>
                                                Submit Request
                                                <span>
                                                    →
                                                </span>
                                            </>
                                        )
                                }

                            </button>


                            <p className="contact-form-footer">

                                By submitting this form you
                                agree that the information
                                provided may be used to respond
                                to your request.

                            </p>

                        </form>

                    )}

                </section>

            </main>


            {/* =============================================
                FOOTER
               ============================================= */}

            <footer className="contact-footer">

                <div>

                    <strong>
                        MoJaX
                    </strong>

                    <span>
                        Enterprise Java Modernization Intelligence
                    </span>

                </div>


                <span>
                    Modernize • Optimize • Secure • Scale
                </span>

            </footer>

        </div>
    );
}