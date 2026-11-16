MoJaX-UI is the web-based frontend for the MoJaX enterprise modernization assessment platform. Built with React and Vite, it provides organizations with a clear and interactive interface to manage projects, run modernization assessments, and review assessment results. The application currently supports Java Upgrade Assessments, Spring Boot Upgrade Assessments, and Post-Quantum Cryptography (PQC) readiness assessments. Users can view risk and readiness scores, detailed findings, recommendations, remediation plans, cryptographic inventories, CBOM information, key-strength and quantum-risk analysis, and downloadable assessment reports. MoJaX-UI works with the MoJaX backend APIs while presenting assessment results through dashboards, project views, agent selection, detailed assessment pages, and export options such as PDF, JSON, CSV, and CycloneDX-oriented CBOM reports. The UI is designed to help architects and engineering teams understand modernization risks and plan upgrades without requiring source-code changes to be performed within the platform.

Replace your existing `src/App.tsx` and add the supplied `src/components`, `src/utils`, and `src/types.ts`.

This refactor keeps the same REST endpoints:
- GET /api/v1/agents
- POST /api/v1/assessments

Keep your existing `styles.css`, including the colorful modernization scorecard CSS previously added.

Main hierarchy:
App
├── Sidebar
├── Header
├── Hero
├── ProjectSelector
├── AgentCard
└── AssessmentPanel
    ├── Score
    └── AssessmentSummaryTable
