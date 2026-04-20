import { PII_PATTERNS } from './patterns.js';

export function getAvailableTypes() {
  return Object.keys(PII_PATTERNS).map((type) => ({
    type,
    description: PII_PATTERNS[type].description,
    defaultReplacement: PII_PATTERNS[type].replacement
  }));
}

export function createCustomPattern(type, pattern, replacement, description) {
  return {
    [type]: {
      pattern,
      replacement,
      description
    }
  };
}
