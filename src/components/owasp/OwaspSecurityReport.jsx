import "./OwaspSecurityReport.css";


const OWASP_CATEGORIES = [

    {
        code: "A01:2025",
        key: "A01",
        title: "Broken Access Control"
    },

    {
        code: "A02:2025",
        key: "A02",
        title: "Security Misconfiguration"
    },

    {
        code: "A03:2025",
        key: "A03",
        title: "Software Supply Chain Failures"
    },

    {
        code: "A04:2025",
        key: "A04",
        title: "Cryptographic Failures"
    },

    {
        code: "A05:2025",
        key: "A05",
        title: "Injection"
    },

    {
        code: "A06:2025",
        key: "A06",
        title: "Insecure Design"
    },

    {
        code: "A07:2025",
        key: "A07",
        title: "Authentication Failures"
    },

    {
        code: "A08:2025",
        key: "A08",
        title: "Software / Data Integrity Failures"
    },

    {
        code: "A09:2025",
        key: "A09",
        title: "Security Logging & Alerting Failures"
    },

    {
        code: "A10:2025",
        key: "A10",
        title: "Exceptional Conditions"
    }
];


export default function OwaspSecurityReport({
    metrics = {}
}) {

    const findings =
        Array.isArray(
            metrics.owaspFindings
        )
            ? metrics.owaspFindings
            : [];


    const categoryCounts =
        metrics.owaspCategoryCounts || {};


    return (

        <section className="owasp-report">

            {/* ==========================================
                STANDARD / OVERVIEW
               ========================================== */}

            <section className="owasp-overview">

                <div className="owasp-section-heading">

                    <span>
                        01
                    </span>

                    <div>

                        <small>
                            SECURITY STANDARD
                        </small>

                        <h2>
                            OWASP Top 10 Assessment
                        </h2>

                    </div>

                </div>


                <div className="owasp-overview-grid">

                    <MetricCard
                        label="Standard"
                        value={
                            display(
                                metrics.standard,
                                "OWASP Top 10:2025"
                            )
                        }
                    />

                    <MetricCard
                        label="Files Scanned"
                        value={
                            display(
                                metrics.filesScanned,
                                0
                            )
                        }
                    />

                    <MetricCard
                        label="Security Risk"
                        value={
                            display(
                                metrics.securityRisk,
                                "Unknown"
                            )
                        }
                    />

                    <MetricCard
                        label="Total Findings"
                        value={
                            display(
                                metrics.totalFindings,
                                findings.length
                            )
                        }
                    />

                </div>

            </section>


            {/* ==========================================
                SEVERITY SUMMARY
               ========================================== */}

            <section className="owasp-severity-stage">

                <div className="owasp-section-heading">

                    <span>
                        02
                    </span>

                    <div>

                        <small>
                            SECURITY EXPOSURE
                        </small>

                        <h2>
                            Severity Summary
                        </h2>

                    </div>

                </div>


                <div className="owasp-severity-grid">

                    <SeverityCard
                        label="Critical"
                        value={
                            numberValue(
                                metrics.criticalCount
                            )
                        }
                        className="critical"
                    />

                    <SeverityCard
                        label="High"
                        value={
                            numberValue(
                                metrics.highCount
                            )
                        }
                        className="high"
                    />

                    <SeverityCard
                        label="Medium"
                        value={
                            numberValue(
                                metrics.mediumCount
                            )
                        }
                        className="medium"
                    />

                    <SeverityCard
                        label="Low"
                        value={
                            numberValue(
                                metrics.lowCount
                            )
                        }
                        className="low"
                    />

                    <SeverityCard
                        label="Info"
                        value={
                            numberValue(
                                metrics.infoCount
                            )
                        }
                        className="info"
                    />

                </div>

            </section>


            {/* ==========================================
                OWASP TOP 10 MATRIX
               ========================================== */}

            <section className="owasp-category-stage">

                <div className="owasp-section-heading">

                    <span>
                        03
                    </span>

                    <div>

                        <small>
                            OWASP TOP 10:2025
                        </small>

                        <h2>
                            Category Risk Matrix
                        </h2>

                    </div>

                </div>


                <div className="owasp-category-grid">

                    {
                        OWASP_CATEGORIES.map(
                            category => {

                                const count =
                                    resolveCategoryCount(
                                        categoryCounts,
                                        category
                                    );


                                const categoryFindings =
                                    findings.filter(
                                        finding =>
                                            findingCategory(
                                                finding
                                            )
                                                .startsWith(
                                                    category.key
                                                )
                                    );


                                const status =
                                    resolveCategoryStatus(
                                        categoryFindings
                                    );


                                return (

                                    <CategoryCard

                                        key={
                                            category.key
                                        }

                                        category={
                                            category
                                        }

                                        count={
                                            count
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


            {/* ==========================================
                DETAILED FINDINGS
               ========================================== */}

            <section className="owasp-findings-stage">

                <div className="owasp-section-heading">

                    <span>
                        04
                    </span>

                    <div>

                        <small>
                            SECURITY FINDINGS
                        </small>

                        <h2>
                            Findings & Remediation
                        </h2>

                    </div>

                </div>


                {
                    findings.length === 0

                        ? (
                            <div className="owasp-empty">

                                No structured OWASP findings
                                were returned by this assessment.

                            </div>
                        )

                        : (
                            <div className="owasp-findings-list">

                                {
                                    findings.map(
                                        (
                                            finding,
                                            index
                                        ) => (

                                            <FindingCard

                                                key={
                                                    createFindingKey(
                                                        finding,
                                                        index
                                                    )
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
                }

            </section>

        </section>
    );
}


function MetricCard({
    label,
    value
}) {

    return (

        <div className="owasp-metric-card">

            <span>
                {label}
            </span>

            <strong>
                {value}
            </strong>

        </div>
    );
}


function SeverityCard({
    label,
    value,
    className
}) {

    return (

        <div
            className={
                `owasp-severity-card ${className}`
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


function CategoryCard({
    category,
    count,
    status
}) {

    return (

        <div
            className={
                `owasp-category-card ${status.css}`
            }
        >

            <div className="owasp-category-top">

                <span className="owasp-category-code">
                    {category.key}
                </span>

                <span
                    className={
                        `owasp-category-status ${status.css}`
                    }
                >
                    {status.label}
                </span>

            </div>


            <h3>
                {category.title}
            </h3>


            <div className="owasp-category-footer">

                <span>
                    Findings
                </span>

                <strong>
                    {count}
                </strong>

            </div>

        </div>
    );
}


function FindingCard({
    finding
}) {

    const severity =
        String(
            finding?.severity || "INFO"
        ).toUpperCase();


    const confidence =
        String(
            finding?.confidence || "REVIEW"
        ).toUpperCase();


    const category =
        findingCategory(
            finding
        );


    return (

        <article
            className={
                `owasp-finding-card ${severity.toLowerCase()}`
            }
        >

            <div className="owasp-finding-header">

                <div>

                    <span
                        className={
                            `owasp-severity-badge ${severity.toLowerCase()}`
                        }
                    >
                        {severity}
                    </span>


                    <span className="owasp-category-badge">
                        {category || "OWASP"}
                    </span>


                    {
                        finding?.cwe && (

                            <span className="owasp-cwe-badge">
                                {finding.cwe}
                            </span>

                        )
                    }

                </div>


                <span
                    className={
                        `owasp-confidence ${confidence.toLowerCase()}`
                    }
                >

                    Confidence: {confidence}

                </span>

            </div>


            <h3>
                {
                    display(
                        finding?.title,
                        "Security Finding"
                    )
                }
            </h3>


            {
                finding?.description && (

                    <p className="owasp-finding-description">
                        {finding.description}
                    </p>

                )
            }


            {
                finding?.file && (

                    <div className="owasp-location">

                        <span>
                            FILE
                        </span>

                        <strong>
                            {finding.file}
                            {
                                finding.lineNumber != null
                                    ? `:${finding.lineNumber}`
                                    : ""
                            }
                        </strong>

                    </div>

                )
            }


            {
                finding?.evidence && (

                    <div className="owasp-evidence">

                        <span>
                            EVIDENCE
                        </span>

                        <code>
                            {finding.evidence}
                        </code>

                    </div>

                )
            }


            {
                finding?.recommendation && (

                    <div className="owasp-recommendation">

                        <span>
                            RECOMMENDED REMEDIATION
                        </span>

                        <p>
                            {finding.recommendation}
                        </p>

                    </div>

                )
            }

        </article>
    );
}


function resolveCategoryCount(
    categoryCounts,
    category
) {

    if (!categoryCounts) {
        return 0;
    }


    /*
     * Depending on Jackson EnumMap serialization
     * the key can appear as:
     *
     * A01
     *
     * or potentially a textual enum representation.
     */
    const direct =
        categoryCounts[
            category.key
        ];


    if (
        direct !== undefined
        &&
        direct !== null
    ) {

        return numberValue(
            direct
        );
    }


    const alternative =
        categoryCounts[
            category.code
        ];


    return numberValue(
        alternative
    );
}


function findingCategory(
    finding
) {

    const category =
        finding?.category;


    if (
        category == null
    ) {

        return "";
    }


    if (
        typeof category === "string"
    ) {

        return category;
    }


    if (
        typeof category === "object"
    ) {

        return (
            category.code
            ||
            category.name
            ||
            category.key
            ||
            ""
        );
    }


    return String(
        category
    );
}


function resolveCategoryStatus(
    findings
) {

    if (
        !Array.isArray(findings)
        ||
        findings.length === 0
    ) {

        return {
            label: "No Findings",
            css: "clear"
        };
    }


    const severities =
        findings.map(
            finding =>
                String(
                    finding?.severity || ""
                ).toUpperCase()
        );


    if (
        severities.includes(
            "CRITICAL"
        )
    ) {

        return {
            label: "Critical",
            css: "critical"
        };
    }


    if (
        severities.includes(
            "HIGH"
        )
    ) {

        return {
            label: "High Risk",
            css: "high"
        };
    }


    if (
        severities.includes(
            "MEDIUM"
        )
    ) {

        return {
            label: "Review",
            css: "medium"
        };
    }


    if (
        severities.includes(
            "LOW"
        )
    ) {

        return {
            label: "Low Risk",
            css: "low"
        };
    }


    return {
        label: "Detected",
        css: "info"
    };
}


function numberValue(
    value
) {

    const number =
        Number(
            value
        );


    return Number.isFinite(
        number
    )
        ? number
        : 0;
}


function display(
    value,
    fallback
) {

    if (
        value === null
        ||
        value === undefined
        ||
        value === ""
    ) {

        return fallback;
    }


    return String(
        value
    );
}


function createFindingKey(
    finding,
    index
) {

    return [
        finding?.ruleId,
        finding?.file,
        finding?.lineNumber,
        index
    ]
        .filter(
            value =>
                value !== null
                &&
                value !== undefined
        )
        .join("-");
}