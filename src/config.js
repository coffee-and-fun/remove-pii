import { DEFAULT_CONFIG } from './patterns.js';

export function mergeConfig(userOptions = {}) {
  const config = {};

  for (const [key, value] of Object.entries(DEFAULT_CONFIG)) {
    config[key] = { ...value };
  }

  for (const [key, value] of Object.entries(userOptions)) {
    if (config[key]) {
      config[key] = { ...config[key], ...value };
    } else {
      config[key] = value;
    }
  }

  return config;
}

export function validateInput(text) {
  if (text === null || text === undefined) {
    throw new TypeError('Input cannot be null or undefined');
  }
  if (typeof text !== 'string') {
    throw new TypeError('Input must be a string');
  }
  return text;
}
