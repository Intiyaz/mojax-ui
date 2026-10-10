type UpgradeAction = {
    order?: number;
    category?: string;
    title?: string;
    description?: string;
    priority?: string;
    effort?: string;
};

type UpgradePlan = {
    currentVersion?: string;
    targetVersion?: string;
    strategy?: string;
    totalActions?: number;
    actions?: UpgradeAction[];
};

type FindingLike =
    | string
    | {
        severity?: string;
        category?: string;
        title?: string;
        description?: string;
        recommendation?: string;
    };

type Props = {
    metrics?: Record<string, unknown>;
    findings?: FindingLike[];
};


export default function SpringBootAssessmentReport({
    metrics = {},
    findings = []
}: Props) {

    const currentBoot =
        display(
            metrics.detectedSpringBootVersion
        );

    const targetBoot =
        display(
            metrics.targetSpringBootVersion
        );

    const currentJava =
        display(
            metrics.detectedJavaVersion
        );

    const requiredJava =
        display(
            metrics.requiredJavaVersion
        );

    const buildTool =
        display(
            metrics.buildTool
        );

    const filesScanned =
        display(
            metrics.filesScanned
        );

    const complexity =
        display(
            metrics.migrationComplexity
        );

    const criticalCount =
        numberValue(
            metrics.criticalCount
        );

    const highCount =
        numberValue(
            metrics.highCount
        );

    const mediumCount =
        numberValue(
            metrics.mediumCount
        );

    const lowCount =
        numberValue(
            metrics.lowCount
        );

    const infoCount =
        numberValue(
            metrics.infoCount
        );


    const plan =
        asUpgradePlan(
            metrics.springBootUpgradePlan
        );


    return (

        <section className="springboot-report">

            {/* =================================================
                VERSION OVERVIEW
               ================================================= */}

            <section className="springboot-overview">

                <div className="springboot-section-heading">

                    <div className="springboot-section-number">
                        01
                    </div>

                    <div>

                        <span>
                            FRAMEWORK BASELINE
                        </span>

                        <h2>
                            Spring Boot Upgrade Overview
                        </h2>

                        <p>
                            Detected framework, Java runtime and
                            target upgrade baseline.
                        </p>

                    </div>

                </div>


                <div className="springboot-version-flow">

                    <VersionCard
                        label="Current Spring Boot"
                        value={currentBoot}
                    />

                    <div className="springboot-flow-arrow">
                        →
                    </div>

                    <VersionCard
                        label="Target Spring Boot"
                        value={targetBoot}
                        target
                    />

                </div>


                <div className="springboot-runtime-grid">

                    <InfoCard
                        label="Current Java"
                        value={currentJava}
                    />

                    <InfoCard
                        label="Required Java"
                        value={requiredJava}
                    />

                    <InfoCard
                        label="Build Tool"
                        value={buildTool}
                    />

                    <InfoCard
                        label="Files Scanned"
                        value={filesScanned}
                    />

                </div>

            </section>


            {/* =================================================
                RISK SUMMARY
               ================================================= */}

            <section className="springboot-findings-summary">

                <div className="springboot-section-heading">

                    <div className="springboot-section-number">
                        02
                    </div>

                    <div>

                        <span>
                            UPGRADE READINESS
                        </span>

                        <h2>
                            Migration Findings
                        </h2>

                        <p>
                            Issues identified while preparing the
                            application for the target Spring Boot release.
                        </p>

                    </div>

                </div>


                <div className="springboot-risk-grid">

                    <RiskCard
                        label="Critical"
                        value={criticalCount}
                        severity="critical"
                    />

                    <RiskCard
                        label="High"
                        value={highCount}
                        severity="high"
                    />

                    <RiskCard
                        label="Medium"
                        value={mediumCount}
                        severity="medium"
                    />

                    <RiskCard
                        label="Low"
                        value={lowCount}
                        severity="low"
                    />

                    <RiskCard
                        label="Info"
                        value={infoCount}
                        severity="info"
                    />

                </div>


                <div className="springboot-complexity">

                    <span>
                        MIGRATION COMPLEXITY
                    </span>

                    <strong
                        className={
                            `springboot-complexity-${complexity
                                .toLowerCase()}`
                        }
                    >
                        {complexity}
                    </strong>

                </div>


                {
                    findings.length > 0
                    &&
                    (
                        <div className="springboot-findings-list">

                            {
                                findings.map(
                                    (
                                        finding,
                                        index
                                    ) => (

                                        <FindingCard
                                            key={index}
                                            finding={finding}
                                        />

                                    )
                                )
                            }

                        </div>
                    )
                }

            </section>


            {/* =================================================
                UPGRADE STRATEGY
               ================================================= */}

            {
                plan
                &&
                (
                    <section className="springboot-roadmap">

                        <div className="springboot-section-heading">

                            <div className="springboot-section-number">
                                03
                            </div>

                            <div>

                                <span>
                                    EXECUTION ROADMAP
                                </span>

                                <h2>
                                    Spring Boot Upgrade Plan
                                </h2>

                                <p>
                                    Ordered remediation path generated
                                    from the assessment findings.
                                </p>

                            </div>

                        </div>


                        {
                            plan.strategy
                            &&
                            (
                                <div className="springboot-strategy">

                                    <span>
                                        RECOMMENDED STRATEGY
                                    </span>

                                    <p>
                                        {plan.strategy}
                                    </p>

                                </div>
                            )
                        }


                        <div className="springboot-roadmap-list">

                            {
                                plan.actions?.map(
                                    (
                                        action,
                                        index
                                    ) => (

                                        <UpgradeActionCard
                                            key={
                                                `${action.order ?? index}-${action.title ?? ""}`
                                            }
                                            action={action}
                                            fallbackOrder={
                                                index + 1
                                            }
                                        />

                                    )
                                )
                            }

                        </div>

                    </section>
                )
            }

        </section>
    );
}


