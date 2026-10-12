import { formatName } from "../utils/formatters";

import Score from "./Score";
import AssessmentSummaryTable from "./AssessmentSummaryTable";
import MetricsPanel from "./MetricsPanel";
import RecommendationsPanel from "./RecommendationsPanel";
import ExecutiveSummary from "./ExecutiveSummary";
import AssessmentMetadata from "./AssessmentMetadata";

import PqcAssessmentReport from "./pqc/PqcAssessmentReport";

import JavaModernizationReport
    from "./modernization/JavaModernizationReport";

import JavaMigrationPlannerReport
    from "./migration/JavaMigrationPlannerReport";

import SpringBootAssessmentReport
    from "./springboot/SpringBootAssessmentReport";

import OwaspSecurityReport
    from "./owasp/OwaspSecurityReport";


function StatusBadge({ status }) {

    return (
        <span
            className={
                status === "COMPLETED"
                    ? "completed"
                    : "assessment-status"
            }
        >
            {status}
        </span>
    );
}


export default function AssessmentPanel({
    assessment,
    projectName
}) {

    /*
     * =========================================================
     * AGENT TYPES
     * =========================================================
     */

    const isJavaMigration =
        assessment.agentCode ===
        "JAVA_MIGRATION";


    const isPqcMigration =
        assessment.agentCode ===
        "PQC_MIGRATION";

    const isOwaspSecurity =
    assessment.agentCode ===
    "OWASP_SECURITY";

    const isSpringBootUpgrade =
        assessment.agentCode ===
        "SPRING_BOOT_UPGRADE";


    /*
     * =========================================================
     * METRICS
     * =========================================================
     */

    const metrics =
        assessment.metrics || {};


    /*
     * Java Migration versions
     */

    const currentJava =
        scalar(
            metrics.currentJavaVersion,
            summaryValue(
                assessment.summary,
                "Current Java Version",
                "?"
            )
        );


    const targetJava =
        scalar(
            metrics.targetJavaVersion,
            summaryValue(
                assessment.summary,
                "Target Java Version",
                "21"
            )
        );


    /*
     * =========================================================
     * SCORE LABELS
     * =========================================================
     */

    const readinessTitle =
        isPqcMigration

            ? "PQC Readiness"

            : isOwaspSecurity

                ? "Security Readiness"

                : "Java 21 Readiness";


    const riskTitle =
        isPqcMigration

            ? "Quantum Migration Risk"

            : isOwaspSecurity

                ? "Security Risk"

                : "Migration Risk";


    /*
     * =========================================================
     * ASSESSMENT TITLE
     * =========================================================
     */

    const assessmentTitle =
        isPqcMigration
            ? "Post-Quantum Cryptography Assessment"

            : isOwaspSecurity
                ? "OWASP Top 10 Security Assessment"

                : formatName(
                    assessment.agentCode
                );


    return (

        <section
            id="assessment-report-content"
            className="assessment-report"
        >

            <section className="assessment">


                {/* =====================================================
                    JAVA MIGRATION COVER
                   ===================================================== */}

                {isJavaMigration && (

                    <section
                        className="migration-cover"
                        data-report-search
                    >

                        <div className="migration-cover-brand">
                            MoJaX
                        </div>


                        <div className="migration-cover-kicker">
                            ENTERPRISE JAVA MODERNIZATION INTELLIGENCE
                        </div>


                        <h1>
                            Java {currentJava} → Java {targetJava}
                        </h1>


                        <h2>
                            Migration & Modernization Assessment
                        </h2>


                        <div className="migration-cover-project">

                            <span>
                                PROJECT
                            </span>

                            <strong>
                                {
                                    projectName
                                    || "Project"
                                }
                            </strong>

                        </div>


                        <p>
                            Java 21 readiness, framework compatibility,
                            modernization opportunities, package-level
                            migration findings and an ordered migration
                            roadmap.
                        </p>


                        <div className="migration-cover-footer">

                            <StatusBadge
                                status={
                                    assessment.status
                                }
                            />

                            <span>
                                Assessment ID · {assessment.id}
                            </span>

                        </div>

                    </section>

                )}


                {/* =====================================================
                    NON-JAVA ASSESSMENT HEADER
                   ===================================================== */}

                {!isJavaMigration && (

                    <div className="assessment-header">

                        <div>

                            <span className="eyebrow">
                                ASSESSMENT RESULT
                            </span>


                            <h2>
                                {assessmentTitle}
                            </h2>

                        </div>


                        <StatusBadge
                            status={
                                assessment.status
                            }
                        />

                    </div>

                )}


                {/* =====================================================
                    EXECUTIVE SUMMARY
                   ===================================================== */}

                <section
                    className="report-executive-summary"
                    data-report-search
                >

                    <ExecutiveSummary
                        summary={
                            assessment.summary
                        }
                    />

                </section>


                {/* =====================================================
                    SCORES
                   ===================================================== */}

                <div className="scores">

                    <Score
                        title={
                            readinessTitle
                        }
                        score={
                            assessment.readinessScore
                        }
                    />


                    <Score
                        title={
                            riskTitle
                        }
                        score={
                            assessment.riskScore
                        }
                    />

                </div>


                {/* =====================================================
                    JAVA MIGRATION SUMMARY
                   ===================================================== */}

                {isJavaMigration && (

                    <section data-report-search>

                        <AssessmentSummaryTable
                            assessment={
                                assessment
                            }
                        />

                    </section>

                )}


                {/* =====================================================
                    JAVA MODERNIZATION ANALYSIS
                   ===================================================== */}

                {isJavaMigration &&
                    assessment.modernizationAnalysis && (

                    <section data-report-search>

                        <JavaModernizationReport
                            analysis={
                                assessment.modernizationAnalysis
                            }
                        />

                    </section>

                )}


                {/* =====================================================
                    JAVA MIGRATION ROADMAP
                   ===================================================== */}

                {isJavaMigration && (

                    <section
                        className="consolidated-report-stage"
                        data-report-search
                    >

                        <div className="consolidated-stage-label">

                            <span>
                                03
                            </span>

                            <div>

                                <small>
                                    EXECUTION ROADMAP
                                </small>

                                <strong>
                                    Migration Plan & Remediation
                                </strong>

                            </div>

                        </div>


                        <JavaMigrationPlannerReport
                            metrics={
                                assessment.metrics
                            }
                        />


                        <RecommendationsPanel
                            recommendations={
                                assessment.recommendations
                            }
                        />

                    </section>

                )}


                {/* =====================================================
                    JAVA METRICS
                   ===================================================== */}

                {isJavaMigration && (

                    <section data-report-search>

                        <MetricsPanel
                            metrics={
                                assessment.metrics
                            }
                        />

                    </section>

                )}

                {/* =====================================================
                    OWASP REPORT
                   ===================================================== */}

                {
                    isOwaspSecurity && (

                        <section
                            data-report-search
                        >

                            <OwaspSecurityReport

                                metrics={
                                    assessment.metrics
                                    || {}
                                }

                            />

                        </section>
                    )
                }

                {/* =====================================================
                    PQC REPORT
                   ===================================================== */}

                {isPqcMigration &&
                    assessment.pqcAnalysis && (

                    <section data-report-search>

                        <PqcAssessmentReport
                            analysis={
                                assessment.pqcAnalysis
                            }
                        />

                    </section>

                )}


                {/* =====================================================
                    SPRING BOOT REPORT
                   ===================================================== */}

                {isSpringBootUpgrade && (

                    <section data-report-search>

                        <SpringBootAssessmentReport

                            metrics={
                                assessment.metrics
                                || {}
                            }

                            findings={
                                assessment.findings
                                || []
                            }

                        />

                    </section>

                )}


                {/* =====================================================
                    NON-JAVA RECOMMENDATIONS
                   ===================================================== */}

                {!isJavaMigration && (

                    <section data-report-search>

                        <RecommendationsPanel
                            recommendations={
                                assessment.recommendations
                            }
                        />

                    </section>

                )}


                {/* =====================================================
                    ASSESSMENT DETAILS
                   ===================================================== */}

                <section
                    className="assessment-details-stage"
                    data-report-search
                >

                    <div
                        className=
                            "consolidated-stage-label compact"
                    >

                        <span>
                            05
                        </span>


                        <div>

                            <small>
                                AUDIT INFORMATION
                            </small>

                            <strong>
                                Assessment Details
                            </strong>

                        </div>

                    </div>


                    <AssessmentMetadata
                        assessment={
                            assessment
                        }
                    />

                </section>

            </section>

        </section>
    );
}


/*
 * =========================================================
 * SUMMARY VALUE
 * =========================================================
 */

function summaryValue(
    summary,
    label,
    fallback
) {

    if (
        summary == null
        ||
        summary.trim().length === 0
    ) {

        return fallback;
    }


    const escapedLabel =
        label.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );


    const match =
        summary.match(
            new RegExp(
                `^${escapedLabel}:\\s*(.+)$`,
                "im"
            )
        );


    return match?.[1]?.trim()
        || fallback;
}


/*
 * =========================================================
 * SCALAR VALUE
 * =========================================================
 */

function scalar(
    value,
    fallback
) {

    if (
        typeof value === "string"
        ||
        typeof value === "number"
    ) {

        return String(
            value
        );
    }


    return fallback;
}