import RemediationActionCard from "./RemediationActionCard";
export default function RemediationActions({ actions }) {
    if (!actions || actions.length === 0) {
        return (<section className="remediation-actions">

                <div className="result-section-header">

                    <div>
                        <span className="eyebrow">
                            EXECUTION ROADMAP
                        </span>

                        <h3>
                            Remediation Phases
                        </h3>
                    </div>

                </div>

                <div className="remediation-clean">

                    <span className="remediation-clean-icon">
                        ✓
                    </span>

                    <div>
                        <strong>
                            No remediation actions required
                        </strong>

                        <p>
                            EngineeringAI did not generate
                            any remediation phases for this
                            assessment.
                        </p>
                    </div>

                </div>

            </section>);
    }
    const sortedActions = [...actions].sort((a, b) => a.order - b.order);
    return (<section className="remediation-actions">

            <div className="result-section-header">

                <div>

                    <span className="eyebrow">
                        EXECUTION ROADMAP
                    </span>

                    <h3>
                        Remediation Phases
                    </h3>

                    <p className="section-description">
                        Recommended modernization sequence
                        generated from the assessment
                        evidence.
                    </p>

                </div>

                <span className="finding-count">
                    {actions.length}
                </span>

            </div>

            <div className="remediation-action-grid">

                {sortedActions.map(action => (<RemediationActionCard key={action.order} action={action}/>))}

            </div>

        </section>);
}
