import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  apiGet
} from "../../services/apiFetch";

import {
  useOrganization
} from "../../context/OrganizationContext";


type DashboardSummary = {
  projects: number;

  assessments: number;

  completedAssessments: number;

  failedAssessments: number;

  javaAssessments: number;

  pqcAssessments: number;

  averageRiskScore: number;

  averageReadinessScore: number;
};


type RiskDistribution = {
  CRITICAL: number;

  HIGH: number;

  MEDIUM: number;

  LOW: number;

  NOT_ASSESSED: number;
};


type DashboardProject = {
  projectId: string;

  projectName: string;

  repositoryUrl: string;

  latestAssessmentId: string | null;

  latestAgentCode: string | null;

  status: string;

  riskScore: number | null;

  readinessScore: number | null;

  assessedAt: string | null;
};


type RecentAssessment = {
  assessmentId: string;

  projectId: string;

  projectName: string;

  agentCode: string;

  status: string;

  riskScore: number | null;

  readinessScore: number | null;

  createdAt: string;
};


type DashboardResponse = {
  organizationId: string;

  organizationName: string;

  summary: DashboardSummary;

  riskDistribution: RiskDistribution;

  projects: DashboardProject[];

  recentAssessments: RecentAssessment[];
};


export default function DashboardPage() {

  const navigate =
    useNavigate();


  const {
    organizationId,
    organizationName,
    loading:
      organizationLoading
  } =
    useOrganization();


  const [
    dashboard,
    setDashboard
  ] =
    useState<DashboardResponse | null>(
      null
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


  const loadDashboard =
    useCallback(
      async () => {

        if (
          organizationLoading
        ) {

          return;
        }


        if (
          !organizationId
        ) {

          setDashboard(
            null
          );


          setError(
            "No organization is associated with the current user."
          );


          setLoading(
            false
          );

          return;
        }


        try {

          setLoading(
            true
          );


          setError(
            null
          );


          const data =
            await apiGet<DashboardResponse>(
              `/api/v1/organizations/${organizationId}/dashboard`
            );


          setDashboard(
            data
          );

        } catch (err) {

          setDashboard(
            null
          );


          setError(
            getErrorMessage(
              err,
              "Unable to load dashboard."
            )
          );

        } finally {

          setLoading(
            false
          );
        }

      },
      [
        organizationId,
        organizationLoading
      ]
    );


  useEffect(
    () => {

      void loadDashboard();

    },
    [
      loadDashboard
    ]
  );


  const latestAssessment =
    useMemo(
      () =>
        dashboard?.recentAssessments?.[0]
        ?? null,
      [
        dashboard
      ]
    );


  if (
    organizationLoading
    ||
    loading
  ) {

    return (

      <div className="page-content">

        <div className="page-loading">

          Loading dashboard...

        </div>

      </div>
    );
  }


  return (

    <div className="page-content">


      {/* ===================================================
          HEADER
          =================================================== */}

      <div className="page-header">

        <div>

          <span className="page-kicker">

            MODERNIZATION OVERVIEW

          </span>


          <h1>

            Dashboard

          </h1>


          <p>

            Track Java modernization projects,
            assessments, risks and readiness.

          </p>

        </div>


        <button
          type="button"
          className="secondary-button"
          onClick={
            () =>
              void loadDashboard()
          }
        >

          Refresh

        </button>

      </div>


      {/* ===================================================
          ERROR
          =================================================== */}

      {
        error
        &&
        (

          <div className="page-error">

            {error}

          </div>

        )
      }


      {
        dashboard
        &&
        (
          <>


            {/* =============================================
                ORGANIZATION
                ============================================= */}

            <section className="dashboard-welcome-card">

              <div>

                <span className="dashboard-label">

                  ORGANIZATION

                </span>


                <h2>

                  {
                    dashboard.organizationName
                    ||
                    organizationName
                    ||
                    "MoJaX Workspace"
                  }

                </h2>


                <p>

                  Enterprise Java modernization
                  intelligence powered by MoJaX.

                </p>

              </div>

            </section>


            {/* =============================================
                TOP SUMMARY
                ============================================= */}

            <section className="dashboard-summary-grid">


              <DashboardMetric
                label="Projects"
                value={
                  dashboard.summary.projects
                }
                hint="Registered Java applications"
              />


              <DashboardMetric
                label="Assessments"
                value={
                  dashboard.summary.assessments
                }
                hint="Total modernization assessments"
              />


              <DashboardMetric
                label="Completed"
                value={
                  dashboard.summary.completedAssessments
                }
                hint="Completed assessments"
              />


              <DashboardMetric
                label="Failed"
                value={
                  dashboard.summary.failedAssessments
                }
                hint="Failed assessments"
              />

            </section>


            {/* =============================================
                MODERNIZATION INTELLIGENCE
                ============================================= */}

            <section className="dashboard-section">

              <div className="dashboard-section-header">

                <div>

                  <span className="dashboard-label">

                    MODERNIZATION INTELLIGENCE

                  </span>


                  <h3>

                    Assessment Summary

                  </h3>

                </div>

              </div>


              <div className="dashboard-health-grid">


                <HealthItem
                  label="Java Assessments"
                  value={
                    dashboard.summary.javaAssessments
                  }
                />


                <HealthItem
                  label="PQC Assessments"
                  value={
                    dashboard.summary.pqcAssessments
                  }
                />


                <HealthScore
                  label="Average Risk Score"
                  value={
                    dashboard.summary.averageRiskScore
                  }
                />


                <HealthScore
                  label="Average Readiness Score"
                  value={
                    dashboard.summary.averageReadinessScore
                  }
                />

              </div>

            </section>


            {/* =============================================
                RISK DISTRIBUTION
                ============================================= */}

            <section className="dashboard-section">

              <div className="dashboard-section-header">

                <div>

                  <span className="dashboard-label">

                    RISK PROFILE

                  </span>


                  <h3>

                    Risk Distribution

                  </h3>

                </div>

              </div>


              <div className="dashboard-health-grid">


                <RiskItem
                  label="Critical"
                  value={
                    dashboard.riskDistribution.CRITICAL
                  }
                  status="critical"
                />


                <RiskItem
                  label="High"
                  value={
                    dashboard.riskDistribution.HIGH
                  }
                  status="high"
                />


                <RiskItem
                  label="Medium"
                  value={
                    dashboard.riskDistribution.MEDIUM
                  }
                  status="medium"
                />


                <RiskItem
                  label="Low"
                  value={
                    dashboard.riskDistribution.LOW
                  }
                  status="low"
                />


                <RiskItem
                  label="Not Assessed"
                  value={
                    dashboard.riskDistribution.NOT_ASSESSED
                  }
                  status="not-assessed"
                />

              </div>

            </section>


            {/* =============================================
                RECENT + ACTIONS
                ============================================= */}

            <div className="dashboard-two-column">


              {/* RECENT ASSESSMENT */}

              <section className="dashboard-section">

                <div className="dashboard-section-header">

                  <div>

                    <span className="dashboard-label">

                      RECENT ACTIVITY

                    </span>


                    <h3>

                      Latest Assessment

                    </h3>

                  </div>

                </div>


                {
                  latestAssessment
                  ?
                  (

                    <div className="dashboard-latest-assessment">


                      <div>

                        <span>

                          Project

                        </span>


                        <strong>

                          {
                            latestAssessment.projectName
                          }

                        </strong>

                      </div>


                      <div>

                        <span>

                          Agent

                        </span>


                        <strong>

                          {
                            formatLabel(
                              latestAssessment.agentCode
                            )
                          }

                        </strong>

                      </div>


                      <div>

                        <span>

                          Status

                        </span>


                        <strong>

                          {
                            formatLabel(
                              latestAssessment.status
                            )
                          }

                        </strong>

                      </div>


                      <div>

                        <span>

                          Risk Score

                        </span>


                        <strong>

                          {
                            formatScore(
                              latestAssessment.riskScore
                            )
                          }

                        </strong>

                      </div>


                      <div>

                        <span>

                          Readiness Score

                        </span>


                        <strong>

                          {
                            formatScore(
                              latestAssessment.readinessScore
                            )
                          }

                        </strong>

                      </div>


                      <div>

                        <span>

                          Assessed

                        </span>


                        <strong>

                          {
                            formatDate(
                              latestAssessment.createdAt
                            )
                          }

                        </strong>

                      </div>


                      <button
                        type="button"
                        className="secondary-button"
                        onClick={
                          () =>
                            navigate(
                              `/assessments/${latestAssessment.assessmentId}`
                            )
                        }
                      >

                        View Assessment

                      </button>

                    </div>

                  )
                  :
                  (

                    <div className="dashboard-empty-block">

                      No assessments available.

                    </div>

                  )
                }

              </section>


              {/* QUICK ACTIONS */}

              <section className="dashboard-section">

                <div className="dashboard-section-header">

                  <div>

                    <span className="dashboard-label">

                      QUICK ACTIONS

                    </span>


                    <h3>

                      Continue Working

                    </h3>

                  </div>

                </div>


                <div className="dashboard-actions">


                  <DashboardAction
                    title="Projects"
                    description="Manage Java applications"
                    onClick={
                      () =>
                        navigate(
                          "/projects"
                        )
                    }
                  />


                  <DashboardAction
                    title="Agents"
                    description="Run modernization assessments"
                    onClick={
                      () =>
                        navigate(
                          "/agents"
                        )
                    }
                  />


                  <DashboardAction
                    title="Assessments"
                    description="Review findings and results"
                    onClick={
                      () =>
                        navigate(
                          "/assessments"
                        )
                    }
                  />


                  <DashboardAction
                    title="Reports"
                    description="View modernization reports"
                    onClick={
                      () =>
                        navigate(
                          "/reports"
                        )
                    }
                  />

                </div>

              </section>

            </div>


            {/* =============================================
                PROJECT PORTFOLIO
                ============================================= */}

            <section className="dashboard-section">

              <div className="dashboard-section-header">

                <div>

                  <span className="dashboard-label">

                    PROJECT PORTFOLIO

                  </span>


                  <h3>

                    Project Assessment Status

                  </h3>

                </div>


                <button
                  type="button"
                  className="secondary-button"
                  onClick={
                    () =>
                      navigate(
                        "/projects"
                      )
                  }
                >

                  View Projects

                </button>

              </div>


              {
                dashboard.projects.length > 0
                ?
                (

                  <div className="assessment-table-wrapper">

                    <table className="assessment-table">

                      <thead>

                        <tr>

                          <th>
                            Project
                          </th>

                          <th>
                            Latest Agent
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
                            Last Assessed
                          </th>

                          <th>
                            Action
                          </th>

                        </tr>

                      </thead>


                      <tbody>

                        {
                          dashboard.projects.map(
                            project => (

                              <tr
                                key={
                                  project.projectId
                                }
                              >

                                <td>

                                  <strong>

                                    {
                                      project.projectName
                                    }

                                  </strong>

                                </td>


                                <td>

                                  {
                                    project.latestAgentCode
                                      ?
                                      formatLabel(
                                        project.latestAgentCode
                                      )
                                      :
                                      "—"
                                  }

                                </td>


                                <td>

                                  <StatusBadge
                                    status={
                                      project.status
                                    }
                                  />

                                </td>


                                <td>

                                  {
                                    formatScore(
                                      project.riskScore
                                    )
                                  }

                                </td>


                                <td>

                                  {
                                    formatScore(
                                      project.readinessScore
                                    )
                                  }

                                </td>


                                <td>

                                  {
                                    project.assessedAt
                                      ?
                                      formatDate(
                                        project.assessedAt
                                      )
                                      :
                                      "—"
                                  }

                                </td>


                                <td>

                                  {
                                    project.latestAssessmentId
                                    ?
                                    (

                                      <button
                                        type="button"
                                        className="assessment-view-button"
                                        onClick={
                                          () =>
                                            navigate(
                                              `/assessments/${project.latestAssessmentId}`
                                            )
                                        }
                                      >

                                        View

                                      </button>

                                    )
                                    :
                                    (

                                      <button
                                        type="button"
                                        className="assessment-view-button"
                                        onClick={
                                          () =>
                                            navigate(
                                              "/agents"
                                            )
                                        }
                                      >

                                        Assess

                                      </button>

                                    )
                                  }

                                </td>

                              </tr>

                            )
                          )
                        }

                      </tbody>

                    </table>

                  </div>

                )
                :
                (

                  <div className="dashboard-empty-block">

                    No projects available.

                  </div>

                )
              }

            </section>


            {/* =============================================
                RECENT ASSESSMENTS
                ============================================= */}

            <section className="dashboard-section">

              <div className="dashboard-section-header">

                <div>

                  <span className="dashboard-label">

                    ASSESSMENT HISTORY

                  </span>


                  <h3>

                    Recent Assessments

                  </h3>

                </div>


                <button
                  type="button"
                  className="secondary-button"
                  onClick={
                    () =>
                      navigate(
                        "/assessments"
                      )
                  }
                >

                  View All

                </button>

              </div>


              {
                dashboard.recentAssessments.length > 0
                ?
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
                          dashboard.recentAssessments.map(
                            assessment => (

                              <tr
                                key={
                                  assessment.assessmentId
                                }
                              >

                                <td>

                                  <strong>

                                    {
                                      assessment.projectName
                                    }

                                  </strong>

                                </td>


                                <td>

                                  {
                                    formatLabel(
                                      assessment.agentCode
                                    )
                                  }

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
                                    formatDate(
                                      assessment.createdAt
                                    )
                                  }

                                </td>


                                <td>

                                  <button
                                    type="button"
                                    className="assessment-view-button"
                                    onClick={
                                      () =>
                                        navigate(
                                          `/assessments/${assessment.assessmentId}`
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
                :
                (

                  <div className="dashboard-empty-block">

                    No recent assessments available.

                  </div>

                )
              }

            </section>

          </>
        )
      }


      {
        !error
        &&
        !dashboard
        &&
        (

          <div className="empty-state">

            <h3>

              Dashboard unavailable

            </h3>


            <p>

              No dashboard data was returned
              by the server.

            </p>

          </div>

        )
      }

    </div>
  );
}


/* ============================================================
   METRIC
   ============================================================ */

function DashboardMetric({
  label,
  value,
  hint
}: {
  label: string;
  value: number;
  hint: string;
}) {

  return (

    <div className="dashboard-metric">

      <span>

        {label}

      </span>


      <strong>

        {value}

      </strong>


      <p>

        {hint}

      </p>

    </div>
  );
}


/* ============================================================
   HEALTH
   ============================================================ */

function HealthItem({
  label,
  value
}: {
  label: string;
  value: number;
}) {

  return (

    <div className="dashboard-health-item">

      <span>

        {label}

      </span>


      <strong>

        {value}

      </strong>

    </div>
  );
}


function HealthScore({
  label,
  value
}: {
  label: string;
  value: number;
}) {

  return (

    <div className="dashboard-health-item">

      <span>

        {label}

      </span>


      <strong>

        {
          Number(
            value
          ).toFixed(1)
        }

      </strong>

    </div>
  );
}


/* ============================================================
   RISK
   ============================================================ */

function RiskItem({
  label,
  value,
  status
}: {
  label: string;
  value: number;
  status: string;
}) {

  return (

    <div
      className={
        `dashboard-health-item dashboard-risk-${status}`
      }
    >

      <span>

        {label}

      </span>


      <strong>

        {value}

      </strong>

    </div>
  );
}


/* ============================================================
   ACTION
   ============================================================ */

function DashboardAction({
  title,
  description,
  onClick
}: {
  title: string;
  description: string;
  onClick: () => void;
}) {

  return (

    <button
      type="button"
      onClick={
        onClick
      }
    >

      <span>

        {title}

      </span>


      <strong>

        {description}

      </strong>


      <b>

        →

      </b>

    </button>
  );
}


/* ============================================================
   STATUS
   ============================================================ */

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
        formatLabel(
          status
        )
      }

    </span>
  );
}


/* ============================================================
   HELPERS
   ============================================================ */

function formatLabel(
  value: string
): string {

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
  value: number | null | undefined
): string {

  if (
    value === null
    ||
    value === undefined
  ) {

    return "—";
  }


  return Number(
    value
  ).toFixed(1);
}


function formatDate(
  value: string
): string {

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


function getErrorMessage(
  error: unknown,
  fallback: string
): string {

  if (
    error instanceof Error
  ) {

    return error.message;
  }


  return fallback;
}