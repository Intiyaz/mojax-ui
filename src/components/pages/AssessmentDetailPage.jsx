import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getAssessment } from "../../services/assessmentApi";
import { getProject } from "../../services/projectApi";
import AssessmentPanel from "../AssessmentPanel";
import { downloadAssessmentPdf } from "../../utils/assessmentPdf";
export default function AssessmentDetailPage() {
    const { assessmentId } = useParams();
    const location = useLocation();
    const routerState = location.state;
    const passedAssessment = routerState?.assessment;
    const [assessment, setAssessment] = useState(passedAssessment ?? null);
    const [projectName, setProjectName] = useState("");
    const [loading, setLoading] = useState(!passedAssessment);
    const [projectLoading, setProjectLoading] = useState(false);
    const [error, setError] = useState(null);
    const [projectError, setProjectError] = useState(null);
    const [reportSearch, setReportSearch] = useState("");
    useEffect(() => {
        if (passedAssessment) {
            return;
        }
        if (!assessmentId) {
            setError("Assessment ID is missing.");
            setLoading(false);
            return;
        }
        let cancelled = false;
        async function loadAssessment() {
            try {
                setLoading(true);
                setError(null);
                const data = await getAssessment(assessmentId);
                if (!cancelled) {
                    setAssessment(data);
                }
            }
            catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error
                        ? err.message
                        : "Unable to load assessment.");
                }
            }
            finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }
        void loadAssessment();
        return () => {
            cancelled = true;
        };
    }, [
        assessmentId,
        passedAssessment
    ]);
    useEffect(() => {
        const projectId = assessment?.projectId;
        if (!projectId) {
            setProjectName("");
            setProjectError(null);
            return;
        }
        let cancelled = false;
        async function loadProject() {
            try {
                setProjectLoading(true);
                setProjectError(null);
                const project = await getProject(projectId);
                if (!cancelled) {
                    setProjectName(project.name?.trim()
                        || "Project");
                }
            }
            catch (err) {
                if (!cancelled) {
                    setProjectName("Project");
                    setProjectError(err instanceof Error
                        ? err.message
                        : "Unable to load project information.");
                }
            }
            finally {
                if (!cancelled) {
                    setProjectLoading(false);
                }
            }
        }
        void loadProject();
        return () => {
            cancelled = true;
        };
    }, [
        assessment?.projectId
    ]);
    useEffect(() => {
        const root = document.getElementById("assessment-report");
        if (!root) {
            return;
        }
        const query = reportSearch
            .trim()
            .toLowerCase();
        const sections = root.querySelectorAll("[data-report-search]");
        sections.forEach(section => {
            const matches = !query
                ||
                    (section.innerText
                        ??
                            "")
                        .toLowerCase()
                        .includes(query);
            section.classList.toggle("report-search-hidden", !matches);
        });
    }, [
        reportSearch,
        assessment
    ]);
    const visibleSectionCount = useMemo(() => {
        if (!reportSearch.trim()) {
            return null;
        }
        const root = document.getElementById("assessment-report");
        if (!root) {
            return null;
        }
        return Array
            .from(root.querySelectorAll("[data-report-search]"))
            .filter(section => !section.classList.contains("report-search-hidden"))
            .length;
    }, [
        reportSearch
    ]);
    if (loading) {
        return (<div className="page">
        <div className="content-card">
          Loading assessment...
        </div>
      </div>);
    }
    if (error) {
        return (<div className="page">

        <div className="error-message">
          {error}
        </div>

      </div>);
    }
    if (!assessment) {
        return (<div className="page">

        <div className="empty-state">
          Assessment not found.
        </div>

      </div>);
    }
    const hasDetailedAnalysis = Boolean(assessment.pqcAnalysis
        ||
            assessment.remediationPlan
        ||
            (assessment.findings &&
                assessment.findings.length > 0)
        ||
            (assessment.recommendations &&
                assessment.recommendations.length > 0));
    const resolvedProjectName = projectName.trim()
        || "Project";
    async function handleDownload() {
        await downloadAssessmentPdf("assessment-report", resolvedProjectName, assessment.agentCode);
    }
    return (<div className="page">

      {hasDetailedAnalysis && (<div className="report-storage-notice">
          Please download the report as detailed assessment
          content is not currently persisted.
        </div>)}


      {projectError && (<div className="report-project-warning">
          Project name could not be loaded.
          The report will use a generic project name.
        </div>)}


      <div className="assessment-toolbar">

        <div className="report-search-box">

          <span className="report-search-icon">
            ⌕
          </span>

          <input type="search" value={reportSearch} placeholder="Search report: Hibernate, Jakarta, security, package..." onChange={event => setReportSearch(event.target.value)}/>

          {reportSearch && (<button type="button" className="report-search-clear" onClick={() => setReportSearch("")}>
              Clear
            </button>)}

        </div>


        {visibleSectionCount !== null && (<span className="report-search-result">
            {visibleSectionCount} matching section
            {visibleSectionCount === 1 ? "" : "s"}
          </span>)}


        <button type="button" className="primary-button" disabled={projectLoading} onClick={handleDownload}>
          {projectLoading
            ? "Loading Project..."
            : "Download Assessment Report"}
        </button>

      </div>


      <div id="assessment-report">

        <AssessmentPanel assessment={assessment} projectName={resolvedProjectName}/>

      </div>


      {!hasDetailedAnalysis && (<div className="history-detail-notice">

          This historical assessment contains
          only the persisted assessment summary.

          Detailed findings, remediation plans,
          PQC analysis and migration data are not
          yet persisted by the backend.

        </div>)}

    </div>);
}
