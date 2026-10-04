import { Link } from "react-router-dom";
import "../styles/knowledge.css";
import java_11 from "../../assets/Java_11.png";
import java_14 from "../../assets/Java_14.png";
import java_17 from "../../assets/Java_17.png";
import java_21 from "../../assets/Java_21.png";
import java_25 from "../../assets/Java_25.png";

const releases = [
  {
    version: "Java 1.0",
    year: "1996",
    tone: "foundation",
    title: "Write Once, Run Anywhere",
    text: "The first public Java release established the JVM, bytecode portability, garbage collection, class libraries and the applet-era vision that made Java distinctive."
  },
  {
    version: "Java 5",
    year: "2004",
    tone: "classic",
    title: "The language grows up",
    text: "Generics, annotations, enums, autoboxing, enhanced for-loops and varargs made Java substantially more expressive and became foundations of modern enterprise frameworks."
  },
  {
    version: "Java 8",
    year: "2014",
    tone: "important",
    title: "Functional Java arrives",
    text: "Lambda expressions, the Stream API, Optional, default interface methods and the java.time date/time API changed everyday Java programming and remain central to many enterprise codebases."
  },
  {
    version: "Java 9",
    year: "2017",
    tone: "classic",
    title: "The module era",
    text: "Project Jigsaw introduced the Java Platform Module System. JShell also arrived, giving Java an interactive REPL for quick experimentation.",
    image: ""  
},
  {
    version: "Java 11",
    year: "2018 · LTS",
    tone: "lts",
    title: "A major enterprise baseline",
    text: "Java 11 became an important long-term-support target. The standardized HTTP Client was introduced and several older Java EE / CORBA modules were removed from the JDK.",
    image: java_11  
},
  {
    version: "Java 14–16",
    year: "2020–2021",
    tone: "classic",
    title: "Data-oriented Java emerges",
    text: "Records became permanent in Java 16, pattern matching for instanceof simplified type checks, and text blocks improved multiline string handling.",
    image: java_14  
},
  {
    version: "Java 17",
    year: "2021 · LTS",
    tone: "lts",
    title: "Modern Java for the enterprise",
    text: "Java 17 combined a mature module-era runtime with records, sealed classes and stronger encapsulation. It became a common modernization destination for Spring and cloud-native applications.",
    image: java_17
  },
  {
    version: "Java 21",
    year: "2023 · LTS",
    tone: "hero",
    title: "Concurrency and language modernization",
    text: "Virtual threads became a production feature, while record patterns and pattern matching for switch made data-oriented code cleaner. Sequenced collections added uniform first/last ordering APIs.",
    image: java_21
  },
  {
    version: "Java 25",
    year: "2025 · LTS",
    tone: "future",
    title: "The next LTS milestone",
    text: "Java 25 continues the six-month evolution model and gives enterprises another long-term-support landing point for modernization programs beyond Java 17 and 21.",
    image: java_25
}
];

const migration = [
  ["8 → 11", "Remove obsolete dependencies, replace removed Java EE modules where needed, update build plugins and libraries, then verify reflection and TLS behavior."],
  ["11 → 17", "Modernize framework versions, review strong encapsulation issues, update testing/tooling, and selectively adopt records, text blocks and sealed types."],
  ["17 → 21", "Validate libraries on Java 21, evaluate virtual threads for suitable I/O-heavy workloads, and adopt modern pattern matching where it improves clarity."],
  ["21 → 25", "Treat the move as an incremental platform upgrade: refresh dependencies, run compatibility scans, benchmark critical workloads and adopt newer features deliberately."]
];

