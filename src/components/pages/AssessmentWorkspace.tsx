import { useEffect, useState } from "react";
import type { Agent, Assessment , Project} from "../../types";
import { errorMessage } from "../../utils/formatters";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Hero from "../Hero";
import ProjectSelector from "../ProjectSelector";
import AgentCard from "../AgentCard";
import AssessmentPanel from "../AssessmentPanel";
import ErrorPanel from "../ErrorPanel";
import { downloadAssessmentPdf } from "../../utils/assessmentPdf";

export default function AssessmentWorkspace() {
    const [agents, setAgents] = useState<Agent[]>([]),
        [projects, setProjects] = useState<Project[]>([]),
        [assessment, setAssessment] = useState<Assessment | null>(null),
        [projectId, setProjectId] = useState(""),
        [running, setRunning] = useState<string | null>(null),
        [loading, setLoading] = useState(true),
        [error, setError] = useState<string | null>(null),
        [downloadingReport, setDownloadingReport] = useState(false);
    useEffect(() => {
        void load();
    }, []);
    async function load() {
    try {
        setLoading(true);
        setError("");

        // Load agents
        const agentsResponse = await fetch("/api/v1/agents");

        if (!agentsResponse.ok) {
            throw new Error(
                `Unable to load agents. HTTP ${agentsResponse.status}`
            );
        }

        setAgents(await agentsResponse.json());


        // Load projects
        const projectsResponse = await fetch("/api/v1/projects");

        if (!projectsResponse.ok) {
            throw new Error(
                `Unable to load projects. HTTP ${projectsResponse.status}`
            );
        }

        const projectsData = await projectsResponse.json();

        console.log("Projects returned:", projectsData);

        setProjects(
            Array.isArray(projectsData)
                ? projectsData
                : []
        );

    } catch (e) {
        setError(errorMessage(e));
    } finally {
        setLoading(false);
    }
}
    async function run(a: Agent) {
        if (!projectId.trim()) {
            setError(
                "Please enter a Project UUID before running an assessment.",
            );
            return;
        }
        setError(null);
        setAssessment(null);
        setRunning(a.code);
        try {
            const r = await fetch("/api/v1/assessments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    projectId: projectId.trim(),
                    agentCode: a.code,
                }),
            });
            if (!r.ok)
                throw new Error(
                    (await r.text()) || `Assessment failed. HTTP ${r.status}`,
                );
            setAssessment(await r.json());
        } catch (e) {
            setError(errorMessage(e));
        } finally {
            setRunning(null);
        }
    }
    async function downloadReport() {

    if (!assessment) {
        return;
    }

    try {

        setDownloadingReport(true);


        const agent =
            assessment.agentCode ||
            "ASSESSMENT";


        const assessmentId =
            assessment.id
                ? assessment.id.substring(0, 8)
                : "report";


        await downloadAssessmentPdf(

            "assessment-report",

            `MoJaX-${agent}-${assessmentId}.pdf`
        );

    } catch (error) {

        console.error(
            "Unable to generate assessment PDF:",
            error
        );

        setAssessmentError(
            error instanceof Error
                ? error.message
                : "Unable to generate assessment report."
        );

    } finally {

        setDownloadingReport(false);
    }
}
    return (
        <div className="app">
            <Sidebar />
            <main className="main">
                <Header />
                <Hero />
                {error && (
                    <ErrorPanel
                        message={error}
                        onClose={() => setError(null)}
                    />
                )}
                <ProjectSelector
                projects={projects}
                projectId={projectId}
                setProjectId={setProjectId}
                loading={loading}
                error={error}
            />
                <section>
                    <div className="section-heading">
                        <div>
                            <span className="eyebrow">
                                SPECIALIZED AI AGENTS
                            </span>
                            <h2 className="section-title">
                                Java Modernization Agents
                            </h2>
                        </div>
                        <span className="agent-count">
                            {agents.length} agents
                        </span>
                    </div>
                    {loading ? (
                        <div className="loading-panel">Loading agents...</div>
                    ) : (
                        <section className="agents">
                            {agents.map((a) => (
                                <AgentCard
                                    key={a.id}
                                    agent={a}
                                    running={running === a.code}
                                    disabled={running !== null}
                                    onRun={() => run(a)}
                                />
                            ))}
                        </section>
                    )}
                </section>
                {assessment && (

    <section className="assessment-result-section">

        <div className="assessment-result-toolbar">

            <div>

                <span className="eyebrow">
                    ASSESSMENT RESULT
                </span>

                <h2>
                    Assessment Result
                </h2>

            </div>


            <button
                type="button"
                className="download-report-button"
                onClick={downloadReport}
                disabled={downloadingReport}
            >

                <span className="download-report-icon">
                    ↓
                </span>

                {
                    downloadingReport
                        ? "Generating PDF..."
                        : "Download Assessment Report"
                }

            </button>

        </div>


        <AssessmentPanel
            assessment={assessment}
        />

    </section>

)}
            </main>
        </div>
    );
}
