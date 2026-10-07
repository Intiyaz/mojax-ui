import { useNavigate } from "react-router-dom";

import "../styles/landing.css";
import LandingResources from "./LandingResources";


export default function LandingPage() {

    const navigate = useNavigate();


    function openLogin() {
        navigate("/login");
    }


    return (

        <div className="mojax-landing">


            {/* =================================================
                NAVIGATION
               ================================================= */}

            <nav className="landing-nav">

                <button
                    type="button"
                    className="landing-brand"
                    onClick={() => navigate("/")}
                >

                    <div className="brand-symbol">

                        <span className="brand-java">
                            J
                        </span>

                        <span className="brand-arrow">
                            ↻
                        </span>

                    </div>


                    <div className="brand-copy">

                        <strong>
                            MoJaX Dev
                        </strong>

                        <span>
                            MODERNIZE JAVA APPLICATIONS
                        </span>

                    </div>

                </button>


                <div className="landing-links">

                    <a href="#journey">
                        How It Works
                    </a>

                    <button
                        type="button"
                        className="landing-nav-resource"
                        onClick={() => navigate("/learn/java-evolution")}
                    >
                        Java Guide
                    </button>

                    <button
                        type="button"
                        className="landing-nav-resource"
                        onClick={() => navigate("/learn/pqc-history")}
                    >
                        PQC Guide
                    </button>

                    <a href="#why">
                        Why MoJaX
                    </a>

                <button
                    type="button"
                    className="landing-nav-resource"
                    onClick={() =>
                        navigate("/contact")
                    }
                >
                    Contact Us
                </button>


                </div>


                <button
                    type="button"
                    className="nav-login-button"
                    onClick={openLogin}
                >
                    Sign In
                </button>

            </nav>


            {/* =================================================
                HERO
               ================================================= */}

            <main>

                <section className="hero-section">

                    <div className="hero-glow hero-glow-one" />
                    <div className="hero-glow hero-glow-two" />


                    <div className="hero-content">

                        <div className="hero-badge">
                            <span className="hero-badge-dot" />
                            ENTERPRISE JAVA MODERNIZATION INTELLIGENCE
                        </div>

                        <h1>

                            Give Your Legacy Java Application
                            <span>
                                {" "}A Modern Secure Future.
                            </span>

                        </h1>


                        <p className="hero-description">

                            MoJaX provides evidence-based assessment reports for enterprise Java applications—highlighting modernization opportunities, security risks, cloud-readiness gaps, and prioritized remediation guidance. Source code is analyzed only for assessment and is not stored in the MoJaX platform.

                        </p>

                        <div className="hero-quantum-callout">

                            <span className="hero-quantum-icon">
                                ⚛
                            </span>

                            <div>

                                <h2>
                                    Are your Java applications
                                    quantum-ready?
                                </h2>

                                <span>
                                    Discover RSA, ECDSA, ECDH and
                                    other cryptographic dependencies
                                    before HNDL exposure becomes a
                                    migration emergency.
                                </span>

                            </div>

                        </div>
                        <div className="hero-actions">

                            <button
                                type="button"
                                className="primary-hero-button"
                                onClick={openLogin}
                            >

                                Start Modernizing

                                <span>
                                    →
                                </span>

                            </button>


                            <button
                                type="button"
                                className="secondary-hero-button"
                                onClick={() => {

                                    document
                                        .getElementById(
                                            "capabilities"
                                        )
                                        ?.scrollIntoView({
                                            behavior: "smooth"
                                        });

                                }}
                            >
                                Explore Capabilities
                            </button>
                            

                        </div>


                        <div className="hero-trust">

                            <span>
                                ✓ Evidence-Based
                            </span>

                            <span>
                                ✓ AI-Guided
                            </span>

                            <span>
                                ✓ Human-Approved
                            </span>

                            <span>
                                ✓ Enterprise-Ready
                            </span>

                        </div>

                    </div>


                    {/* HERO VISUAL */}

                    <div className="hero-visual">

                        <div className="hero-platform-card">


                            <div className="platform-window-bar">

                                <div className="window-dots">
                                    <i />
                                    <i />
                                    <i />
                                </div>

                                <span>
                                    MoJaX Intelligence
                                </span>

                                <div className="platform-live">
                                    LIVE
                                </div>

                            </div>


                            <div className="platform-body">

                                <div className="platform-code-card">

                                    <span className="code-label">
                                        LEGACY APPLICATION
                                    </span>

                                    <strong>
                                        Java 8
                                    </strong>

                                    <div className="code-lines">
                                        <i />
                                        <i />
                                        <i />
                                        <i />
                                    </div>

                                </div>


                                <div className="ai-engine">

                                    <div className="ai-ring ring-one" />
                                    <div className="ai-ring ring-two" />

                                    <div className="ai-core">
                                        MoJaX
                                    </div>

                                    <span>
                                        ANALYZE
                                    </span>

                                </div>


                                <div className="platform-code-card modern">

                                    <span className="code-label">
                                        MODERN APPLICATION
                                    </span>

                                    <strong>
                                        Java 21
                                    </strong>

                                    <div className="modern-checks">

                                        <span>
                                            ✓ Secure
                                        </span>

                                        <span>
                                            ✓ Cloud Ready
                                        </span>

                                        <span>
                                            ✓ Modern
                                        </span>

                                    </div>

                                </div>

                            </div>


                          

                        </div>
                        <div className="handoff-strip">

                        <span className="handoff-kicker">
                            FROM ASSESSMENT TO IMPLEMENTATION
                        </span>

                        <div className="handoff-steps">

                            <HandoffStep
                                icon="▤"
                                title="PDF Assessment"
                                description="Every scan produces a
                                    detailed, shareable report of
                                    findings, risks and recommendations."
                                className="handoff-blue"
                            />

                            <span className="handoff-arrow">
                                →
                            </span>

                            <HandoffStep
                                icon="⛓"
                                title="JIRA Epic"
                                description="Findings convert directly
                                    into a groomed epic with linked,
                                    ready-to-work stories."
                                className="handoff-purple"
                            />

                            <span className="handoff-arrow">
                                →
                            </span>

                            <HandoffStep
                                icon="◉"
                                title="AI Agent Context"
                                description="The same assessment becomes
                                    grounded context an AI coding agent
                                    uses during implementation."
                                className="handoff-ai"
                            />

                        </div>


                        <div className="handoff-stats">

                            <div>
                                <strong>Faster</strong>
                                <span>time to implementation</span>
                            </div>

                            <div>
                                <strong>Fewer tokens</strong>
                                <span>agents skip re-discovery</span>
                            </div>

                            <div>
                                <strong>Higher accuracy</strong>
                                <span>grounded in real assessment data</span>
                            </div>

                        </div>

                    </div>

                    </div>

                    

                </section>


                {/* =================================================
                    JOURNEY STRIP
                   ================================================= */}

                <section
                    id="journey"
                    className="journey-strip"
                >

                    <JourneyStep
                        number="01"
                        title="Analyze"
                        text="Understand the application"
                    />

                    <JourneyArrow />

                    <JourneyStep
                        number="02"
                        title="Modernize"
                        text="Upgrade Java & frameworks"
                    />

                    <JourneyArrow />

                    <JourneyStep
                        number="03"
                        title="Transform"
                        text="Reshape architecture & data"
                    />

                    <JourneyArrow />

                    <JourneyStep
                        number="04"
                        title="Secure"
                        text="Reduce enterprise risk"
                    />

                    <JourneyArrow />

                    <JourneyStep
                        number="05"
                        title="Validate"
                        text="Prove modernization quality"
                    />

                </section>

                {/* =================================================
                    CAPABILITIES
                   ================================================= */}

                <section
                    id="capabilities"
                    className="capabilities-section"
                >
                    <div className="section-heading">

                        <span className="section-kicker">
                            GET STARTED WITH MOJAX
                        </span>

                        <h1>
                            From registration to
                            <span>
                                {" "}modernization insights.
                            </span>
                        </h1>


                    </div>


                    <div className="app-guide-grid">

                        <GuideCard
                            number="01"
                            icon="✦"
                            className="guide-purple"
                            title="Register"
                            description="Create your MoJaX account and organization."
                            items={[
                                "Enter your account details",
                                "Create your organization",
                                "Select a plan",
                                "Start with the free assessment"
                            ]}
                        />


                        <GuideCard
                            number="02"
                            icon="→"
                            className="guide-blue"
                            title="Sign In"
                            description="Access your secure MoJaX workspace."
                            items={[
                                "Sign in with your account",
                                "Access your dashboard",
                                "View available assessments",
                                "Track your scan usage"
                            ]}
                        />


                        <GuideCard
                            number="03"
                            icon="◎"
                            className="guide-cyan"
                            title="Complete Organization Profile"
                            description="Add the organization information used across your workspace."
                            items={[
                                "Organization details",
                                "Business address",
                                "Country and location",
                                "Keep company information current"
                            ]}
                        />


                        <GuideCard
                            number="04"
                            icon="▣"
                            className="guide-orange"
                            title="Create a Project"
                            description="Register the Java application you want MoJaX to assess."
                            items={[
                                "Enter project name",
                                "Add repository URL",
                                "Specify default branch",
                                "Describe the application"
                            ]}
                        />


                        <GuideCard
                            number="05"
                            icon="⚙"
                            className="guide-green"
                            title="Run an Assessment"
                            description="Let MoJaX analyze your Java application and produce evidence-based findings."
                            items={[
                                "Select your project",
                                "Choose the assessment agent",
                                "Start the scan",
                                "Review risks and recommendations"
                            ]}
                        />


                        <GuideCard
                            number="06"
                            icon="⇩"
                            className="guide-pink"
                            title="Download the Report"
                            description="Turn the assessment into a shareable modernization document."
                            items={[
                                "Review assessment results",
                                "Open detailed findings",
                                "Review remediation guidance",
                                "Download the PDF report"
                            ]}
                        />

                    </div>

                </section>


                {/* =================================================
                    JAVA JOURNEY
                   ================================================= */}

                <section className="java-modernization-section">

                    <div className="java-modernization-copy">

                        <span className="section-kicker">
                            CONTROLLED MODERNIZATION
                        </span>

                        <h2>
                            Don't jump.
                            <span>
                                {" "}Modernize with evidence.
                            </span>
                        </h2>

                        <p>
                            MoJaX analyzes source code,
                            dependencies, build evidence,
                            deprecated APIs and JDK internals
                            before recommending a controlled
                            migration path.
                        </p>


                        <div className="principle-box">

                            <span>
                                ✦
                            </span>

                            <div>

                                <strong>
                                    Human-in-the-loop by design
                                </strong>

                                <p>
                                    MoJaX recommends first.
                                    Engineers approve before
                                    transformation.
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="java-version-path">

                        <VersionCard
                            version="8"
                            label="Legacy"
                        />

                        <span className="version-arrow">
                            →
                        </span>

                        <VersionCard
                            version="11"
                            label="Foundation"
                        />

                        <span className="version-arrow">
                            →
                        </span>

                        <VersionCard
                            version="17"
                            label="Modern"
                        />

                        <span className="version-arrow">
                            →
                        </span>

                        <VersionCard
                            version="21"
                            label="Target"
                            target
                        />

                    </div>


                    

                </section>


                {/* =================================================
                    WHY
                   ================================================= */}

                <section
                    id="why"
                    className="why-section"
                >

                    <div className="section-heading">

                        <span className="section-kicker">
                            WHY MOJAX
                        </span>

                        <h2>
                            Modernization intelligence
                            <span>
                                {" "}your engineering teams can trust.
                            </span>
                        </h2>

                    </div>


                    <div className="why-grid">

                        <WhyCard
                            icon="◎"
                            title="Evidence Before Action"
                            text="Recommendations are grounded in source analysis, build results and engineering evidence."
                        />

                        <WhyCard
                            icon="◈"
                            title="Purpose-Built for Java"
                            text="Designed around the realities of enterprise Java modernization rather than generic code generation."
                        />

                        <WhyCard
                            icon="✓"
                            title="Human Approval"
                            text="Engineers remain in control of modernization decisions and proposed transformations."
                        />

                        <WhyCard
                            icon="↻"
                            title="Continuous Validation"
                            text="Compile, test and validate throughout the modernization journey."
                        />

                    </div>

                </section>


                {/* =================================================
                    CTA
                   ================================================= */}

                <section className="landing-cta">

                    <div className="cta-glow" />

                    <div>

                        <span>
                            READY TO MODERNIZE?
                        </span>

                        <h2>
                            Your legacy Java application
                            has a future.
                        </h2>

                        <p>
                            Discover the modernization path
                            with MoJaX.
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={openLogin}
                    >
                        Enter MoJaX
                        <span>
                            →
                        </span>
                    </button>

                </section>

            </main>


            {/* =================================================
                FOOTER
               ================================================= */}

            <footer className="landing-footer">

                <div className="footer-brand">

                    <strong>
                        MoJaX
                    </strong>

                    <span>
                        Modernize Java Applications
                    </span>

                </div>


                <div className="footer-message">

                    Modernize • Optimize • Secure • Scale

                </div>


                <div className="footer-copy">

                    © {new Date().getFullYear()} MoJaX Inc. All rights reserved.

                </div>

            </footer>

        </div>
    );
}


