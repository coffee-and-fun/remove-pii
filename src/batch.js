import { removePIIDetailed } from './remove.js';

export function processBatch(texts, options = {}) {
  if (!Array.isArray(texts)) {
    throw new TypeError('Input must be an array of strings');
  }

  return texts.map((text, index) => {
    try {
      const result = removePIIDetailed(text, options);
      return {
        index,
        success: true,
        ...result
      };
    } catch (error) {
      return {
        index,
        success: false,
        error: error.message,
        originalText: text
      };
    }
  });
}
