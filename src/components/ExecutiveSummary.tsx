export default function ExecutiveSummary({
    summary
}: {
    summary: string;
}) {

    if (!summary ||
        summary.trim().length === 0) {

        return null;
    }

    return (
        <section className="result-section">

            <div className="result-section-header">

                <div>

                    <span className="eyebrow">
                        EXECUTIVE ANALYSIS
                    </span>

                    <h3>
                        Assessment Summary
                    </h3>

                </div>

            </div>

            <div className="summary">

                <p>
                    {summary}
                </p>

            </div>

        </section>
    );
}