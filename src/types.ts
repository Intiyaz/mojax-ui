export type Agent = {
    id: string;
    code: string;
    name: string;
    category: string;
    description: string;
    enabled: boolean;
};
export type Finding = {
    severity: string;
    category: string;
    title: string;
    description: string;
    recommendation: string;
};
export type Assessment = {
    id: string;
    projectId: string;
    agentCode: string;
    status: string;
    riskScore: number;
    readinessScore: number;
    summary: string;
    findings: Finding[];
    recommendations: string[];
    metrics: Record<string, unknown>;   
    remediationPlan?: RemediationPlan;
    modernizationAnalysis?: JavaModernizationAnalysis;
    pqcAnalysis?: PqcAnalysis;
    createdAt: string;
    completedAt: string;

};

export type RemediationFinding = {
    category: string;
    priority: string;
    title: string;
    file: string | null;
    line: number | null;
    evidence: string;
    rootCause: string;
    recommendedFix: string;
    confidence: number;
};

export type RemediationAction = {
    order: number;
    phase: string;
    title: string;
    description: string;
    priority: string;
    tasks: string[];
    validation: string;
    approvalRequired: boolean;
};

export type RemediationPlan = {
    target: string;
    strategy: string;
    estimatedComplexity: number;
    findings: RemediationFinding[];
    actions: RemediationAction[];
    statistics: Record<string, number>;
};


export type CryptoDisposition =
    | "QUANTUM_VULNERABLE"
    | "CLASSICAL_LEGACY"
    | "RETAIN_REVIEW"
    | "UNKNOWN";


export type CryptoUsage = {

    api: string;

    algorithm: string;

    purpose: string;

    file: string;

    line: number;

    keySize?: number;

    ivDetected: boolean;

    evidence: string;
};


export type PqcFinding = {

    category: string;

    severity: string;

    disposition: CryptoDisposition;

    algorithm: string;

    purpose: string;

    file: string;

    line: number;

    keySize?: number;

    ivDetected: boolean;

    evidence: string;

    description: string;

    pqcImpact: string;

    hndlImpact: string;

    recommendation: string;

    confidence: number;
};


export type PqcAnalysis = {

    filesScanned: number;

    cryptoFiles: number;

    cryptoOccurrences: number;

    uniqueCryptoAssets: number;

    quantumVulnerableOccurrences: number;

    legacyCryptoOccurrences: number;

    symmetricCryptoOccurrences: number;

    hndlRelevantOccurrences: number;

    pqcRiskScore: number;

    pqcReadinessScore: number;

    riskLevel: string;

    findings: PqcFinding[];

    usages: CryptoUsage[];

    algorithmInventory:
        Record<string, number>;
};


export type PqcFileInventory = {
  totalFiles: number;
  javaFiles: number;
  xmlFiles: number;
  propertiesFiles: number;
  yamlFiles: number;
  otherFiles: number;
};

export type CryptoPurpose =
  | "DATA_ENCRYPTION"
  | "KEY_ESTABLISHMENT"
  | "DIGITAL_SIGNATURE"
  | "HASHING"
  | "MESSAGE_AUTHENTICATION"
  | "SYMMETRIC_ENCRYPTION"
  | "TLS"
  | "CERTIFICATE"
  | "KEY_STORAGE"
  | "UNKNOWN";

export type PqcMigrationTarget =
  | "ML_KEM"
  | "ML_DSA"
  | "SLH_DSA"
  | "HYBRID_KEY_ESTABLISHMENT"
  | "HYBRID_SIGNATURE"
  | "RETAIN"
  | "MODERNIZE_CLASSICAL"
  | "PROTOCOL_REVIEW"
  | "PKI_REVIEW"
  | "MANUAL_REVIEW";

export type MigrationUrgency =
  | "IMMEDIATE"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "REVIEW";

