export default function SpringBootAssessmentReport({
    metrics = {},
    findings = []
}) {

    /*
     * =========================================================
     * OVERVIEW VALUES
     * =========================================================
     */

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


    /*
     * =========================================================
     * FINDING COUNTS
     * =========================================================
     */

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


    /*
     * =========================================================
     * UPGRADE PLAN
     * =========================================================
     */

    const upgradePlan =
        asObject(
            metrics.springBootUpgradePlan
        );


    const upgradeActions =
        Array.isArray(
            upgradePlan?.actions
        )
            ? upgradePlan.actions
            : [];


    return (

        <section className="springboot-report">


            {/* =================================================
                SECTION 01
                SPRING BOOT VERSION OVERVIEW
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
                            Detected Spring Boot version,
                            target framework baseline,
                            Java runtime requirements
                            and build information.
                        </p>

                    </div>

                </div>


                {/* VERSION FLOW */}

                <div className="springboot-version-flow">

                    <VersionCard
                        label="Current Spring Boot"
                        value={
                            currentBoot
                        }
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


                {/* RUNTIME INFORMATION */}

                <div className="springboot-runtime-grid">

                    <InfoCard
                        label="Current Java"
                        value={
                            currentJava
                        }
                    />


                    <InfoCard
                        label="Required Java"
                        value={
                            requiredJava
                        }
                    />


                    <InfoCard
                        label="Build Tool"
                        value={
                            buildTool
                        }
                    />


                    <InfoCard
                        label="Files Scanned"
                        value={
                            filesScanned
                        }
                    />

                </div>

            </section>


            {/* =================================================
                SECTION 02
                MIGRATION FINDINGS
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
                            Compatibility issues and upgrade
                            blockers detected during the
                            Spring Boot assessment.
                        </p>

                    </div>

                </div>


                {/* RISK COUNTS */}

                <div className="springboot-risk-grid">

                    <RiskCard
                        label="Critical"
                        value={
                            criticalCount
                        }
                        severity="critical"
                    />


                    <RiskCard
                        label="High"
                        value={
                            highCount
                        }
                        severity="high"
                    />


                    <RiskCard
                        label="Medium"
                        value={
                            mediumCount
                        }
                        severity="medium"
                    />


                    <RiskCard
                        label="Low"
                        value={
                            lowCount
                        }
                        severity="low"
                    />


                    <RiskCard
                        label="Info"
                        value={
                            infoCount
                        }
                        severity="info"
                    />

                </div>


                {/* COMPLEXITY */}

                <div className="springboot-complexity">

                    <span>
                        MIGRATION COMPLEXITY
                    </span>


                    <strong
                        className={
                            complexityClass(
                                complexity
                            )
                        }
                    >
                        {complexity}
                    </strong>

                </div>


                {/* FINDINGS */}

                {
                    findings.length > 0
                        ?
                        (

                            <div className="springboot-findings-list">

                                {
                                    findings.map(
                                        (
                                            finding,
                                            index
                                        ) => (

                                            <FindingCard
                                                key={
                                                    index
                                                }
                                                finding={
                                                    finding
                                                }
                                            />

                                        )
                                    )
                                }

                            </div>

                        )
                        :
                        (

                            <div className="springboot-empty-state">

                                No Spring Boot migration findings
                                were returned by the assessment.

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
                SECTION 03
                UPGRADE ROADMAP
               ================================================= */}

            {
                upgradePlan
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
                                    Ordered remediation activities
                                    recommended for the framework
                                    migration.
                                </p>

                            </div>

                        </div>


                        {/* STRATEGY */}

                        {
                            upgradePlan.strategy
                            &&
                            (

                                <div className="springboot-strategy">

                                    <span>
                                        RECOMMENDED STRATEGY
                                    </span>


                                    <p>
                                        {
                                            upgradePlan.strategy
                                        }
                                    </p>

                                </div>

                            )
                        }


                        {/* PLAN METADATA */}

                        <div className="springboot-plan-summary">

                            <InfoCard
                                label="Current Version"
                                value={
                                    display(
                                        upgradePlan.currentVersion
                                    )
                                }
                            />


                            <InfoCard
                                label="Target Version"
                                value={
                                    display(
                                        upgradePlan.targetVersion
                                    )
                                }
                            />


                            <InfoCard
                                label="Migration Actions"
                                value={
                                    display(
                                        upgradePlan.totalActions
                                        ??
                                        upgradeActions.length
                                    )
                                }
                            />

                        </div>


                        {/* ACTIONS */}

                        {
                            upgradeActions.length > 0
                                ?
                                (

                                    <div className="springboot-roadmap-list">

                                        {
                                            upgradeActions.map(
                                                (
                                                    action,
                                                    index
                                                ) => (

                                                    <UpgradeActionCard
                                                        key={
                                                            createActionKey(
                                                                action,
                                                                index
                                                            )
                                                        }
                                                        action={
                                                            action
                                                        }
                                                        fallbackOrder={
                                                            index + 1
                                                        }
                                                    />

                                                )
                                            )
                                        }

                                    </div>

                                )
                                :
                                (

                                    <div className="springboot-empty-state">

                                        No detailed migration actions
                                        were generated.

                                    </div>

                                )
                        }

                    </section>

                )
            }

        </section>
    );
}


