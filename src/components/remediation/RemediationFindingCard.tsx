import type {
    RemediationFinding
} from "../../types";

export default function RemediationFindingCard({
    finding,
    index
}: {
    finding: RemediationFinding;
    index: number;
}) {

    const priority =
        finding.priority
            ?.toLowerCase() ||
        "medium";

    const confidence =
        normalizeConfidence(
            finding.confidence
        );

    return (
        <article
            className={
                `remediation-finding-card priority-${priority}`
            }
        >

            <div className="remediation-finding-header">

                <div className="remediation-finding-number">
                    {index}
                </div>

                <div className="remediation-finding-heading">

                    <div className="remediation-finding-badges">

                        <span
                            className={
                                `priority-badge ${priority}`
                            }
                        >
                            {finding.priority}
                        </span>

                        <span className="category-badge">
                            {formatCategory(
                                finding.category
                            )}
                        </span>

                    </div>

                    <h4>
                        {finding.title}
                    </h4>

                </div>

            </div>

            {(finding.file ||
                finding.line) && (

                <div className="source-location">

                    <span className="source-icon">
                        &lt;/&gt;
                    </span>

                    <div>

                        <small>
                            SOURCE LOCATION
                        </small>

                        <strong>
                            {finding.file || "Unknown file"}

                            {finding.line
                                ? ` : ${finding.line}`
                                : ""
                            }
                        </strong>

                    </div>

                </div>

            )}

            {finding.evidence && (

                <section className="finding-detail evidence-detail">

                    <div className="finding-detail-title">

                        <span className="detail-icon">
                            ◉
                        </span>

                        <strong>
                            Evidence
                        </strong>

                    </div>

                    <pre className="evidence-code">
                        {truncate(
                            finding.evidence,
                            1800
                        )}
                    </pre>

                </section>

            )}

            {finding.rootCause && (

                <section className="finding-detail root-cause-detail">

                    <div className="finding-detail-title">

                        <span className="detail-icon">
                            !
                        </span>

                        <strong>
                            Root Cause
                        </strong>

                    </div>

                    <p>
                        {finding.rootCause}
                    </p>

                </section>

            )}

            {finding.recommendedFix && (

                <section className="finding-detail fix-detail">

                    <div className="finding-detail-title">

                        <span className="detail-icon">
                            ✓
                        </span>

                        <strong>
                            Recommended Fix
                        </strong>

                    </div>

                    <p>
                        {finding.recommendedFix}
                    </p>

                </section>

            )}

            <div className="confidence-section">

                <div className="confidence-header">

                    <span>
                        EngineeringAI Confidence
                    </span>

                    <strong>
                        {confidence}%
                    </strong>

                </div>

                <div className="confidence-track">

                    <div
                        className="confidence-fill"
                        style={{
                            width:
                                `${confidence}%`
                        }}
                    />

                </div>

                <small>
                    {confidenceDescription(
                        confidence
                    )}
                </small>

            </div>

        </article>
    );
}

function normalizeConfidence(
    confidence: number
): number {

    if (!Number.isFinite(confidence)) {
        return 0;
    }

    /*
     * Backend currently returns
     * confidence such as 0.96.
     *
     * Also tolerate 96 if we later
     * change the backend representation.
     */

    const value =
        confidence <= 1
            ? confidence * 100
            : confidence;

    return Math.round(
        Math.max(
            0,
            Math.min(
                100,
                value
            )
        )
    );
}

function confidenceDescription(
    confidence: number
): string {

    if (confidence >= 90) {
        return "High-confidence evidence";
    }

    if (confidence >= 70) {
        return "Strong evidence — review recommended";
    }

    if (confidence >= 50) {
        return "Moderate confidence — manual verification recommended";
    }

    return "Low confidence — requires architect review";
}

function formatCategory(
    category: string
): string {

    if (!category) {
        return "Unknown";
    }

    return category
        .replace(
            /_/g,
            " "
        )
        .toLowerCase()
        .replace(
            /\b\w/g,
            character =>
                character.toUpperCase()
        );
}

function truncate(
    value: string,
    maximumLength: number
): string {

    if (!value) {
        return "";
    }

    if (
        value.length <=
        maximumLength
    ) {
        return value;
    }

    return (
        value.substring(
            0,
            maximumLength
        ) +
        "\n\n... evidence truncated ..."
    );
}