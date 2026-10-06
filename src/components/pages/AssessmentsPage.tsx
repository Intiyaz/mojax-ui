import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  getAssessments
} from "../../services/assessmentApi";

import type {
  Assessment
} from "../../services/assessmentApi";

import {
  getProjects
} from "../../services/projectApi";

import type {
  Project
} from "../../services/projectApi";

import "../styles/assessmentProgress.css";


export default function AssessmentsPage() {

  const navigate =
    useNavigate();


  const [
    assessments,
    setAssessments
  ] =
    useState<Assessment[]>(
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
    loading,
    setLoading
  ] =
    useState(true);


  const [
    error,
    setError
  ] =
    useState<string | null>(
      null
    );


  const [
    projectFilter,
    setProjectFilter
  ] =
    useState("ALL");


  const [
    statusFilter,
    setStatusFilter
  ] =
    useState("ALL");


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
        assessmentData,
        projectData
      ] =
        await Promise.all([
          getAssessments(),
          getProjects()
        ]);


      setAssessments(
        Array.isArray(
          assessmentData
        )
          ? assessmentData
          : []
      );


      setProjects(
        Array.isArray(
          projectData
        )
          ? projectData
          : []
      );

    } catch (err) {

      setError(
        getErrorMessage(
          err,
          "Unable to load assessments."
        )
      );

    } finally {

      setLoading(
        false
      );
    }
  }


  const projectMap =
    useMemo(
      () =>
        new Map(
          projects.map(
            project => [
              project.id,
              project.name
            ]
          )
        ),
      [
        projects
      ]
    );


  const filteredAssessments =
    useMemo(
      () => {

        return assessments.filter(
          assessment => {

            const projectMatches =
              projectFilter === "ALL"
              ||
              assessment.projectId
                === projectFilter;


            const statusMatches =
              statusFilter === "ALL"
              ||
              assessment.status
                === statusFilter;


            return (
              projectMatches
              &&
              statusMatches
            );
          }
        );

      },
      [
        assessments,
        projectFilter,
        statusFilter
      ]
    );


  const completedCount =
    assessments.filter(
      assessment =>
        assessment.status
        === "COMPLETED"
    ).length;


  const failedCount =
    assessments.filter(
      assessment =>
        assessment.status
        === "FAILED"
    ).length;


  const selectedProjectProgress =
    useMemo(
      () => {

        if (
          projectFilter === "ALL"
        ) {

          return null;
        }


        const completedJavaAssessments =
          assessments
            .filter(
              assessment =>
                assessment.projectId
                  === projectFilter
                &&
                assessment.status
                  === "COMPLETED"
                &&
                assessment.agentCode
                  === "JAVA_MIGRATION"
            )
            .sort(
              (
                left,
                right
              ) =>
                toTimestamp(
                  right.createdAt
                )
                -
                toTimestamp(
                  left.createdAt
                )
            );


        if (
          completedJavaAssessments.length
            < 2
        ) {

          return {
            current:
              completedJavaAssessments[0]
              ?? null,

            previous:
              null
          };
        }


        return {
          current:
            completedJavaAssessments[0],

          previous:
            completedJavaAssessments[1]
        };

      },
      [
        assessments,
        projectFilter
      ]
    );


  return (

    <div className="page-content">


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


        <button
          type="button"
          className="secondary-button"
          disabled={
            loading
          }
          onClick={
            loadPage
          }
        >

          Refresh

        </button>

      </div>


      {/* SUMMARY */}

      <div className="assessment-summary-grid">


        <SummaryCard
          label="Total Assessments"
          value={
            assessments.length
          }
        />


        <SummaryCard
          label="Completed"
          value={
            completedCount
          }
        />


        <SummaryCard
          label="Failed"
          value={
            failedCount
          }
        />


        <SummaryCard
          label="Projects Assessed"
          value={
            new Set(
              assessments.map(
                assessment =>
                  assessment.projectId
              )
            ).size
          }
        />

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


      {/* FILTERS */}

      <div className="assessment-filters">


        <label>

          <span>

            Project

          </span>


          <select
            value={
              projectFilter
            }
            onChange={
              event =>
                setProjectFilter(
                  event.target.value
                )
            }
          >

            <option value="ALL">

              All Projects

            </option>


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

        </label>


        <label>

          <span>

            Status

          </span>


          <select
            value={
              statusFilter
            }
            onChange={
              event =>
                setStatusFilter(
                  event.target.value
                )
            }
          >

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


      {/* MODERNIZATION PROGRESS */}

      {
        projectFilter !== "ALL"
        &&
        selectedProjectProgress
        &&
        (

          <section className="modernization-progress-panel">

            <div className="modernization-progress-header">

              <div>

                <span className="modernization-progress-kicker">

                  MODERNIZATION PROGRESS

                </span>


                <h2>

                  {
                    projectMap.get(
                      projectFilter
                    )
                    ||
                    "Selected Project"
                  }

                </h2>


                <p>

                  Compare the two most recent completed
                  Java Migration assessments for this project.

                </p>

              </div>


              {
                selectedProjectProgress.previous
                &&
                (

                  <div className="modernization-progress-run-label">

                    <span>
                      Latest comparison
                    </span>

                    <strong>
                      {
                        formatShortDate(
                          selectedProjectProgress
                            .current
                            ?.createdAt
                        )
                      }
                    </strong>

                  </div>

                )
              }

            </div>


            {
              selectedProjectProgress.current
              &&
              selectedProjectProgress.previous
              ?
              (

                <>

                  <div className="modernization-progress-grid">

                    <ProgressMetric
                      label="Java Readiness"
                      previousValue={
                        selectedProjectProgress
                          .previous
                          .readinessScore
                      }
                      currentValue={
                        selectedProjectProgress
                          .current
                          .readinessScore
                      }
                      higherIsBetter
                    />


                    <ProgressMetric
                      label="Migration Risk"
                      previousValue={
                        selectedProjectProgress
                          .previous
                          .riskScore
                      }
                      currentValue={
                        selectedProjectProgress
                          .current
                          .riskScore
                      }
                      higherIsBetter={false}
                    />


                    <div className="modernization-progress-card">

                      <span>
                        Previous Assessment
                      </span>

                      <strong className="modernization-progress-date">

                        {
                          formatShortDate(
                            selectedProjectProgress
                              .previous
                              .createdAt
                          )
                        }

                      </strong>

                      <small>

                        Baseline used for this comparison.

                      </small>

                    </div>


                    <div className="modernization-progress-card">

                      <span>
                        Current Assessment
                      </span>

                      <strong className="modernization-progress-date">

                        {
                          formatShortDate(
                            selectedProjectProgress
                              .current
                              .createdAt
                          )
                        }

                      </strong>

                      <small>

                        Most recent completed Java Migration scan.

                      </small>

                    </div>

                  </div>


                  <div className="modernization-progress-note">

                    <span>
                      ✓
                    </span>

                    <p>

                      Re-run the Java Migration assessment after
                      remediation to keep this progress view current.
                      Risk should move down while readiness should
                      move up.

                    </p>

                  </div>

                </>

              )
              :
              (

                <div className="modernization-progress-empty">

                  <strong>
                    One more completed Java Migration assessment is needed.
                  </strong>

                  <p>

                    MoJaX will show readiness improvement and risk
                    reduction after this project has at least two
                    completed Java Migration assessments.

                  </p>

                </div>

              )
            }

          </section>

        )
      }


      {/* LOADING */}

      {
        loading
        &&
        (

          <div className="page-loading">

            Loading assessments...

          </div>

        )
      }


      {/* EMPTY */}

      {
        !loading
        &&
        filteredAssessments.length === 0
        &&
        (

          <div className="empty-state">

            <h3>

              No assessments found

            </h3>


            <p>

              Run an assessment from the
              Agents page to see results here.

            </p>


            <button
              type="button"
              className="primary-button"
              onClick={
                () =>
                  navigate(
                    "/agents"
                  )
              }
            >

              Go to Agents

            </button>

          </div>

        )
      }


      {/* TABLE */}

      {
        !loading
        &&
        filteredAssessments.length > 0
        &&
        (

          <div className="assessment-table-wrapper">

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

                {
                  filteredAssessments.map(
                    assessment => (

                      <tr
                        key={
                          assessment.id
                        }
                      >

                        <td>

                          <strong>

                            {
                              projectMap.get(
                                assessment.projectId
                              )
                              ||
                              assessment.projectId
                            }

                          </strong>

                        </td>


                        <td>

                          <span className="assessment-agent">

                            {
                              formatAgentCode(
                                assessment.agentCode
                              )
                            }

                          </span>

                        </td>


                        <td>

                          <StatusBadge
                            status={
                              assessment.status
                            }
                          />

                        </td>


                        <td>

                          {
                            formatScore(
                              assessment.riskScore
                            )
                          }

                        </td>


                        <td>

                          {
                            formatScore(
                              assessment.readinessScore
                            )
                          }

                        </td>


                        <td>

                          {
                            assessment.createdAt
                              ?
                              formatDate(
                                assessment.createdAt
                              )
                              :
                              "—"
                          }

                        </td>


                        <td>

                          <button
                            type="button"
                            className="assessment-view-button"
                            onClick={
                              () =>
                                navigate(
                                  `/assessments/${assessment.id}`,
                                  {
                                    state: {
                                      assessment
                                    }
                                  }
                                )
                            }
                          >

                            View

                          </button>

                        </td>

                      </tr>

                    )
                  )
                }

              </tbody>

            </table>

          </div>

        )
      }

    </div>
  );
}


