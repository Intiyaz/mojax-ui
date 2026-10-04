export default function PatternMatchingPackages({ packages = [] }) {
    if (packages.length === 0) {
        return (<section className="modernization-section">

        <div className="section-heading">

          <div>

            <span className="eyebrow">
              PATTERN MATCHING
            </span>

            <h3>
              Pattern Matching Modernization
            </h3>

          </div>

        </div>


        <div className="modernization-empty">

          No classic instanceof + cast
          modernization opportunities were identified.

        </div>

      </section>);
    }
    const totalOpportunities = packages.reduce((sum, item) => sum + item.opportunityCount, 0);
    return (<section className="modernization-section">

      <div className="section-heading">

        <div>

          <span className="eyebrow">
            PATTERN MATCHING
          </span>

          <h3>
            Pattern Matching Modernization
          </h3>

          <p className="section-description">

            Older instanceof checks followed by explicit
            casts can often be simplified using Java
            pattern matching.

          </p>

        </div>


        <span className="modernization-count">

          {totalOpportunities}
          {" "}
          opportunities

        </span>

      </div>


      <div className="pattern-package-table-wrapper">

        <table className="pattern-package-table">

          <thead>

            <tr>

              <th>
                Package
              </th>

              <th>
                Files
              </th>

              <th>
                Opportunities
              </th>

              <th>
                Confidence
              </th>

              <th>
                Example Files
              </th>

            </tr>

          </thead>


          <tbody>

            {packages.map(item => (<tr key={item.packageName}>

                  <td>

                    <code className="pattern-package-name">
                      {item.packageName}
                    </code>

                  </td>


                  <td>
                    {item.fileCount}
                  </td>


                  <td>

                    <strong className="pattern-opportunity-count">
                      {item.opportunityCount}
                    </strong>

                  </td>


                  <td>

                    <ConfidenceBadge value={item.averageConfidence}/>

                  </td>


                  <td>

                    <div className="pattern-file-list">

                      {item.sampleFiles
                ?.slice(0, 5)
                .map(file => (<span key={file} className="pattern-sample-file">

                              {shortFileName(file)}

                            </span>))}

                    </div>

                  </td>

                </tr>))}

          </tbody>

        </table>

      </div>


      <PatternMatchingExample />


      <div className="pattern-package-note">

        MoJaX reports these findings at package level
        to keep the modernization assessment concise.
        Source-level details can be exposed later through
        a drill-down view.

      </div>

    </section>);
}
function PatternMatchingExample() {
    return (<div className="pattern-example">

      <div className="pattern-example-header">

        <span className="eyebrow">
          EXAMPLE MODERNIZATION
        </span>

        <h4>
          instanceof Pattern Matching
        </h4>

      </div>


      <div className="pattern-example-grid">

        <div className="pattern-code-card">

          <span className="pattern-code-label">
            Before
          </span>

          <pre>
        {`if (obj instanceof Customer) {
    Customer customer = (Customer) obj;
    process(customer);
}`}
          </pre>

        </div>


        <div className="pattern-code-arrow">
          →
        </div>


        <div className="pattern-code-card improved">

          <span className="pattern-code-label">
            Java 17+
          </span>

          <pre>
        {`if (obj instanceof Customer customer) {
    process(customer);
}`}
          </pre>

        </div>

      </div>

    </div>);
}
function ConfidenceBadge({ value }) {
    const percentage = Math.round((value ?? 0)
        * 100);
    let level = "medium";
    if (percentage >= 90) {
        level =
            "high";
    }
    else if (percentage < 80) {
        level =
            "low";
    }
    return (<span className={`pattern-confidence ${level}`}>

      {percentage}%

    </span>);
}
function shortFileName(file) {
    if (!file) {
        return "";
    }
    const normalized = file.replaceAll("\\", "/");
    const parts = normalized.split("/");
    return parts[parts.length - 1];
}
