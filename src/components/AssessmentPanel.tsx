import type {
    Assessment
} from "../types";

import {
    formatName
} from "../utils/formatters";

import Score
    from "./Score";

import AssessmentSummaryTable
    from "./AssessmentSummaryTable";

import MetricsPanel
    from "./MetricsPanel";

import RecommendationsPanel
    from "./RecommendationsPanel";

import ExecutiveSummary
    from "./ExecutiveSummary";

import AssessmentMetadata
    from "./AssessmentMetadata";

import PqcAssessmentReport
    from "./pqc/PqcAssessmentReport";

import JavaModernizationReport
    from "./modernization/JavaModernizationReport";

import JavaMigrationPlannerReport
    from "./migration/JavaMigrationPlannerReport";

import SpringBootAssessmentReport
    from "./springboot/SpringBootAssessmentReport";


function StatusBadge({
    status
}: {
    status: string;
}) {

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
}: {
    assessment: Assessment;
    projectName?: string;
}) {

    const isJavaMigration =
        assessment.agentCode ===
        "JAVA_MIGRATION";

    const isPqcMigration =
        assessment.agentCode ===
        "PQC_MIGRATION";
    
    const isSpringBootUpgrade =
    assessment.agentCode ===
    "SPRING_BOOT_UPGRADE";

    const metrics =
        assessment.metrics || {};

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


    return (
        <section
            id="assessment-report-content"
            className="assessment-report"
        >
            <section className="assessment">

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
                            migration findings and an ordered migration roadmap.
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


                {!isJavaMigration && (

                    <div className="assessment-header">

                        <div>

                            <span className="eyebrow">
                                ASSESSMENT RESULT
                            </span>

                            <h2>
                                {
                                    isPqcMigration
                                        ? "Post-Quantum Cryptography Assessment"
                                        : isSpringBootUpgrade
                                            ? "Spring Boot Upgrade Assessment"
                                            : formatName(
                                                assessment.agentCode
                                            )
                                }
                            </h2>

                        </div>

                        <StatusBadge
                            status={
                                assessment.status
                            }
                        />

                    </div>

                )}


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


                <div className="scores">

                    <Score
                        title={
                            isPqcMigration
                                ? "PQC Readiness"
                                : isSpringBootUpgrade
                                    ? "Spring Boot Readiness"
                                    : "Java 21 Readiness"
                        }
                        score={
                            assessment.readinessScore
                        }
                    />

                    <Score
                        title={
                            isPqcMigration
                                ? "Quantum Migration Risk"
                                : isSpringBootUpgrade
                                    ? "Spring Boot Migration Risk"
                                    : "Migration Risk"
                        }
                        score={
                            assessment.riskScore
                        }
                    />

                </div>


                {isJavaMigration && (

                    <section data-report-search>

                        <AssessmentSummaryTable
                            assessment={
                                assessment
                            }
                        />

                    </section>

                )}


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


                {isJavaMigration && (

                    <section data-report-search>

                        <MetricsPanel
                            metrics={
                                assessment.metrics
                            }
                        />

                    </section>

                )}


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


                {!isJavaMigration && (

                    <section data-report-search>

                        <RecommendationsPanel
                            recommendations={
                                assessment.recommendations
                            }
                        />

                    </section>

                )}


                <section
                    className="assessment-details-stage"
                    data-report-search
                >

                    <div className="consolidated-stage-label compact">

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


function summaryValue(
    summary: string | null | undefined,
    label: string,
    fallback: string
): string {

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


function scalar(
    value: unknown,
    fallback: string
): string {

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
