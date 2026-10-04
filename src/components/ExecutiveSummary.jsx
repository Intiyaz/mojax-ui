export default function ExecutiveSummary({ summary }) {
    if (!summary ||
        summary.trim().length === 0) {
        return null;
    }
    return (<section className="result-section">

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

                <div className="summary-icon">
                    AI
                </div>

                <p>
                    {summary}
                </p>

            </div>

        </section>);
}
