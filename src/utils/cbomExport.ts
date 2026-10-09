import type {
    Assessment
} from "../types";

import {
    getAccessToken
} from "../services/apiFetch";


const API_BASE_URL = "https://engineeringai-java-modernization.victoriouscliff-8a4c40e2.southindia.azurecontainerapps.io";
//const API_BASE_URL = "http://localhost:8080";

export type CbomExportFormat =
    | "json"
    | "csv"
    | "cyclonedx";


export async function downloadCbom(
    assessment: Assessment,
    format: CbomExportFormat
): Promise<void> {

    if (!assessment?.id) {
        throw new Error(
            "Assessment ID is required to export the CBOM."
        );
    }

    if (
        assessment.agentCode !==
        "PQC_MIGRATION"
    ) {
        throw new Error(
            "CBOM export is available only for PQC assessments."
        );
    }

    if (!assessment.pqcAnalysis) {
        throw new Error(
            "Detailed PQC analysis is required to export the CBOM."
        );
    }


    const token =
        getAccessToken();

    if (!token) {
        throw new Error(
            "Your session has expired. Please sign in again."
        );
    }


    const accept =
        format === "csv"
            ? "text/csv"
            : format === "cyclonedx"
                ? "application/vnd.cyclonedx+json"
                : "application/json";


    const response =
        await fetch(
            `${API_BASE_URL}/api/v1/assessments/${assessment.id}/cbom/${format}`,
            {
                method: "POST",

                headers: {
                    "Authorization":
                        `Bearer ${token}`,

                    "Content-Type":
                        "application/json",

                    "Accept":
                        accept
                },

                body:
                    JSON.stringify(
                        assessment
                    )
            }
        );


    if (!response.ok) {

        let message =
            `Unable to export CBOM (${response.status}).`;

        try {

            const errorText =
                await response.text();

            if (
                errorText
                &&
                errorText.trim()
            ) {
                message = errorText;
            }

        } catch {
            // Keep fallback message.
        }

        throw new Error(
            message
        );
    }


    const blob =
        await response.blob();

    const fileName =
        responseFileName(
            response.headers.get(
                "Content-Disposition"
            )
        )
        ||
        fallbackFileName(
            format
        );

    const objectUrl =
        URL.createObjectURL(
            blob
        );

    try {

        const link =
            document.createElement(
                "a"
            );

        link.href =
            objectUrl;

        link.download =
            fileName;

        document.body.appendChild(
            link
        );

        link.click();

        link.remove();

    } finally {

        URL.revokeObjectURL(
            objectUrl
        );
    }
}


function responseFileName(
    contentDisposition: string | null
): string | null {

    if (!contentDisposition) {
        return null;
    }

    const utf8 =
        contentDisposition.match(
            /filename\*=UTF-8''([^;]+)/i
        );

    if (utf8?.[1]) {

        try {

            return decodeURIComponent(
                utf8[1]
                    .replace(
                        /["']/g,
                        ""
                    )
                    .trim()
            );

        } catch {
            // Fall through.
        }
    }

    const regular =
        contentDisposition.match(
            /filename="?([^";]+)"?/i
        );

    return regular?.[1]?.trim()
        || null;
}


function fallbackFileName(
    format: CbomExportFormat
): string {

    switch (format) {
        case "csv":
            return "MoJaX-CBOM.csv";

        case "cyclonedx":
            return "MoJaX-CBOM.cdx.json";

        default:
            return "MoJaX-CBOM.json";
    }
}
