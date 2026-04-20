import { PII_PATTERNS } from './patterns.js';
import { mergeConfig, validateInput } from './config.js';
import { getMatcher, findMatches } from './matching.js';

export function detectPII(text, options = {}) {
  validateInput(text);
  const config = mergeConfig(options);
  const detectedItems = [];

  for (const [type, settings] of Object.entries(config)) {
    const matcher = getMatcher(type, settings);
    if (!matcher) continue;

    const matches = findMatches(text, matcher);
    if (matches.length === 0) continue;

    const patternInfo = PII_PATTERNS[type];
    detectedItems.push({
      type,
      count: matches.length,
      items: matches.map((m) => m.value),
      positions: matches.map((m) => ({ start: m.start, end: m.end, value: m.value })),
      description: patternInfo?.description || `${type} data`
    });
  }

  return {
    text,
    detectedItems,
    hasPII: detectedItems.length > 0,
    totalMatches: detectedItems.reduce((sum, item) => sum + item.count, 0),
    types: detectedItems.map((item) => item.type)
  };
}