/*
 * =========================================================
 * VERSION CARD
 * =========================================================
 */

function VersionCard({
    label,
    value,
    target = false
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


/*
 * =========================================================
 * INFORMATION CARD
 * =========================================================
 */

function InfoCard({
    label,
    value
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


/*
 * =========================================================
 * RISK CARD
 * =========================================================
 */

function RiskCard({
    label,
    value,
    severity
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


/*
 * =========================================================
 * FINDING CARD
 * =========================================================
 */

function FindingCard({
    finding
}) {

    /*
     * Current AgentResult stores findings as List<String>,
     * so normally the frontend receives strings.
     *
     * This component also supports object-based findings
     * in case Spring Boot findings become structured later.
     */

    if (
        typeof finding === "string"
    ) {

        const parsed =
            parseFindingString(
                finding
            );


        return (

            <div className="springboot-finding-card">

                <div className="springboot-finding-header">

                    {
                        parsed.severity
                        &&
                        (

                            <span
                                className={
                                    `springboot-severity ${parsed.severity.toLowerCase()}`
                                }
                            >
                                {parsed.severity}
                            </span>

                        )
                    }


                    <strong>
                        {
                            parsed.title
                        }
                    </strong>

                </div>


                {
                    parsed.description
                    &&
                    (

                        <p>
                            {
                                parsed.description
                            }
                        </p>

                    )
                }


                {
                    parsed.file
                    &&
                    (

                        <div className="springboot-finding-file">

                            <span>
                                File
                            </span>

                            <code>
                                {
                                    parsed.file
                                }
                            </code>

                        </div>

                    )
                }


                {
                    parsed.evidence
                    &&
                    (

                        <div className="springboot-finding-detail">

                            <strong>
                                Evidence
                            </strong>

                            <p>
                                {
                                    parsed.evidence
                                }
                            </p>

                        </div>

                    )
                }


                {
                    parsed.recommendation
                    &&
                    (

                        <div className="springboot-finding-detail recommendation">

                            <strong>
                                Recommendation
                            </strong>

                            <p>
                                {
                                    parsed.recommendation
                                }
                            </p>

                        </div>

                    )
                }

            </div>
        );
    }


    /*
     * Future structured finding support.
     */

    const item =
        finding
        &&
        typeof finding === "object"
            ? finding
            : {};


    return (

        <div className="springboot-finding-card">

            <div className="springboot-finding-header">

                {
                    item.severity
                    &&
                    (

                        <span
                            className={
                                `springboot-severity ${String(
                                    item.severity
                                ).toLowerCase()}`
                            }
                        >
                            {
                                item.severity
                            }
                        </span>

                    )
                }


                <strong>
                    {
                        item.title
                        ||
                        item.category
                        ||
                        "Assessment Finding"
                    }
                </strong>

            </div>


            {
                item.description
                &&
                (

                    <p>
                        {
                            item.description
                        }
                    </p>

                )
            }


            {
                item.file
                &&
                (

                    <div className="springboot-finding-file">

                        <span>
                            File
                        </span>

                        <code>
                            {
                                item.file
                            }
                            {
                                item.lineNumber
                                    ?
                                    `:${item.lineNumber}`
                                    :
                                    ""
                            }
                        </code>

                    </div>

                )
            }


            {
                item.evidence
                &&
                (

                    <div className="springboot-finding-detail">

                        <strong>
                            Evidence
                        </strong>

                        <p>
                            {
                                item.evidence
                            }
                        </p>

                    </div>

                )
            }


            {
                item.recommendation
                &&
                (

                    <div className="springboot-finding-detail recommendation">

                        <strong>
                            Recommendation
                        </strong>

                        <p>
                            {
                                item.recommendation
                            }
                        </p>

                    </div>

                )
            }

        </div>
    );
}


/*
 * =========================================================
 * UPGRADE ACTION CARD
 * =========================================================
 */

function UpgradeActionCard({
    action,
    fallbackOrder
}) {

    const item =
        action
        &&
        typeof action === "object"
            ? action
            : {};


    const order =
        item.order
        ??
        fallbackOrder;


    return (

        <div className="springboot-roadmap-item">

            <div className="springboot-roadmap-order">
                {order}
            </div>


            <div className="springboot-roadmap-content">

                <div className="springboot-roadmap-header">

                    <div>

                        <span>
                            {
                                item.category
                                ||
                                "MIGRATION"
                            }
                        </span>


                        <h3>
                            {
                                item.title
                                ||
                                "Upgrade Action"
                            }
                        </h3>

                    </div>


                    <div className="springboot-roadmap-tags">

                        {
                            item.priority
                            &&
                            (

                                <span>
                                    Priority:{" "}
                                    {
                                        item.priority
                                    }
                                </span>

                            )
                        }


                        {
                            item.effort
                            &&
                            (

                                <span>
                                    Effort:{" "}
                                    {
                                        item.effort
                                    }
                                </span>

                            )
                        }

                    </div>

                </div>


                {
                    item.description
                    &&
                    (

                        <p>
                            {
                                item.description
                            }
                        </p>

                    )
                }

            </div>

        </div>
    );
}


/*
 * =========================================================
 * PARSE STRING FINDINGS
 * =========================================================
 *
 * Backend currently formats Spring Boot findings like:
 *
 * [HIGH] RULE-ID - Title
 * | Description
 * | File: src/...
 * | Evidence: ...
 * | Recommendation: ...
 *
 * This parser improves the visual presentation without
 * requiring AgentResult changes.
 */

function parseFindingString(
    value
) {

    if (
        !value
        ||
        typeof value !== "string"
    ) {

        return {
            severity: null,
            title: "Assessment Finding",
            description: "",
            file: "",
            evidence: "",
            recommendation: ""
        };
    }


    const sections =
        value
            .split(" | ")
            .map(
                item =>
                    item.trim()
            )
            .filter(Boolean);


    const main =
        sections[0]
        ||
        value;


    const severityMatch =
        main.match(
            /^\[([A-Z]+)\]\s*/
        );


    const severity =
        severityMatch
            ? severityMatch[1]
            : null;


    let title =
        severityMatch
            ? main.substring(
                severityMatch[0].length
            )
            : main;


    /*
     * Rule ID can appear before:
     *
     * RULE-ID - Finding title
     */

    const dashIndex =
        title.indexOf(
            " - "
        );


    if (
        dashIndex >= 0
    ) {

        title =
            title.substring(
                dashIndex + 3
            );
    }


    let description = "";
    let file = "";
    let evidence = "";
    let recommendation = "";


    sections
        .slice(1)
        .forEach(
            section => {

                if (
                    section.startsWith(
                        "File:"
                    )
                ) {

                    file =
                        section
                            .substring(
                                "File:".length
                            )
                            .trim();

                    return;
                }


                if (
                    section.startsWith(
                        "Evidence:"
                    )
                ) {

                    evidence =
                        section
                            .substring(
                                "Evidence:".length
                            )
                            .trim();

                    return;
                }


                if (
                    section.startsWith(
                        "Recommendation:"
                    )
                ) {

                    recommendation =
                        section
                            .substring(
                                "Recommendation:".length
                            )
                            .trim();

                    return;
                }


                if (!description) {

                    description =
                        section;
                }

            }
        );


    return {
        severity,
        title:
            title
            ||
            "Assessment Finding",
        description,
        file,
        evidence,
        recommendation
    };
}


/*
 * =========================================================
 * COMPLEXITY CSS CLASS
 * =========================================================
 */

function complexityClass(
    value
) {

    const normalized =
        String(
            value
            ||
            ""
        )
            .trim()
            .toLowerCase();


    switch (
        normalized
    ) {

        case "high":

            return "springboot-complexity-high";


        case "medium":

            return "springboot-complexity-medium";


        case "low":

            return "springboot-complexity-low";


        default:

            return "springboot-complexity-medium";
    }
}


/*
 * =========================================================
 * DISPLAY VALUE
 * =========================================================
 */

function display(
    value
) {

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


/*
 * =========================================================
 * NUMBER VALUE
 * =========================================================
 */

function numberValue(
    value
) {

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


/*
 * =========================================================
 * SAFE OBJECT CONVERSION
 * =========================================================
 */

function asObject(
    value
) {

    if (
        value === null
        ||
        value === undefined
        ||
        typeof value !== "object"
        ||
        Array.isArray(
            value
        )
    ) {

        return null;
    }


    return value;
}


/*
 * =========================================================
 * ROADMAP KEY
 * =========================================================
 */

function createActionKey(
    action,
    index
) {

    if (
        action
        &&
        typeof action === "object"
    ) {

        return [
            action.order
            ??
            index,

            action.category
            ??
            "",

            action.title
            ??
            ""
        ].join("-");
    }


    return String(
        index
    );
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
    findings
) {

    const result = {};


    findings.forEach(
        finding => {

            /*
             * Structured future finding
             */
            if (
                finding
                &&
                typeof finding === "object"
            ) {

                const category =
                    finding.category;


                if (!category) {
                    return;
                }


                if (!result[category]) {
                    result[category] = [];
                }


                result[category].push(
                    finding
                );

                return;
            }


            /*
             * String findings
             *
             * Because AgentResult currently converts
             * Spring Boot findings into strings.
             */
            const value =
                String(
                    finding || ""
                );


            detectCategoryFromText(
                value,
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

    const mappings = [

        [
            "SPRING_CLOUD",
            [
                "Spring Cloud",
                "Hystrix",
                "Ribbon",
                "Zuul",
                "Sleuth"
            ]
        ],

        [
            "PERSISTENCE",
            [
                "Hibernate",
                "Persistence",
                "JPA"
            ]
        ],

        [
            "SPRING_SECURITY",
            [
                "Spring Security",
                "SecurityFilterChain",
                "WebSecurityConfigurerAdapter"
            ]
        ],

        [
            "OBSERVABILITY",
            [
                "Micrometer",
                "Tracing",
                "Observability"
            ]
        ],

        [
            "SERVLET",
            [
                "Servlet",
                "Undertow",
                "Tomcat",
                "Jetty"
            ]
        ],

        [
            "DEPENDENCY",
            [
                "dependency",
                "Springfox",
                "springdoc"
            ]
        ]

    ];


    mappings.forEach(
        ([category, words]) => {

            const matches =
                words.some(
                    word =>
                        value
                            .toLowerCase()
                            .includes(
                                word.toLowerCase()
                            )
                );


            if (!matches) {
                return;
            }


            if (!result[category]) {
                result[category] = [];
            }


            result[category].push(
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
                        : JSON.stringify(
                            item
                        )
            )
            .join(" ")
            .toUpperCase();


    if (
        text.includes("[CRITICAL]")
        ||
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


    return {
        label: "Compatible",
        css: "compatible"
    };
}