export type PqcMigrationRecommendation = {
  algorithm: string;
  purpose: CryptoPurpose;
  disposition: CryptoDisposition;
  target: PqcMigrationTarget;
  urgency: MigrationUrgency;
  rationale: string;
  hndlRationale: string;
  migrationApproach: string;
  prerequisites: string[];
  validationSteps: string[];
  humanApprovalRequired: boolean;
};

export type PqcMigrationWave = {
  wave: number;
  name: string;
  objective: string;
  urgency: MigrationUrgency;
  algorithms: string[];
  actions: string[];
  validation: string;
  approvalRequired: boolean;
};

export type PqcMigrationPlan = {
  strategy: string;
  migrationComplexity: number;
  immediateActions: number;
  highPriorityActions: number;
  reviewActions: number;
  recommendations: PqcMigrationRecommendation[];
  waves: PqcMigrationWave[];
  targetInventory: Record<string, number>;
};

export type Organization = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
};


export type Project = {
  id: string;

  organizationId: string;
  organizationName: string;

  name: string;
  description?: string;

  repositoryUrl: string;
  defaultBranch?: string;

  createdAt: string;
  updatedAt: string;
};


type DashboardSummary = {
  projects: number;
  assessments: number;
  completedAssessments: number;
  failedAssessments: number;
  javaAssessments: number;
  pqcAssessments: number;
  averageRiskScore: number;
  averageReadinessScore: number;
};


type RiskDistribution = {
  CRITICAL: number;
  HIGH: number;
  MEDIUM: number;
  LOW: number;
  NOT_ASSESSED: number;
};

type DashboardProject = {
  projectId: string;
  projectName: string;
  repositoryUrl: string;

  latestAssessmentId: string | null;
  latestAgentCode: string | null;

  status: string;

  riskScore: number | null;
  readinessScore: number | null;

  assessedAt: string | null;
};


type DashboardResponse = {
  organizationId: string;
  organizationName: string;

  summary: DashboardSummary;

  riskDistribution: RiskDistribution;

  projects: DashboardProject[];

  recentAssessments: RecentAssessment[];
};


export type ProjectPortfolioItem = {
  projectId: string;
  projectName: string;
  repositoryUrl: string;

  latestAssessmentId?: string;

  latestAgentCode?: string;

  status: string;

  riskScore?: number;

  readinessScore?: number;

  assessedAt?: string;
};


export type RecentAssessment = {
  assessmentId: string;
  projectId: string;
  projectName: string;

  agentCode: string;

  status: string;

  riskScore?: number;

  readinessScore?: number;

  createdAt: string;
};


export type OrganizationDashboard = {
  organizationId: string;
  organizationName: string;

  summary: DashboardSummary;

  riskDistribution:
    Record<string, number>;

  projects:
    ProjectPortfolioItem[];

  recentAssessments:
    RecentAssessment[];
};

export type ModernizationClassification =
  | "BLOCKER"
  | "REQUIRED"
  | "RECOMMENDED"
  | "OPPORTUNITY"
  | "REVIEW";


export type ModernizationOpportunityType =
  | "RECORD_CANDIDATE"
  | "SEALED_CLASS_CANDIDATE"
  | "PATTERN_MATCHING"
  | "SWITCH_EXPRESSION"
  | "TEXT_BLOCK"
  | "DATE_TIME_API"
  | "VIRTUAL_THREAD_CANDIDATE"
  | "THREAD_LOCAL_REVIEW";


export type ModernizationOpportunity = {
  type: ModernizationOpportunityType;

  classification: ModernizationClassification;

  file: string;

  line?: number;

  title: string;

  evidence: string;

  recommendation: string;

  reasons: string[];

  confidence: number;
};


