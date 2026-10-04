import RemediationOverview from "./RemediationOverview";
import MigrationJourney from "./MigrationJourney";
import RemediationActions from "./RemediationActions";
import RemediationFindings from "./RemediationFindings";
export default function RemediationReport({ plan }) {
    return (<section className="remediation-report">

            <div className="remediation-report-header">

                <div>
                    <span className="eyebrow">
                        AI REMEDIATION PLANNER
                    </span>

                    <h2>
                        Java 21 Remediation Plan
                    </h2>

                    <p>
                        Evidence-based modernization roadmap
                        generated from compilation, dependency,
                        JDK and test analysis.
                    </p>
                </div>

                <span className="remediation-target">
                    Target: {plan.target}
                </span>

            </div>

            <RemediationOverview plan={plan}/>

            <MigrationJourney plan={plan}/>

            <RemediationActions actions={plan.actions}/>

            <RemediationFindings findings={plan.findings}/>

        </section>);
}
