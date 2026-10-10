import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    getAgents
} from "../../services/agentApi";

import {
    getProjects
} from "../../services/projectApi";

import {
    runAssessment
} from "../../services/assessmentApi";


export default function AgentsPage() {

    const navigate =
        useNavigate();


    const [
        agents,
        setAgents
    ] =
        useState([]);

    const [
        springBootTargetVersion,
        setSpringBootTargetVersion
    ] =
        useState("3.5");


    const [
        projects,
        setProjects
    ] =
        useState([]);


    const [
        selectedProjectId,
        setSelectedProjectId
    ] =
        useState("");


    const [
        loading,
        setLoading
    ] =
        useState(true);


    const [
        runningAgentCode,
        setRunningAgentCode
    ] =
        useState(null);


    const [
        error,
        setError
    ] =
        useState(null);


    /*
     * =========================================================
     * INITIAL LOAD
     * =========================================================
     */

    useEffect(
        () => {

            loadPage();

        },
        []
    );


    /*
     * =========================================================
     * LOAD AGENTS + PROJECTS
     * =========================================================
     */

    async function loadPage() {

        try {

            setLoading(
                true
            );


            setError(
                null
            );


            const [
                agentData,
                projectData
            ] =
                await Promise.all([
                    getAgents(),
                    getProjects()
                ]);


            setAgents(
                Array.isArray(
                    agentData
                )
                    ? agentData
                    : []
            );


            setProjects(
                Array.isArray(
                    projectData
                )
                    ? projectData
                    : []
            );


            if (
                Array.isArray(projectData)
                &&
                projectData.length > 0
            ) {

                setSelectedProjectId(
                    current =>
                        current
                        ||
                        projectData[0].id
                );
            }

        } catch (err) {

            setError(
                getErrorMessage(
                    err,
                    "Unable to load agents."
                )
            );

        } finally {

            setLoading(
                false
            );
        }
    }


    /*
     * =========================================================
     * SELECTED PROJECT
     * =========================================================
     */

    const selectedProject =
        useMemo(
            () =>
                projects.find(
                    project =>
                        project.id
                        === selectedProjectId
                ),
            [
                projects,
                selectedProjectId
            ]
        );


    /*
     * =========================================================
     * RUN AGENT
     * =========================================================
     */

    async function handleRunAgent(
        agentCode
    ) {

        if (!selectedProjectId) {

            setError(
                "Please select a project before running an assessment."
            );

            return;
        }


        try {

            setRunningAgentCode(
                agentCode
            );


            setError(
                null
            );


            const parameters =
                agentCode === "SPRING_BOOT_UPGRADE"
                    ? {
                        targetVersion:
                            springBootTargetVersion
                    }
                    : {};


            const assessment =
                await runAssessment(
                    selectedProjectId,
                    agentCode,
                    parameters
                );


            navigate(
                `/assessments/${assessment.id}`,
                {
                    state: {
                        assessment
                    }
                }
            );

        } catch (err) {

            setError(
                getErrorMessage(
                    err,
                    "Unable to run assessment."
                )
            );

        } finally {

            setRunningAgentCode(
                null
            );
        }
    }


    /*
     * =========================================================
     * UI
     * =========================================================
     */

    return (

        <div className="page-content">


            {/* =================================================
                PAGE HEADER
               ================================================= */}

            <div className="page-header">

                <div>

                    <span className="page-kicker">
                        MODERNIZATION INTELLIGENCE
                    </span>


                    <h1>
                        Assessment Agents
                    </h1>


                    <p>
                        Select a project and run a
                        specialized MoJaX assessment.
                    </p>

                </div>

            </div>


            {/* =================================================
                ERROR
               ================================================= */}

            {
                error
                &&
                (

                    <div className="page-error">

                        {error}

                    </div>

                )
            }


            {/* =================================================
                PROJECT SELECTOR
               ================================================= */}

            <div className="agent-project-selector">

                <div>

                    <span className="selector-label">
                        PROJECT TO ASSESS
                    </span>


                    <h3>
                        Select Project
                    </h3>

                </div>


                {
                    projects.length > 0
                        ?
                        (

                            <select
                                value={
                                    selectedProjectId
                                }
                                disabled={
                                    runningAgentCode !== null
                                }
                                onChange={
                                    event =>
                                        setSelectedProjectId(
                                            event.target.value
                                        )
                                }
                            >

                                {
                                    projects.map(
                                        project => (

                                            <option
                                                key={
                                                    project.id
                                                }
                                                value={
                                                    project.id
                                                }
                                            >
                                                {
                                                    project.name
                                                }
                                            </option>

                                        )
                                    )
                                }

                            </select>

                        )
                        :
                        (

                            <div className="selector-empty">
                                No projects available.
                            </div>

                        )
                }

            </div>


            {/* =================================================
                SELECTED PROJECT
               ================================================= */}

            {
                selectedProject
                &&
                (

                    <div className="selected-project-summary">

                        Running assessments against:{" "}

                        <strong>
                            {
                                selectedProject.name
                            }
                        </strong>

                    </div>

                )
            }


            {/* =================================================
                LOADING
               ================================================= */}

            {
                loading
                &&
                (

                    <div className="page-loading">

                        Loading MoJaX agents...

                    </div>

                )
            }


            {/* =================================================
                AGENT CARDS
               ================================================= */}

            {
                !loading
                &&
                (

                    <div className="agents-grid">

                        {
                            agents.map(
                                agent => {

                                    const running =
                                        runningAgentCode
                                        === agent.code;


                                    return (

                                        <div
                                            key={
                                                agent.code
                                            }
                                            className={
                                                `agent-card ${getAgentCardClass(
                                                    agent.code
                                                )}`
                                            }
                                        >

                                            {/* CARD HEADER */}

                                            <div className="agent-card-header">

                                                <div
                                                    className=
                                                        "agent-icon agent-icon-rich"
                                                >

                                                    {
                                                        getAgentVisual(
                                                            agent.code
                                                        )
                                                    }

                                                </div>


                                                <div>

                                                    <span className="agent-code">

                                                        {
                                                            getAgentCodeLabel(
                                                                agent.code
                                                            )
                                                        }

                                                    </span>


                                                    <h3>

                                                        {
                                                            agent.name
                                                            ||
                                                            getAgentName(
                                                                agent.code
                                                            )
                                                        }

                                                    </h3>

                                                </div>

                                            </div>

                                            {
                                                agent.code === "SPRING_BOOT_UPGRADE"
                                                &&
                                                (

                                                    <div
                                                        className="agent-target-version"
                                                        onClick={
                                                            event =>
                                                                event.stopPropagation()
                                                        }
                                                    >

                                                        <label
                                                            htmlFor="spring-boot-target-version"
                                                        >
                                                            Target Spring Boot
                                                        </label>


                                                        <select
                                                            id="spring-boot-target-version"
                                                            value={
                                                                springBootTargetVersion
                                                            }
                                                            disabled={
                                                                runningAgentCode !== null
                                                            }
                                                            onChange={
                                                                event =>
                                                                    setSpringBootTargetVersion(
                                                                        event.target.value
                                                                    )
                                                            }
                                                        >

                                                            <option value="3.5">
                                                                 Spring Boot 3.5.x
                                                            </option>

                                                            <option value="4.1">
                                                                Spring Boot 4.1.x
                                                            </option>

                                                        </select>


                                                    </div>

                                                )
                                            }
                                            {/* DESCRIPTION */}

                                            <p className="agent-description">

                                                {
                                                    agent.description
                                                    ||
                                                    getDefaultDescription(
                                                        agent.code
                                                    )
                                                }

                                            </p>


                                            {/* CATEGORY */}

                                            {
                                                agent.category
                                                &&
                                                (

                                                    <div className="agent-category">

                                                        {
                                                            agent.category
                                                        }

                                                    </div>

                                                )
                                            }


                                           


                                            {/* RUN BUTTON */}

                                            <button
                                                type="button"
                                                className="agent-run-button"
                                                disabled={
                                                    !selectedProjectId
                                                    ||
                                                    runningAgentCode !== null
                                                    ||
                                                    agent.enabled === false
                                                }
                                                onClick={
                                                    () =>
                                                        handleRunAgent(
                                                            agent.code
                                                        )
                                                }
                                            >

                                                {
                                                    running
                                                        ?
                                                        "Running Assessment..."
                                                        :
                                                        "Run Assessment"
                                                }


                                                {
                                                    !running
                                                    &&
                                                    <span>
                                                        →
                                                    </span>
                                                }

                                            </button>

                                        </div>

                                    );
                                }
                            )
                        }

                    </div>

                )
            }


            {/* =================================================
                EMPTY STATE
               ================================================= */}

            {
                !loading
                &&
                agents.length === 0
                &&
                (

                    <div className="empty-state">

                        <h3>
                            No agents available
                        </h3>


                        <p>
                            No active MoJaX assessment
                            agents were returned by the server.
                        </p>

                    </div>

                )
            }

        </div>
    );
}


