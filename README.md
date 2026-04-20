# 🔒 @coffeeandfun/remove-pii

**Protect privacy by removing personally identifiable information (PII) from text!**

A Node.js library that automatically detects and removes sensitive information from any string — emails, phone numbers, SSNs, credit cards, addresses, and more. Originally built for [Helperbird](https://helperbird.com) and now used anywhere privacy matters.

Created with ❤️ by **Robert James Gabriel** at **Coffee & Fun LLC**.

---

## 🎯 Why use this?

**For privacy protection**
- ✅ Automatically removes sensitive information
- ✅ Prevents accidental data leaks in logs, analytics, and LLM prompts
- ✅ Helps with GDPR, HIPAA, and general privacy compliance
- ✅ Fully customizable per use case

**For developers**
- ✅ Easy integration — one import, one function call
- ✅ Zero runtime dependencies
- ✅ Pure ESM with TypeScript declarations
- ✅ Detailed analysis and reporting when you need it

---

## 📦 Installation

```bash
npm install @coffeeandfun/remove-pii
```

Requires **Node.js 16 or newer**. The package is pure ESM and ships with TypeScript types out of the box.

---

## 🏃‍♂️ Quick start

```js
import { removePII } from '@coffeeandfun/remove-pii';

const text = "John's email is john@example.com and his phone is 123-456-7890.";
const cleaned = removePII(text);

console.log(cleaned);
// "John's email is [email removed] and his phone is [phone removed]."
```

That's it. Three lines.

---

## 🛡️ PII types detected out of the box

| | Type | Example |
| :-: | --- | --- |
| 📧 | Email addresses     | `john@example.com`        |
| 📞 | Phone numbers       | `123-456-7890`, `(555) 123-4567` |
| 🆔 | Social Security     | `123-45-6789`             |
| 💳 | Credit cards        | `1234 5678 9012 3456`     |
| 🏠 | Street addresses    | `123 Main Street`         |
| 📋 | Passport numbers    | `AB1234567`               |
| 🚗 | Driver's licenses   | `D123456789`              |
| 🌐 | IP addresses        | `192.168.1.1`             |
| 📮 | ZIP codes           | `12345-6789`              |
| 🏦 | Bank accounts       | `1234567890123456`        |
| 🔗 | URLs                | `https://example.com`     |
| 📅 | Dates of birth      | `01/15/1990`              |

> 💡 URLs are detected but **not** removed by default — pass `{ url: { remove: true } }` if you want them gone too.

---

## 📦 What you get back

Every function takes a `text` string and an optional `options` object. The shape of the return value depends on which function you call:

```js
// Simple replacement
removePII(text)                   // → string

// Cleaned text + metadata
removePIIDetailed(text)           // → { cleanedText, removedItems, originalLength, cleanedLength, reductionPercentage }

// Locate without changing
detectPII(text)                   // → { text, detectedItems, hasPII, totalMatches, types }

// Full analysis + risk scoring
analyzePII(text)                  // → { original, cleaned, pii, risk }

// Compliance check
validatePIICompliance(text)       // → { isCompliant, violations, violationCount, riskLevel, riskScore, recommendations }

// Array of strings
processBatch(texts)               // → BatchResult[]
```

Here's what a `removePIIDetailed` result actually looks like:

```js
{
  cleanedText: 'Email: [email removed]',
  removedItems: [
    {
      type: 'email',
      count: 1,
      items: ['john@example.com'],
      description: 'Email addresses'
    }
  ],
  originalLength: 23,
  cleanedLength: 20,
  reductionPercentage: 13
}
```

---

## 📚 API reference

### `removePII(text, options?)`
The main function — returns the cleaned string.

```js
const cleaned = removePII("Email: john@example.com, Phone: 123-456-7890");
// "Email: [email removed], Phone: [phone removed]"
```

### `removePIIDetailed(text, options?)`
Like `removePII` but also tells you **what** was removed.

```js
const result = removePIIDetailed("Email: john@example.com");
// {
//   cleanedText: "Email: [email removed]",
//   removedItems: [{ type: 'email', count: 1, items: ['john@example.com'] }],
//   originalLength: 23,
//   cleanedLength: 20,
//   reductionPercentage: 13
// }
```

### `detectPII(text, options?)`
Find PII **without** changing the text. Each detected item includes `positions` (`start` / `end` / `value`) so you can highlight matches in a UI.

```js
const analysis = detectPII("Email: john@example.com, Phone: 123-456-7890");
// {
//   text: "Email: john@example.com, Phone: 123-456-7890",
//   hasPII: true,
//   totalMatches: 2,
//   types: ['email', 'phone'],
//   detectedItems: [...]
// }
```

### `analyzePII(text, options?)`
The full picture — detection + removal + risk scoring all at once. Great for dashboards.

```js
const analysis = analyzePII("Email: john@example.com, SSN: 123-45-6789");
// {
//   original: { text: "...", length: 45, wordCount: 6 },
//   cleaned:  { text: "...", length: 35, wordCount: 6 },
//   pii:      { detected: [...], totalCount: 2, types: ['email', 'ssn'] },
//   risk:     { level: 'medium', score: 13 }
// }
```

### `validatePIICompliance(text, options?)`
Yes/no compliance check with human-readable recommendations.

```js
const compliance = validatePIICompliance("Email: john@example.com");
// {
//   isCompliant: false,
//   violations: [{ type: 'email', count: 1 }],
//   riskLevel: 'low',
//   recommendations: ['📧 Email detected - Consider using hashed or masked emails']
// }
```

### `processBatch(texts, options?)`
Runs `removePIIDetailed` over an array. One bad input won't abort the batch — errors come back as `{ success: false, error }`.

### `getAvailableTypes()`
Lists every built-in PII type with its description and default replacement.

### `createCustomPattern(type, pattern, replacement, description)`
Helper for building a custom-pattern options entry (see [Custom patterns](#-custom-patterns) below).

---

## 🎨 Customization

### Basic configuration

Pass an `options` object to enable/disable types and customize replacements. Anything you don't mention keeps its default.

```js
const options = {
  email: { remove: true, replacement: "[EMAIL HIDDEN]" },
  phone: { remove: false },
  ssn:   { remove: true, replacement: "[SSN REDACTED]" }
};

const cleaned = removePII(text, options);
```

### Privacy levels

#### 🔒 High privacy — lock it all down

```js
const highPrivacy = {
  email:          { remove: true },
  phone:          { remove: true },
  ssn:            { remove: true },
  creditCard:     { remove: true },
  address:        { remove: true },
  passport:       { remove: true },
  driversLicense: { remove: true },
  ipAddress:      { remove: true },
  zipCode:        { remove: true },
  bankAccount:    { remove: true },
  url:            { remove: true },
  dateOfBirth:    { remove: true }
};
```

#### 🛡️ Moderate privacy — financials only

```js
const moderatePrivacy = {
  ssn:         { remove: true },
  creditCard:  { remove: true },
  bankAccount: { remove: true },
  address:     { remove: true },
  email:       { remove: false },
  phone:       { remove: false }
};
```

#### 🎨 Custom replacements

```js
const customReplacements = {
  email:   { replacement: "📧 [CONTACT INFO]" },
  phone:   { replacement: "📞 [PHONE NUMBER]" },
  address: { replacement: "🏠 [LOCATION]" }
};
```

### 🧩 Custom patterns

Need to redact something the library doesn't know about? Drop in your own regex:

```js
import { removePII, createCustomPattern } from '@coffeeandfun/remove-pii';

const options = createCustomPattern(
  'employeeId',
  /\bEMP-\d{6}\b/g,
  '[employee id removed]',
  'Internal employee IDs'
);

removePII('Ticket raised by EMP-123456', options);
// 'Ticket raised by [employee id removed]'
```

---

## 🔧 Advanced features

### 📚 Batch processing

```js
import { processBatch } from '@coffeeandfun/remove-pii';

const texts = [
  "Email: john@example.com",
  "Phone: 123-456-7890",
  "Regular text"
];

const results = processBatch(texts);
// [{ index: 0, success: true, cleanedText: ..., removedItems: [...] }, ...]
```

### ⚖️ Risk assessment

```js
const compliance = validatePIICompliance(text);

console.log(`Risk Level: ${compliance.riskLevel}`);      // 'low' | 'medium' | 'high' | 'critical'
console.log(`Risk Score: ${compliance.riskScore}`);      // weighted numeric score
console.log(`Recommendations:`, compliance.recommendations);
```

### 📖 Inspect available types

```js
import { getAvailableTypes } from '@coffeeandfun/remove-pii';

getAvailableTypes().forEach(t => {
  console.log(`${t.type}: ${t.description}`);
});
```

---

## 🎭 Real-world examples

### 🧽 Log sanitization

```js
import { removePIIDetailed } from '@coffeeandfun/remove-pii';

export function sanitize(entry) {
  const { cleanedText, removedItems } = removePIIDetailed(entry);
  if (removedItems.length > 0) {
    console.debug(`🔒 Sanitized ${removedItems.length} PII item(s)`);
  }
  return cleanedText;
}
```

### 🌐 Express middleware

```js
import express from 'express';
import { removePII } from '@coffeeandfun/remove-pii';

const app = express();
app.use(express.json());

app.post('/logs', (req, res) => {
  console.log(removePII(req.body.message));
  res.sendStatus(204);
});
```

### 🔄 API response scrubbing

```js
import { analyzePII } from '@coffeeandfun/remove-pii';

export function scrubResponse(body) {
  const result = analyzePII(JSON.stringify(body));
  return result.pii.totalCount > 0
    ? JSON.parse(result.cleaned.text)
    : body;
}
```

### 🧼 Data-cleaning pipeline

```js
import { removePII, validatePIICompliance } from '@coffeeandfun/remove-pii';

function cleanUserData(input) {
  const compliance = validatePIICompliance(input);
  if (!compliance.isCompliant) {
    console.warn(`⚠️ PII detected: ${compliance.violationCount} violations`);
    return removePII(input);
  }
  return input;
}
```

---

## 🧪 Testing

```bash
npm test
```

The suite covers:
- ✅ Every built-in PII type and pattern
- ✅ Edge cases and error handling
- ✅ Performance and consistency
- ✅ Batch processing
- ✅ Custom configurations

---

## 🤝 Contributing

We welcome contributions!

1. 🐛 **Report issues** — found a bug or a missing PII type?
2. 💡 **Suggest features** — ideas for better privacy protection?
3. 🔧 **Submit PRs** — code improvements welcome!

### Dev setup

```bash
git clone https://github.com/coffee-and-fun/remove-pii
cd remove-pii
npm install
npm test
```

---

## 📄 License

[MIT](./LICENSE) — feel free to use this in your projects.

---

## 🙏 Credits

**Created with ❤️ by:**
- **Robert James Gabriel** — Lead Developer

**Originally developed for:**
- **[Helperbird](https://helperbird.com)** — an accessibility extension making the web more inclusive for everyone

---

## 📞 Support

Need help protecting privacy in your applications?

- 🐛 **Bug reports:** [GitHub Issues](https://github.com/coffee-and-fun/remove-pii/issues)
- 💡 **Feature requests:** [GitHub Discussions](https://github.com/coffee-and-fun/remove-pii/discussions)
- 🔐 **Security issues:** see [SECURITY.md](./SECURITY.md)

**Stay privacy-focused! 🔒**
