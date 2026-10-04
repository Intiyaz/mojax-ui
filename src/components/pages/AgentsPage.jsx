import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAgents } from "../../services/agentApi";
import { getProjects } from "../../services/projectApi";
import { runAssessment } from "../../services/assessmentApi";
export default function AgentsPage() {
    const navigate = useNavigate();
    const [agents, setAgents] = useState([]);
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [loading, setLoading] = useState(true);
    const [runningAgentCode, setRunningAgentCode] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        loadPage();
    }, []);
    async function loadPage() {
        try {
            setLoading(true);
            setError(null);
            const [agentData, projectData] = await Promise.all([
                getAgents(),
                getProjects()
            ]);
            setAgents(Array.isArray(agentData)
                ? agentData
                : []);
            setProjects(Array.isArray(projectData)
                ? projectData
                : []);
            if (projectData.length > 0) {
                setSelectedProjectId(current => current
                    ||
                        projectData[0].id);
            }
        }
        catch (err) {
            setError(getErrorMessage(err, "Unable to load agents."));
        }
        finally {
            setLoading(false);
        }
    }
    const selectedProject = useMemo(() => projects.find(project => project.id
        === selectedProjectId), [
        projects,
        selectedProjectId
    ]);
    async function handleRunAgent(agentCode) {
        if (!selectedProjectId) {
            setError("Please select a project before running an assessment.");
            return;
        }
        try {
            setRunningAgentCode(agentCode);
            setError(null);
            const assessment = await runAssessment(selectedProjectId, agentCode);
            navigate(`/assessments/${assessment.id}`, {
                state: {
                    assessment
                }
            });
        }
        catch (err) {
            setError(getErrorMessage(err, "Unable to run assessment."));
        }
        finally {
            setRunningAgentCode(null);
        }
    }
    return (<div className="page-content">


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

      {error
            &&
                (<div className="page-error">

            {error}

          </div>)}


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


        {projects.length > 0
            ?
                (<select value={selectedProjectId} disabled={runningAgentCode !== null} onChange={event => setSelectedProjectId(event.target.value)}>

              {projects.map(project => (<option key={project.id} value={project.id}>

                      {project.name}

                    </option>))}

            </select>)
            :
                (<div className="selector-empty">

              No projects available.

            </div>)}

      </div>


      {selectedProject
            &&
                (<div className="selected-project-summary">

            Running assessments against:
            {" "}

            <strong>

              {selectedProject.name}

            </strong>

          </div>)}


      {/* LOADING */}

      {loading
            &&
                (<div className="page-loading">

            Loading MoJaX agents...

          </div>)}


      {/* AGENTS */}

      {!loading
            &&
                (<div className="agents-grid">

            {agents.map(agent => {
                        const running = runningAgentCode
                            === agent.code;
                        return (<div key={agent.code} className="agent-card">

                      <div className="agent-card-header">

                        <div className="agent-icon">

                          {getAgentIcon(agent.code)}

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

                        {agent.description
                                ||
                                    getDefaultDescription(agent.code)}

                      </p>


                      {agent.category
                                &&
                                    (<div className="agent-category">

                            {agent.category}

                          </div>)}


                      <button type="button" className="agent-run-button" disabled={!selectedProjectId
                                ||
                                    runningAgentCode !== null
                                ||
                                    agent.enabled === false} onClick={() => handleRunAgent(agent.code)}>

                        {running
                                ?
                                    "Running Assessment..."
                                :
                                    "Run Assessment"}

                        {!running
                                &&
                                    <span>→</span>}

                      </button>

                    </div>);
                    })}

          </div>)}


      {!loading
            &&
                agents.length === 0
            &&
                (<div className="empty-state">

            <h3>

              No agents available

            </h3>


            <p>

              No active MoJaX assessment
              agents were returned by the server.

            </p>

          </div>)}

    </div>);
}
function getAgentIcon(code) {
    switch (code) {
        case "JAVA_MIGRATION":
            return "J";
        case "JEE_SPRING":
            return "S";
        case "MONOLITH_MICROSERVICES":
            return "M";
        case "XML_JSON":
            return "X";
        case "PQC_MIGRATION":
            return "Q";
        case "SONAR_INTELLIGENCE":
            return "◎";
        case "JVM_DIAGNOSTICS":
            return "V";
        case "OWASP_SECURITY":
            return "◆";
        default:
            return "A";
    }
}
function getDefaultDescription(code) {
    switch (code) {
        case "JAVA_MIGRATION":
            return "Assess Java version migration readiness and modern Java language opportunities.";
        case "JEE_SPRING":
            return "Evaluate legacy Java EE components and Spring Boot modernization opportunities.";
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
function getErrorMessage(error, fallback) {
    return error instanceof Error
        ? error.message
        : fallback;
}
