import type { PqcAnalysis } from "../../types";

export default function QuantumExposure({
    analysis
}: {
    analysis: PqcAnalysis;
}) {

    const total =
        analysis.cryptoOccurrences || 0;

    const vulnerable =
        analysis.quantumVulnerableOccurrences || 0;

    const percentage =
        total === 0
            ? 0
            : Math.round(
                (vulnerable / total) * 100
            );

    return (
        <section className="pqc-section">

            <span className="eyebrow">
                QUANTUM EXPOSURE
            </span>

            <h3>
                Quantum-Vulnerable Cryptography
            </h3>

            <div className="quantum-exposure-card">

                <div className="quantum-score">

                    <strong>
                        {vulnerable}
                    </strong>

                    <span>
                        vulnerable operations
                    </span>

                </div>

                <div className="quantum-exposure-detail">

                    <div className="confidence-track">

                        <div
                            className="quantum-exposure-fill"
                            style={{
                                width:
                                    `${percentage}%`
                            }}
                        />

                    </div>

                    <strong>
                        {percentage}%
                    </strong>

                    <p>
                        of detected cryptographic
                        occurrences require
                        quantum-readiness review.
                    </p>

                </div>

            </div>

        </section>
    );
}