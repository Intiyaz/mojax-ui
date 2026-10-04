export default function RecommendationsPanel({
    recommendations
}: {
    recommendations: string[];
}) {

    if (!recommendations || recommendations.length === 0) {
        return null;
    }

    return (
        <section className="result-section">

            <div className="result-section-header">

                <div>
                    <span className="eyebrow">
                        MIGRATION ROADMAP
                    </span>

                    <h3>
                        Recommendations
                    </h3>

                    <p className="section-description">
                        Recommended engineering actions based
                        on the modernization assessment.
                    </p>
                </div>

                <span className="finding-count">
                    {recommendations.length}
                </span>

            </div>

            <div className="recommendations">

                {recommendations.map(
                    (recommendation, index) => (

                        <div
                            className="recommendation"
                            key={index}
                        >

                            <span className="recommendation-number">
                                {index + 1}
                            </span>

                            <div className="recommendation-content">

                                <strong>
                                    Action {index + 1}
                                </strong>

                                <p>
                                    {recommendation}
                                </p>

                            </div>

                        </div>

                    )
                )}

            </div>

        </section>
    );
}