# 🔒 @coffeeandfun/remove-pii

**Protect privacy by removing personally identifiable information (PII) from text!**

@coffeeandfun/remove-pii is a powerful Node.js package designed to help with privacy by automatically detecting and removing personally identifiable information from text. Originally developed for Helperbird.com, this module has evolved into a comprehensive tool for protecting privacy in text processing.

Created by **Robert James Gabriel** at **Coffee & Fun LLC** - making the web more accessible and privacy-focused for everyone.

---

## 🎯 Why Use This?

**For Privacy Protection:**
- ✅ Automatically removes sensitive information
- ✅ Prevents accidental data leaks
- ✅ GDPR and privacy compliance helper
- ✅ Customizable for different use cases

**For Developers:**
- ✅ Easy integration (just 1 line of code!)
- ✅ Lightweight and fast
- ✅ Comprehensive PII detection
- ✅ Detailed analysis and reporting

---

## 📦 Installation

```bash
npm install @coffeeandfun/remove-pii
```

---

## 🏃‍♂️ Quick Start

```javascript
import { removePII } from '@coffeeandfun/remove-pii';

const text = "John's email is john@example.com and his phone number is 123-456-7890.";
const cleanedText = removePII(text);

console.log(cleanedText);
// Output: "John's email is [email removed] and his phone number is [phone removed]."
```

---

## 🛡️ PII Types Detected

- **📧 Email Addresses** - `john@example.com`
- **📞 Phone Numbers** - `123-456-7890`, `(555) 123-4567`
- **🆔 Social Security Numbers** - `123-45-6789`
- **💳 Credit Card Numbers** - `1234 5678 9012 3456`
- **🏠 Physical Addresses** - `123 Main Street`
- **📋 Passport Numbers** - `AB1234567`
- **🚗 Driver's License Numbers** - `D123456789`
- **🌐 IP Addresses** - `192.168.1.1`
- **📮 ZIP Codes** - `12345`, `12345-6789`
- **🏦 Bank Account Numbers** - `1234567890123456`
- **🔗 URLs** - `https://example.com`
- **📅 Dates of Birth** - `01/15/1990`

---

## 📚 API Reference

### `removePII(text, options)`
Main function that removes PII and returns cleaned text.

```javascript
const cleanedText = removePII("Email: john@example.com, Phone: 123-456-7890");
// Returns: "Email: [email removed], Phone: [phone removed]"
```

### `removePIIDetailed(text, options)`
Enhanced version with detailed information about what was removed.

```javascript
const result = removePIIDetailed("Email: john@example.com");
console.log(result);
// {
//   cleanedText: "Email: [email removed]",
//   removedItems: [{ type: 'email', count: 1, items: ['john@example.com'] }],
//   originalLength: 23,
//   cleanedLength: 20,
//   reductionPercentage: 13
// }
```

### `detectPII(text, options)`
Detects PII without removing it - useful for analysis.

```javascript
const analysis = detectPII("Email: john@example.com, Phone: 123-456-7890");
console.log(analysis);
// {
//   text: "Email: john@example.com, Phone: 123-456-7890",
//   hasPII: true,
//   totalMatches: 2,
//   types: ['email', 'phone'],
//   detectedItems: [...]
// }
```

### `analyzePII(text, options)`
Comprehensive analysis with statistics and risk assessment.

```javascript
const analysis = analyzePII("Email: john@example.com, SSN: 123-45-6789");
console.log(analysis);
// {
//   original: { text: "...", length: 45, wordCount: 6 },
//   cleaned: { text: "...", length: 35, wordCount: 6 },
//   pii: { detected: [...], totalCount: 2, types: ['email', 'ssn'] },
//   risk: { level: 'medium', score: 13 }
// }
```

### `validatePIICompliance(text, options)`
Check if text is PII-compliant with recommendations.

```javascript
const compliance = validatePIICompliance("Email: john@example.com");
console.log(compliance);
// {
//   isCompliant: false,
//   violations: [{ type: 'email', count: 1 }],
//   riskLevel: 'low',
//   recommendations: ['📧 Email detected - Consider using hashed emails']
// }
```

---

## 🎨 Customization

### Basic Configuration
```javascript
const options = {
  email: { remove: true, replacement: "[EMAIL HIDDEN]" },
  phone: { remove: false },
  ssn: { remove: true, replacement: "[SSN REDACTED]" }
};

const cleaned = removePII(text, options);
```

