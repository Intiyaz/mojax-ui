import {
    getAccessToken
} from "../services/apiFetch";


const API_BASE_URL = "http://localhost:8080";

export async function downloadAssessmentPdf(
    assessment
) {

    if (
        !assessment?.id
    ) {

        throw new Error(
            "Assessment ID is required to generate the PDF."
        );
    }


    const token =
        getAccessToken();


    if (!token) {

        throw new Error(
            "Your session has expired. Please sign in again."
        );
    }


    const response =
        await fetch(
            `${API_BASE_URL}/api/v1/assessments/${assessment.id}/report/pdf`,
            {
                method:
                    "POST",

                headers: {

                    "Authorization":
                        `Bearer ${token}`,

                    "Content-Type":
                        "application/json",

                    "Accept":
                        "application/pdf"
                },

                body:
                    JSON.stringify(
                        assessment
                    )
            }
        );


    if (!response.ok) {

        let message =
            `Unable to generate PDF (${response.status}).`;


        try {

            const errorText =
                await response.text();


            if (
                errorText
                &&
                errorText.trim()
            ) {

                message =
                    errorText;
            }

        } catch {

            // Keep fallback error message.

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
        buildFallbackFileName(
            assessment.agentCode
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


/*
 * =============================================================
 * Extract filename returned by backend
 * =============================================================
 */

function responseFileName(
    contentDisposition
) {

    if (!contentDisposition) {
        return null;
    }


    /*
     * RFC 5987 format:
     *
     * filename*=UTF-8''some-file.pdf
     */

    const utf8 =
        contentDisposition.match(
            /filename\*=UTF-8''([^;]+)/i
        );


    if (
        utf8
        &&
        utf8[1]
    ) {

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

            // Continue with normal filename parser.

        }
    }


    /*
     * Standard format:
     *
     * filename="some-file.pdf"
     */

    const regular =
        contentDisposition.match(
            /filename="?([^";]+)"?/i
        );


    return regular?.[1]?.trim()
        || null;
}


/*
 * =============================================================
 * Browser-side fallback filename
 * =============================================================
 */

function buildFallbackFileName(
    agentCode
) {

    const agent =
        (
            agentCode
            ||
            "Assessment"
        )
            .replace(
                /_/g,
                "-"
            );


    return `MoJaX-${agent}.pdf`;
}