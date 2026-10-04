import RemediationFindingCard from "./RemediationFindingCard";
export default function RemediationFindings({ findings }) {
    if (!findings ||
        findings.length === 0) {
        return (<section className="remediation-findings">

                <div className="result-section-header">

                    <div>
                        <span className="eyebrow">
                            REMEDIATION ANALYSIS
                        </span>

                        <h3>
                            Detailed Remediation Findings
                        </h3>
                    </div>

                </div>

                <div className="remediation-clean">

                    <span className="remediation-clean-icon">
                        ✓
                    </span>

                    <div>
                        <strong>
                            No remediation issues detected
                        </strong>

                        <p>
                            EngineeringAI did not identify
                            any actionable remediation
                            findings from the available
                            evidence.
                        </p>
                    </div>

                </div>

            </section>);
    }
    const sortedFindings = [...findings].sort((a, b) => priorityOrder(a.priority) -
        priorityOrder(b.priority));
    const critical = countPriority(findings, "CRITICAL");
    const high = countPriority(findings, "HIGH");
    const medium = countPriority(findings, "MEDIUM");
    const low = countPriority(findings, "LOW");
    return (<section className="remediation-findings">

            <div className="result-section-header">

                <div>

                    <span className="eyebrow">
                        REMEDIATION ANALYSIS
                    </span>

                    <h3>
                        Detailed Remediation Findings
                    </h3>

                    <p className="section-description">
                        Root-cause analysis and recommended
                        fixes generated from EngineeringAI
                        assessment evidence.
                    </p>

                </div>

                <span className="finding-count">
                    {findings.length}
                </span>

            </div>

            <div className="remediation-finding-summary">

                <SummaryBadge label="Critical" value={critical} tone="critical"/>

                <SummaryBadge label="High" value={high} tone="high"/>

                <SummaryBadge label="Medium" value={medium} tone="medium"/>

                <SummaryBadge label="Low" value={low} tone="low"/>

            </div>

            <div className="remediation-finding-list">

                {sortedFindings.map((finding, index) => (<RemediationFindingCard key={`${finding.category}-${finding.title}-${index}`} finding={finding} index={index + 1}/>))}

            </div>

        </section>);
}
function SummaryBadge({ label, value, tone }) {
    return (<div className={`remediation-summary-badge ${tone}`}>

            <strong>
                {value}
            </strong>

            <span>
                {label}
            </span>

        </div>);
}
function countPriority(findings, priority) {
    return findings.filter(finding => finding.priority
        .toUpperCase() === priority).length;
}
function priorityOrder(priority) {
    switch (priority.toUpperCase()) {
        case "CRITICAL":
            return 1;
        case "HIGH":
            return 2;
        case "MEDIUM":
            return 3;
        case "LOW":
            return 4;
        default:
            return 5;
    }
}
