export default function ModernizationOverview({ analysis }) {
    return (<section className="modernization-section">

      <div className="section-heading">

        <div>

          <span className="eyebrow">
            JAVA MODERNIZATION
          </span>

          <h3>
            Opportunity Overview
          </h3>

        </div>

      </div>


      <div className="modernization-overview-grid">

        <Metric label="Java Files" value={analysis.filesAnalyzed}/>


        <Metric label="Bean / Data Classes" value={analysis.beanClasses}/>


        <Metric label="Record Candidates" value={analysis.recordCandidates} emphasis/>


        <Metric label="Record Packages" value={analysis.recordCandidatePackages} emphasis/>

         <Metric label="Sealed Class Candidates" value={analysis.sealedClassCandidates} emphasis/>

            <Metric label="Sealed Class Packages" value={analysis.sealedClassPackages} emphasis/>


        <Metric label="Pattern Matching" value={analysis.patternMatchingOpportunities} emphasis/>


        <Metric label="Pattern Packages" value={analysis.patternMatchingPackages} emphasis/>


       <Metric label="Switch Expressions" value={analysis.switchExpressionOpportunities} emphasis/>


        <Metric label="Switch Packages" value={analysis.switchExpressionPackages} emphasis/>

        <Metric label="java.time" value={analysis.dateTimeModernizationOpportunities} emphasis/>


        <Metric label="Date/Time Packages" value={analysis.dateTimeModernizationPackages} emphasis/>

            <Metric label="Text Blocks" value={analysis.textBlockOpportunities} emphasis/>


            <Metric label="Text Block Packages" value={analysis.textBlockPackages} emphasis/>

        <Metric label="Virtual Thread Candidates" value={analysis.virtualThreadCandidates} emphasis/>

            <Metric label="Virtual Thread Packages" value={analysis.virtualThreadPackages} emphasis/>

            <Metric label="ThreadLocal Review" value={analysis.threadLocalReviewItems}/>

           

      </div>

    </section>);
}
function Metric({ label, value, emphasis = false }) {
    return (<div className={`modernization-metric ${emphasis
            ? "opportunity"
            : ""}`}>

      <strong>
        {value ?? 0}
      </strong>

      <span>
        {label}
      </span>

    </div>);
}