/*
 * =========================================================
 * AGENT CARD STYLE
 * =========================================================
 */

function getAgentCardClass(
    code
) {

    switch (code) {

        case "JAVA_MIGRATION":

            return "agent-card-java";


        case "SPRING_BOOT_UPGRADE":

            return "agent-card-spring";


        case "PQC_MIGRATION":

            return "agent-card-quantum";


        case "JEE_SPRING":

            return "agent-card-jee";


        case "MONOLITH_MICROSERVICES":

            return "agent-card-microservices";


        case "XML_JSON":

            return "agent-card-xml";


        case "SONAR_INTELLIGENCE":

            return "agent-card-sonar";


        case "JVM_DIAGNOSTICS":

            return "agent-card-jvm";


        case "OWASP_SECURITY":

            return "agent-card-security";


        default:

            return "agent-card-default";
    }
}


/*
 * =========================================================
 * AGENT VISUAL / LOGO
 * =========================================================
 */

function getAgentVisual(
    code
) {

    switch (code) {

        /*
         * Java
         */

        case "JAVA_MIGRATION":

            return (

                <div className="agent-visual">

                    <div className="agent-icon-glyph">
                        ☕
                    </div>

                    <div className="agent-icon-label">
                        JAVA
                    </div>

                </div>
            );


        /*
         * Spring Boot
         */

        case "SPRING_BOOT_UPGRADE":

            return (

                <div className="agent-visual">

                    <div className="agent-icon-glyph">
                        🌱
                    </div>

                    <div className="agent-icon-label">
                        SPRING
                    </div>

                </div>
            );


        /*
         * PQC / Quantum
         */

        case "PQC_MIGRATION":

            return (

                <div className="agent-visual">

                    <div className="agent-icon-glyph agent-quantum-glyph">
                        ⚛
                    </div>

                    <div className="agent-icon-label">
                        QUANTUM
                    </div>

                </div>
            );


        /*
         * JEE → Spring
         */

        case "JEE_SPRING":

            return (

                <div className="agent-visual">

                    <div className="agent-icon-glyph">
                        S
                    </div>

                    <div className="agent-icon-label">
                        JEE
                    </div>

                </div>
            );


        /*
         * Microservices
         */

        case "MONOLITH_MICROSERVICES":

            return (

                <div className="agent-visual">

                    <div className="agent-icon-glyph">
                        ⬡
                    </div>

                    <div className="agent-icon-label">
                        MICRO
                    </div>

                </div>
            );


        /*
         * XML / JSON
         */

        case "XML_JSON":

            return (

                <div className="agent-visual">

                    <div className="agent-icon-glyph">
                        {"{}"}
                    </div>

                    <div className="agent-icon-label">
                        XML/JSON
                    </div>

                </div>
            );


        /*
         * Sonar
         */

        case "SONAR_INTELLIGENCE":

            return (

                <div className="agent-visual">

                    <div className="agent-icon-glyph">
                        ◎
                    </div>

                    <div className="agent-icon-label">
                        SONAR
                    </div>

                </div>
            );


        /*
         * JVM
         */

        case "JVM_DIAGNOSTICS":

            return (

                <div className="agent-visual">

                    <div className="agent-icon-glyph">
                        JVM
                    </div>

                    <div className="agent-icon-label">
                        RUNTIME
                    </div>

                </div>
            );


        /*
         * OWASP
         */

        case "OWASP_SECURITY":

            return (

                <div className="agent-visual">

                    <div className="agent-icon-glyph">
                        ◆
                    </div>

                    <div className="agent-icon-label">
                        OWASP
                    </div>

                </div>
            );


        default:

            return (

                <div className="agent-visual">

                    <div className="agent-icon-glyph">
                        A
                    </div>

                    <div className="agent-icon-label">
                        AGENT
                    </div>

                </div>
            );
    }
}


