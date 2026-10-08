import type { CSSProperties, ReactNode } from "react";
import type { PqcAnalysis } from "../../types";

import PqcOverview from "./PqcOverview";
import CryptoInventory from "./CryptoInventory";
import QuantumExposure from "./QuantumExposure";
import HndlExposure from "./HndlExposure";
import PqcFindingList from "./PqcFindingList";
import PqcMigrationJourney from "./PqcMigrationJourney";


type CryptoAsset = {
    assetType?: string;
    algorithm?: string;
    purpose?: string;
    file?: string;
    line?: number;
    api?: string;
    keySize?: number | null;
    curveName?: string | null;
    classicalStrengthStatus?: string;
    strengthReason?: string;
    provider?: string | null;
    protocol?: string | null;
    protocolVersion?: string | null;
    keyStoreType?: string | null;
    certificateType?: string | null;
    hardnessAssumption?: string;
    quantumStatus?: string;
    hndlExposure?: string;
    recommendedReplacement?: string;
    migrationPriority?: string;
    evidence?: string;
    confidence?: number;
    occurrenceCount?: number;
    affectedFileCount?: number;
    locations?: string[];
};

type CryptoRelationship = {
    sourceType?: string;
    sourceAsset?: string;
    relationship?: string;
    targetType?: string;
    targetAsset?: string;
    evidence?: string;
    confidence?: number;
};

type PqcCbomAnalysis = PqcAnalysis & {
    cryptoBillOfMaterials?: CryptoAsset[];
    assetTypeInventory?: Record<string, number>;
    hardnessAssumptionInventory?: Record<string, number>;
    quantumStatusInventory?: Record<string, number>;
    hndlExposureInventory?: Record<string, number>;
    classicalStrengthInventory?: Record<string, number>;
    cryptoRelationships?: CryptoRelationship[];
    relationshipTypeInventory?: Record<string, number>;
};

