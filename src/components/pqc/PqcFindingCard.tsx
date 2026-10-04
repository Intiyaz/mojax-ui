import type { PqcFinding } from "../../types";

export default function PqcFindingCard({
    finding
}: {
    finding: PqcFinding;
}) {

    return (
        <article
            className={`pqc-finding severity-${finding.severity.toLowerCase()}`}
        >

            <div className="pqc-finding-header">

                <div>

                    <span className="pqc-finding-algorithm">
                        {finding.algorithm}
                    </span>

                    <span className="pqc-finding-category">
                        {finding.category}
                    </span>

                </div>

                <span
                    className={`pqc-disposition disposition-${finding.disposition.toLowerCase()}`}
                >
                    {formatName(finding.disposition)}
                </span>

            </div>


            <div className="pqc-source-location">

                {finding.file}

                {finding.line > 0 &&
                    ` : ${finding.line}`}

            </div>


            <div className="pqc-finding-properties">

                <Property
                    label="Purpose"
                    value={formatName(finding.purpose)}
                />

                <Property
                    label="Key Size"
                    value={
                        finding.keySize
                            ? `${finding.keySize} bits`
                            : "Not detected"
                    }
                />

                <Property
                    label="IV"
                    value={
                        finding.ivDetected
                            ? "Detected"
                            : "Not detected"
                    }
                />

                <Property
                    label="Confidence"
                    value={`${Math.round(
                        finding.confidence * 100
                    )}%`}
                />

            </div>


            <FindingSection
                title="Evidence"
                value={finding.evidence}
                code
            />

            <FindingSection
                title="Assessment"
                value={finding.description}
            />

            <FindingSection
                title="Quantum Impact"
                value={finding.pqcImpact}
            />

            <FindingSection
                title="HNDL Impact"
                value={finding.hndlImpact}
            />

            <FindingSection
                title="Migration Recommendation"
                value={finding.recommendation}
                recommendation
            />

        </article>
    );
}


function Property({
    label,
    value
}: {
    label: string;
    value: string;
}) {

    return (
        <div className="pqc-finding-property">

            <span>
                {label}
            </span>

            <strong>
                {value}
            </strong>

        </div>
    );
}


function FindingSection({
    title,
    value,
    code = false,
    recommendation = false
}: {
    title: string;
    value?: string;
    code?: boolean;
    recommendation?: boolean;
}) {

    if (!value) {
        return null;
    }

    return (
        <div
            className={
                recommendation
                    ? "pqc-finding-section pqc-recommendation"
                    : "pqc-finding-section"
            }
        >

            <span>
                {title}
            </span>

            {code ? (
                <code>
                    {value}
                </code>
            ) : (
                <p>
                    {value}
                </p>
            )}

        </div>
    );
}


function formatName(
    value?: string
): string {

    if (!value) {
        return "-";
    }

    return value
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(
            /\b\w/g,
            character =>
                character.toUpperCase()
        );
}