import type { PqcFinding } from "../../types";

import PqcFindingCard
    from "./PqcFindingCard";

export default function PqcFindingList({
    findings
}: {
    findings: PqcFinding[];
}) {

    if (!findings?.length) {
        return null;
    }

    return (
        <section className="pqc-section">

            <div className="result-section-header">

                <div>

                    <span className="eyebrow">
                        SOURCE EVIDENCE
                    </span>

                    <h3>
                        Cryptographic Findings
                    </h3>

                </div>

                <span className="finding-count">
                    {findings.length}
                </span>

            </div>

            <div className="pqc-finding-list">

                {findings.map(
                    (finding, index) => (

                        <PqcFindingCard
                            key={
                                `${finding.file}-${finding.line}-${index}`
                            }
                            finding={finding}
                        />

                    )
                )}

            </div>

        </section>
    );
}