function CbomEnterpriseOverview({
    analysis
}: {
    analysis: PqcAnalysis;
}) {

    const cbom =
        analysis as PqcCbomAnalysis;

    const assets =
        cbom.cryptoBillOfMaterials ?? [];

    const cryptoLibraries =
        assets.filter(
            asset =>
                asset.assetType === "CRYPTO_LIBRARY"
        );

    const relationships =
        cbom.cryptoRelationships ?? [];

    const relationshipTypes =
        cbom.relationshipTypeInventory ?? {};

    const assetTypes =
        cbom.assetTypeInventory ?? {};

    const assumptions =
        cbom.hardnessAssumptionInventory ?? {};

    const quantumStatuses =
        cbom.quantumStatusInventory ?? {};

    const hndlStatuses =
        cbom.hndlExposureInventory ?? {};

    const strengthStatuses =
        cbom.classicalStrengthInventory ?? {};

    const weakToday =
        strengthStatuses.WEAK_TODAY ?? 0;

    const quantumVulnerable =
        quantumStatuses.QUANTUM_VULNERABLE ?? 0;

    const quantumWeakened =
        quantumStatuses.QUANTUM_WEAKENED ?? 0;

    const pqcStandardized =
        quantumStatuses.PQC_STANDARDIZED ?? 0;

    const hndlHigh =
        (hndlStatuses.CRITICAL ?? 0)
        + (hndlStatuses.HIGH ?? 0);

    return (
        <section
            className="pqc-cbom-section"
            data-report-search
            style={{
                marginTop: "22px"
            }}
        >
            <div
                style={{
                    marginBottom: "14px"
                }}
            >
                <span className="eyebrow">
                    CRYPTOGRAPHIC BILL OF MATERIALS
                </span>

                <h2
                    style={{
                        marginBottom: "6px"
                    }}
                >
                    Enterprise Crypto Inventory
                </h2>

                <p
                    style={{
                        margin: 0,
                        color: "#64748b",
                        lineHeight: 1.6
                    }}
                >
                    Structured inventory of discovered cryptographic assets,
                    classical key strength, quantum exposure, hardness assumptions,
                    HNDL relevance and recommended migration direction.
                </p>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "12px",
                    marginBottom: "18px"
                }}
            >
                <CbomMetric
                    label="CBOM Assets"
                    value={assets.length}
                />

                <CbomMetric
                    label="Weak Today"
                    value={weakToday}
                />

                <CbomMetric
                    label="Quantum Vulnerable"
                    value={quantumVulnerable}
                />

                <CbomMetric
                    label="Quantum Weakened"
                    value={quantumWeakened}
                />

                <CbomMetric
                    label="PQC Standardized"
                    value={pqcStandardized}
                />

                <CbomMetric
                    label="High HNDL Exposure"
                    value={hndlHigh}
                />
            </div>

            <CbomInventoryTable
                title="Asset Type Inventory"
                values={assetTypes}
            />

            <CbomInventoryTable
                title="Cryptographic Hardness Assumptions"
                values={assumptions}
            />

            <CbomInventoryTable
                title="Classical Strength"
                values={strengthStatuses}
            />

            <CbomInventoryTable
                title="Quantum Status"
                values={quantumStatuses}
            />

            <CbomInventoryTable
                title="HNDL Exposure"
                values={hndlStatuses}
            />

            {relationships.length > 0 && (

                <div
                    style={{
                        marginTop: "18px"
                    }}
                >
                    <h3>
                        CBOM Relationships
                    </h3>

                    <p
                        style={{
                            marginTop: "-4px",
                            color: "#64748b",
                            lineHeight: 1.5
                        }}
                    >
                        Evidence-based relationships discovered between
                        protocol, key, certificate, store, provider and
                        cryptographic assets.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                            marginBottom: "12px"
                        }}
                    >
                        {Object.entries(
                            relationshipTypes
                        ).map(
                            ([name, count]) => (

                                <span
                                    key={name}
                                    style={{
                                        border: "1px solid #dbe4ee",
                                        borderRadius: "999px",
                                        padding: "5px 9px",
                                        background: "#f8fafc",
                                        fontSize: "11px"
                                    }}
                                >
                                    {pretty(name)} · {count}
                                </span>
                            )
                        )}
                    </div>

                    <div
                        style={{
                            overflowX: "auto"
                        }}
                    >
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse"
                            }}
                        >
                            <thead>
                                <tr>
                                    <CbomTh>Source</CbomTh>
                                    <CbomTh>Relationship</CbomTh>
                                    <CbomTh>Target</CbomTh>
                                    <CbomTh>Confidence</CbomTh>
                                </tr>
                            </thead>

                            <tbody>
                                {relationships.map(
                                    (
                                        relation,
                                        index
                                    ) => (

                                        <tr
                                            key={
                                                [
                                                    relation.sourceAsset,
                                                    relation.relationship,
                                                    relation.targetAsset,
                                                    index
                                                ].join("-")
                                            }
                                        >
                                            <CbomTd>
                                                <strong>
                                                    {display(
                                                        relation.sourceAsset
                                                    )}
                                                </strong>
                                                <div
                                                    style={{
                                                        marginTop: "3px",
                                                        fontSize: "11px",
                                                        color: "#64748b"
                                                    }}
                                                >
                                                    {pretty(
                                                        relation.sourceType
                                                    )}
                                                </div>
                                            </CbomTd>

                                            <CbomTd>
                                                <CbomBadge
                                                    value={
                                                        relation.relationship
                                                    }
                                                />
                                            </CbomTd>

                                            <CbomTd>
                                                <strong>
                                                    {display(
                                                        relation.targetAsset
                                                    )}
                                                </strong>
                                                <div
                                                    style={{
                                                        marginTop: "3px",
                                                        fontSize: "11px",
                                                        color: "#64748b"
                                                    }}
                                                >
                                                    {pretty(
                                                        relation.targetType
                                                    )}
                                                </div>
                                            </CbomTd>

                                            <CbomTd>
                                                {
                                                    relation.confidence == null
                                                        ? "—"
                                                        : `${Math.round(
                                                            relation.confidence * 100
                                                        )}%`
                                                }
                                            </CbomTd>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}


            {cryptoLibraries.length > 0 && (

                <div
                    style={{
                        marginTop: "18px"
                    }}
                >
                    <h3>
                        Cryptographic Libraries & Services
                    </h3>

                    <p
                        style={{
                            marginTop: "-4px",
                            color: "#64748b",
                            lineHeight: 1.5
                        }}
                    >
                        Build dependencies that may contribute cryptographic
                        algorithms, providers, key management or protocol
                        capabilities to this application.
                    </p>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(260px, 1fr))",
                            gap: "10px"
                        }}
                    >
                        {cryptoLibraries.map(
                            (
                                library,
                                index
                            ) => (

                                <div
                                    key={
                                        [
                                            library.algorithm,
                                            library.file,
                                            index
                                        ].join("-")
                                    }
                                    style={{
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "10px",
                                        padding: "12px",
                                        background: "#ffffff"
                                    }}
                                >
                                    <strong>
                                        {display(
                                            library.algorithm
                                        )}
                                    </strong>

                                    <div
                                        style={{
                                            marginTop: "6px",
                                            fontSize: "12px",
                                            color: "#64748b"
                                        }}
                                    >
                                        Source: {display(
                                            library.file
                                        )}
                                        {library.line
                                            ? `:${library.line}`
                                            : ""}
                                    </div>

                                    <div
                                        style={{
                                            marginTop: "8px"
                                        }}
                                    >
                                        <CbomBadge
                                            value={
                                                library.quantumStatus
                                            }
                                        />
                                    </div>

                                    <div
                                        style={{
                                            marginTop: "8px",
                                            fontSize: "12px"
                                        }}
                                    >
                                        {display(
                                            library.recommendedReplacement
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}


            <div
                style={{
                    marginTop: "18px"
                }}
            >
                <h3>
                    Cryptographic Assets
                </h3>

                {assets.length === 0 ? (

                    <div className="empty-state">
                        No CBOM assets were returned by this assessment.
                    </div>

                ) : (

                    <div
                        style={{
                            overflowX: "auto"
                        }}
                    >
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse"
                            }}
                        >
                            <thead>
                                <tr>
                                    <CbomTh>Asset</CbomTh>
                                    <CbomTh>Purpose</CbomTh>
                                    <CbomTh>Occurrences</CbomTh>
                                    <CbomTh>Location</CbomTh>
                                    <CbomTh>Classical Strength</CbomTh>
                                    <CbomTh>Hardness Assumption</CbomTh>
                                    <CbomTh>Quantum Status</CbomTh>
                                    <CbomTh>HNDL</CbomTh>
                                    <CbomTh>Migration Target</CbomTh>
                                    <CbomTh>Priority</CbomTh>
                                </tr>
                            </thead>

                            <tbody>
                                {assets.map(
                                    (
                                        asset,
                                        index
                                    ) => (

                                        <tr
                                            key={
                                                [
                                                    asset.file,
                                                    asset.line,
                                                    asset.algorithm,
                                                    index
                                                ].join("-")
                                            }
                                        >
                                            <CbomTd>
                                                <strong>
                                                    {display(
                                                        asset.algorithm
                                                    )}
                                                </strong>

                                                <div
                                                    style={{
                                                        marginTop: "3px",
                                                        fontSize: "11px",
                                                        color: "#64748b"
                                                    }}
                                                >
                                                    {pretty(
                                                        asset.assetType
                                                    )}
                                                </div>

                                                {asset.keySize != null && (
                                                    <div
                                                        style={{
                                                            marginTop: "3px",
                                                            fontSize: "11px",
                                                            color: "#64748b"
                                                        }}
                                                    >
                                                        Key size: {asset.keySize}
                                                    </div>
                                                )}

                                                {asset.curveName && (
                                                    <div
                                                        style={{
                                                            marginTop: "3px",
                                                            fontSize: "11px",
                                                            color: "#64748b"
                                                        }}
                                                    >
                                                        Curve: {asset.curveName}
                                                    </div>
                                                )}

                                                {asset.keyStoreType && (
                                                    <div
                                                        style={{
                                                            marginTop: "3px",
                                                            fontSize: "11px",
                                                            color: "#64748b"
                                                        }}
                                                    >
                                                        Store: {asset.keyStoreType}
                                                    </div>
                                                )}

                                                {asset.certificateType && (
                                                    <div
                                                        style={{
                                                            marginTop: "3px",
                                                            fontSize: "11px",
                                                            color: "#64748b"
                                                        }}
                                                    >
                                                        Certificate: {asset.certificateType}
                                                    </div>
                                                )}

                                                {asset.protocolVersion && (
                                                    <div
                                                        style={{
                                                            marginTop: "3px",
                                                            fontSize: "11px",
                                                            color: "#64748b"
                                                        }}
                                                    >
                                                        Protocol: {asset.protocolVersion}
                                                    </div>
                                                )}

                                                {asset.provider && (
                                                    <div
                                                        style={{
                                                            marginTop: "3px",
                                                            fontSize: "11px",
                                                            color: "#64748b"
                                                        }}
                                                    >
                                                        Provider: {asset.provider}
                                                    </div>
                                                )}
                                            </CbomTd>

                                            <CbomTd>
                                                {pretty(
                                                    asset.purpose
                                                )}
                                            </CbomTd>

                                            <CbomTd>
                                                <strong>
                                                    {asset.occurrenceCount ?? 1}
                                                </strong>
                                                <div
                                                    style={{
                                                        marginTop: "3px",
                                                        fontSize: "11px",
                                                        color: "#64748b"
                                                    }}
                                                >
                                                    {asset.affectedFileCount ?? 1} file(s)
                                                </div>
                                            </CbomTd>

                                            <CbomTd>
                                                <div
                                                    style={{
                                                        maxWidth: "240px",
                                                        wordBreak: "break-word"
                                                    }}
                                                >
                                                    {display(
                                                        asset.file
                                                    )}
                                                    {asset.line
                                                        ? `:${asset.line}`
                                                        : ""}
                                                </div>

                                                {(asset.locations?.length ?? 0) > 1 && (
                                                    <details
                                                        style={{
                                                            marginTop: "5px"
                                                        }}
                                                    >
                                                        <summary
                                                            style={{
                                                                cursor: "pointer",
                                                                fontSize: "11px",
                                                                color: "#475569"
                                                            }}
                                                        >
                                                            View all locations
                                                        </summary>

                                                        <div
                                                            style={{
                                                                marginTop: "4px",
                                                                fontSize: "11px",
                                                                color: "#64748b"
                                                            }}
                                                        >
                                                            {asset.locations?.map(
                                                                location => (
                                                                    <div key={location}>
                                                                        {location}
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </details>
                                                )}
                                            </CbomTd>

                                            <CbomTd>
                                                <CbomBadge
                                                    value={
                                                        asset.classicalStrengthStatus
                                                    }
                                                />

                                                {asset.strengthReason && (
                                                    <div
                                                        style={{
                                                            marginTop: "5px",
                                                            maxWidth: "260px",
                                                            fontSize: "11px",
                                                            color: "#64748b",
                                                            lineHeight: 1.4
                                                        }}
                                                    >
                                                        {asset.strengthReason}
                                                    </div>
                                                )}
                                            </CbomTd>

                                            <CbomTd>
                                                {pretty(
                                                    asset.hardnessAssumption
                                                )}
                                            </CbomTd>

                                            <CbomTd>
                                                <CbomBadge
                                                    value={
                                                        asset.quantumStatus
                                                    }
                                                />
                                            </CbomTd>

                                            <CbomTd>
                                                <CbomBadge
                                                    value={
                                                        asset.hndlExposure
                                                    }
                                                />
                                            </CbomTd>

                                            <CbomTd>
                                                {display(
                                                    asset.recommendedReplacement
                                                )}
                                            </CbomTd>

                                            <CbomTd>
                                                <CbomBadge
                                                    value={
                                                        asset.migrationPriority
                                                    }
                                                />
                                            </CbomTd>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
}

function CbomMetric({
    label,
    value
}: {
    label: string;
    value: number;
}) {

    return (
        <div
            style={{
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "14px",
                background: "#ffffff"
            }}
        >
            <div
                style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: ".04em"
                }}
            >
                {label}
            </div>

            <div
                style={{
                    marginTop: "6px",
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "#0f3d63"
                }}
            >
                {value}
            </div>
        </div>
    );
}

function CbomInventoryTable({
    title,
    values
}: {
    title: string;
    values: Record<string, number>;
}) {

    const entries =
        Object.entries(values);

    if (entries.length === 0) {
        return null;
    }

    return (
        <div
            style={{
                marginTop: "16px"
            }}
        >
            <h3>
                {title}
            </h3>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "8px"
                }}
            >
                {entries.map(
                    ([name, count]) => (

                        <div
                            key={name}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "12px",
                                border: "1px solid #e2e8f0",
                                borderRadius: "8px",
                                padding: "9px 11px",
                                background: "#f8fafc"
                            }}
                        >
                            <span>
                                {pretty(name)}
                            </span>

                            <strong>
                                {count}
                            </strong>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

function CbomBadge({
    value
}: {
    value?: string | null;
}) {

    const normalized =
        value?.toUpperCase()
        ?? "UNKNOWN";

    const style =
        badgeStyle(
            normalized
        );

    return (
        <span
            style={{
                display: "inline-block",
                borderRadius: "999px",
                padding: "4px 8px",
                fontSize: "10px",
                fontWeight: 800,
                ...style
            }}
        >
            {pretty(
                normalized
            )}
        </span>
    );
}

function CbomTh({
    children
}: {
    children: ReactNode;
}) {

    return (
        <th
            style={{
                borderBottom: "2px solid #dbe4ee",
                padding: "9px 8px",
                textAlign: "left",
                verticalAlign: "top",
                fontSize: "11px",
                color: "#475569",
                background: "#f8fafc"
            }}
        >
            {children}
        </th>
    );
}

function CbomTd({
    children
}: {
    children: ReactNode;
}) {

    return (
        <td
            style={{
                borderBottom: "1px solid #e2e8f0",
                padding: "9px 8px",
                verticalAlign: "top",
                fontSize: "12px"
            }}
        >
            {children}
        </td>
    );
}

function badgeStyle(
    value: string
): CSSProperties {

    if (
        value.includes("CRITICAL")
        ||
        value.includes("VULNERABLE")
        ||
        value.includes("IMMEDIATE")
    ) {
        return {
            background: "#fee2e2",
            color: "#991b1b"
        };
    }

    if (
        value.includes("HIGH")
        ||
        value.includes("WEAKENED")
    ) {
        return {
            background: "#ffedd5",
            color: "#9a3412"
        };
    }

    if (
        value.includes("STANDARDIZED")
        ||
        value.includes("RESISTANT")
        ||
        value.includes("LOW")
    ) {
        return {
            background: "#dcfce7",
            color: "#166534"
        };
    }

    if (
        value.includes("MEDIUM")
        ||
        value.includes("REVIEW")
    ) {
        return {
            background: "#fef3c7",
            color: "#92400e"
        };
    }

    return {
        background: "#e2e8f0",
        color: "#475569"
    };
}

function pretty(
    value?: string | null
): string {

    if (
        value == null
        ||
        value.trim().length === 0
    ) {
        return "—";
    }

    return value
        .replace(
            /_/g,
            " "
        )
        .toLowerCase()
        .replace(
            /\b\w/g,
            match =>
                match.toUpperCase()
        );
}

function display(
    value?: string | null
): string {

    return value == null
        || value.trim().length === 0
        ? "—"
        : value;
}


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

            <CbomEnterpriseOverview analysis={analysis} />

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