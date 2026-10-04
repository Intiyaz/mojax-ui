import type { RemediationPlan } from "../../types";

export default function RemediationOverview({
    plan
}: {
    plan: RemediationPlan;
}) {

    const stats =
        plan.statistics || {};

    return (
        <div className="remediation-overview">

            <div className="remediation-stat complexity">

                <span>
                    Complexity
                </span>

                <strong>
                    {plan.estimatedComplexity}
                </strong>

                <small>
                    /100
                </small>

            </div>

            <div className="remediation-stat critical">

                <span>
                    Critical
                </span>

                <strong>
                    {stats.critical ?? 0}
                </strong>

            </div>

            <div className="remediation-stat high">

                <span>
                    High
                </span>

                <strong>
                    {stats.high ?? 0}
                </strong>

            </div>

            <div className="remediation-stat medium">

                <span>
                    Medium
                </span>

                <strong>
                    {stats.medium ?? 0}
                </strong>

            </div>

            <div className="remediation-stat low">

                <span>
                    Low
                </span>

                <strong>
                    {stats.low ?? 0}
                </strong>

            </div>

        </div>
    );
}