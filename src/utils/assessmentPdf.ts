import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export async function downloadAssessmentPdf(
    elementId: string,
    projectName: string,
    assessmentType?: string
): Promise<void> {

    const element =
        document.getElementById(elementId);

    if (!element) {
        throw new Error(
            `Assessment element '${elementId}' was not found.`
        );
    }


    /*
     * Backward compatibility:
     *
     * Old calls:
     * downloadAssessmentPdf(
     *   "assessment-report",
     *   "assessment-report"
     * )
     *
     * New calls:
     * downloadAssessmentPdf(
     *   "assessment-report",
     *   projectName,
     *   assessment.agentCode
     * )
     */
    const fileName =
        assessmentType

        ? buildAssessmentFileName(
            projectName,
            assessmentType
        )

        : projectName;


    /*
     * Add temporary export class.
     * This lets CSS optimize the report specifically for PDF.
     */
    element.classList.add("pdf-export-mode");

    try {

        const canvas =
            await html2canvas(
                element,
                {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: "#ffffff",
                    logging: false,

                    /*
                     * Capture complete content even when
                     * browser viewport is smaller.
                     */
                    windowWidth:
                        element.scrollWidth,

                    windowHeight:
                        element.scrollHeight
                }
            );


        /*
         * A4 portrait
         */
        const pdf =
            new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4"
            });


        const pageWidth =
            pdf.internal.pageSize.getWidth();

        const pageHeight =
            pdf.internal.pageSize.getHeight();


        /*
         * PDF margins.
         */
        const margin = 8;

        const usableWidth =
            pageWidth - margin * 2;

        const usableHeight =
            pageHeight - margin * 2;


        /*
         * Scale browser screenshot to A4 width.
         */
        const imageWidth =
            usableWidth;


        /*
         * Height represented by one PDF page.
         */
        const sourcePageHeight =
            canvas.width *
            usableHeight /
            imageWidth;


        let sourceY = 0;

        let pageNumber = 1;


        while (
            sourceY < canvas.height
        ) {

            const remainingHeight =
                canvas.height - sourceY;


            const sliceHeight =
                Math.min(
                    sourcePageHeight,
                    remainingHeight
                );


            /*
             * Create one canvas for the current page.
             */
            const pageCanvas =
                document.createElement(
                    "canvas"
                );


            pageCanvas.width =
                canvas.width;

            pageCanvas.height =
                sliceHeight;


            const context =
                pageCanvas.getContext(
                    "2d"
                );


            if (!context) {

                throw new Error(
                    "Unable to create PDF rendering context."
                );
            }


            context.fillStyle =
                "#ffffff";

            context.fillRect(
                0,
                0,
                pageCanvas.width,
                pageCanvas.height
            );


            context.drawImage(

                canvas,

                0,
                sourceY,
                canvas.width,
                sliceHeight,

                0,
                0,
                canvas.width,
                sliceHeight
            );


            const pageImage =
                pageCanvas.toDataURL(
                    "image/png",
                    1.0
                );


            const renderedHeight =
                sliceHeight *
                imageWidth /
                canvas.width;


            if (
                pageNumber > 1
            ) {

                pdf.addPage();
            }


            pdf.addImage(
                pageImage,
                "PNG",
                margin,
                margin,
                imageWidth,
                renderedHeight,
                undefined,
                "FAST"
            );


            /*
             * Footer.
             */
            pdf.setFontSize(8);

            pdf.setTextColor(
                120,
                130,
                145
            );


            pdf.text(
                `MoJaX Assessment Report  |  Page ${pageNumber}`,
                pageWidth / 2,
                pageHeight - 3,
                {
                    align: "center"
                }
            );


            sourceY +=
                sliceHeight;

            pageNumber++;
        }


        pdf.save(
            normalizeFileName(
                fileName
            )
        );

    } finally {

        element.classList.remove(
            "pdf-export-mode"
        );
    }
}


function buildAssessmentFileName(
    projectName: string,
    assessmentType: string
): string {
    //alert(""+projectName+"-"+assessmentType);
    const safeProjectName =
        projectName?.trim()
        || "Project";


    const safeAssessmentType =
        assessmentType?.trim()
            .replace(/_/g, "-")
        || "Assessment";


    return `${safeProjectName}-${safeAssessmentType}`;
}


function normalizeFileName(
    fileName: string
): string {

    const safeName =
        (fileName || "MoJaX-Assessment")
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-zA-Z0-9-_]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");


    return safeName
        .toLowerCase()
        .endsWith(".pdf")

        ? safeName

        : `${safeName}.pdf`;
}
