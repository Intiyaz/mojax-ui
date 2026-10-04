export default function RecordCandidatePackages({ packages = [] }) {
    if (packages.length === 0) {
        return (<section className="modernization-section">

        <div className="section-heading">

          <div>

            <span className="eyebrow">
              JAVA RECORDS
            </span>

            <h3>
              Record Candidate Packages
            </h3>

          </div>

        </div>


        <div className="modernization-empty">

          No strong Java record candidate
          packages were identified.

        </div>

      </section>);
    }
    return (<section className="modernization-section">

      <div className="section-heading">

        <div>

          <span className="eyebrow">
            JAVA RECORDS
          </span>

          <h3>
            Record Candidate Packages
          </h3>

          <p className="section-description">
            Packages containing immutable data-carrier
            classes that may be suitable for Java records.
          </p>

        </div>


        <span className="modernization-count">
          {packages.length} packages
        </span>

      </div>


      <div className="record-package-table-wrapper">

        <table className="record-package-table">

          <thead>

            <tr>

              <th>
                Package
              </th>

              <th>
                Bean Classes
              </th>

              <th>
                Record Candidates
              </th>

              <th>
                Confidence
              </th>

              <th>
                Examples
              </th>

            </tr>

          </thead>


          <tbody>

            {packages.map(item => (<tr key={item.packageName}>

                  <td>

                    <code className="record-package-name">
                      {item.packageName}
                    </code>

                  </td>


                  <td>
                    {item.beanClassCount}
                  </td>


                  <td>

                    <strong className="record-candidate-count">
                      {item.recordCandidateCount}
                    </strong>

                  </td>


                  <td>

                    <ConfidenceBadge value={item.averageConfidence}/>

                  </td>


                  <td>

                    <div className="record-sample-list">

                      {item.sampleClasses
                ?.slice(0, 5)
                .map(className => (<span key={className} className="record-sample-class">

                              {className}

                            </span>))}

                    </div>

                  </td>

                </tr>))}

          </tbody>

        </table>

      </div>


      <div className="record-package-note">

        MoJaX reports record modernization at package
        level to keep the assessment concise. Individual
        classes can be exposed later through a dedicated
        drill-down view.

      </div>

    </section>);
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
    return (<span className={`record-confidence ${level}`}>

      {percentage}%

    </span>);
}
