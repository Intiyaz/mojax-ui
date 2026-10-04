import type {
  TextBlockPackage
} from "../../types";


type Props = {
  packages?: TextBlockPackage[];
};


export default function TextBlockPackages({
  packages = []
}: Props) {

  if (packages.length === 0) {

    return (
      <section className="modernization-section">

        <div className="section-heading">

          <div>

            <span className="eyebrow">
              TEXT BLOCKS
            </span>

            <h3>
              Text Block Modernization
            </h3>

          </div>

        </div>


        <div className="modernization-empty">

          No multiline string concatenations suitable
          for Java text blocks were identified.

        </div>

      </section>
    );
  }


  const totalOpportunities =
    packages.reduce(
      (sum, item) =>
        sum + item.opportunityCount,
      0
    );


  return (
    <section className="modernization-section">

      <div className="section-heading">

        <div>

          <span className="eyebrow">
            TEXT BLOCKS
          </span>

          <h3>
            Text Block Modernization
          </h3>

          <p className="section-description">

            Multiline string concatenations that may
            be simplified using Java text blocks.

          </p>

        </div>


        <span className="modernization-count">

          {totalOpportunities}
          {" "}
          opportunities

        </span>

      </div>


      <div className="textblock-package-table-wrapper">

        <table className="textblock-package-table">

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

            {packages.map(
              item => (

                <tr key={item.packageName}>

                  <td>

                    <code className="textblock-package-name">
                      {item.packageName}
                    </code>

                  </td>


                  <td>
                    {item.fileCount}
                  </td>


                  <td>

                    <strong className="textblock-opportunity-count">
                      {item.opportunityCount}
                    </strong>

                  </td>


                  <td>

                    <ConfidenceBadge
                      value={
                        item.averageConfidence
                      }
                    />

                  </td>


                  <td>

                    <div className="textblock-file-list">

                      {item.sampleFiles
                        ?.slice(0, 5)
                        .map(
                          file => (

                            <span
                              key={file}
                              className="textblock-sample-file"
                            >

                              {shortFileName(file)}

                            </span>

                          )
                        )}

                    </div>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>


      <TextBlockExample />


      <div className="textblock-package-note">

        MoJaX reports text-block modernization at
        package level to keep the assessment concise.
        Detailed source locations can later be exposed
        through a drill-down view.

      </div>

    </section>
  );
}


function TextBlockExample() {

  return (
    <div className="textblock-example">

      <div className="textblock-example-header">

        <span className="eyebrow">
          EXAMPLE MODERNIZATION
        </span>

        <h4>
          String Concatenation → Java Text Block
        </h4>

      </div>


      <div className="textblock-example-grid">

        <div className="textblock-code-card">

          <span className="textblock-code-label">
            Before
          </span>

          <pre>
{`String sql =
    "SELECT id, name " +
    "FROM customer " +
    "WHERE status = 'ACTIVE' " +
    "ORDER BY name";`}
          </pre>

        </div>


        <div className="textblock-code-arrow">
          →
        </div>


        <div className="textblock-code-card improved">

          <span className="textblock-code-label">
            Modern Java
          </span>

          <pre>
{`String sql = """
    SELECT id, name
    FROM customer
    WHERE status = 'ACTIVE'
    ORDER BY name
    """;`}
          </pre>

        </div>

      </div>

    </div>
  );
}


function ConfidenceBadge({
  value
}: {
  value: number;
}) {

  const percentage =
    Math.round(
      (value ?? 0) * 100
    );


  let level =
    "medium";


  if (percentage >= 90) {

    level =
      "high";

  } else if (percentage < 80) {

    level =
      "low";
  }


  return (
    <span
      className={
        `textblock-confidence ${level}`
      }
    >

      {percentage}%

    </span>
  );
}


function shortFileName(
  file: string
) {

  if (!file) {
    return "";
  }


  const normalized =
    file.replaceAll(
      "\\",
      "/"
    );


  const parts =
    normalized.split("/");


  return parts[
    parts.length - 1
  ];
}