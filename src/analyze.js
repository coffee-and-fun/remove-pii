import { detectPII } from './detect.js';
import { removePIIDetailed } from './remove.js';
import { getRiskLevel, calculateRiskScore, getRecommendations } from './risk.js';

function countWords(text) {
  return text.split(/\s+/).filter((word) => word.length > 0).length;
}

export function analyzePII(text, options = {}) {
  const detection = detectPII(text, options);
  const removal = removePIIDetailed(text, options);

  return {
    original: {
      text,
      length: text.length,
      wordCount: countWords(text)
    },
    cleaned: {
      text: removal.cleanedText,
      length: removal.cleanedLength,
      wordCount: countWords(removal.cleanedText)
    },
    pii: {
      detected: detection.detectedItems,
      removed: removal.removedItems,
      totalCount: detection.totalMatches,
      types: detection.types,
      reductionPercentage: removal.reductionPercentage
    },
    risk: {
      level: getRiskLevel(detection.totalMatches),
      score: calculateRiskScore(detection.detectedItems)
    }
  };
}

export function validatePIICompliance(text, options = {}) {
  const detection = detectPII(text, options);

  return {
    isCompliant: !detection.hasPII,
    violations: detection.detectedItems,
    violationCount: detection.totalMatches,
    riskLevel: getRiskLevel(detection.totalMatches),
    riskScore: calculateRiskScore(detection.detectedItems),
    recommendations: getRecommendations(detection.detectedItems)
  };
}
