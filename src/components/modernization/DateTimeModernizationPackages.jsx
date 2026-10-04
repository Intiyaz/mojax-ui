export default function DateTimeModernizationPackages({ packages = [] }) {
    if (packages.length === 0) {
        return (<section className="modernization-section">

        <div className="section-heading">

          <div>

            <span className="eyebrow">
              JAVA.TIME
            </span>

            <h3>
              Date / Time Modernization
            </h3>

          </div>

        </div>


        <div className="modernization-empty">

          No legacy Java date/time modernization
          opportunities were identified.

        </div>

      </section>);
    }
    const totalOpportunities = packages.reduce((sum, item) => sum + item.opportunityCount, 0);
    return (<section className="modernization-section">

      <div className="section-heading">

        <div>

          <span className="eyebrow">
            JAVA.TIME
          </span>

          <h3>
            Date / Time Modernization
          </h3>

          <p className="section-description">

            Legacy date and time APIs that may be
            modernized using the java.time API.

          </p>

        </div>


        <span className="modernization-count">

          {totalOpportunities}
          {" "}
          opportunities

        </span>

      </div>


      <div className="datetime-package-table-wrapper">

        <table className="datetime-package-table">

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
                Legacy APIs
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

                    <code className="datetime-package-name">
                      {item.packageName}
                    </code>

                  </td>


                  <td>
                    {item.fileCount}
                  </td>


                  <td>

                    <strong className="datetime-opportunity-count">
                      {item.opportunityCount}
                    </strong>

                  </td>


                  <td>

                    <div className="datetime-api-list">

                      {item.legacyApis
                ?.slice(0, 6)
                .map(api => (<span key={api} className="datetime-api-badge">

                              {api}

                            </span>))}

                    </div>

                  </td>


                  <td>

                    <ConfidenceBadge value={item.averageConfidence}/>

                  </td>


                  <td>

                    <div className="datetime-file-list">

                      {item.sampleFiles
                ?.slice(0, 5)
                .map(file => (<span key={file} className="datetime-sample-file">

                              {shortFileName(file)}

                            </span>))}

                    </div>

                  </td>

                </tr>))}

          </tbody>

        </table>

      </div>


      <DateTimeModernizationExamples />


      <div className="datetime-package-note">

        MoJaX reports legacy date/time modernization
        at package level. The correct replacement depends
        on whether a value represents a machine timestamp,
        calendar date, local date-time, or zoned date-time.

      </div>

    </section>);
}
function DateTimeModernizationExamples() {
    return (<div className="datetime-example">

      <div className="datetime-example-header">

        <span className="eyebrow">
          EXAMPLE MODERNIZATION
        </span>

        <h4>
          Legacy Date/Time APIs → java.time
        </h4>

      </div>


      <div className="datetime-example-grid">

        <div className="datetime-code-card">

          <span className="datetime-code-label">
            Before
          </span>

          <pre>
        {`SimpleDateFormat formatter =
    new SimpleDateFormat("yyyy-MM-dd");

Date date =
    formatter.parse(value);`}
          </pre>

        </div>


        <div className="datetime-code-arrow">
          →
        </div>


        <div className="datetime-code-card improved">

          <span className="datetime-code-label">
            Modern Java
          </span>

          <pre>
        {`DateTimeFormatter formatter =
    DateTimeFormatter.ofPattern("yyyy-MM-dd");

LocalDate date =
    LocalDate.parse(value, formatter);`}
          </pre>

        </div>

      </div>


      <div className="datetime-mapping-grid">

        <ApiMapping legacy="java.util.Date" modern="Instant / LocalDate / LocalDateTime"/>


        <ApiMapping legacy="Calendar" modern="ZonedDateTime / LocalDateTime"/>


        <ApiMapping legacy="SimpleDateFormat" modern="DateTimeFormatter"/>


        <ApiMapping legacy="java.sql.Date" modern="LocalDate"/>


        <ApiMapping legacy="java.sql.Time" modern="LocalTime"/>


        <ApiMapping legacy="java.sql.Timestamp" modern="Instant / LocalDateTime"/>

      </div>

    </div>);
}
function ApiMapping({ legacy, modern }) {
    return (<div className="datetime-mapping">

      <code>
        {legacy}
      </code>

      <span className="datetime-mapping-arrow">
        →
      </span>

      <strong>
        {modern}
      </strong>

    </div>);
}
function ConfidenceBadge({ value }) {
    const percentage = Math.round((value ?? 0) * 100);
    let level = "medium";
    if (percentage >= 90) {
        level =
            "high";
    }
    else if (percentage < 80) {
        level =
            "low";
    }
    return (<span className={`datetime-confidence ${level}`}>

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