export type JavaModernizationAnalysis = {
  filesAnalyzed: number;

  beanClasses: number;

  recordCandidates: number;

  recordCandidatePackages: number;

  sealedClassCandidates: number;

  sealedClassPackages: number;

  patternMatchingOpportunities: number;

  patternMatchingPackages: number;

  switchExpressionOpportunities: number;

  switchExpressionPackages: number;

  textBlockOpportunities: number;

  textBlockPackages: number;

  dateTimeModernizationOpportunities: number;

  dateTimeModernizationPackages: number;

  virtualThreadCandidates: number;

  virtualThreadPackages: number;

  threadLocalReviewItems: number;

  recordPackages: RecordCandidatePackage[];

  sealedClassPackageDetails: SealedClassPackage[];

  patternPackages: PatternMatchingPackage[];

  switchPackages: SwitchExpressionPackage[];

  textBlockPackageDetails: TextBlockPackage[];

  dateTimePackages: DateTimeModernizationPackage[];

  virtualThreadPackageDetails: VirtualThreadPackage[];

  opportunities: ModernizationOpportunity[];

  statistics: Record<string, number>;
};


export type ModernizationClassification =
  | "BLOCKER"
  | "REQUIRED"
  | "RECOMMENDED"
  | "OPPORTUNITY"
  | "REVIEW";


export type ModernizationOpportunityType =
  | "RECORD_CANDIDATE"
  | "SEALED_CLASS_CANDIDATE"
  | "PATTERN_MATCHING"
  | "SWITCH_EXPRESSION"
  | "TEXT_BLOCK"
  | "DATE_TIME_API"
  | "VIRTUAL_THREAD_CANDIDATE"
  | "THREAD_LOCAL_REVIEW";


export type ModernizationOpportunity = {
  type: ModernizationOpportunityType;

  classification: ModernizationClassification;

  file: string;

  line?: number;

  title: string;

  evidence: string;

  recommendation: string;

  reasons: string[];

  confidence: number;
};


export type RecordCandidatePackage = {
  packageName: string;

  beanClassCount: number;

  recordCandidateCount: number;

  averageConfidence: number;

  sampleClasses: string[];
};


export type JavaModernizationAnalysis = {
  filesAnalyzed: number;

  beanClasses: number;

  recordCandidates: number;

  recordCandidatePackages: number;

  sealedClassCandidates: number;

  patternMatchingOpportunities: number;

  switchExpressionOpportunities: number;

  textBlockOpportunities: number;

  dateTimeModernizationOpportunities: number;

  virtualThreadCandidates: number;

  threadLocalReviewItems: number;

  recordPackages: RecordCandidatePackage[];

  opportunities: ModernizationOpportunity[];

  statistics: Record<string, number>;
};

export type PatternMatchingPackage = {
  packageName: string;

  fileCount: number;

  opportunityCount: number;

  averageConfidence: number;

  sampleFiles: string[];
};

export type SwitchExpressionPackage = {
  packageName: string;

  fileCount: number;

  opportunityCount: number;

  averageConfidence: number;

  sampleFiles: string[];
};

export type DateTimeModernizationPackage = {
  packageName: string;

  fileCount: number;

  opportunityCount: number;

  averageConfidence: number;

  legacyApis: string[];

  sampleFiles: string[];
};

export type TextBlockPackage = {
  packageName: string;

  fileCount: number;

  opportunityCount: number;

  averageConfidence: number;

  sampleFiles: string[];
};

export type VirtualThreadPackage = {
  packageName: string;

  fileCount: number;

  executorCandidates: number;

  threadLocalReviews: number;

  synchronizedReviews: number;

  lockReviews: number;

  completableFutureReviews: number;

  totalFindings: number;

  sampleFiles: string[];
};

export type SealedClassPackage = {
  packageName: string;

  baseTypeCount: number;

  subtypeCount: number;

  averageConfidence: number;

  sampleBaseTypes: string[];
};

export type LoginRequest = {
  email: string;
  password: string;
};


export type LoginResponse = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  expiresAt: string;
  userId: string;
  email: string;
  displayName: string;
  organizationId: string;
};


export type CurrentUser = {
  userId: string;
  email: string;
  displayName: string;
  organizationId: string;
  organizationName: string;
};