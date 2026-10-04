import type {
  VirtualThreadPackage
} from "../../types";


type Props = {
  packages?: VirtualThreadPackage[];

  virtualThreadCandidates?: number;

  threadLocalReviewItems?: number;
};


export default function VirtualThreadReadiness({
  packages = [],
  virtualThreadCandidates = 0,
  threadLocalReviewItems = 0
}: Props) {

  if (packages.length === 0) {

    return (
      <section className="modernization-section">

        <div className="section-heading">

          <div>

            <span className="eyebrow">
              JAVA 21 CONCURRENCY
            </span>

            <h3>
              Virtual Thread Readiness
            </h3>

          </div>

        </div>


        <div className="modernization-empty">

          No executor or concurrency patterns requiring
          virtual-thread readiness review were identified.

        </div>

      </section>
    );
  }


  const synchronizedReviews =
    packages.reduce(
      (sum, item) =>
        sum + item.synchronizedReviews,
      0
    );


  const lockReviews =
    packages.reduce(
      (sum, item) =>
        sum + item.lockReviews,
      0
    );


  const completableFutureReviews =
    packages.reduce(
      (sum, item) =>
        sum + item.completableFutureReviews,
      0
    );


  const totalFindings =
    packages.reduce(
      (sum, item) =>
        sum + item.totalFindings,
      0
    );


  return (
    <section className="modernization-section">

      <div className="section-heading">

        <div>

          <span className="eyebrow">
            JAVA 21 CONCURRENCY
          </span>

          <h3>
            Virtual Thread Readiness
          </h3>

          <p className="section-description">

            Analysis of executor usage and concurrency
            patterns that should be reviewed before
            adopting Java 21 virtual threads.

          </p>

        </div>


        <span className="modernization-count">

          {virtualThreadCandidates}
          {" "}
          candidates

        </span>

      </div>


      <div className="virtual-thread-summary-grid">

        <SummaryMetric
          label="Executor Candidates"
          value={virtualThreadCandidates}
          emphasis
        />


        <SummaryMetric
          label="ThreadLocal Reviews"
          value={threadLocalReviewItems}
          review
        />


        <SummaryMetric
          label="synchronized Reviews"
          value={synchronizedReviews}
          review
        />


        <SummaryMetric
          label="Lock Reviews"
          value={lockReviews}
          review
        />


        <SummaryMetric
          label="CompletableFuture Reviews"
          value={completableFutureReviews}
        />


        <SummaryMetric
          label="Total Findings"
          value={totalFindings}
        />

      </div>


      <div className="virtual-thread-table-wrapper">

        <table className="virtual-thread-table">

          <thead>

            <tr>

              <th>Package</th>

              <th>Files</th>

              <th>Executors</th>

              <th>ThreadLocal</th>

              <th>synchronized</th>

              <th>Locks</th>

              <th>CompletableFuture</th>

              <th>Examples</th>

            </tr>

          </thead>


          <tbody>

            {packages.map(
              item => (

                <tr key={item.packageName}>

                  <td>

                    <code className="virtual-thread-package-name">
                      {item.packageName}
                    </code>

                  </td>


                  <td>
                    {item.fileCount}
                  </td>


                  <td>

                    <strong className="virtual-thread-candidate-count">
                      {item.executorCandidates}
                    </strong>

                  </td>


                  <td>
                    {item.threadLocalReviews}
                  </td>


                  <td>
                    {item.synchronizedReviews}
                  </td>


                  <td>
                    {item.lockReviews}
                  </td>


                  <td>
                    {item.completableFutureReviews}
                  </td>


                  <td>

                    <div className="virtual-thread-file-list">

                      {item.sampleFiles
                        ?.slice(0, 4)
                        .map(
                          file => (

                            <span
                              key={file}
                              className="virtual-thread-sample-file"
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


      <VirtualThreadExample />


      <div className="virtual-thread-guidance">

        <strong>
          Important:
        </strong>

        {" "}

        Executor findings are modernization candidates.
        ThreadLocal, synchronized, lock and
        CompletableFuture findings are review signals,
        not automatic replacement recommendations.

      </div>

    </section>
  );
}


function SummaryMetric({
  label,
  value,
  emphasis = false,
  review = false
}: {
  label: string;
  value: number;
  emphasis?: boolean;
  review?: boolean;
}) {

  let className =
    "virtual-thread-summary-card";


  if (emphasis) {

    className +=
      " candidate";

  } else if (review) {

    className +=
      " review";
  }


  return (
    <div className={className}>

      <strong>
        {value ?? 0}
      </strong>

      <span>
        {label}
      </span>

    </div>
  );
}


function VirtualThreadExample() {

  return (
    <div className="virtual-thread-example">

      <div className="virtual-thread-example-header">

        <span className="eyebrow">
          EXAMPLE MODERNIZATION
        </span>

        <h4>
          Platform Thread Pool → Virtual Threads
        </h4>

      </div>


      <div className="virtual-thread-example-grid">

        <div className="virtual-thread-code-card">

          <span className="virtual-thread-code-label">
            Before
          </span>

          <pre>
{`ExecutorService executor =
    Executors.newFixedThreadPool(100);

executor.submit(() -> {
    callRemoteService();
});`}
          </pre>

        </div>


        <div className="virtual-thread-code-arrow">
          →
        </div>


        <div className="virtual-thread-code-card improved">

          <span className="virtual-thread-code-label">
            Java 21 Review Candidate
          </span>

          <pre>
{`try (var executor =
         Executors
           .newVirtualThreadPerTaskExecutor()) {

    executor.submit(() -> {
        callRemoteService();
    });
}`}
          </pre>

        </div>

      </div>


      <div className="virtual-thread-use-case">

        Best suited to high-concurrency workloads that
        spend significant time waiting on blocking I/O.
        CPU-bound workloads do not automatically benefit
        from increasing thread count.

      </div>

    </div>
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