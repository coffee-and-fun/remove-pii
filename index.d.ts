export type PIIType =
  | 'email'
  | 'phone'
  | 'ssn'
  | 'creditCard'
  | 'ipAddress'
  | 'address'
  | 'passport'
  | 'driversLicense'
  | 'zipCode'
  | 'bankAccount'
  | 'url'
  | 'dateOfBirth';

export type RiskLevel = 'none' | 'low' | 'medium' | 'high' | 'critical';

export interface TypeOptions {
  remove?: boolean;
  replacement?: string;
  pattern?: RegExp;
  description?: string;
}

export type RemovePIIOptions = {
  [K in PIIType]?: TypeOptions;
} & {
  [key: string]: TypeOptions | undefined;
};

export interface Position {
  start: number;
  end: number;
  value: string;
}

export interface DetectedItem {
  type: string;
  count: number;
  items: string[];
  positions: Position[];
  description: string;
}

export interface RemovedItem {
  type: string;
  count: number;
  items: string[];
  description: string;
}

export interface RemoveDetailedResult {
  cleanedText: string;
  removedItems: RemovedItem[];
  originalLength: number;
  cleanedLength: number;
  reductionPercentage: number;
}

export interface DetectResult {
  text: string;
  detectedItems: DetectedItem[];
  hasPII: boolean;
  totalMatches: number;
  types: string[];
}

export interface AnalyzeResult {
  original: {
    text: string;
    length: number;
    wordCount: number;
  };
  cleaned: {
    text: string;
    length: number;
    wordCount: number;
  };
  pii: {
    detected: DetectedItem[];
    removed: RemovedItem[];
    totalCount: number;
    types: string[];
    reductionPercentage: number;
  };
  risk: {
    level: RiskLevel;
    score: number;
  };
}

export interface ComplianceResult {
  isCompliant: boolean;
  violations: DetectedItem[];
  violationCount: number;
  riskLevel: RiskLevel;
  riskScore: number;
  recommendations: string[];
}

export type BatchResult =
  | ({ index: number; success: true } & RemoveDetailedResult)
  | { index: number; success: false; error: string; originalText: unknown };

export interface AvailableType {
  type: string;
  description: string;
  defaultReplacement: string;
}

export interface CustomPattern {
  [key: string]: {
    pattern: RegExp;
    replacement: string;
    description: string;
  };
}

export function removePII(text: string, options?: RemovePIIOptions): string;

export function removePIIDetailed(
  text: string,
  options?: RemovePIIOptions
): RemoveDetailedResult;

export function detectPII(
  text: string,
  options?: RemovePIIOptions
): DetectResult;

export function analyzePII(
  text: string,
  options?: RemovePIIOptions
): AnalyzeResult;

export function validatePIICompliance(
  text: string,
  options?: RemovePIIOptions
): ComplianceResult;

export function processBatch(
  texts: string[],
  options?: RemovePIIOptions
): BatchResult[];

export function getAvailableTypes(): AvailableType[];

export function createCustomPattern(
  type: string,
  pattern: RegExp,
  replacement: string,
  description: string
): CustomPattern;

export default removePII;
