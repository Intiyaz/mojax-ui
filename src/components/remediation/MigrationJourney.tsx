import type { RemediationPlan } from "../../types";

export default function MigrationJourney({
    plan
}: {
    plan: RemediationPlan;
}) {

    const versions =
        plan.strategy
            .split("→")
            .map(value =>
                value.trim()
            );

    return (
        <section className="migration-journey">

            <span className="eyebrow">
                MIGRATION JOURNEY
            </span>

            <h3>
                Recommended Java Upgrade Path
            </h3>

            <div className="journey">

                {versions.map(
                    (version, index) => (

                        <div
                            className="journey-part"
                            key={version}
                        >

                            <div
                                className={
                                    index ===
                                    versions.length - 1
                                        ? "journey-node target"
                                        : "journey-node"
                                }
                            >

                                <span>
                                    {index + 1}
                                </span>

                                <strong>
                                    {version}
                                </strong>

                            </div>

                            {index <
                                versions.length - 1 && (

                                <div className="journey-arrow">
                                    →
                                </div>

                            )}

                        </div>

                    )
                )}

            </div>

        </section>
    );
}