export default function JavaEvolutionPage() {
  return (
    <div className="knowledge-page">
      <header className="knowledge-nav">
        <Link className="knowledge-brand" to="/">
          <span className="knowledge-brand-symbol">
            <span className="knowledge-brand-java">J</span>
            <span className="knowledge-brand-arrow">↻</span>
          </span>
          <span className="knowledge-brand-copy">
            <strong>MoJaX Dev</strong>
            <small>MODERNIZE JAVA APPLICATIONS</small>
          </span>
        </Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/learn/pqc-history">PQC & Cryptography</Link>
          <Link to="/login">Sign in</Link>
          <Link className="knowledge-nav-cta" to="/register">Get Started</Link>
        </nav>
      </header>

      <main>
        <section className="knowledge-hero knowledge-java-hero">
          <div className="knowledge-hero-copy">
            <span className="knowledge-eyebrow">JAVA MODERNIZATION GUIDE</span>
            <h1>
              From Java 1.0 to the
              <span> modern Java platform.</span>
            </h1>
            <p>
              A visual journey through the releases that changed enterprise Java —
              with special focus on Java 8, 11, 17 and 21.
            </p>
            <div className="knowledge-hero-actions">
              <a href="#timeline">Explore the timeline ↓</a>
              <Link to="/register">Assess a Java application →</Link>
            </div>
          </div>

          <div className="java-orbit" aria-hidden="true">
            <div className="java-core">
              <span>JAVA</span>
              <strong>8 → 11 → 17 → 21</strong>
            </div>
            <span className="orbit-tag orbit-a">LTS</span>
            <span className="orbit-tag orbit-b">JVM</span>
            <span className="orbit-tag orbit-c">Cloud</span>
            <span className="orbit-tag orbit-d">Modern</span>
          </div>
        </section>

        <section className="knowledge-stat-strip">
          <div><strong>1996</strong><span>Java 1.0</span></div>
          <div><strong>2014</strong><span>Java 8</span></div>
          <div><strong>2018</strong><span>Java 11 LTS</span></div>
          <div><strong>2021</strong><span>Java 17 LTS</span></div>
          <div><strong>2023</strong><span>Java 21 LTS</span></div>
          <div><strong>2025</strong><span>Java 25 LTS</span></div>
        </section>

        <section className="knowledge-section" id="timeline">
          <div className="knowledge-section-heading">
            <span>RELEASE TIMELINE</span>
            <h2>How Java evolved</h2>
            <p>
              Not every release requires a rewrite. Modernization is usually a controlled
              sequence of runtime, framework, library, build and code-level changes.
            </p>
          </div>

          <div className="timeline">
            {releases.map((release) => (
              <article className={`timeline-card ${release.tone}`} key={release.version}>
                <div className="timeline-version">
                  <strong>{release.version}</strong>
                  <span>{release.year}</span>
                </div>
                <div>
                  <h3>{release.title}</h3>
                  <p>{release.text}</p>
                </div>
                {release.version === 'Java 11' || release.version === 'Java 14–16' 
                || release.version === 'Java 17' || release.version === 'Java 21' || release.version === 'Java 25' ? (
                  <div className="java-topic-visual java-visual" aria-hidden="true">
                    <img
                            src={release.image}
                            alt="Java Features"
                            className="java-logo"
                        />
                    </div>
                ):<div></div>}
              </article>
            ))}
          </div>
        </section>

        <section className="knowledge-dark-section">
          <div className="knowledge-section-heading light">
            <span>WHY ENTERPRISES MODERNIZE</span>
            <h2>Modern Java is more than a version number.</h2>
          </div>

          <div className="benefit-grid">
            <article>
              <span className="benefit-icon">⚡</span>
              <h3>Performance & runtime</h3>
              <p>Newer JDKs bring years of JVM, garbage collector and runtime improvements.</p>
            </article>
            <article>
              <span className="benefit-icon">⌘</span>
              <h3>Developer productivity</h3>
              <p>Records, pattern matching, improved APIs and language evolution reduce boilerplate.</p>
            </article>
            <article>
              <span className="benefit-icon">☁</span>
              <h3>Cloud readiness</h3>
              <p>Modern frameworks and supported JDKs fit better with containers, orchestration and current platforms.</p>
            </article>
            <article>
              <span className="benefit-icon">◆</span>
              <h3>Security & support</h3>
              <p>Supported JDK lines simplify patching, dependency upgrades and security governance.</p>
            </article>
          </div>
        </section>

        <section className="knowledge-section">
          <div className="knowledge-section-heading">
            <span>MIGRATION PATH</span>
            <h2>Upgrade in controlled stages</h2>
          </div>

          <div className="migration-grid">
            {migration.map(([step, text]) => (
              <article key={step}>
                <div className="migration-step">{step}</div>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="knowledge-callout">
          <div>
            <span>MOJAX JAVA MODERNIZATION</span>
            <h2>Know what must change before changing it.</h2>
            <p>
              MoJaX can assess legacy Java applications for modernization opportunities,
              compatibility risks and prioritized remediation guidance.
            </p>
          </div>
          <Link to="/register">Start with a free assessment →</Link>
        </section>
      </main>

      <footer className="knowledge-footer">
        <span>MoJaX</span>
        <span>Enterprise Java Modernization Intelligence</span>
      </footer>
    </div>
  );
}
