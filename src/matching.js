import { PII_PATTERNS } from './patterns.js';

export function getMatcher(type, settings) {
  const patternInfo = PII_PATTERNS[type];
  if (patternInfo?.finder) {
    return { kind: 'finder', finder: patternInfo.finder };
  }
  const pattern = patternInfo?.pattern || settings.pattern;
  if (pattern) {
    return { kind: 'regex', pattern };
  }
  return null;
}

export function findMatches(text, matcher) {
  if (matcher.kind === 'finder') {
    return matcher.finder(text);
  }
  const { pattern } = matcher;
  const regex = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g');
  const results = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    results.push({
      start: match.index,
      end: match.index + match[0].length,
      value: match[0]
    });
    if (match[0].length === 0) regex.lastIndex++;
  }
  return results;
}

export function replaceAll(text, matches, replacement) {
  if (matches.length === 0) return text;
  let out = '';
  let cursor = 0;
  for (const m of matches) {
    out += text.slice(cursor, m.start) + replacement;
    cursor = m.end;
  }
  out += text.slice(cursor);
  return out;
}