/*
 * =========================================================
 * FRIENDLY CODE LABEL
 * =========================================================
 */

function getAgentCodeLabel(
    code
) {

    switch (code) {

        case "JAVA_MIGRATION":

            return "JAVA";


        case "SPRING_BOOT_UPGRADE":

            return "SPRING BOOT";


        case "PQC_MIGRATION":

            return "PQC";


        case "JEE_SPRING":

            return "JEE → SPRING";


        case "MONOLITH_MICROSERVICES":

            return "MICROSERVICES";


        case "XML_JSON":

            return "XML ↔ JSON";


        case "SONAR_INTELLIGENCE":

            return "SONAR";


        case "JVM_DIAGNOSTICS":

            return "JVM";


        case "OWASP_SECURITY":

            return "OWASP";


        default:

            return code
                ?.replaceAll(
                    "_",
                    " "
                );
    }
}


/*
 * =========================================================
 * FALLBACK AGENT NAME
 * =========================================================
 */

function getAgentName(
    code
) {

    switch (code) {

        case "JAVA_MIGRATION":

            return "Java Upgrade";


        case "SPRING_BOOT_UPGRADE":

            return "Spring Boot Upgrade";


        case "PQC_MIGRATION":

            return "Post-Quantum Migration";


        case "JEE_SPRING":

            return "JEE to Spring Boot";


        case "MONOLITH_MICROSERVICES":

            return "Monolith to Microservices";


        case "XML_JSON":

            return "XML / JSON Modernization";


        case "SONAR_INTELLIGENCE":

            return "Code Quality Intelligence";


        case "JVM_DIAGNOSTICS":

            return "JVM Diagnostics";


        case "OWASP_SECURITY":

            return "OWASP Security";


        default:

            return "Modernization Agent";
    }
}


