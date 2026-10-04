import type { PqcAnalysis } from "../../types";

import PqcOverview from "./PqcOverview";
import CryptoInventory from "./CryptoInventory";
import QuantumExposure from "./QuantumExposure";
import HndlExposure from "./HndlExposure";
import PqcFindingList from "./PqcFindingList";
import PqcMigrationJourney from "./PqcMigrationJourney";

export default function PqcAssessmentReport({
    analysis
}: {
    analysis: PqcAnalysis;
}) {

    return (
        <section className="pqc-report">

            <div className="pqc-report-header">

                <div>
                    <span className="eyebrow">
                        CRYPTOGRAPHIC DISCOVERY
                    </span>

                    <h2>
                        Post-Quantum Cryptography Assessment
                    </h2>
                </div>

                <div className="pqc-target">
                    PQC MIGRATION
                </div>

            </div>

            <PqcOverview analysis={analysis} />

            <CryptoInventory analysis={analysis} />

            <QuantumExposure analysis={analysis} />

            <HndlExposure analysis={analysis} />

            <PqcFindingList
                findings={analysis.findings ?? []}
            />

            <PqcMigrationJourney />

        </section>
    );
}