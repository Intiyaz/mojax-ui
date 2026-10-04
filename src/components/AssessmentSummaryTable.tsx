import type {
    Assessment
} from "../types";

import {
    metric
} from "../utils/formatters";

import * as S
    from "../utils/status";


type FrameworkProfile = {
    javaVersion?: string;
    springBootVersion?: string;
    springFrameworkVersion?: string;
    hibernateVersion?: string;
    springSecurityVersion?: string;
    maven?: boolean;
    gradle?: boolean;
    jspDetected?: boolean;
};


export default function AssessmentSummaryTable({
    assessment
}: {
    assessment: Assessment;
}) {

    const metrics =
        assessment.metrics || {};

    const currentJava =
        metric(
            metrics,
            "currentJavaVersion",
            "-"
        );

    const targetJava =
        metric(
            metrics,
            "targetJavaVersion",
            21
        );

    const springBoot =
        metric(
            metrics,
            "springBootVersion",
            "Unknown"
        );

    const frameworkProfile =
        asFrameworkProfile(
            metrics.migrationFrameworkProfile
        );

    const blockers =
        numberMetric(
            metrics,
            "migrationBlockers"
        );

    const requiredChanges =
        numberMetric(
            metrics,
            "requiredMigrationChanges"
        );

    const compatibilityRisks =
        numberMetric(
            metrics,
            "compatibilityRisks"
        );

    const testingPriorities =
        numberMetric(
            metrics,
            "testingPriorities"
        );


    return (
        <section className="executive-migration-assessment">

            <div className="consolidated-section-header">

                <div className="consolidated-section-number">
                    01
                </div>

                <div>

                    <span className="eyebrow">
                        EXECUTIVE MIGRATION ASSESSMENT
                    </span>

                    <h2>
                        Migration Baseline & Readiness
                    </h2>

                    <p>
                        Decision-level view of the current Java
                        baseline, target state, framework profile
                        and migration readiness.
                    </p>

                </div>

                <div className="assessment-version-flow">

                    <span>
                        Java {String(currentJava)}
                    </span>

                    <strong>
                        →
                    </strong>

                    <span>
                        Java {String(targetJava)}
                    </span>

                </div>

            </div>


            <div className="executive-migration-kpis">

                <KpiCard
                    label="Java 21 Readiness"
                    value={`${assessment.readinessScore}/100`}
                    tone={
                        readinessTone(
                            assessment.readinessScore
                        )
                    }
                />

                <KpiCard
                    label="Migration Risk"
                    value={`${assessment.riskScore}/100`}
                    tone={
                        riskTone(
                            assessment.riskScore
                        )
                    }
                />

                <KpiCard
                    label="Blockers"
                    value={
                        optionalCount(
                            blockers
                        )
                    }
                    tone={
                        countTone(
                            blockers,
                            "danger"
                        )
                    }
                />

                <KpiCard
                    label="Required Changes"
                    value={
                        optionalCount(
                            requiredChanges
                        )
                    }
                    tone={
                        countTone(
                            requiredChanges,
                            "warning"
                        )
                    }
                />

                <KpiCard
                    label="Compatibility Risks"
                    value={
                        optionalCount(
                            compatibilityRisks
                        )
                    }
                    tone={
                        countTone(
                            compatibilityRisks,
                            "warning"
                        )
                    }
                />

                <KpiCard
                    label="Testing Priorities"
                    value={
                        optionalCount(
                            testingPriorities
                        )
                    }
                    tone="info"
                />

            </div>


            <div className="executive-migration-columns">

                <div className="executive-profile-card">

                    <CardHeading
                        eyebrow="TECHNOLOGY PROFILE"
                        title="Framework & Runtime"
                    />

                    <ProfileRow
                        label="Current Java"
                        value={
                            String(
                                currentJava
                            )
                        }
                    />

                    <ProfileRow
                        label="Target Java"
                        value={
                            String(
                                targetJava
                            )
                        }
                    />

                    <ProfileRow
                        label="Spring Boot"
                        value={
                            String(
                                springBoot
                            )
                        }
                    />

                    <ProfileRow
                        label="Spring Framework"
                        value={
                            frameworkProfile
                                ?.springFrameworkVersion
                            ??
                            "Not directly resolved"
                        }
                    />

                    <ProfileRow
                        label="Hibernate"
                        value={
                            frameworkProfile
                                ?.hibernateVersion
                            ??
                            "Not directly resolved"
                        }
                    />

                    <ProfileRow
                        label="Spring Security"
                        value={
                            frameworkProfile
                                ?.springSecurityVersion
                            ??
                            "Not directly resolved"
                        }
                    />

                    <ProfileRow
                        label="Build"
                        value={
                            buildLabel(
                                frameworkProfile
                            )
                        }
                    />

                    <ProfileRow
                        label="JSP / JSTL"
                        value={
                            frameworkProfile
                                ?.jspDetected
                                ? "Detected"
                                : "Not detected"
                        }
                    />

                </div>


                <div className="executive-evidence-card">

                    <CardHeading
                        eyebrow="VALIDATION EVIDENCE"
                        title="Build & Test Status"
                    />

                    <EvidenceRow
                        label="Java 21 Compilation"
                        value={
                            String(
                                metric(
                                    metrics,
                                    "compileStatus",
                                    "-"
                                )
                            )
                        }
                        tone={
                            S.statusIndicator(
                                metrics.compileStatus
                            )
                        }
                    />

                    <EvidenceRow
                        label="Automated Tests"
                        value={
                            String(
                                metric(
                                    metrics,
                                    "testStatus",
                                    "-"
                                )
                            )
                        }
                        tone={
                            S.statusIndicator(
                                metrics.testStatus
                            )
                        }
                    />

                    <EvidenceRow
                        label="JDK Internal Dependencies"
                        value={
                            String(
                                metric(
                                    metrics,
                                    "jdepsInternalDependencies",
                                    0
                                )
                            )
                        }
                        tone={
                            S.numberIndicator(
                                metrics.jdepsInternalDependencies
                            )
                        }
                    />

                    <EvidenceRow
                        label="Deprecated JDK APIs"
                        value={
                            String(
                                metric(
                                    metrics,
                                    "deprecatedJdkApis",
                                    0
                                )
                            )
                        }
                        tone={
                            S.numberIndicator(
                                metrics.deprecatedJdkApis
                            )
                        }
                    />

                    <EvidenceRow
                        label="Deprecated for Removal"
                        value={
                            String(
                                metric(
                                    metrics,
                                    "deprecatedForRemoval",
                                    0
                                )
                            )
                        }
                        tone={
                            S.numberIndicator(
                                metrics.deprecatedForRemoval
                            )
                        }
                    />

                </div>

            </div>

        </section>
    );
}


