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

                    <TargetBaseline
                        targetVersion={
                            metrics.targetSpringBootVersion
                        }
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

            <EcosystemCompatibility
                    findings={
                        findings
                    }
                />

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
                                04
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

function TargetBaseline({
    targetVersion
}) {

    const version =
        String(
            targetVersion || ""
        );


    const isBoot4 =
        version.startsWith("4");


    return (

        <div className="springboot-target-baseline">

            <div className="springboot-target-baseline-title">

                TARGET PLATFORM BASELINE

            </div>


            <div className="springboot-target-baseline-grid">

                <BaselineItem
                    label="Java"
                    value="17+"
                />


                <BaselineItem
                    label="Spring Framework"
                    value={
                        isBoot4
                            ? "7.x"
                            : "6.2.x"
                    }
                />


                <BaselineItem
                    label="Jakarta"
                    value={
                        isBoot4
                            ? "Jakarta EE 11"
                            : "Jakarta EE 10"
                    }
                />


                <BaselineItem
                    label="Servlet"
                    value={
                        isBoot4
                            ? "Servlet 6.1"
                            : "Servlet 6.0"
                    }
                />


                {
                    isBoot4
                    &&
                    (

                        <BaselineItem
                            label="Migration Path"
                            value="3.5.x → 4.1.x"
                        />

                    )
                }

            </div>

        </div>
    );
}


function BaselineItem({
    label,
    value
}) {

    return (

        <div className="springboot-baseline-item">

            <span>
                {label}
            </span>

            <strong>
                {value}
            </strong>

        </div>
    );
}

function EcosystemCompatibility({
    findings = []
}) {

    const categories =
        collectFindingCategories(
            findings
        );


    const items = [

        {
            label: "Spring Cloud",
            category: "SPRING_CLOUD",
            icon: "☁"
        },

        {
            label: "Dependencies",
            category: "DEPENDENCY",
            icon: "📦"
        },

        {
            label: "Persistence",
            category: "PERSISTENCE",
            icon: "◫"
        },

        {
            label: "Spring Security",
            category: "SPRING_SECURITY",
            icon: "◆"
        },

        {
            label: "Observability",
            category: "OBSERVABILITY",
            icon: "◎"
        },

        {
            label: "Servlet Runtime",
            category: "SERVLET",
            icon: "⬡"
        },

        {
            label: "Testing",
            category: "TESTING",
            icon: "✓"
        }

    ];


    return (

        <section className="springboot-ecosystem">

            <div className="springboot-section-heading">

                <div className="springboot-section-number">
                    03
                </div>


                <div>

                    <span>
                        ECOSYSTEM READINESS
                    </span>


                    <h2>
                        Dependency Compatibility
                    </h2>


                    <p>
                        Compatibility assessment across
                        the Spring Boot application ecosystem.
                    </p>

                </div>

            </div>


            <div className="springboot-ecosystem-grid">

                {
                    items.map(
                        item => {

                            const status =
                                resolveCategoryStatus(
                                    categories[
                                        item.category
                                    ]
                                );


                            return (

                                <EcosystemCard
                                    key={
                                        item.category
                                    }
                                    icon={
                                        item.icon
                                    }
                                    label={
                                        item.label
                                    }
                                    status={
                                        status
                                    }
                                />

                            );
                        }
                    )
                }

            </div>

        </section>
    );
}


function EcosystemCard({
    icon,
    label,
    status
}) {

    return (

        <div
            className={
                `springboot-ecosystem-card ${status.css}`
            }
        >

            <div className="springboot-ecosystem-icon">
                {icon}
            </div>


            <div className="springboot-ecosystem-content">

                <span>
                    {label}
                </span>


                <strong>
                    {status.label}
                </strong>

            </div>

        </div>
    );
}

