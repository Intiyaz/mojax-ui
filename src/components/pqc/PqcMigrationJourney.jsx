const stages = [
    "Discover",
    "Classify",
    "Prioritize",
    "Design",
    "Transform",
    "Validate"
];
export default function PqcMigrationJourney() {
    return (<section className="pqc-section">

            <span className="eyebrow">
                MIGRATION STRATEGY
            </span>

            <h3>
                PQC Migration Journey
            </h3>

            <div className="pqc-journey">

                {stages.map((stage, index) => (<div className="pqc-journey-part" key={stage}>

                            <div className="pqc-journey-node">

                                <span>
                                    {index + 1}
                                </span>

                                <strong>
                                    {stage}
                                </strong>

                            </div>

                            {index <
                stages.length - 1 && (<div className="pqc-journey-arrow">
                                    →
                                </div>)}

                        </div>))}

            </div>

        </section>);
}
