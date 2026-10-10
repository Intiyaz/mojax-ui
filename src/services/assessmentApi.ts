import {
  apiGet,
  apiPost
} from "./apiFetch";


/*
 * ============================================================
 * COMMON TYPES
 * ============================================================
 */

export type AssessmentStatus =
  | "PENDING"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | string;


export type AssessmentFinding = {
  title?: string;

  description?: string;

  severity?: string;

  file?: string;

  line?: number;

  evidence?: string;

  recommendation?: string;

  [key: string]: unknown;
};


export type RemediationPlan = {
  [key: string]: unknown;
};


/*
 * ============================================================
 * JAVA MODERNIZATION TYPES
 * ============================================================
 */

export type RecordCandidatePackage = {
  packageName: string;

  beanClassCount: number;

  recordCandidateCount: number;

  averageConfidence: number;

  sampleClasses: string[];
};


export type SealedClassPackage = {
  packageName: string;

  baseTypeCount: number;

  subtypeCount: number;

  averageConfidence: number;

  sampleBaseTypes: string[];
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


export type TextBlockPackage = {
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


export type ModernizationOpportunity = {
  type?: string;

  classification?: string;

  file?: string;

  line?: number;

  title?: string;

  evidence?: string;

  recommendation?: string;

  reasons?: string[];

  confidence?: number;
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


/*
 * ============================================================
 * PQC
 * ============================================================
 *
 * PQC structure can continue evolving,
 * therefore keep it open rather than making
 * the frontend fail when new properties arrive.
 */

export type PqcAnalysis = {
  [key: string]: unknown;
};


/*
 * ============================================================
 * ASSESSMENT
 * ============================================================
 */

export type Assessment = {
  id: string;

  projectId: string;

  agentCode: string;

  status: AssessmentStatus;

  riskScore?: number;

  readinessScore?: number;

  summary?: string;

  findings?: AssessmentFinding[];

  recommendations?: string[];

  metrics?: Record<string, unknown>;

  remediationPlan?: RemediationPlan;

  modernizationAnalysis?:
    JavaModernizationAnalysis;

  pqcAnalysis?: PqcAnalysis;

  createdAt?: string;

  completedAt?: string;
};


/*
 * This matches the flow we've been using:
 *
 * projectId
 * agentCode
 */
export type RunAssessmentRequest = {

    projectId: string;

    agentCode: string;

    parameters?: Record<string, unknown>;
};


/*
 * ============================================================
 * GET ASSESSMENTS
 * ============================================================
 */

export async function getAssessments():
Promise<Assessment[]> {

  return apiGet<Assessment[]>(
    "/api/v1/assessments"
  );
}


/*
 * ============================================================
 * GET ONE ASSESSMENT
 * ============================================================
 */

export async function getAssessment(
  assessmentId: string
):
Promise<Assessment> {

  if (!assessmentId) {

    throw new Error(
      "Assessment id is required."
    );
  }


  return apiGet<Assessment>(
    `/api/v1/assessments/${assessmentId}`
  );
}


/*
 * ============================================================
 * RUN ASSESSMENT
 * ============================================================
 */

export async function runAssessment(
    projectId: string,
    agentCode: string,
    parameters: Record<string, unknown> = {}
):
Promise<Assessment> {

    if (!projectId) {

        throw new Error(
            "Project id is required."
        );
    }


    if (!agentCode) {

        throw new Error(
            "Agent code is required."
        );
    }


    return apiPost<Assessment>(
        "/api/v1/assessments",
        {
            projectId,
            agentCode,
            parameters
        }
    );
}