function KpiCard({
    label,
    value,
    tone
}: {
    label: string;
    value: string;
    tone: string;
}) {

    return (
        <div
            className={
                `executive-kpi tone-${tone}`
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


function CardHeading({
    eyebrow,
    title
}: {
    eyebrow: string;
    title: string;
}) {

    return (
        <div className="executive-card-heading">
            <span>
                {eyebrow}
            </span>
            <h3>
                {title}
            </h3>
        </div>
    );
}


function ProfileRow({
    label,
    value
}: {
    label: string;
    value: string;
}) {

    return (
        <div className="executive-profile-row">
            <span>
                {label}
            </span>
            <strong>
                {value}
            </strong>
        </div>
    );
}


function EvidenceRow({
    label,
    value,
    tone
}: {
    label: string;
    value: string;
    tone: string;
}) {

    return (
        <div className="executive-evidence-row">

            <div>
                <span>
                    {label}
                </span>
                <strong>
                    {value}
                </strong>
            </div>

            <span
                className={
                    `executive-evidence-indicator ${tone}`
                }
            />

        </div>
    );
}


function asFrameworkProfile(
    value: unknown
): FrameworkProfile | null {

    if (
        typeof value !== "object"
        ||
        value === null
        ||
        Array.isArray(
            value
        )
    ) {
        return null;
    }

    return value as FrameworkProfile;
}


function numberMetric(
    metrics: Record<string, unknown>,
    key: string
): number | undefined {

    const value =
        metrics[key];

    return typeof value === "number"
        &&
        Number.isFinite(
            value
        )
        ? value
        : undefined;
}


function optionalCount(
    value?: number
): string {

    return value === undefined
        ? "—"
        : String(
            value
        );
}


function riskTone(
    score: number
): string {

    if (score >= 70) {
        return "danger";
    }

    if (score >= 40) {
        return "warning";
    }

    return "good";
}


function readinessTone(
    score: number
): string {

    if (score >= 80) {
        return "good";
    }

    if (score >= 50) {
        return "warning";
    }

    return "danger";
}


function countTone(
    value: number | undefined,
    nonZeroTone: string
): string {

    if (value === undefined) {
        return "neutral";
    }

    return value > 0
        ? nonZeroTone
        : "good";
}


function buildLabel(
    profile: FrameworkProfile | null
): string {

    if (!profile) {
        return "Unknown";
    }

    if (
        profile.maven
        &&
        profile.gradle
    ) {
        return "Maven + Gradle";
    }

    if (profile.maven) {
        return "Maven";
    }

    if (profile.gradle) {
        return "Gradle";
    }

    return "Unknown";
}
