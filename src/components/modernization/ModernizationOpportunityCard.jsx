export default function ModernizationOpportunityCard({ opportunity }) {
    const confidence = Math.round((opportunity.confidence ?? 0)
        * 100);
    return (<article className={`modernization-opportunity-card ${opportunity.classification
            .toLowerCase()}`}>

      <div className="modernization-opportunity-header">

        <div>

          <div className="modernization-opportunity-labels">

            <span className={`modernization-classification ${opportunity.classification
            .toLowerCase()}`}>

              {formatName(opportunity.classification)}

            </span>


            <span className="modernization-type">

              {formatType(opportunity.type)}

            </span>

          </div>


          <h4>
            {opportunity.title}
          </h4>

        </div>


        <div className="modernization-confidence">

          <strong>
            {confidence}%
          </strong>

          <span>
            Confidence
          </span>

        </div>

      </div>


      <div className="modernization-source">

        {opportunity.file}

        {opportunity.line
            ? `:${opportunity.line}`
            : ""}

      </div>


      {opportunity.reasons &&
            opportunity.reasons.length > 0 && (<div className="modernization-card-section">

          <span className="modernization-card-label">
            Why MoJaX identified this
          </span>


          <ul className="modernization-reasons">

            {opportunity.reasons.map((reason, index) => (<li key={index}>
                  {reason}
                </li>))}

          </ul>

        </div>)}


      {opportunity.evidence && (<div className="modernization-card-section">

          <span className="modernization-card-label">
            Evidence
          </span>

          <div className="modernization-evidence">
            {opportunity.evidence}
          </div>

        </div>)}


      {opportunity.recommendation && (<div className="modernization-card-section">

          <span className="modernization-card-label">
            Recommendation
          </span>

          <div className="modernization-recommendation">
            {opportunity.recommendation}
          </div>

        </div>)}

    </article>);
}
function formatType(value) {
    switch (value) {
        case "RECORD_CANDIDATE":
            return "Java Record";
        case "SEALED_CLASS_CANDIDATE":
            return "Sealed Class";
        case "PATTERN_MATCHING":
            return "Pattern Matching";
        case "SWITCH_EXPRESSION":
            return "Switch Expression";
        case "TEXT_BLOCK":
            return "Text Block";
        case "DATE_TIME_API":
            return "java.time";
        case "VIRTUAL_THREAD_CANDIDATE":
            return "Virtual Threads";
        case "THREAD_LOCAL_REVIEW":
            return "ThreadLocal Review";
        default:
            return formatName(value);
    }
}
function formatName(value) {
    if (!value) {
        return "Unknown";
    }
    return value
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, value => value.toUpperCase());
}
