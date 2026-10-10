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

import type {
  AgentDefinition
} from "../../services/agentApi";

import {
  getProjects
} from "../../services/projectApi";

import type {
  Project
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
    useState<AgentDefinition[]>(
      []
    );


  const [
    projects,
    setProjects
  ] =
    useState<Project[]>(
      []
    );


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
    useState<string | null>(
      null
    );


  const [
    error,
    setError
  ] =
    useState<string | null>(
      null
    );


  useEffect(
    () => {

      loadPage();

    },
    []
  );


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
        Array.isArray(agentData)
          ? agentData
          : []
      );


      setProjects(
        Array.isArray(projectData)
          ? projectData
          : []
      );


      if (
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


  async function handleRunAgent(
    agentCode: string
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


      const assessment =
        await runAssessment(
          selectedProjectId,
          agentCode
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


  return (

    <div className="page-content">


      {/* HEADER */}

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


      {/* ERROR */}

      {
        error
        &&
        (

          <div className="page-error">

            {error}

          </div>

        )
      }


      {/* PROJECT SELECTOR */}

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

                      {project.name}

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


      {
        selectedProject
        &&
        (

          <div className="selected-project-summary">

            Running assessments against:
            {" "}

            <strong>

              {selectedProject.name}

            </strong>

          </div>

        )
      }


      {/* LOADING */}

      {
        loading
        &&
        (

          <div className="page-loading">

            Loading MoJaX agents...

          </div>

        )
      }


      {/* AGENTS */}

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
                    key={agent.code}
                    className={`agent-card ${getAgentCardClass(agent.code)}`}
                >

                    <div className="agent-card-header">

                        <div className="agent-icon agent-icon-rich">
                            {getAgentVisual(agent.code)}
                        </div>
                        <div>

                          <span className="agent-code">

                            {agent.code}

                          </span>


                          <h3>

                            {agent.name}

                          </h3>

                        </div>

                      </div>


                      <p className="agent-description">

                        {
                          agent.description
                          ||
                          getDefaultDescription(
                            agent.code
                          )
                        }

                      </p>


                      {
                        agent.category
                        &&
                        (

                          <div className="agent-category">

                            {agent.category}

                          </div>

                        )
                      }


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
                          <span>→</span>
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


function getAgentCardClass(code) {

    switch (code) {

        case "JAVA_MIGRATION":
            return "agent-card-java";

        case "SPRING_BOOT_UPGRADE":
            return "agent-card-spring";

        case "PQC_MIGRATION":
            return "agent-card-quantum";

        case "JEE_SPRING":
            return "agent-card-jee";

        default:
            return "agent-card-default";
    }
}


function getAgentVisual(code) {

    switch (code) {

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

        case "PQC_MIGRATION":
            return (
                <div className="agent-visual">
                    <div className="agent-icon-glyph">
                        ⚛
                    </div>
                    <div className="agent-icon-label">
                        QUANTUM
                    </div>
                </div>
            );

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

        case "MONOLITH_MICROSERVICES":
            return (
                <div className="agent-visual">
                    <div className="agent-icon-glyph">
                        M
                    </div>
                    <div className="agent-icon-label">
                        MICRO
                    </div>
                </div>
            );

        case "XML_JSON":
            return (
                <div className="agent-visual">
                    <div className="agent-icon-glyph">
                        X
                    </div>
                    <div className="agent-icon-label">
                        XML/JSON
                    </div>
                </div>
            );

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

        case "JVM_DIAGNOSTICS":
            return (
                <div className="agent-visual">
                    <div className="agent-icon-glyph">
                        V
                    </div>
                    <div className="agent-icon-label">
                        JVM
                    </div>
                </div>
            );

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


function getDefaultDescription(
  code: string
) {

  switch (code) {

    case "JAVA_MIGRATION":

      return "Assess Java version migration readiness and modern Java language opportunities.";

    case "SPRING_BOOT_UPGRADE":

      return "Assess Spring Boot version upgrade readiness, Jakarta migration, Spring Security, dependencies and configuration changes.";

    case "MONOLITH_MICROSERVICES":

      return "Analyze architecture indicators for modularization and microservices decomposition.";

    case "XML_JSON":

      return "Assess XML, XSLT and transformation workloads for modernization.";

    case "PQC_MIGRATION":

      return "Identify cryptographic usage, HNDL exposure and post-quantum migration readiness.";

    case "SONAR_INTELLIGENCE":

      return "Analyze code quality and engineering improvement opportunities.";

    case "JVM_DIAGNOSTICS":

      return "Assess JVM runtime and diagnostic modernization considerations.";

    case "OWASP_SECURITY":

      return "Review application security findings and modernization risks.";

    default:

      return "Run specialized modernization intelligence against the selected project.";
  }
}


function getErrorMessage(
  error: unknown,
  fallback: string
) {

  return error instanceof Error
    ? error.message
    : fallback;
}