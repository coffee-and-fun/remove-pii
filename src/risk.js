const RISK_WEIGHTS = {
  ssn: 10,
  creditCard: 9,
  passport: 8,
  driversLicense: 7,
  bankAccount: 8,
  email: 3,
  phone: 4,
  address: 5,
  ipAddress: 2,
  zipCode: 2,
  url: 1,
  dateOfBirth: 6
};

export function getRiskLevel(piiCount) {
  if (piiCount === 0) return 'none';
  if (piiCount <= 2) return 'low';
  if (piiCount <= 5) return 'medium';
  if (piiCount <= 10) return 'high';
  return 'critical';
}

export function calculateRiskScore(detectedItems) {
  return detectedItems.reduce((score, item) => {
    const weight = RISK_WEIGHTS[item.type] || 1;
    return score + (item.count * weight);
  }, 0);
}

export function getRecommendations(detectedItems) {
  const recommendations = [];

  if (detectedItems.length === 0) {
    recommendations.push('Text appears to be PII-free');
    return recommendations;
  }

  const types = detectedItems.map((item) => item.type);

  if (types.includes('ssn')) {
    recommendations.push('⚠️ SSN detected - Consider using last 4 digits only');
  }
  if (types.includes('creditCard')) {
    recommendations.push('⚠️ Credit card detected - Never store full card numbers');
  }
  if (types.includes('email')) {
    recommendations.push('📧 Email detected - Consider using hashed or masked emails');
  }
  if (types.includes('phone')) {
    recommendations.push('📞 Phone number detected - Consider masking middle digits');
  }
  if (types.includes('address')) {
    recommendations.push('🏠 Address detected - Consider using city/state only');
  }
  if (detectedItems.length > 5) {
    recommendations.push('🔥 High PII density - Consider comprehensive data sanitization');
  }

  return recommendations;
}