/*
 * ============================================================
 * SUMMARY CARD
 * ============================================================
 */

function SummaryCard({
  label,
  value
}: {
  label: string;
  value: number;
}) {

  return (

    <div className="assessment-summary-card">

      <span>

        {label}

      </span>


      <strong>

        {value}

      </strong>

    </div>
  );
}


/*
 * ============================================================
 * MODERNIZATION PROGRESS
 * ============================================================
 */

function ProgressMetric({
  label,
  previousValue,
  currentValue,
  higherIsBetter
}: {
  label: string;
  previousValue?: number;
  currentValue?: number;
  higherIsBetter: boolean;
}) {

  const previous =
    toNumber(
      previousValue
    );


  const current =
    toNumber(
      currentValue
    );


  const delta =
    previous === null
    ||
    current === null
      ? null
      : current - previous;


  const improved =
    delta === null
      ? null
      : higherIsBetter
        ? delta > 0
        : delta < 0;


  const unchanged =
    delta === 0;


  const deltaClass =
    unchanged
      ? "neutral"
      : improved
        ? "positive"
        : "negative";


  return (

    <div className="modernization-progress-card">

      <span>

        {label}

      </span>


      <div className="modernization-score-flow">

        <strong>

          {
            previous === null
              ? "—"
              : previous.toFixed(1)
          }

        </strong>


        <i>
          →
        </i>


        <strong>

          {
            current === null
              ? "—"
              : current.toFixed(1)
          }

        </strong>

      </div>


      <small
        className={
          `modernization-progress-delta ${deltaClass}`
        }
      >

        {
          delta === null
            ? "Score unavailable"
            : formatDelta(
                delta,
                higherIsBetter
              )
        }

      </small>

    </div>
  );
}