/* =========================================================
   SMALL COMPONENTS
   ========================================================= */

function JourneyStep({
    number,
    title,
    text
}: {
    number: string;
    title: string;
    text: string;
}) {

    return (
        <div className="journey-step">

            <span>
                {number}
            </span>

            <div>
                <strong>
                    {title}
                </strong>

                <small>
                    {text}
                </small>
            </div>

        </div>
    );
}


function JourneyArrow() {

    return (
        <div className="journey-strip-arrow">
            →
        </div>
    );
}

function GuideCard({
    number,
    icon,
    title,
    description,
    items,
    className
}: {
    number: string;
    icon: string;
    title: string;
    description: string;
    items: string[];
    className: string;
}) {

    return (

        <article
            className={`app-guide-card ${className}`}
        >

            <div className="guide-card-header">

                <div className="guide-card-icon">
                    {icon}
                </div>

                <span className="guide-step-number">
                    STEP {number}
                </span>

            </div>


            <h3>
                {title}
            </h3>


            <p>
                {description}
            </p>


            <div className="guide-items">

                {
                    items.map(item => (

                        <span key={item}>
                            <i>✓</i>
                            {item}
                        </span>

                    ))
                }

            </div>

        </article>
    );
}

function FactoryCard({
    icon,
    title,
    description,
    items,
    className
}: {
    icon: string;
    title: string;
    description: string;
    items: string[];
    className: string;
}) {

    return (

        <article
            className={`factory-card ${className}`}
        >

            <div className="factory-card-icon">
                {icon}
            </div>

            <h3>
                {title}
            </h3>

            <p>
                {description}
            </p>

            <div className="factory-items">

                {
                    items.map(item => (

                        <span key={item}>
                            {item}
                        </span>

                    ))
                }

            </div>

        </article>
    );
}


