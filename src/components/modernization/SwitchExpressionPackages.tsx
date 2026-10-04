import type {
  SwitchExpressionPackage
} from "../../types";


type Props = {
  packages?: SwitchExpressionPackage[];
};


export default function SwitchExpressionPackages({
  packages = []
}: Props) {

  if (packages.length === 0) {

    return (
      <section className="modernization-section">

        <div className="section-heading">

          <div>

            <span className="eyebrow">
              SWITCH EXPRESSIONS
            </span>

            <h3>
              Switch Expression Modernization
            </h3>

          </div>

        </div>


        <div className="modernization-empty">

          No traditional switch statements suitable
          for switch-expression modernization were identified.

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
            SWITCH EXPRESSIONS
          </span>

          <h3>
            Switch Expression Modernization
          </h3>

          <p className="section-description">

            Traditional value-producing switch statements
            that may be simplified using modern Java switch
            expressions.

          </p>

        </div>


        <span className="modernization-count">

          {totalOpportunities}
          {" "}
          opportunities

        </span>

      </div>


      <div className="switch-package-table-wrapper">

        <table className="switch-package-table">

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

                    <code className="switch-package-name">
                      {item.packageName}
                    </code>

                  </td>


                  <td>
                    {item.fileCount}
                  </td>


                  <td>

                    <strong className="switch-opportunity-count">
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

                    <div className="switch-file-list">

                      {item.sampleFiles
                        ?.slice(0, 5)
                        .map(
                          file => (

                            <span
                              key={file}
                              className="switch-sample-file"
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


      <SwitchExpressionExample />


      <div className="switch-package-note">

        MoJaX reports switch-expression modernization
        at package level. Detailed source locations can
        later be exposed through a drill-down view.

      </div>

    </section>
  );
}


function SwitchExpressionExample() {

  return (
    <div className="switch-example">

      <div className="switch-example-header">

        <span className="eyebrow">
          EXAMPLE MODERNIZATION
        </span>

        <h4>
          Traditional Switch → Switch Expression
        </h4>

      </div>


      <div className="switch-example-grid">

        <div className="switch-code-card">

          <span className="switch-code-label">
            Before
          </span>

          <pre>
{`String status;

switch (code) {

    case 1:
        status = "OPEN";
        break;

    case 2:
        status = "CLOSED";
        break;

    default:
        status = "UNKNOWN";
}`}
          </pre>

        </div>


        <div className="switch-code-arrow">
          →
        </div>


        <div className="switch-code-card improved">

          <span className="switch-code-label">
            Modern Java
          </span>

          <pre>
{`String status = switch (code) {

    case 1 -> "OPEN";

    case 2 -> "CLOSED";

    default -> "UNKNOWN";
};`}
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
        `switch-confidence ${level}`
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