import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAssessments } from "../../services/assessmentApi";
import { getProjects } from "../../services/projectApi";
export default function AssessmentsPage() {
    const navigate = useNavigate();
    const [assessments, setAssessments] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [projectFilter, setProjectFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");
    useEffect(() => {
        loadPage();
    }, []);
    async function loadPage() {
        try {
            setLoading(true);
            setError(null);
            const [assessmentData, projectData] = await Promise.all([
                getAssessments(),
                getProjects()
            ]);
            setAssessments(Array.isArray(assessmentData)
                ? assessmentData
                : []);
            setProjects(Array.isArray(projectData)
                ? projectData
                : []);
        }
        catch (err) {
            setError(getErrorMessage(err, "Unable to load assessments."));
        }
        finally {
            setLoading(false);
        }
    }
    const projectMap = useMemo(() => new Map(projects.map(project => [
        project.id,
        project.name
    ])), [
        projects
    ]);
    const filteredAssessments = useMemo(() => {
        return assessments.filter(assessment => {
            const projectMatches = projectFilter === "ALL"
                ||
                    assessment.projectId
                        === projectFilter;
            const statusMatches = statusFilter === "ALL"
                ||
                    assessment.status
                        === statusFilter;
            return (projectMatches
                &&
                    statusMatches);
        });
    }, [
        assessments,
        projectFilter,
        statusFilter
    ]);
    const completedCount = assessments.filter(assessment => assessment.status
        === "COMPLETED").length;
    const failedCount = assessments.filter(assessment => assessment.status
        === "FAILED").length;
    return (<div className="page-content">


      {/* HEADER */}

      <div className="page-header">

        <div>

          <span className="page-kicker">

            ASSESSMENT HISTORY

          </span>


          <h1>

            Assessments

          </h1>


          <p>

            Review modernization assessments,
            findings and remediation guidance.

          </p>

        </div>


        <button type="button" className="secondary-button" disabled={loading} onClick={loadPage}>

          Refresh

        </button>

      </div>


      {/* SUMMARY */}

      <div className="assessment-summary-grid">


        <SummaryCard label="Total Assessments" value={assessments.length}/>


        <SummaryCard label="Completed" value={completedCount}/>


        <SummaryCard label="Failed" value={failedCount}/>


        <SummaryCard label="Projects Assessed" value={new Set(assessments.map(assessment => assessment.projectId)).size}/>

      </div>


      {/* ERROR */}

      {error
            &&
                (<div className="page-error">

            {error}

          </div>)}


      {/* FILTERS */}

      <div className="assessment-filters">


        <label>

          <span>

            Project

          </span>


          <select value={projectFilter} onChange={event => setProjectFilter(event.target.value)}>

            <option value="ALL">

              All Projects

            </option>


            {projects.map(project => (<option key={project.id} value={project.id}>

                    {project.name}

                  </option>))}

          </select>

        </label>


        <label>

          <span>

            Status

          </span>


          <select value={statusFilter} onChange={event => setStatusFilter(event.target.value)}>

            <option value="ALL">
              All Statuses
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="RUNNING">
              Running
            </option>

            <option value="COMPLETED">
              Completed
            </option>

            <option value="FAILED">
              Failed
            </option>

          </select>

        </label>

      </div>


      {/* LOADING */}

      {loading
            &&
                (<div className="page-loading">

            Loading assessments...

          </div>)}


      {/* EMPTY */}

      {!loading
            &&
                filteredAssessments.length === 0
            &&
                (<div className="empty-state">

            <h3>

              No assessments found

            </h3>


            <p>

              Run an assessment from the
              Agents page to see results here.

            </p>


            <button type="button" className="primary-button" onClick={() => navigate("/agents")}>

              Go to Agents

            </button>

          </div>)}


      {/* TABLE */}

      {!loading
            &&
                filteredAssessments.length > 0
            &&
                (<div className="assessment-table-wrapper">

            <table className="assessment-table">

              <thead>

                <tr>

                  <th>
                    Project
                  </th>

                  <th>
                    Agent
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Risk
                  </th>

                  <th>
                    Readiness
                  </th>

                  <th>
                    Created
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredAssessments.map(assessment => (<tr key={assessment.id}>

                        <td>

                          <strong>

                            {projectMap.get(assessment.projectId)
                            ||
                                assessment.projectId}

                          </strong>

                        </td>


                        <td>

                          <span className="assessment-agent">

                            {formatAgentCode(assessment.agentCode)}

                          </span>

                        </td>


                        <td>

                          <StatusBadge status={assessment.status}/>

                        </td>


                        <td>

                          {formatScore(assessment.riskScore)}

                        </td>


                        <td>

                          {formatScore(assessment.readinessScore)}

                        </td>


                        <td>

                          {assessment.createdAt
                            ?
                                formatDate(assessment.createdAt)
                            :
                                "—"}

                        </td>


                        <td>

                          <button type="button" className="assessment-view-button" onClick={() => navigate(`/assessments/${assessment.id}`, {
                            state: {
                                assessment
                            }
                        })}>

                            View

                          </button>

                        </td>

                      </tr>))}

              </tbody>

            </table>

          </div>)}

    </div>);
}
/*
 * ============================================================
 * SUMMARY CARD
 * ============================================================
 */
function SummaryCard({ label, value }) {
    return (<div className="assessment-summary-card">

      <span>

        {label}

      </span>


      <strong>

        {value}

      </strong>

    </div>);
}
/*
 * ============================================================
 * STATUS
 * ============================================================
 */
function StatusBadge({ status }) {
    const cssStatus = status
        .toLowerCase()
        .replaceAll("_", "-");
    return (<span className={`assessment-status assessment-status-${cssStatus}`}>

      {formatStatus(status)}

    </span>);
}
/*
 * ============================================================
 * HELPERS
 * ============================================================
 */
function formatStatus(status) {
    return status
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, value => value.toUpperCase());
}
function formatAgentCode(value) {
    return value
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, character => character.toUpperCase());
}
function formatScore(value) {
    if (value === undefined
        ||
            value === null) {
        return "—";
    }
    return Number(value).toFixed(1);
}
function formatDate(value) {
    try {
        return new Intl.DateTimeFormat("en-IN", {
            dateStyle: "medium",
            timeStyle: "short"
        }).format(new Date(value));
    }
    catch {
        return value;
    }
}
function getErrorMessage(error, fallback) {
    return error instanceof Error
        ? error.message
        : fallback;
}