/*
 * ============================================================
 * STATUS
 * ============================================================
 */

function StatusBadge({
  status
}: {
  status: string;
}) {

  const cssStatus =
    status
      .toLowerCase()
      .replaceAll(
        "_",
        "-"
      );


  return (

    <span
      className={
        `assessment-status assessment-status-${cssStatus}`
      }
    >

      {
        formatStatus(
          status
        )
      }

    </span>
  );
}


/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

function formatStatus(
  status: string
) {

  return status
    .replaceAll(
      "_",
      " "
    )
    .toLowerCase()
    .replace(
      /\b\w/g,
      value =>
        value.toUpperCase()
    );
}


function formatAgentCode(
  value: string
) {

  return value
    .replaceAll(
      "_",
      " "
    )
    .toLowerCase()
    .replace(
      /\b\w/g,
      character =>
        character.toUpperCase()
    );
}


function formatScore(
  value?: number
) {

  if (
    value === undefined
    ||
    value === null
  ) {

    return "—";
  }


  return Number(
    value
  ).toFixed(1);
}


function formatDate(
  value: string
) {

  try {

    return new Intl.DateTimeFormat(
      "en-IN",
      {
        dateStyle:
          "medium",

        timeStyle:
          "short"
      }
    ).format(
      new Date(value)
    );

  } catch {

    return value;
  }
}


function toNumber(
  value?: number
) {

  if (
    value === undefined
    ||
    value === null
  ) {

    return null;
  }


  const result =
    Number(
      value
    );


  return Number.isFinite(
    result
  )
    ? result
    : null;
}


function toTimestamp(
  value?: string
) {

  if (!value) {

    return 0;
  }


  const result =
    new Date(
      value
    ).getTime();


  return Number.isFinite(
    result
  )
    ? result
    : 0;
}


function formatShortDate(
  value?: string
) {

  if (!value) {

    return "—";
  }


  try {

    return new Intl.DateTimeFormat(
      "en-IN",
      {
        dateStyle:
          "medium"
      }
    ).format(
      new Date(
        value
      )
    );

  } catch {

    return value;
  }
}


function formatDelta(
  delta: number,
  higherIsBetter: boolean
) {

  if (delta === 0) {

    return "No change";
  }


  const amount =
    Math.abs(
      delta
    ).toFixed(
      1
    );


  const improved =
    higherIsBetter
      ? delta > 0
      : delta < 0;


  if (improved) {

    return higherIsBetter
      ? `↑ ${amount} readiness improvement`
      : `↓ ${amount} risk reduction`;
  }


  return higherIsBetter
    ? `↓ ${amount} readiness decline`
    : `↑ ${amount} risk increase`;
}


function getErrorMessage(
  error: unknown,
  fallback: string
) {

  return error instanceof Error
    ? error.message
    : fallback;
}