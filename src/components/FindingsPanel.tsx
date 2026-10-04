import type {
    Finding
} from "../types";


function SeverityBadge({
    severity
}: {
    severity: string;
}) {

    const normalized =
        severity
            ?.toLowerCase() ||
        "medium";

    return (
        <span
            className={
                `severity severity-${normalized}`
            }
        >
            {severity}
        </span>
    );
}


export default function FindingsPanel({
    findings
}: {
    findings: Finding[];
}) {

    if (!findings ||
        findings.length === 0) {

        return (
            <section className="result-section">

                <div className="result-section-header">

                    <div>
                        <span className="eyebrow">
                            ANALYSIS
                        </span>

                        <h3>
                            Migration Findings
                        </h3>
                    </div>

                </div>

                <div className="success-message">
                    ✓ No significant migration
                    findings detected.
                </div>

            </section>
        );
    }

    return (
        <section className="result-section">

            <div className="result-section-header">

                <div>

                    <span className="eyebrow">
                        ANALYSIS
                    </span>

                    <h3>
                        Migration Findings
                    </h3>

                    <p className="section-description">
                        Issues and modernization signals
                        discovered during assessment.
                    </p>

                </div>

                <span className="finding-count">
                    {findings.length}
                </span>

            </div>

            <div className="findings">

                {findings.map(
                    (finding, index) => (

                        <article
                            className="finding"
                            key={
                                `${finding.title}-${index}`
                            }
                        >

                            <div className="finding-header">

                                <SeverityBadge
                                    severity={
                                        finding.severity
                                    }
                                />

                                <strong>
                                    {finding.title}
                                </strong>

                            </div>

                            {finding.category && (

                                <div className="finding-category">
                                    {finding.category}
                                </div>

                            )}

                            {finding.description && (

                                <p>
                                    {finding.description}
                                </p>

                            )}

                            {finding.recommendation && (

                                <div className="finding-recommendation">

                                    <strong>
                                        Recommendation
                                    </strong>

                                    <p>
                                        {
                                            finding.recommendation
                                        }
                                    </p>

                                </div>

                            )}

                        </article>

                    )
                )}

            </div>

        </section>
    );
}