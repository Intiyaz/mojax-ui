import { Link } from "react-router-dom";
import "../styles/knowledge.css";
import ecc from "../../assets/ECC.png";
import rsa from "../../assets/trapdoor.png";
import shor from "../../assets/Shor_Algo.png";
import pqc_algos from "../../assets/ML-Algos.png";

const history = [
  ["Ancient ciphers", "Before computers", "Substitution and transposition techniques showed the core idea of cryptography: transform information so only an intended recipient can understand it."],
  ["DES", "1977", "The Data Encryption Standard became a major symmetric-key standard. Its 56-bit key size eventually became too small for modern security needs."],
  ["RSA", "1977", "RSA introduced practical public-key encryption based on the difficulty of factoring large integers, transforming secure key exchange and digital signatures."],
  ["Diffie–Hellman", "1976", "Public-key key agreement allowed two parties to establish a shared secret over an untrusted network without previously sharing the secret."],
  ["ECC", "1980s onward", "Elliptic-curve cryptography provided comparable security with much smaller keys than traditional finite-field public-key systems."],
  ["AES", "2001", "The Advanced Encryption Standard became the dominant modern symmetric block cipher and remains fundamental to data protection."],
  ["Shor's algorithm", "1994", "Peter Shor showed that a sufficiently capable fault-tolerant quantum computer could efficiently solve factoring and discrete-logarithm problems, threatening RSA, DH and ECC."],
  ["NIST PQC standards", "2024", "NIST finalized ML-KEM for key establishment, ML-DSA for digital signatures and SLH-DSA as a stateless hash-based signature standard."]
];

const standards = [
  {
    code: "ML-KEM",
    fips: "FIPS 203",
    purpose: "Key establishment",
    family: "Module lattices",
    text: "Designed to replace quantum-vulnerable public-key key-establishment mechanisms in many protocols and applications."
  },
  {
    code: "ML-DSA",
    fips: "FIPS 204",
    purpose: "Digital signatures",
    family: "Module lattices",
    text: "A post-quantum signature standard intended for authentication, integrity and software/document signing use cases."
  },
  {
    code: "SLH-DSA",
    fips: "FIPS 205",
    purpose: "Digital signatures",
    family: "Hash-based",
    text: "A stateless hash-based signature standard that provides algorithm-family diversity beyond lattice assumptions."
  }
];

