import { displayValue } from "../utils/formatters";
const TECHNICAL_KEYS = [
    "javaFiles",
    "dependencies",
    "javaxImports",
    "jakartaImports",
    "staticInternalApis",
    "reflectionUsages",
    "legacyDateApis",
    "compileStatus",
    "compileExitCode",
    "testStatus",
    "testExitCode",
    "jdepsInternalDependencies",
    "deprecatedJdkApis",
    "deprecatedForRemoval",
    "jdepsStatus",
    "jdeprscanStatus"
];
const DEFINITIONS = {
    javaFiles: {
        label: "Java Source Files",
        tone: "blue",
        description: "Java source files included in analysis."
    },
    dependencies: {
        label: "Dependencies",
        tone: "purple",
        description: "Build dependencies discovered."
    },
    javaxImports: {
        label: "javax Imports",
        tone: "warning",
        description: "javax references requiring individual review."
    },
    jakartaImports: {
        label: "Jakarta Imports",
        tone: "good",
        description: "Jakarta namespace usage already present."
    },
    staticInternalApis: {
        label: "Static Internal APIs",
        tone: "danger",
        description: "Static references to JDK-internal APIs."
    },
    reflectionUsages: {
        label: "Reflection Usages",
        tone: "warning",
        description: "Reflective access requiring encapsulation review."
    },
    legacyDateApis: {
        label: "Legacy Date APIs",
        tone: "warning",
        description: "Legacy date/time API usages."
    },
    compileStatus: {
        label: "Java 21 Compilation",
        tone: "status",
        description: "Compilation evidence against Java 21."
    },
    compileExitCode: {
        label: "Compile Exit Code",
        tone: "neutral",
        description: "Build-tool compilation exit code."
    },
    testStatus: {
        label: "Automated Tests",
        tone: "status",
        description: "Automated test execution status."
    },
    testExitCode: {
        label: "Test Exit Code",
        tone: "neutral",
        description: "Build-tool test execution exit code."
    },
    jdepsInternalDependencies: {
        label: "JDK Internal Dependencies",
        tone: "danger",
        description: "Internal JDK dependencies reported by jdeps."
    },
    deprecatedJdkApis: {
        label: "Deprecated JDK APIs",
        tone: "warning",
        description: "Deprecated Java SE API references."
    },
    deprecatedForRemoval: {
        label: "Deprecated for Removal",
        tone: "danger",
        description: "APIs deprecated for removal."
    },
    jdepsStatus: {
        label: "JDeps Analysis",
        tone: "status",
        description: "JDK dependency analysis status."
    },
    jdeprscanStatus: {
        label: "JDeprScan Analysis",
        tone: "status",
        description: "Deprecated API scan status."
    }
};
export default function MetricsPanel({ metrics }) {
    const entries = TECHNICAL_KEYS
        .filter(key => Object.prototype
        .hasOwnProperty.call(metrics || {}, key))
        .map(key => [
        key,
        metrics[key]
    ]);
    if (entries.length === 0) {
        return null;
    }
    return (<section className="technical-evidence-report">

            <div className="consolidated-section-header">

                <div className="consolidated-section-number">
                    04
                </div>

                <div>

                    <span className="eyebrow">
                        TECHNICAL EVIDENCE
                    </span>

                    <h2>
                        Source, Build & JDK Evidence
                    </h2>

                    <p>
                        Low-level evidence supporting the
                        migration assessment. Decision-level
                        scores and modernization counts are
                        intentionally not repeated here.
                    </p>

                </div>

            </div>


            <div className="technical-evidence-grid">

                {entries.map(([key, value]) => {
            const definition = DEFINITIONS[key];
            return (<article key={key} className={`technical-evidence-card tone-${resolveTone(key, value, definition.tone)}`}>

                                    <span>
                                        {definition.label}
                                    </span>

                                    <strong>
                                        {String(displayValue(value))}
                                    </strong>

                                    <small>
                                        {definition.description}
                                    </small>

                                </article>);
        })}

            </div>

        </section>);
}
function resolveTone(key, value, configuredTone) {
    if (configuredTone ===
        "status") {
        const normalized = String(value
            ??
                "")
            .toUpperCase();
        if (normalized === "PASSED"
            ||
                normalized === "SUCCESS") {
            return "good";
        }
        if (normalized === "FAILED"
            ||
                normalized === "ERROR"
            ||
                normalized === "TIMEOUT") {
            return "danger";
        }
        return "neutral";
    }
    if ((key === "staticInternalApis"
        ||
            key === "jdepsInternalDependencies"
        ||
            key === "deprecatedForRemoval")
        &&
            typeof value === "number") {
        return value > 0
            ? "danger"
            : "good";
    }
    if ((key === "javaxImports"
        ||
            key === "reflectionUsages"
        ||
            key === "legacyDateApis"
        ||
            key === "deprecatedJdkApis")
        &&
            typeof value === "number") {
        return value > 0
            ? "warning"
            : "good";
    }
    return configuredTone;
}
