import type { PqcAnalysis } from "../../types";

export default function PqcOverview({
    analysis
}: {
    analysis: PqcAnalysis;
}) {

    return (
        <section className="pqc-overview">

            <Metric
                label="Files Scanned"
                value={analysis.filesScanned}
            />

            <Metric
                label="Crypto Files"
                value={analysis.cryptoFiles}
            />

            <Metric
                label="Crypto Usages"
                value={analysis.cryptoOccurrences}
            />

            <Metric
                label="Crypto Configurations"
                value={analysis.uniqueCryptoAssets}
            />

            <Metric
                label="Quantum Vulnerable"
                value={analysis.quantumVulnerableOccurrences}
                className="critical"
            />

            <Metric
                label="HNDL Relevant"
                value={analysis.hndlRelevantOccurrences}
                className="critical"
            />

            <Metric
                label="Legacy Crypto"
                value={analysis.legacyCryptoOccurrences}
                className="warning"
            />

            <Metric
                label="Symmetric Crypto"
                value={analysis.symmetricCryptoOccurrences}
                className="safe"
            />

        </section>
    );
}


function Metric({
    label,
    value,
    className = ""
}: {
    label: string;
    value: number;
    className?: string;
}) {

    return (
        <div className={`pqc-metric ${className}`}>

            <strong>
                {value ?? 0}
            </strong>

            <span>
                {label}
            </span>

        </div>
    );
}