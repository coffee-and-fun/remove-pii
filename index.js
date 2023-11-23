function removePII(text, options = {}) {
  // Default options for PII types
  const defaultOptions = {
    email: { remove: true, replacement: "[email removed]" },
    phone: { remove: true, replacement: "[phone removed]" },
    ssn: { remove: true, replacement: "[SSN removed]" },
    creditCard: { remove: true, replacement: "[credit card removed]" },
    address: { remove: true, replacement: "[address removed]" },
    passport: { remove: true, replacement: "[passport number removed]" },
    driversLicense: { remove: true, replacement: "[driver's license removed]" },
    ipAddress: { remove: true, replacement: "[IP address removed]" },
  };

  // Merge user-provided options with defaults
  const config = { ...defaultOptions, ...options };

  // Regular expressions for different PII types
  const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/g;
  const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g;
  const ssnRegex = /\b\d{3}-\d{2}-\d{4}\b/g;
  const creditCardRegex = /\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/g;
  const addressRegex =
    /\d{1,5}\s\w+(\s\w+)?\s(Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Parkway|Pkwy|Circle|Cir|Terrace|Ter)\b/g;
  const passportRegex = /\b[A-Z]{2}\d{7}\b/g; // Example: "AB1234567"
  const driversLicenseRegex = /\b[A-Z0-9]{5,20}\b/g; // Example: "D123456789"

  const ipAddressRegex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;

// Function to handle replacement based on configuration
const replacePII = (regex, type) => {
    if (config[type].remove) {
        return text.replace(regex, config[type].replacement);
    }
    return text;
};


  // Apply replacements based on the configuration
  text = replacePII(emailRegex, "email");
  text = replacePII(phoneRegex, "phone");

  text = replacePII(ssnRegex, "ssn");
  text = replacePII(creditCardRegex, "creditCard");
  text = replacePII(addressRegex, "address");
  text = replacePII(passportRegex, "passport");
  text = replacePII(driversLicenseRegex, "driversLicense");
  text = replacePII(ipAddressRegex, "ipAddress");

  return text;
}

module.exports = removePII;
