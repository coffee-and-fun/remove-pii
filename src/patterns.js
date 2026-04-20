import { matchAddresses, matchUrls } from './safePatterns.js';

export const PII_PATTERNS = {
  email: {
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    replacement: '[email removed]',
    description: 'Email addresses'
  },
  phone: {
    pattern: /(?:\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})(?:\s?(?:ext|x|extension)\.?\s?(\d+))?/g,
    replacement: '[phone removed]',
    description: 'Phone numbers'
  },
  ssn: {
    pattern: /\b(?!000|666|9\d{2})\d{3}-?(?!00)\d{2}-?(?!0000)\d{4}\b/g,
    replacement: '[SSN removed]',
    description: 'Social Security Numbers'
  },
  creditCard: {
    pattern: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g,
    replacement: '[credit card removed]',
    description: 'Credit card numbers'
  },
  ipAddress: {
    pattern: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
    replacement: '[IP address removed]',
    description: 'IP addresses'
  },
  address: {
    finder: matchAddresses,
    replacement: '[address removed]',
    description: 'Street addresses'
  },
  passport: {
    pattern: /\b[A-Z]{2}[0-9]{7}\b/g,
    replacement: '[passport number removed]',
    description: 'Passport numbers'
  },
  driversLicense: {
    pattern: /\b[A-Z]{1,2}[0-9]{6,9}\b/g,
    replacement: '[driver\'s license removed]',
    description: 'Driver\'s license numbers'
  },
  zipCode: {
    pattern: /(?<!\d-)\b\d{5}(?:-\d{4})?\b(?!-\d)/g,
    replacement: '[zip code removed]',
    description: 'ZIP codes'
  },
  bankAccount: {
    pattern: /\b\d{8,17}\b/g,
    replacement: '[bank account removed]',
    description: 'Bank account numbers'
  },
  url: {
    finder: matchUrls,
    replacement: '[URL removed]',
    description: 'URLs'
  },
  dateOfBirth: {
    pattern: /\b(?:0[1-9]|1[0-2])[-\/](?:0[1-9]|[12][0-9]|3[01])[-\/](?:19|20)\d{2}\b/g,
    replacement: '[date removed]',
    description: 'Dates of birth'
  }
};

export const DEFAULT_CONFIG = {
  email: { remove: true, replacement: '[email removed]' },
  phone: { remove: true, replacement: '[phone removed]' },
  ssn: { remove: true, replacement: '[SSN removed]' },
  creditCard: { remove: true, replacement: '[credit card removed]' },
  ipAddress: { remove: true, replacement: '[IP address removed]' },
  address: { remove: true, replacement: '[address removed]' },
  passport: { remove: true, replacement: '[passport number removed]' },
  driversLicense: { remove: true, replacement: '[driver\'s license removed]' },
  zipCode: { remove: true, replacement: '[zip code removed]' },
  bankAccount: { remove: true, replacement: '[bank account removed]' },
  url: { remove: false, replacement: '[URL removed]' },
  dateOfBirth: { remove: true, replacement: '[date removed]' }
};