function VersionCard({
    version,
    label,
    target = false
}: {
    version: string;
    label: string;
    target?: boolean;
}) {

    return (

        <div
            className={
                target
                    ? "version-card version-target"
                    : "version-card"
            }
        >

            <span>
                JAVA
            </span>

            <strong>
                {version}
            </strong>

            <small>
                {label}
            </small>

        </div>
    );
}


function HandoffStep({
    icon,
    title,
    description,
    className
}: {
    icon: string;
    title: string;
    description: string;
    className: string;
}) {

    return (

        <div className={`handoff-step ${className}`}>

            <div className="handoff-step-icon">
                {icon}
            </div>

            <strong>
                {title}
            </strong>

            <p>
                {description}
            </p>

        </div>
    );
}


function WhyCard({
    icon,
    title,
    text
}: {
    icon: string;
    title: string;
    text: string;
}) {

    return (

        <article className="why-card">

            <div className="why-icon">
                {icon}
            </div>

            <h3>
                {title}
            </h3>

            <p>
                {text}
            </p>

        </article>
    );
}

function CryptoRow({
    algorithm,
    purpose,
    status,
    risk = false
}: {
    algorithm: string;
    purpose: string;
    status: string;
    risk?: boolean;
}) {

    return (

        <div className="crypto-row">

            <div className="crypto-algorithm">

                <span className={
                    risk
                        ? "crypto-dot crypto-risk-dot"
                        : "crypto-dot crypto-safe-dot"
                } />

                <div>
                    <strong>
                        {algorithm}
                    </strong>

                    <small>
                        {purpose}
                    </small>
                </div>

            </div>


            <span className={
                risk
                    ? "crypto-risk-label"
                    : "crypto-review-label"
            }>
                {status}
            </span>

        </div>
    );
}