function collectFindingCategories(
    findings = []
) {

    const result = {};


    findings.forEach(
        finding => {

            /*
             * Backend AssessmentFinding object.
             *
             * Current Spring Boot AgentResult findings are
             * converted by AssessmentService into:
             *
             * {
             *   severity: "INFO",
             *   category: "ASSESSMENT",
             *   title: "Assessment Finding",
             *   description: "[HIGH] SB-CLOUD-..."
             * }
             *
             * Therefore we must inspect the description as well.
             */

            if (
                finding
                &&
                typeof finding === "object"
            ) {

                const text = [
                    finding.category,
                    finding.title,
                    finding.description,
                    finding.evidence,
                    finding.recommendation
                ]
                    .filter(Boolean)
                    .join(" ");


                detectCategoryFromText(
                    text,
                    result
                );

                return;
            }


            /*
             * String finding support.
             */
            detectCategoryFromText(
                String(
                    finding || ""
                ),
                result
            );
        }
    );


    return result;
}


function detectCategoryFromText(
    value,
    result
) {

    if (!value) {
        return;
    }


    const normalized =
        value.toLowerCase();


    const mappings = [

        {
            category: "SPRING_CLOUD",

            keywords: [
                "sb-cloud-",
                "spring cloud",
                "hystrix",
                "ribbon",
                "zuul",
                "sleuth",
                "release train"
            ]
        },

        {
            category: "PERSISTENCE",

            keywords: [
                "sb-hibernate-",
                "hibernate",
                "persistence",
                "javax.persistence",
                "jakarta.persistence",
                "jpa"
            ]
        },

        {
            category: "SPRING_SECURITY",

            keywords: [
                "sb-sec-",
                "spring security",
                "websecurityconfigureradapter",
                "securityfilterchain",
                "authorizerequests",
                "authorizehttprequests",
                "requestmatchers"
            ]
        },

        {
            category: "OBSERVABILITY",

            keywords: [
                "sb-obs-",
                "micrometer",
                "observability",
                "tracing"
            ]
        },

        {
            category: "SERVLET",

            keywords: [
                "sb4-server-",
                "sb4-servlet-",
                "undertow",
                "servlet 6.1",
                "servlet runtime",
                "tomcat",
                "jetty"
            ]
        },

        {
            category: "DEPENDENCY",

            keywords: [
                "sb-dep-",
                "sb-openapi-",
                "dependency",
                "dependencies",
                "springfox",
                "springdoc",
                "mysql-connector-java"
            ]
        },
        {
            category: "TESTING",

            keywords: [
                "sb-test-",
                "junit 4",
                "junit vintage",
                "mockbean",
                "spybean",
                "mockitobean",
                "mockitospybean",
                "mockitojunitrunner",
                "testcontainers",
                "testing"
            ]
        }

    ];


    mappings.forEach(
        mapping => {

            const matches =
                mapping.keywords.some(
                    keyword =>
                        normalized.includes(
                            keyword.toLowerCase()
                        )
                );


            if (!matches) {
                return;
            }


            if (
                !result[
                    mapping.category
                ]
            ) {

                result[
                    mapping.category
                ] = [];
            }


            result[
                mapping.category
            ].push(
                value
            );
        }
    );
}

function resolveCategoryStatus(
    categoryFindings
) {

    if (
        !categoryFindings
        ||
        categoryFindings.length === 0
    ) {

        return {
            label: "No Issues",
            css: "compatible"
        };
    }


    const text =
        categoryFindings
            .map(
                item =>
                    typeof item === "string"
                        ? item
                        : JSON.stringify(item)
            )
            .join(" ")
            .toUpperCase();


    if (
        text.includes("[CRITICAL]")
    ) {

        return {
            label: "Critical",
            css: "action"
        };
    }


    if (
        text.includes("[HIGH]")
    ) {

        return {
            label: "Action Required",
            css: "action"
        };
    }


    if (
        text.includes("[MEDIUM]")
    ) {

        return {
            label: "Review",
            css: "review"
        };
    }


    if (
        text.includes("[LOW]")
    ) {

        return {
            label: "Minor Review",
            css: "review"
        };
    }


    if (
        text.includes("[INFO]")
    ) {

        return {
            label: "Detected",
            css: "compatible"
        };
    }


    return {
        label: "Detected",
        css: "review"
    };
}