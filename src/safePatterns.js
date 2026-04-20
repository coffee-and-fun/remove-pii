const STREET_SUFFIXES = [
  'Street', 'St',
  'Avenue', 'Ave',
  'Road', 'Rd',
  'Boulevard', 'Blvd',
  'Lane', 'Ln',
  'Drive', 'Dr',
  'Court', 'Ct',
  'Circle', 'Cir',
  'Way',
  'Place', 'Pl',
  'Parkway', 'Pkwy',
  'Terrace', 'Ter'
];

const STREET_SUFFIX_SET = new Set(STREET_SUFFIXES.map((s) => s.toLowerCase()));

const ADDRESS_BODY_CHARS = new Set(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ,.-'.split('')
);

const isWordBoundaryChar = (ch) => !ch || !/[A-Za-z0-9]/.test(ch);

export function matchAddresses(text) {
  const results = [];
  const digitRe = /\d/g;
  let digitMatch;
  while ((digitMatch = digitRe.exec(text)) !== null) {
    const start = digitMatch.index;
    if (!isWordBoundaryChar(text[start - 1])) continue;

    let cursor = start;
    while (cursor < text.length && /\d/.test(text[cursor])) cursor++;
    if (cursor >= text.length || text[cursor] !== ' ') continue;

    cursor++;

    let lastSuffixEnd = -1;
    let scan = cursor;
    while (scan < text.length && ADDRESS_BODY_CHARS.has(text[scan])) {
      if (/[A-Za-z]/.test(text[scan])) {
        let wordStart = scan;
        while (scan < text.length && /[A-Za-z]/.test(text[scan])) scan++;
        const word = text.slice(wordStart, scan);
        if (STREET_SUFFIX_SET.has(word.toLowerCase())) {
          const afterChar = text[scan];
          if (isWordBoundaryChar(afterChar)) {
            lastSuffixEnd = scan;
          }
        }
      } else {
        scan++;
      }
    }

    if (lastSuffixEnd !== -1) {
      results.push({ start, end: lastSuffixEnd, value: text.slice(start, lastSuffixEnd) });
      digitRe.lastIndex = lastSuffixEnd;
    }
  }
  return results;
}

const URL_CHAR = /[\w\-.~:/?#\[\]@!$&'()*+,;=%]/;

export function matchUrls(text) {
  const results = [];
  const schemeRe = /https?:\/\//g;
  let schemeMatch;
  while ((schemeMatch = schemeRe.exec(text)) !== null) {
    const start = schemeMatch.index;
    let cursor = schemeMatch.index + schemeMatch[0].length;

    let hostEnd = cursor;
    while (hostEnd < text.length) {
      const ch = text[hostEnd];
      if (!/[A-Za-z0-9.\-]/.test(ch)) break;
      hostEnd++;
    }
    if (hostEnd === cursor) continue;

    cursor = hostEnd;

    if (text[cursor] === ':') {
      cursor++;
      while (cursor < text.length && /\d/.test(text[cursor])) cursor++;
    }

    while (cursor < text.length && URL_CHAR.test(text[cursor])) {
      cursor++;
    }

    while (cursor > schemeMatch.index + schemeMatch[0].length && /[.,;:!?)\]]/.test(text[cursor - 1])) {
      cursor--;
    }

    results.push({ start, end: cursor, value: text.slice(start, cursor) });
    schemeRe.lastIndex = cursor;
  }
  return results;
}
