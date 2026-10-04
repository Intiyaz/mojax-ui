export default function CryptoInventory({
    inventory
}: {
    inventory: Record<string, number>;
}) {

    const entries =
        Object.entries(inventory || {})
            .sort((a, b) => b[1] - a[1]);

    if (entries.length === 0) {
        return null;
    }

    return (
        <section className="pqc-section">

            <div className="result-section-header">

                <div>

                    <span className="eyebrow">
                        CRYPTO ESTATE
                    </span>

                    <h3>
                        Cryptographic Inventory
                    </h3>

                    <p className="section-description">
                        Cryptographic algorithms discovered
                        across the application.
                    </p>

                </div>

            </div>

            <div className="crypto-inventory">

                {entries.map(
                    ([algorithm, count]) => {

                        const classification =
                            classifyAlgorithm(
                                algorithm
                            );

                        return (

                            <div
                                className={
                                    `crypto-inventory-row ${classification.tone}`
                                }
                                key={algorithm}
                            >

                                <div className="crypto-algorithm">

                                    <span className="crypto-icon">
                                        🔐
                                    </span>

                                    <strong>
                                        {algorithm}
                                    </strong>

                                </div>

                                <span className="crypto-count">
                                    {count}
                                </span>

                                <span
                                    className={
                                        `crypto-status ${classification.tone}`
                                    }
                                >
                                    {
                                        classification.label
                                    }
                                </span>

                            </div>
                        );
                    }
                )}

            </div>

        </section>
    );
}

function classifyAlgorithm(
    algorithm: string
) {

    const value =
        algorithm.toUpperCase();

    if (
        value.includes("RSA") ||
        value.includes("ECDSA") ||
        value.includes("ECDH") ||
        value === "DSA" ||
        value.includes("DIFFIE")
    ) {

        return {
            label: "PQC MIGRATION",
            tone: "critical"
        };
    }

    if (
        value.includes("MD5") ||
        value.includes("SHA-1")
    ) {

        return {
            label: "LEGACY",
            tone: "warning"
        };
    }

    if (
        value.includes("AES") ||
        value.includes("SHA-256") ||
        value.includes("SHA-384") ||
        value.includes("SHA-512")
    ) {

        return {
            label: "RETAIN / REVIEW",
            tone: "safe"
        };
    }

    return {
        label: "REVIEW",
        tone: "review"
    };
}