export default function PqcHistoryPage() {
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
          <Link to="/learn/java-evolution">Java Evolution</Link>
          <Link to="/login">Sign in</Link>
          <Link className="knowledge-nav-cta" to="/register">Get Started</Link>
        </nav>
      </header>

      <main>
        <section className="knowledge-hero knowledge-pqc-hero">
          <div className="knowledge-hero-copy">
            <span className="knowledge-eyebrow">POST-QUANTUM CRYPTOGRAPHY</span>
            <h1>
              From classical public-key cryptography to
              <span> quantum-safe systems.</span>
            </h1>
            <p>
              A practical journey from RSA and ECC to Shor&apos;s algorithm and the first
              standardized Post-Quantum Cryptography algorithms.
            </p>
            <div className="knowledge-hero-actions">
              <a href="#crypto-history">Explore the history ↓</a>
              <a href="#deep-dive">View algorithm deep dives ↓</a>
              <Link to="/register">Assess cryptography in Java →</Link>
            </div>
          </div>

          <div className="quantum-visual" aria-hidden="true">
            <div className="quantum-ring ring-one" />
            <div className="quantum-ring ring-two" />
            <div className="quantum-ring ring-three" />
            <div className="quantum-lock">🔐</div>
            <span className="quantum-label ql-a">RSA</span>
            <span className="quantum-label ql-b">ECC</span>
            <span className="quantum-label ql-c">ML-KEM</span>
            <span className="quantum-label ql-d">ML-DSA</span>
          </div>
        </section>

        <section className="knowledge-stat-strip pqc-strip">
          <div><strong>1976</strong><span>Diffie–Hellman</span></div>
          <div><strong>1977</strong><span>RSA</span></div>
          <div><strong>2001</strong><span>AES</span></div>
          <div><strong>1994</strong><span>Shor&apos;s Algorithm</span></div>
          <div><strong>2024</strong><span>NIST PQC Standards</span></div>
        </section>

        <section className="knowledge-section" id="crypto-history">
          <div className="knowledge-section-heading">
            <span>CRYPTOGRAPHY THROUGH TIME</span>
            <h2>The security assumptions changed. Again.</h2>
            <p>
              Cryptography evolves when computing power, mathematics and attack techniques change.
              Quantum computing creates a particularly important transition for public-key cryptography.
            </p>
          </div>

          <div className="crypto-history">
            {history.map(([title, year, text], index) => (
              <article key={title}>
                <div className="crypto-history-number">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <span>{year}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="knowledge-section" id="deep-dive">
          <div className="knowledge-section-heading">
            <span>PQC DEEP DIVE</span>
            <h2>Key building blocks behind the quantum transition</h2>
            <p>
              These four topics explain the mathematical idea behind RSA, the efficiency of ECC,
              the quantum threat from Shor&apos;s algorithm and the role of the first standardized PQC algorithms.
            </p>
          </div>

          <div className="pqc-deep-dive">

            <article className="pqc-topic-card-trapdoor">
              <div className="pqc-topic-visual trapdoor-visual" aria-hidden="true">
                 <img
                        src={rsa}
                        alt="Trapdoor-RSA"
                        className="rsa-logo"
                    />
     
              </div>

              <div className="pqc-topic-content">
                <span className="pqc-topic-label">🔐 Trapdoor Functions</span>
                <h3>The Mathematical Idea Behind RSA</h3>
                <p>
                  A trapdoor function is easy to compute in one direction but extremely difficult
                  to reverse unless you possess some secret information—the “trapdoor.” RSA provides
                  a classic example. Take two small primes for illustration: <strong>p = 11</strong> and
                  <strong> q = 13</strong>. Multiplying them gives <strong>N = 143</strong>, while Euler’s
                  totient is <strong>φ(N) = (11−1)(13−1) = 120</strong>. Choose a public exponent
                  <strong> e = 7</strong>, which is coprime with 120. The corresponding private exponent
                  is <strong>d = 103</strong>, because <strong>7 × 103 = 721 ≡ 1 (mod 120)</strong>.
                </p>
                <p>
                  Now suppose our message is <strong>m = 9</strong>. Anyone with the public key
                  <strong> (N = 143, e = 7)</strong> can encrypt it:
                  <strong> c = 9⁷ mod 143 = 48</strong>. But reversing that operation is designed to be
                  difficult without the private key. Using the trapdoor <strong>d = 103</strong>, we recover
                  the message: <strong>m = 48¹⁰³ mod 143 = 9</strong>.
                </p>
                <p>
                  With tiny primes such as 11 and 13, we can easily factor 143 and reconstruct the
                  private key; real RSA instead uses enormously large primes so that recovering the secret
                  information from the public modulus is computationally infeasible with known classical
                  algorithms. That asymmetry—easy forward, hard backward, easy backward with a secret—is the
                  essence of a trapdoor function. 🔑🔒
                </p>
              </div>
            </article>

            <article className="pqc-topic-card-ecc">

                <div
                    className="pqc-topic-visual ecc-visual"
                    aria-hidden="true"
                >
                    <img
                        src={ecc}
                        alt="MoJaX"
                        className="ecc-logo"
                    />
                </div>

                <div className="pqc-topic-content">

                    <span className="pqc-topic-label">
                    🔐 Elliptic Curve Cryptography (ECC)
                    </span>

                    <h3>
                    Strong Security with Smaller Keys
                    </h3>

                    <p>
                    Elliptic Curve Cryptography (ECC) is a modern
                    public-key cryptography technique that achieves
                    strong security using much smaller keys than
                    traditional RSA.
                    </p>

                    <p>
                    ECC works with points on an elliptic curve such as
                    <strong>
                        {" "}y² = x³ + ax + b
                    </strong>
                    {" "}
                    over a finite field.
                    Starting with a publicly known base point
                    <strong>
                        {" "}G
                    </strong>
                    ,
                    a large random number
                    <strong>
                        {" "}d
                    </strong>
                    {" "}
                    is chosen as the private key.
                    The public key is then calculated as
                    <strong>
                        {" "}Q = dG
                    </strong>
                    .
                    </p>

                    <p>
                    Computing
                    <strong>
                        {" "}Q
                    </strong>
                    {" "}
                    from
                    <strong>
                        {" "}d
                    </strong>
                    {" "}
                    and
                    <strong>
                        {" "}G
                    </strong>
                    {" "}
                    is efficient, but recovering
                    <strong>
                        {" "}d
                    </strong>
                    {" "}
                    from only
                    <strong>
                        {" "}G
                    </strong>
                    {" "}
                    and
                    <strong>
                        {" "}Q
                    </strong>
                    {" "}
                    is believed to be computationally infeasible for
                    appropriately chosen curves and key sizes.
                    This is the
                    <strong>
                        {" "}Elliptic Curve Discrete Logarithm Problem
                        (ECDLP)
                    </strong>
                    .
                    </p>

                    <p>
                    For approximately 128-bit classical security,
                    a 256-bit elliptic-curve key is commonly compared
                    with an RSA key of about 3072 bits.
                    This efficiency makes ECC particularly useful for
                    TLS, mobile devices, IoT, cryptocurrencies and
                    systems where bandwidth, storage and performance
                    matter. 🔑📱🌐
                    </p>

                </div>

                </article>

            <article className="pqc-topic-card-shor">
              <div className="pqc-topic-visual shor-visual" aria-hidden="true">
                 <img
                        src={shor}
                        alt="Shor-RSA"
                        className="shor-logo"
                    />
              </div>

              <div className="pqc-topic-content">
                <span className="pqc-topic-label">🔐 Shor&apos;s Algorithm</span>
                <h3>How Shor’s Algorithm Creates a Quantum Threat to RSA</h3>
                <p>
                  RSA protects our digital world by relying on a mathematical asymmetry: multiplying two
                  enormous prime numbers <strong>p</strong> and <strong>q</strong> to create
                  <strong> N = pq</strong> is easy, while factoring <strong>N</strong> back into those primes is
                  extremely difficult for classical computers. This difficulty helps keep the RSA private key
                  protected.
                </p>
                <p>
                  Shor’s algorithm changes that assumption. On a sufficiently large, fault-tolerant quantum
                  computer, Shor’s algorithm can solve the underlying factoring problem in polynomial time.
                  Once an attacker recovers <strong>p</strong> and <strong>q</strong>, they can calculate
                  <strong> ϕ(N) = (p−1)(q−1)</strong>, derive the private exponent <strong>d</strong>, and decrypt
                  RSA-protected data or forge RSA signatures.
                </p>
                <p>
                  Such cryptographically relevant quantum computers do not yet exist at the scale required to
                  break widely deployed RSA, but the risk matters today because sensitive encrypted information
                  can potentially be collected now and targeted for decryption later—often called
                  <strong> Harvest Now, Decrypt Later (HNDL)</strong>. This is why organizations should inventory
                  their cryptography, build crypto-agility, and plan migration toward standardized Post-Quantum
                  Cryptography (PQC) rather than waiting for a cryptographically relevant quantum computer to arrive.
                  🔐➡️⚛️➡️🛡️
                </p>
              </div>
            </article>

            <article className="pqc-topic-card-pqc-algos">
              <div className="pqc-topic-visual pqc-visual" aria-hidden="true">
                <img
                        src={pqc_algos}
                        alt="Post-Quantum Cryptography Algorithms"
                        className="pqc-logo"
                    />
              </div>

              <div className="pqc-topic-content">
                <span className="pqc-topic-label">🔐 Post-Quantum Cryptography</span>
                <h3>Building Security for the Quantum Era</h3>
                <p>
                  As quantum computing advances, widely used public-key systems such as RSA and ECC face a
                  future threat from Shor’s algorithm. NIST’s first finalized Post-Quantum Cryptography standards
                  provide practical alternatives built on mathematical problems believed to resist both classical
                  and quantum attacks.
                </p>
                <p>
                  <strong>ML-KEM (FIPS 203)</strong>, derived from CRYSTALS-Kyber, is a module-lattice-based
                  Key Encapsulation Mechanism designed to establish a shared secret securely; that secret can then
                  be used with symmetric encryption such as AES to protect data.
                  <strong> ML-DSA (FIPS 204)</strong>, derived from CRYSTALS-Dilithium, provides module-lattice-based
                  digital signatures for authentication, integrity, software signing and other signature applications.
                  <strong> SLH-DSA (FIPS 205)</strong>, derived from SPHINCS+, takes a different approach: it is a
                  stateless hash-based digital-signature scheme whose security is based primarily on hash functions,
                  providing valuable cryptographic diversity alongside lattice-based algorithms.
                </p>
                <p>
                  Together, these standards represent an important step toward crypto-agility and quantum-resistant
                  systems. The transition to PQC is not simply about replacing algorithms—it is about discovering
                  where cryptography exists, assessing dependencies, testing interoperability and performance,
                  and creating a migration path before quantum risk becomes an operational reality. 🔐⚛️🛡️
                </p>
              </div>
            </article>

          </div>
        </section>

        <section className="knowledge-section">
          <div className="knowledge-section-heading">
            <span>THE PQC STANDARD SET</span>
            <h2>Different algorithms, different jobs</h2>
            <p>
              Crypto agility is not only about changing names. Organizations should understand
              the algorithm family and security assumption behind each choice.
            </p>
          </div>

          <div className="pqc-standard-grid">
            {standards.map((item) => (
              <article key={item.code}>
                <div className="pqc-standard-head">
                  <strong>{item.code}</strong>
                  <span>{item.fips}</span>
                </div>
                <div className="pqc-standard-meta">
                  <span>{item.purpose}</span>
                  <span>{item.family}</span>
                </div>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="knowledge-dark-section">
          <div className="knowledge-section-heading light">
            <span>CRYPTO AGILITY</span>
            <h2>Inventory the assumption, not only the algorithm.</h2>
            <p>
              A useful cryptographic inventory should capture where an algorithm is used,
              what protects it, what hardness assumption it depends on, and what replacement
              path exists if that assumption becomes unsuitable.
            </p>
          </div>

          <div className="assumption-grid">
            <div><span>Traditional</span><strong>RSA</strong><small>Integer factorization</small></div>
            <div><span>Traditional</span><strong>ECC</strong><small>Elliptic-curve discrete logarithm</small></div>
            <div><span>PQC</span><strong>ML-KEM</strong><small>Module-lattice assumptions</small></div>
            <div><span>PQC</span><strong>SLH-DSA</strong><small>Hash-function security</small></div>
          </div>
        </section>

        <section className="knowledge-section">
          <div className="knowledge-section-heading">
            <span>PQC MIGRATION</span>
            <h2>A practical migration journey</h2>
          </div>

          <div className="migration-grid">
            <article><div className="migration-step">01 · Discover</div><p>Find cryptographic APIs, libraries, certificates, protocols, key sizes and long-lived encrypted data.</p></article>
            <article><div className="migration-step">02 · Classify</div><p>Separate symmetric, asymmetric, signing, key-establishment and certificate use cases. Record the underlying assumption.</p></article>
            <article><div className="migration-step">03 · Prioritize</div><p>Focus first on long-lived sensitive data, internet-facing services, critical identities and difficult-to-change integrations.</p></article>
            <article><div className="migration-step">04 · Migrate</div><p>Introduce crypto-agile interfaces, test protocol compatibility, plan certificate changes and deploy PQC or hybrid approaches where appropriate.</p></article>
          </div>
        </section>

        <section className="knowledge-callout pqc-callout">
          <div>
            <span>MOJAX PQC MIGRATION</span>
            <h2>Find quantum-vulnerable cryptography in your Java estate.</h2>
            <p>
              MoJaX can identify cryptographic usage, classify migration risk and provide
              prioritized remediation guidance without turning the assessment into a generic code rewrite.
            </p>
          </div>
          <Link to="/register">Run a PQC assessment →</Link>
        </section>
      </main>

      <footer className="knowledge-footer">
        <span>MoJaX</span>
        <span>Modernize · Optimize · Secure · Scale</span>
      </footer>
    </div>
  );
}
