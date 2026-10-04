export default function SealedClassPackages({ packages = [] }) {
    if (packages.length === 0) {
        return (<section className="modernization-section">

        <div className="section-heading">

          <div>

            <span className="eyebrow">
              SEALED TYPES
            </span>

            <h3>
              Sealed Class Candidates
            </h3>

          </div>

        </div>


        <div className="modernization-empty">

          No inheritance hierarchies suitable for
          sealed-class review were identified.

        </div>

      </section>);
    }
    const totalCandidates = packages.reduce((sum, item) => sum + item.baseTypeCount, 0);
    const totalSubtypes = packages.reduce((sum, item) => sum + item.subtypeCount, 0);
    return (<section className="modernization-section">

      <div className="section-heading">

        <div>

          <span className="eyebrow">
            JAVA 17 LANGUAGE MODERNIZATION
          </span>

          <h3>
            Sealed Class Candidates
          </h3>

          <p className="section-description">

            Interfaces and abstract classes with a small,
            known set of implementations that may represent
            closed domain hierarchies.

          </p>

        </div>


        <span className="modernization-count">

          {totalCandidates}
          {" "}
          candidates

        </span>

      </div>


      <div className="sealed-summary-grid">

        <div className="sealed-summary-card">

          <strong>
            {totalCandidates}
          </strong>

          <span>
            Base Types
          </span>

        </div>


        <div className="sealed-summary-card">

          <strong>
            {totalSubtypes}
          </strong>

          <span>
            Detected Subtypes
          </span>

        </div>


        <div className="sealed-summary-card">

          <strong>
            {packages.length}
          </strong>

          <span>
            Packages
          </span>

        </div>

      </div>


      <div className="sealed-package-table-wrapper">

        <table className="sealed-package-table">

          <thead>

            <tr>

              <th>
                Package
              </th>

              <th>
                Base Types
              </th>

              <th>
                Subtypes
              </th>

              <th>
                Confidence
              </th>

              <th>
                Example Base Types
              </th>

            </tr>

          </thead>


          <tbody>

            {packages.map(item => (<tr key={item.packageName}>

                  <td>

                    <code className="sealed-package-name">
                      {item.packageName}
                    </code>

                  </td>


                  <td>

                    <strong className="sealed-candidate-count">
                      {item.baseTypeCount}
                    </strong>

                  </td>


                  <td>
                    {item.subtypeCount}
                  </td>


                  <td>

                    <ConfidenceBadge value={item.averageConfidence}/>

                  </td>


                  <td>

                    <div className="sealed-type-list">

                      {item.sampleBaseTypes
                ?.slice(0, 5)
                .map(type => (<span key={type} className="sealed-type-badge">

                              {type}

                            </span>))}

                    </div>

                  </td>

                </tr>))}

          </tbody>

        </table>

      </div>


      <SealedClassExample />


      <div className="sealed-guidance">

        <strong>
          Architectural review required:
        </strong>

        {" "}

        A detected hierarchy should only be sealed when
        external or plugin implementations are not required.
        MoJaX therefore reports this as a candidate rather
        than automatically transforming the base type.

      </div>

    </section>);
}
function SealedClassExample() {
    return (<div className="sealed-example">

      <div className="sealed-example-header">

        <span className="eyebrow">
          EXAMPLE MODERNIZATION
        </span>

        <h4>
          Open Interface → Sealed Hierarchy
        </h4>

      </div>


      <div className="sealed-example-grid">

        <div className="sealed-code-card">

          <span className="sealed-code-label">
            Before
          </span>

          <pre>
        {`public interface PaymentMethod {

    void pay();
}

public class CardPayment
        implements PaymentMethod {
}

public class WalletPayment
        implements PaymentMethod {
}`}
          </pre>

        </div>


        <div className="sealed-code-arrow">
          →
        </div>


        <div className="sealed-code-card improved">

          <span className="sealed-code-label">
            Java 17 Review Candidate
          </span>

          <pre>
        {`public sealed interface PaymentMethod
        permits CardPayment,
                WalletPayment {

    void pay();
}

public final class CardPayment
        implements PaymentMethod {
}

public final class WalletPayment
        implements PaymentMethod {
}`}
          </pre>

        </div>

      </div>

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
    return (<span className={`sealed-confidence ${level}`}>

      {percentage}%

    </span>);
}