### Privacy Levels

#### High Privacy Mode
```javascript
const highPrivacy = {
  email: { remove: true },
  phone: { remove: true },
  ssn: { remove: true },
  creditCard: { remove: true },
  address: { remove: true },
  passport: { remove: true },
  driversLicense: { remove: true },
  ipAddress: { remove: true },
  zipCode: { remove: true },
  bankAccount: { remove: true },
  url: { remove: true },
  dateOfBirth: { remove: true }
};
```

#### Moderate Privacy Mode
```javascript
const moderatePrivacy = {
  ssn: { remove: true },
  creditCard: { remove: true },
  bankAccount: { remove: true },
  email: { remove: false },
  phone: { remove: false },
  address: { remove: true }
};
```

#### Custom Replacements
```javascript
const customReplacements = {
  email: { replacement: "📧 [CONTACT INFO]" },
  phone: { replacement: "📞 [PHONE NUMBER]" },
  address: { replacement: "🏠 [LOCATION]" }
};
```

---

## 🔧 Advanced Features

### Batch Processing
```javascript
import { processBatch } from '@coffeeandfun/remove-pii';

const texts = [
  "Email: john@example.com",
  "Phone: 123-456-7890",
  "Regular text"
];

const results = processBatch(texts);
console.log(results);
// Array of results with success/failure status
```

### Risk Assessment
```javascript
const compliance = validatePIICompliance(text);
console.log(`Risk Level: ${compliance.riskLevel}`);
console.log(`Risk Score: ${compliance.riskScore}`);
console.log(`Recommendations: ${compliance.recommendations.join(', ')}`);
```

### Available PII Types
```javascript
import { getAvailableTypes } from '@coffeeandfun/remove-pii';

const types = getAvailableTypes();
types.forEach(type => {
  console.log(`${type.type}: ${type.description}`);
});
```

---

## 🎭 Real-World Examples

### Data Cleaning Pipeline
```javascript
import { removePII, validatePIICompliance } from '@coffeeandfun/remove-pii';

function cleanUserData(userData) {
  const compliance = validatePIICompliance(userData);
  
  if (!compliance.isCompliant) {
    console.log(`⚠️ PII detected: ${compliance.violationCount} violations`);
    return removePII(userData);
  }
  
  return userData;
}
```

### Log Sanitization
```javascript
import { removePIIDetailed } from '@coffeeandfun/remove-pii';

function sanitizeLogs(logEntry) {
  const result = removePIIDetailed(logEntry);
  
  if (result.removedItems.length > 0) {
    console.log(`🔒 Sanitized log: removed ${result.removedItems.length} PII items`);
  }
  
  return result.cleanedText;
}
```

### API Response Cleaning
```javascript
import { analyzePII } from '@coffeeandfun/remove-pii';

function sanitizeApiResponse(response) {
  const analysis = analyzePII(JSON.stringify(response));
  
  if (analysis.pii.totalCount > 0) {
    console.log(`⚠️ API response contains PII: ${analysis.pii.types.join(', ')}`);
    return JSON.parse(analysis.cleaned.text);
  }
  
  return response;
}
```

---

## 🧪 Testing

```bash
npm test
```

We've included comprehensive tests covering:
- ✅ All PII types and patterns
- ✅ Edge cases and error handling
- ✅ Performance and consistency
- ✅ Batch processing
- ✅ Custom configurations

---

## 🤝 Contributing

We welcome contributions!

1. **🐛 Report Issues** - Found a bug or missing PII type?
2. **💡 Suggest Features** - Ideas for better privacy protection?
3. **🔧 Submit PRs** - Code improvements welcome!

### Development Setup
```bash
git clone https://github.com/RobertJGabriel/remove-pii
cd remove-pii
npm install
npm test
```

---

## 📄 License

MIT License - feel free to use in your projects!

---

## 🙏 Credits

**Created with ❤️ by:**
- **Robert James Gabriel** - Lead Developer
- **Coffee & Fun LLC** - Privacy-focused web solutions

**Originally developed for:**
- **Helperbird** - An accessibility extension making the web accessible for everyone

---

## 📞 Support

Need help protecting privacy in your applications?

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/RobertJGabriel/remove-pii/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/RobertJGabriel/remove-pii/discussions)

**Stay privacy-focused! 🔒**