import type { PqcAnalysis } from "../../types";

export default function HndlExposure({
    analysis
}: {
    analysis: PqcAnalysis;
}) {

    const count =
        analysis.hndlRelevantOccurrences ?? 0;

    const quantum =
        analysis.quantumVulnerableOccurrences ?? 0;

    const percentage =
        quantum > 0
            ? Math.round((count / quantum) * 100)
            : 0;

    return (
        <section className="pqc-section">

            <div className="pqc-section-heading">

                <div>
                    <span className="eyebrow">
                        HARVEST NOW, DECRYPT LATER
                    </span>

                    <h3>
                        HNDL Exposure
                    </h3>
                </div>

                <span
                    className={
                        count > 0
                            ? "hndl-status hndl-status-risk"
                            : "hndl-status hndl-status-review"
                    }
                >
                    {count > 0
                        ? "REVIEW REQUIRED"
                        : "NO DIRECT EXPOSURE DETECTED"}
                </span>

            </div>


            <div className="hndl-exposure-card">

                <div className="hndl-score">

                    <strong>
                        {count}
                    </strong>

                    <span>
                        HNDL-Relevant
                        <br />
                        Crypto Usages
                    </span>

                </div>


                <div className="hndl-content">

                    <strong>
                        Long-Term Confidentiality Risk
                    </strong>

                    <p>
                        MoJaX identified {count} cryptographic
                        usage{count === 1 ? "" : "s"} that may
                        require Harvest Now, Decrypt Later review.
                    </p>

                    {count > 0 && (
                        <>
                            <div className="hndl-progress">

                                <div
                                    className="hndl-progress-fill"
                                    style={{
                                        width:
                                            `${Math.min(
                                                percentage,
                                                100
                                            )}%`
                                    }}
                                />

                            </div>

                            <small>
                                {percentage}% of detected
                                quantum-vulnerable usages are
                                potentially relevant to HNDL.
                            </small>
                        </>
                    )}

                </div>

            </div>


            <div className="hndl-flow-ui">

                <div className="hndl-flow-step">

                    <span>01</span>

                    <strong>
                        Harvest
                    </strong>

                    <small>
                        Encrypted data captured today
                    </small>

                </div>


                <div className="hndl-flow-arrow">
                    →
                </div>


                <div className="hndl-flow-step">

                    <span>02</span>

                    <strong>
                        Store
                    </strong>

                    <small>
                        Data retained for future attack
                    </small>

                </div>


                <div className="hndl-flow-arrow">
                    →
                </div>


                <div className="hndl-flow-step">

                    <span>03</span>

                    <strong>
                        Quantum Capability
                    </strong>

                    <small>
                        Cryptographically relevant
                        quantum capability emerges
                    </small>

                </div>


                <div className="hndl-flow-arrow">
                    →
                </div>


                <div className="hndl-flow-step hndl-flow-danger">

                    <span>04</span>

                    <strong>
                        Decrypt
                    </strong>

                    <small>
                        Previously captured data may
                        become exposed
                    </small>

                </div>

            </div>


            <div className="hndl-note">

                <strong>
                    Why this matters
                </strong>

                <p>
                    Migration priority should consider how
                    long protected information must remain
                    confidential. Source-code discovery alone
                    cannot determine that lifetime, so these
                    usages require business and security review.
                </p>

            </div>

        </section>
    );
}