/*
 * =========================================================
 * AGENT DESCRIPTIONS
 * =========================================================
 */

function getDefaultDescription(
    code
) {

    switch (code) {

        case "JAVA_MIGRATION":

            return "Assess Java version migration readiness, framework compatibility and modern Java language opportunities.";


        case "SPRING_BOOT_UPGRADE":

            return "Assess Spring Boot upgrade readiness, Java requirements, Jakarta migration, Spring Security changes and configuration compatibility.";


        case "PQC_MIGRATION":

            return "Identify cryptographic usage, quantum-vulnerable algorithms, HNDL exposure and post-quantum migration readiness.";


        case "JEE_SPRING":

            return "Evaluate legacy Java EE components and identify opportunities to modernize applications using Spring Boot.";


        case "MONOLITH_MICROSERVICES":

            return "Analyze architecture indicators for modularization, bounded contexts and microservices decomposition.";


        case "XML_JSON":

            return "Assess XML, XSLT and transformation workloads for modernization and JSON-based integration.";


        case "SONAR_INTELLIGENCE":

            return "Analyze code quality, maintainability and engineering improvement opportunities.";


        case "JVM_DIAGNOSTICS":

            return "Assess JVM runtime, memory, performance and diagnostic modernization considerations.";


        case "OWASP_SECURITY":

            return "Review application security findings, common vulnerability patterns and modernization risks.";


        default:

            return "Run specialized modernization intelligence against the selected project.";
    }
}


/*
 * =========================================================
 * CAPABILITY TAGS
 * =========================================================
 */

function AgentCapabilities({
    code
}) {

    const capabilities =
        getAgentCapabilities(
            code
        );


    if (
        capabilities.length === 0
    ) {

        return null;
    }


    return (

        <div className="agent-capabilities">

            {
                capabilities.map(
                    capability => (

                        <span
                            key={
                                capability
                            }
                        >
                            {capability}
                        </span>

                    )
                )
            }

        </div>
    );
}


function getAgentCapabilities(
    code
) {

    switch (code) {

        case "JAVA_MIGRATION":

            return [
                "Java 8→21",
                "API Changes",
                "Modernization"
            ];


        case "SPRING_BOOT_UPGRADE":

            return [
                "Boot Upgrade",
                "Jakarta",
                "Security"
            ];


        case "PQC_MIGRATION":

            return [
                "Crypto Inventory",
                "HNDL",
                "PQC"
            ];


        case "JEE_SPRING":

            return [
                "Java EE",
                "Spring Boot",
                "Modernization"
            ];


        case "MONOLITH_MICROSERVICES":

            return [
                "Architecture",
                "Boundaries",
                "Services"
            ];


        case "XML_JSON":

            return [
                "XML",
                "XSLT",
                "JSON"
            ];


        case "SONAR_INTELLIGENCE":

            return [
                "Quality",
                "Maintainability",
                "Technical Debt"
            ];


        case "JVM_DIAGNOSTICS":

            return [
                "Memory",
                "Runtime",
                "Performance"
            ];


        case "OWASP_SECURITY":

            return [
                "Security",
                "OWASP",
                "Risk"
            ];


        default:

            return [];
    }
}


/*
 * =========================================================
 * ERROR MESSAGE
 * =========================================================
 */

function getErrorMessage(
    error,
    fallback
) {

    return error instanceof Error
        ? error.message
        : fallback;
}