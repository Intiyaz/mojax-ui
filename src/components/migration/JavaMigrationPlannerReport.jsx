const CLASSIFICATION_ORDER = [
    "BLOCKER",
    "REQUIRED_MIGRATION",
    "COMPATIBILITY_RISK",
    "TESTING_PRIORITY",
    "RECOMMENDED_MODERNIZATION",
    "OPTIONAL_JAVA_21_OPPORTUNITY"
];
const CLASSIFICATION_LABELS = {
    BLOCKER: "Migration Blockers",
    REQUIRED_MIGRATION: "Required Migration",
    COMPATIBILITY_RISK: "Compatibility Risks",
    TESTING_PRIORITY: "Testing Priorities",
    RECOMMENDED_MODERNIZATION: "Recommended Modernization",
    OPTIONAL_JAVA_21_OPPORTUNITY: "Optional Java 21 Opportunities"
};
export default function JavaMigrationPlannerReport({ metrics }) {
    const source = metrics ?? {};
    const findings = toFindings(source.migrationV2Findings);
    const packageSummaries = summarizeByPackage(findings);
    const migrationPlan = toMigrationPlan(source.migrationPlan);
    if (packageSummaries.length === 0
        &&
            migrationPlan.length === 0) {
        return null;
    }
    return (<section className="java-migration-roadmap-report">

      <div className="java-migration-roadmap-header">

        <span className="eyebrow">
          REQUIRED MIGRATION WORK
        </span>

        <h3>
          Package Impact & Execution Sequence
        </h3>

        <p>
          Required migration work is consolidated by package
          and organized into an implementation sequence.
          Individual source files are intentionally omitted.
        </p>

      </div>


      {packageSummaries.length > 0 && (<div className="java-migration-roadmap-section">

          <div className="java-migration-roadmap-title">

            <span>
              AFFECTED APPLICATION AREAS
            </span>

            <h4>
              Package-level Migration Findings
            </h4>

          </div>


          <div className="java-migration-package-groups">

            {CLASSIFICATION_ORDER.map(classification => {
                const group = packageSummaries.filter(item => item.classification
                    === classification);
                if (group.length === 0) {
                    return null;
                }
                return (<div key={classification} className="java-migration-package-group">

                      <div className="java-migration-finding-group-header">

                        <h5>
                          {CLASSIFICATION_LABELS[classification]
                        ??
                            formatEnum(classification)}
                        </h5>

                        <span>
                          {group.reduce((sum, item) => sum
                        +
                            item.findingCount, 0)}
                        </span>

                      </div>


                      <div className="java-migration-package-table-wrapper">

                        <table className="java-migration-package-table">

                          <thead>
                            <tr>
                              <th>Package / Area</th>
                              <th>Category</th>
                              <th>Severity</th>
                              <th>Findings</th>
                              <th>Summary</th>
                            </tr>
                          </thead>

                          <tbody>

                            {group.map(item => (<tr key={`${classification}-${item.category}-${item.packageName}`}>

                                    <td>
                                      <code className="java-migration-package-name">
                                        {item.packageName}
                                      </code>
                                    </td>

                                    <td>
                                      {formatEnum(item.category)}
                                    </td>

                                    <td>
                                      <span className={`java-migration-badge severity-${normalizeToken(item.severity)}`}>
                                        {formatEnum(item.severity)}
                                      </span>
                                    </td>

                                    <td>
                                      <strong className="java-migration-package-count">
                                        {item.findingCount}
                                      </strong>

                                      {item.requiredCount > 0 && (<span className="java-migration-required-count">
                                          {item.requiredCount} required
                                        </span>)}
                                    </td>

                                    <td>
                                      <PackageSummaryText item={item}/>
                                    </td>

                                  </tr>))}

                          </tbody>

                        </table>

                      </div>

                    </div>);
            })}

          </div>

        </div>)}


      {migrationPlan.length > 0 && (<div className="java-migration-roadmap-section">

          <div className="java-migration-roadmap-title">

            <span>
              RECOMMENDED EXECUTION ORDER
            </span>

            <h4>
              Java 21 Migration Sequence
            </h4>

          </div>


          <div className="java-migration-plan">

            {migrationPlan
                .slice()
                .sort((left, right) => (left.order
                ??
                    0)
                -
                    (right.order
                        ??
                            0))
                .map((phase, index) => (<div key={`${phase.order ?? index}-${phase.name ?? "phase"}`} className="java-migration-plan-phase">

                      <div className="java-migration-plan-number">
                        {String(phase.order
                    ??
                        index + 1).padStart(2, "0")}
                      </div>

                      <div className="java-migration-plan-content">

                        <h5>
                          {phase.name
                    ??
                        `Migration Phase ${index + 1}`}
                        </h5>

                        {phase.objective
                    &&
                        (<p>
                              {phase.objective}
                            </p>)}

                        {Array.isArray(phase.actions)
                    &&
                        phase.actions.length > 0
                    &&
                        (<ul>
                              {phase.actions.map((action, actionIndex) => (<li key={`${actionIndex}-${action}`}>
                                      {action}
                                    </li>))}
                            </ul>)}

                      </div>

                    </div>))}

          </div>

        </div>)}

    </section>);
}
function PackageSummaryText({ item }) {
    const titles = item.titles.slice(0, 3);
    const recommendation = item.recommendations[0];
    return (<div className="java-migration-package-summary">

      {titles.length > 0 && (<span>
          {titles.join(" · ")}
          {item.titles.length > titles.length
                ? ` · +${item.titles.length - titles.length} more`
                : ""}
        </span>)}

      {recommendation && (<small>
          {recommendation}
        </small>)}

    </div>);
}
function summarizeByPackage(findings) {
    const groups = new Map();
    for (const finding of findings) {
        const classification = finding.classification
            ??
                "RECOMMENDED_MODERNIZATION";
        const category = finding.category
            ??
                "GENERAL";
        const packageName = derivePackageName(finding.file, category);
        const key = [
            classification,
            category,
            packageName
        ].join("|");
        const severity = finding.severity
            ??
                "INFO";
        const existing = groups.get(key);
        if (!existing) {
            groups.set(key, {
                packageName,
                classification,
                category,
                severity,
                findingCount: 1,
                requiredCount: finding.requiredForTarget
                    ? 1
                    : 0,
                titles: finding.title
                    ? [finding.title]
                    : [],
                recommendations: finding.recommendation
                    ? [finding.recommendation]
                    : []
            });
            continue;
        }
        existing.findingCount += 1;
        if (finding.requiredForTarget) {
            existing.requiredCount += 1;
        }
        if (severityWeight(severity)
            >
                severityWeight(existing.severity)) {
            existing.severity =
                severity;
        }
        if (finding.title
            &&
                !existing.titles.includes(finding.title)) {
            existing.titles.push(finding.title);
        }
        if (finding.recommendation
            &&
                !existing.recommendations.includes(finding.recommendation)) {
            existing.recommendations.push(finding.recommendation);
        }
    }
    return Array
        .from(groups.values())
        .sort((left, right) => {
        const leftOrder = CLASSIFICATION_ORDER.indexOf(left.classification);
        const rightOrder = CLASSIFICATION_ORDER.indexOf(right.classification);
        if (leftOrder
            !==
                rightOrder) {
            return leftOrder
                -
                    rightOrder;
        }
        const severityOrder = severityWeight(right.severity)
            -
                severityWeight(left.severity);
        if (severityOrder
            !==
                0) {
            return severityOrder;
        }
        return left.packageName
            .localeCompare(right.packageName);
    });
}
function derivePackageName(file, category) {
    if (!file
        ||
            !file.trim()) {
        return categoryArea(category);
    }
    const normalized = file
        .replaceAll("\\", "/")
        .replace(/^\.?\//, "");
    let relative = normalized;
    const markers = [
        "/src/main/java/",
        "/src/test/java/",
        "src/main/java/",
        "src/test/java/"
    ];
    for (const marker of markers) {
        const index = normalized.indexOf(marker);
        if (index >= 0) {
            relative =
                normalized.substring(index
                    +
                        marker.length);
            break;
        }
    }
    if (relative.endsWith(".java")) {
        const slash = relative.lastIndexOf("/");
        if (slash < 0) {
            return "(default package)";
        }
        return relative
            .substring(0, slash)
            .replaceAll("/", ".");
    }
    if (normalized.endsWith("pom.xml")
        ||
            normalized.endsWith("build.gradle")
        ||
            normalized.endsWith("build.gradle.kts")) {
        return "Build / Configuration";
    }
    if (normalized.endsWith(".jsp")
        ||
            normalized.endsWith(".tag")
        ||
            normalized.endsWith(".tld")) {
        return "Web / JSP";
    }
    return categoryArea(category);
}
function categoryArea(category) {
    const value = (category
        ??
            "").toUpperCase();
    if (value.includes("SECURITY")) {
        return "Security Configuration";
    }
    if (value.includes("HIBERNATE")
        ||
            value.includes("PERSIST")) {
        return "Persistence Layer";
    }
    if (value.includes("JAKARTA")) {
        return "Jakarta Migration";
    }
    if (value.includes("DEPEND")
        ||
            value.includes("BUILD")) {
        return "Build / Dependencies";
    }
    if (value.includes("TEST")) {
        return "Testing";
    }
    return "Application";
}
function severityWeight(severity) {
    switch (severity
        ?.toUpperCase()) {
        case "CRITICAL":
            return 5;
        case "HIGH":
            return 4;
        case "MEDIUM":
            return 3;
        case "LOW":
            return 2;
        default:
            return 1;
    }
}
function toFindings(value) {
    if (!Array.isArray(value)) {
        return [];
    }
    return value.filter(isObject);
}
function toMigrationPlan(value) {
    if (!Array.isArray(value)) {
        return [];
    }
    return value.filter(isObject);
}
function isObject(value) {
    return (typeof value
        ===
            "object"
        &&
            value !== null
        &&
            !Array.isArray(value));
}
function normalizeToken(value) {
    return (value
        ??
            "info")
        .toLowerCase()
        .replaceAll("_", "-");
}
function formatEnum(value) {
    return value
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, character => character
        .toUpperCase());
}
