# EngineeringAI UI v0.4 component refactor

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
