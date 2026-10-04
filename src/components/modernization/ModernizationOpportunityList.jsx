import ModernizationOpportunityCard from "./ModernizationOpportunityCard";
export default function ModernizationOpportunityList({ opportunities = [] }) {
    if (opportunities.length === 0) {
        return (<section className="modernization-section">

        <div className="section-heading">

          <div>

            <span className="eyebrow">
              SOURCE ANALYSIS
            </span>

            <h3>
              Modernization Opportunities
            </h3>

          </div>

        </div>


        <div className="modernization-empty">

          No Java language modernization
          opportunities were identified by
          the currently enabled analyzers.

        </div>

      </section>);
    }
    const sorted = [...opportunities]
        .sort((a, b) => priority(a.classification)
        -
            priority(b.classification));
    return (<section className="modernization-section">

      <div className="section-heading">

        <div>

          <span className="eyebrow">
            SOURCE ANALYSIS
          </span>

          <h3>
            Modernization Opportunities
          </h3>

        </div>


        <span className="modernization-count">

          {opportunities.length}
          {" "}
          opportunities

        </span>

      </div>


      <div className="modernization-opportunity-list">

        {sorted.map((opportunity, index) => (<ModernizationOpportunityCard key={`${opportunity.file}-${opportunity.line}-${opportunity.type}-${index}`} opportunity={opportunity}/>))}

      </div>

    </section>);
}
function priority(classification) {
    switch (classification) {
        case "BLOCKER":
            return 1;
        case "REQUIRED":
            return 2;
        case "RECOMMENDED":
            return 3;
        case "REVIEW":
            return 4;
        case "OPPORTUNITY":
            return 5;
        default:
            return 10;
    }
}
