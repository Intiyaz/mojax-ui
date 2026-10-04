import { Link } from "react-router-dom";

export default function LandingResources() {
  return (
    <section className="landing-learning-section">
      <div className="landing-learning-heading">
        <span>KNOWLEDGE CENTER</span>
        <h2>Understand what you are modernizing.</h2>
        <p>
          Explore two practical guides covering the evolution of enterprise Java
          and the transition toward post-quantum cryptography.
        </p>
      </div>

      <div className="landing-learning-grid">
        <Link
          className="landing-learning-card java-card"
          to="/learn/java-evolution"
        >
          <div className="landing-learning-icon">J</div>
          <span>JAVA MODERNIZATION</span>
          <h3>Java 8 → 11 → 17 → 21</h3>
          <p>
            Follow Java's evolution from its early releases through the modern
            LTS era, including migration considerations for enterprise applications.
          </p>
          <strong>Explore Java evolution →</strong>
        </Link>

        <Link
          className="landing-learning-card pqc-card"
          to="/learn/pqc-history"
        >
          <div className="landing-learning-icon">Q</div>
          <span>POST-QUANTUM SECURITY</span>
          <h3>History of Cryptography & PQC</h3>
          <p>
            From classical ciphers and RSA to Shor's algorithm, HNDL,
            ML-KEM, ML-DSA and SLH-DSA.
          </p>
          <strong>Explore PQC →</strong>
        </Link>
      </div>
    </section>
  );
}
