import type { Assessment } from "../types";

export default function AssessmentMetadata({
    assessment
}: {
    assessment: Assessment;
}) {

    return (
        <section className="assessment-details">

            <div className="assessment-details-header">
                <span className="eyebrow">
                    AUDIT INFORMATION
                </span>

                <h3>
                    Assessment Details
                </h3>
            </div>

            <div className="assessment-metadata">

                <MetadataItem
                    label="Assessment ID"
                    value={assessment.id}
                />

                <MetadataItem
                    label="Project ID"
                    value={assessment.projectId}
                />

                <MetadataItem
                    label="Agent"
                    value={assessment.agentCode}
                />

                <MetadataItem
                    label="Started"
                    value={formatDate(
                        assessment.createdAt
                    )}
                />

                <MetadataItem
                    label="Completed"
                    value={formatDate(
                        assessment.completedAt
                    )}
                />

            </div>

        </section>
    );
}


function MetadataItem({
    label,
    value
}: {
    label: string;
    value?: string;
}) {

    return (
        <div title={value || "-"}>

            <span>
                {label}
            </span>

            <strong>
                {value || "-"}
            </strong>

        </div>
    );
}


function formatDate(
    value?: string
): string {

    if (!value) {
        return "-";
    }

    const date =
        new Date(value);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return value;
    }

    return date.toLocaleString();
}