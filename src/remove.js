import { PII_PATTERNS } from './patterns.js';
import { mergeConfig, validateInput } from './config.js';
import { getMatcher, findMatches, replaceAll } from './matching.js';

export function removePII(text, options = {}) {
  validateInput(text);
  const config = mergeConfig(options);
  let cleanedText = text;

  for (const [type, settings] of Object.entries(config)) {
    if (!settings.remove) continue;

    const matcher = getMatcher(type, settings);
    if (!matcher) continue;

    const patternInfo = PII_PATTERNS[type];
    const replacement = settings.replacement || patternInfo?.replacement || '[PII removed]';

    const matches = findMatches(cleanedText, matcher);
    cleanedText = replaceAll(cleanedText, matches, replacement);
  }

  return cleanedText;
}

export function removePIIDetailed(text, options = {}) {
  validateInput(text);
  const config = mergeConfig(options);
  let cleanedText = text;
  const removedItems = [];

  for (const [type, settings] of Object.entries(config)) {
    if (!settings.remove) continue;

    const matcher = getMatcher(type, settings);
    if (!matcher) continue;

    const patternInfo = PII_PATTERNS[type];
    const replacement = settings.replacement || patternInfo?.replacement || '[PII removed]';

    const matches = findMatches(cleanedText, matcher);
    if (matches.length > 0) {
      removedItems.push({
        type,
        count: matches.length,
        items: matches.map((m) => m.value),
        description: patternInfo?.description || `${type} data`
      });
      cleanedText = replaceAll(cleanedText, matches, replacement);
    }
  }

  const originalLength = text.length;
  const cleanedLength = cleanedText.length;
  const reductionPercentage = originalLength === 0
    ? 0
    : Math.round(((originalLength - cleanedLength) / originalLength) * 100);

  return {
    cleanedText,
    removedItems,
    originalLength,
    cleanedLength,
    reductionPercentage
  };
}
