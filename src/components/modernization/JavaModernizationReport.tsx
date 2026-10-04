import type {
  JavaModernizationAnalysis
} from "../../types";

import RecordCandidatePackages
  from "./RecordCandidatePackages";

import PatternMatchingPackages
  from "./PatternMatchingPackages";

import SwitchExpressionPackages
  from "./SwitchExpressionPackages";

import TextBlockPackages
  from "./TextBlockPackages";

import DateTimeModernizationPackages
  from "./DateTimeModernizationPackages";

import VirtualThreadReadiness
  from "./VirtualThreadReadiness";

import ModernizationOpportunityList
  from "./ModernizationOpportunityList";

import SealedClassPackages
  from "./SealedClassPackages";


type Props = {
  analysis: JavaModernizationAnalysis;
};


export default function JavaModernizationReport({
  analysis
}: Props) {

  const summary = [
    {
      label: "Record Packages",
      value:
        analysis.recordPackages
          ?.length
        ??
        0,
      tone: "blue"
    },
    {
      label: "Sealed Hierarchies",
      value:
        analysis.sealedClassPackageDetails
          ?.length
        ??
        0,
      tone: "purple"
    },
    {
      label: "Pattern Matching",
      value:
        analysis.patternPackages
          ?.length
        ??
        0,
      tone: "cyan"
    },
    {
      label: "Switch Expressions",
      value:
        analysis.switchPackages
          ?.length
        ??
        0,
      tone: "orange"
    },
    {
      label: "Text Block Packages",
      value:
        analysis.textBlockPackageDetails
          ?.length
        ??
        0,
      tone: "indigo"
    },
    {
      label: "Date / Time",
      value:
        analysis.dateTimePackages
          ?.length
        ??
        0,
      tone: "green"
    },
    {
      label: "Virtual Threads",
      value:
        analysis.virtualThreadCandidates
        ??
        0,
      tone: "teal"
    }
  ];


  return (
    <section className="modernization-report">

      <div className="modernization-report-header">

        <div className="modernization-section-number">
          02
        </div>

        <div className="modernization-report-heading">

          <span className="eyebrow">
            JAVA MODERNIZATION INTELLIGENCE
          </span>

          <h2>
            Modernization Opportunities
          </h2>

          <p>
            Optional Java language, API and runtime improvements
            identified after separating required migration work
            from modernization.
          </p>

        </div>

        <div className="modernization-target">
          Java 17 / 21+
        </div>

      </div>


      <div className="modernization-summary-strip">

        {
          summary.map(
            item => (

              <div
                key={
                  item.label
                }
                className={
                  `modernization-summary-item ${item.tone}`
                }
              >
                <strong>
                  {item.value}
                </strong>
                <span>
                  {item.label}
                </span>
              </div>

            )
          )
        }

      </div>


      <RecordCandidatePackages
        packages={
          analysis.recordPackages ?? []
        }
      />

      <SealedClassPackages
        packages={
          analysis.sealedClassPackageDetails ?? []
        }
      />

      <PatternMatchingPackages
        packages={
          analysis.patternPackages ?? []
        }
      />

      <SwitchExpressionPackages
        packages={
          analysis.switchPackages ?? []
        }
      />

      <TextBlockPackages
        packages={
          analysis.textBlockPackageDetails ?? []
        }
      />

      <DateTimeModernizationPackages
        packages={
          analysis.dateTimePackages ?? []
        }
      />

      <VirtualThreadReadiness
        packages={
          analysis.virtualThreadPackageDetails ?? []
        }
        virtualThreadCandidates={
          analysis.virtualThreadCandidates ?? 0
        }
        threadLocalReviewItems={
          analysis.threadLocalReviewItems ?? 0
        }
      />

      {analysis.opportunities &&
       analysis.opportunities.length > 0 && (

        <ModernizationOpportunityList
          opportunities={
            analysis.opportunities
          }
        />

      )}

    </section>
  );
}