function VersionCard({
    label,
    value,
    target = false
}: {
    label: string;
    value: string;
    target?: boolean;
}) {

    return (

        <div
            className={
                target
                    ? "springboot-version-card target"
                    : "springboot-version-card"
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


function InfoCard({
    label,
    value
}: {
    label: string;
    value: string;
}) {

    return (

        <div className="springboot-info-card">

            <span>
                {label}
            </span>

            <strong>
                {value}
            </strong>

        </div>
    );
}


function RiskCard({
    label,
    value,
    severity
}: {
    label: string;
    value: number;
    severity: string;
}) {

    return (

        <div
            className={
                `springboot-risk-card ${severity}`
            }
        >

            <strong>
                {value}
            </strong>

            <span>
                {label}
            </span>

        </div>
    );
}


function FindingCard({
    finding
}: {
    finding: FindingLike;
}) {

    if (
        typeof finding === "string"
    ) {

        return (

            <div className="springboot-finding-card">

                <div className="springboot-finding-title">
                    Finding
                </div>

                <p>
                    {finding}
                </p>

            </div>
        );
    }


    return (

        <div className="springboot-finding-card">

            <div className="springboot-finding-header">

                {
                    finding.severity
                    &&
                    (
                        <span
                            className={
                                `springboot-severity ${finding.severity.toLowerCase()}`
                            }
                        >
                            {finding.severity}
                        </span>
                    )
                }

                <strong>
                    {
                        finding.title
                        ||
                        finding.category
                        ||
                        "Assessment Finding"
                    }
                </strong>

            </div>


            {
                finding.description
                &&
                (
                    <p>
                        {finding.description}
                    </p>
                )
            }


            {
                finding.recommendation
                &&
                (
                    <small>
                        Recommendation:{" "}
                        {finding.recommendation}
                    </small>
                )
            }

        </div>
    );
}


function UpgradeActionCard({
    action,
    fallbackOrder
}: {
    action: UpgradeAction;
    fallbackOrder: number;
}) {

    return (

        <div className="springboot-roadmap-item">

            <div className="springboot-roadmap-order">

                {
                    action.order
                    ??
                    fallbackOrder
                }

            </div>


            <div className="springboot-roadmap-content">

                <div className="springboot-roadmap-header">

                    <div>

                        <span>
                            {
                                action.category
                                ||
                                "MIGRATION"
                            }
                        </span>

                        <h3>
                            {
                                action.title
                                ||
                                "Upgrade Action"
                            }
                        </h3>

                    </div>


                    <div className="springboot-roadmap-tags">

                        {
                            action.priority
                            &&
                            (
                                <span>
                                    Priority: {action.priority}
                                </span>
                            )
                        }

                        {
                            action.effort
                            &&
                            (
                                <span>
                                    Effort: {action.effort}
                                </span>
                            )
                        }

                    </div>

                </div>


                {
                    action.description
                    &&
                    (
                        <p>
                            {action.description}
                        </p>
                    )
                }

            </div>

        </div>
    );
}


function display(
    value: unknown
): string {

    if (
        value === null
        ||
        value === undefined
        ||
        value === ""
    ) {

        return "Unknown";
    }

    return String(
        value
    );
}


function numberValue(
    value: unknown
): number {

    const result =
        Number(
            value
        );

    return Number.isFinite(
        result
    )
        ? result
        : 0;
}


function asUpgradePlan(
    value: unknown
): UpgradePlan | null {

    if (
        value == null
        ||
        typeof value !== "object"
    ) {

        return null;
    }

    return value as UpgradePlan;
}