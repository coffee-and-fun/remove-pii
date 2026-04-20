import {
  removePII,
  removePIIDetailed,
  detectPII,
  analyzePII,
  validatePIICompliance,
  processBatch,
  getAvailableTypes,
  createCustomPattern
} from '../index.js';

describe('Remove PII v3.0 - Core Functions', () => {
  
  describe('removePII (main function)', () => {
    test('should replace email addresses with a placeholder', () => {
      const input = 'My email is jane.doe@example.com.';
      const expected = 'My email is [email removed].';
      expect(removePII(input)).toBe(expected);
    });

    test('should replace phone numbers with a placeholder', () => {
      const input = 'Call me at 123-456-7890.';
      const expected = 'Call me at [phone removed].';
      expect(removePII(input)).toBe(expected);
    });

    test('should replace phone numbers with extensions', () => {
      const input = 'Call me at 123-456-7890 ext 123.';
      const expected = 'Call me at [phone removed].';
      expect(removePII(input)).toBe(expected);
    });

    test('should replace social security numbers with a placeholder', () => {
      const input = 'My SSN is 123-45-6789.';
      const expected = 'My SSN is [SSN removed].';
      expect(removePII(input)).toBe(expected);
    });

    test('should replace credit card numbers with a placeholder', () => {
      const input = 'My credit card number is 1234 5678 9012 3456.';
      const expected = 'My credit card number is [credit card removed].';
      expect(removePII(input)).toBe(expected);
    });

    test('should replace credit card numbers with hyphens', () => {
      const input = 'Card: 1234-5678-9012-3456';
      const expected = 'Card: [credit card removed]';
      expect(removePII(input)).toBe(expected);
    });

    test('should replace addresses with a placeholder', () => {
      const input = 'I live at 123 Main St.';
      const expected = 'I live at [address removed].';
      expect(removePII(input)).toBe(expected);
    });

    test('should replace various address formats', () => {
      const inputs = [
        'Visit 456 Oak Avenue',
        'Located at 789 Pine Road',
        'Address: 321 Elm Boulevard',
        'Find us at 654 Maple Lane'
      ];
      
      inputs.forEach(input => {
        const result = removePII(input);
        expect(result).toContain('[address removed]');
      });
    });

    test('should replace passport numbers with a placeholder', () => {
      const input = 'My passport number is AB1234567.';
      const expected = 'My passport number is [passport number removed].';
      expect(removePII(input)).toBe(expected);
    });

    test('should replace driver\'s license numbers with a placeholder', () => {
      const input = 'My driver\'s license is D123456789.';
      const expected = 'My driver\'s license is [driver\'s license removed].';
      expect(removePII(input)).toBe(expected);
    });

    test('should replace IP addresses with a placeholder', () => {
      const input = 'My IP address is 192.168.1.1.';
      const expected = 'My IP address is [IP address removed].';
      expect(removePII(input)).toBe(expected);
    });

    test('should handle a string with multiple types of PII', () => {
      const input = 'Email: jane.doe@example.com, Phone: 123-456-7890, SSN: 123-45-6789.';
      const expected = 'Email: [email removed], Phone: [phone removed], SSN: [SSN removed].';
      expect(removePII(input)).toBe(expected);
    });

    test('should leave the text unchanged if no PII is present', () => {
      const input = 'Just a regular sentence with no PII.';
      const expected = 'Just a regular sentence with no PII.';
      expect(removePII(input)).toBe(expected);
    });

    test('should handle empty strings', () => {
      expect(removePII('')).toBe('');
    });

    test('should handle strings with only whitespace', () => {
      expect(removePII('   ')).toBe('   ');
    });

    test('should handle complex mixed content', () => {
      const input = 'Contact John at john@email.com or call 555-123-4567. His SSN is 123-45-6789 and he lives at 123 Main Street. IP: 192.168.1.1';
      const result = removePII(input);
      expect(result).toContain('[email removed]');
      expect(result).toContain('[phone removed]');
      expect(result).toContain('[SSN removed]');
      expect(result).toContain('[address removed]');
      expect(result).toContain('[IP address removed]');
    });
  });

  describe('removePIIDetailed (enhanced function)', () => {
    test('should return detailed information about removed PII', () => {
      const input = 'Email: test@example.com, Phone: 123-456-7890';
      const result = removePIIDetailed(input);
      
      expect(result).toHaveProperty('cleanedText');
      expect(result).toHaveProperty('removedItems');
      expect(result).toHaveProperty('originalLength');
      expect(result).toHaveProperty('cleanedLength');
      expect(result).toHaveProperty('reductionPercentage');
      
      expect(result.removedItems).toHaveLength(2);
      expect(result.removedItems[0].type).toBe('email');
      expect(result.removedItems[1].type).toBe('phone');
    });

    test('should calculate reduction percentage correctly', () => {
      const input = 'test@example.com';
      const result = removePIIDetailed(input);
      
      expect(result.reductionPercentage).toBeGreaterThan(0);
      expect(result.originalLength).toBeGreaterThan(result.cleanedLength);
    });

    test('should handle text with no PII', () => {
      const input = 'Just regular text';
      const result = removePIIDetailed(input);
      
      expect(result.removedItems).toHaveLength(0);
      expect(result.cleanedText).toBe(input);
      expect(result.reductionPercentage).toBe(0);
    });
  });

  describe('detectPII (detection only)', () => {
    test('should detect PII without removing it', () => {
      const input = 'Email: test@example.com, Phone: 123-456-7890';
      const result = detectPII(input);
      
      expect(result.text).toBe(input);
      expect(result.hasPII).toBe(true);
      expect(result.totalMatches).toBe(2);
      expect(result.detectedItems).toHaveLength(2);
      expect(result.types).toContain('email');
      expect(result.types).toContain('phone');
    });

    test('should provide position information', () => {
      const input = 'Email: test@example.com';
      const result = detectPII(input);
      
      const emailItem = result.detectedItems.find(item => item.type === 'email');
      expect(emailItem.positions).toHaveLength(1);
      expect(emailItem.positions[0]).toHaveProperty('start');
      expect(emailItem.positions[0]).toHaveProperty('end');
      expect(emailItem.positions[0]).toHaveProperty('value');
    });

    test('should handle multiple instances of same PII type', () => {
      const input = 'Email1: test1@example.com, Email2: test2@example.com';
      const result = detectPII(input);
      
      const emailItem = result.detectedItems.find(item => item.type === 'email');
      expect(emailItem.count).toBe(2);
      expect(emailItem.items).toHaveLength(2);
      expect(emailItem.positions).toHaveLength(2);
    });
  });

  describe('analyzePII (comprehensive analysis)', () => {
    test('should provide comprehensive analysis', () => {
      const input = 'Email: test@example.com, Phone: 123-456-7890, SSN: 123-45-6789';
      const result = analyzePII(input);
      
      expect(result).toHaveProperty('original');
      expect(result).toHaveProperty('cleaned');
      expect(result).toHaveProperty('pii');
      expect(result).toHaveProperty('risk');
      
      expect(result.original.text).toBe(input);
      expect(result.pii.totalCount).toBe(3);
      expect(result.risk.level).toBeDefined();
      expect(result.risk.score).toBeGreaterThan(0);
    });

    test('should calculate word counts correctly', () => {
      const input = 'My email is test@example.com and phone is 123-456-7890';
      const result = analyzePII(input);
      
      expect(result.original.wordCount).toBeGreaterThan(0);
      expect(result.cleaned.wordCount).toBeGreaterThan(0);
    });

    test('should handle empty text', () => {
      const result = analyzePII('');
      
      expect(result.original.length).toBe(0);
      expect(result.pii.totalCount).toBe(0);
      expect(result.risk.level).toBe('none');
    });
  });

  describe('validatePIICompliance (compliance checking)', () => {
    test('should validate compliant text', () => {
      const input = 'Just regular text with no PII';
      const result = validatePIICompliance(input);
      
      expect(result.isCompliant).toBe(true);
      expect(result.violations).toHaveLength(0);
      expect(result.violationCount).toBe(0);
      expect(result.riskLevel).toBe('none');
    });

    test('should identify non-compliant text', () => {
      const input = 'Email: test@example.com, SSN: 123-45-6789';
      const result = validatePIICompliance(input);
      
      expect(result.isCompliant).toBe(false);
      expect(result.violations).toHaveLength(2);
      expect(result.violationCount).toBe(2);
      expect(result.riskLevel).toBe('low');
      expect(result.recommendations).toContain('📧 Email detected - Consider using hashed or masked emails');
    });

    test('should provide appropriate risk levels', () => {
      const tests = [
        { input: '', expected: 'none' },
        { input: 'Email: test@example.com', expected: 'low' },
        { input: 'Email: test@example.com, Phone: 123-456-7890, SSN: 123-45-6789', expected: 'medium' }
      ];
      
      tests.forEach(({ input, expected }) => {
        const result = validatePIICompliance(input);
        expect(result.riskLevel).toBe(expected);
      });
    });
  });

  describe('processBatch (batch processing)', () => {
    test('should process multiple texts', () => {
      const texts = [
        'Email: test1@example.com',
        'Phone: 123-456-7890',
        'Regular text'
      ];
      
      const results = processBatch(texts);
      
      expect(results).toHaveLength(3);
      expect(results[0].success).toBe(true);
      expect(results[1].success).toBe(true);
      expect(results[2].success).toBe(true);
      
      expect(results[0].removedItems).toHaveLength(1);
      expect(results[1].removedItems).toHaveLength(1);
      expect(results[2].removedItems).toHaveLength(0);
    });

    test('should handle errors gracefully', () => {
      const texts = [
        'Valid text',
        null,
        'Another valid text'
      ];
      
      const results = processBatch(texts);
      
      expect(results[0].success).toBe(true);
      expect(results[1].success).toBe(false);
      expect(results[1].error).toBeDefined();
      expect(results[2].success).toBe(true);
    });

    test('should throw error for non-array input', () => {
      expect(() => processBatch('not an array')).toThrow('Input must be an array of strings');
    });
  });

  describe('Configuration and customization', () => {
    test('should respect custom options', () => {
      const input = 'Email: test@example.com, Phone: 123-456-7890';
      const options = {
        email: { remove: false },
        phone: { replacement: '[PHONE HIDDEN]' }
      };
      
      const result = removePII(input, options);
      expect(result).toContain('test@example.com');
      expect(result).toContain('[PHONE HIDDEN]');
    });

    test('should handle custom replacement text', () => {
      const input = 'Email: test@example.com';
      const options = {
        email: { replacement: '[CUSTOM EMAIL PLACEHOLDER]' }
      };
      
      const result = removePII(input, options);
      expect(result).toContain('[CUSTOM EMAIL PLACEHOLDER]');
    });

    test('should support selective PII removal', () => {
      const input = 'Email: test@example.com, Phone: 123-456-7890, SSN: 123-45-6789';
      const options = {
        email: { remove: true },
        phone: { remove: false },
        ssn: { remove: true }
      };
      
      const result = removePII(input, options);
      expect(result).toContain('[email removed]');
      expect(result).toContain('123-456-7890');
      expect(result).toContain('[SSN removed]');
    });

    test('getAvailableTypes should return available PII types', () => {
      const types = getAvailableTypes();
      
      expect(Array.isArray(types)).toBe(true);
      expect(types.length).toBeGreaterThan(0);
      expect(types[0]).toHaveProperty('type');
      expect(types[0]).toHaveProperty('description');
      expect(types[0]).toHaveProperty('defaultReplacement');
    });

    test('createCustomPattern should create valid pattern object', () => {
      const pattern = createCustomPattern(
        'customPII',
        /\bcustom\d{3}\b/g,
        '[custom removed]',
        'Custom PII pattern'
      );
      
      expect(pattern).toHaveProperty('customPII');
      expect(pattern.customPII).toHaveProperty('pattern');
      expect(pattern.customPII).toHaveProperty('replacement');
      expect(pattern.customPII).toHaveProperty('description');
    });
  });

  describe('Error handling and edge cases', () => {
    test('should handle null input', () => {
      expect(() => removePII(null)).toThrow('Input cannot be null or undefined');
    });

    test('should handle undefined input', () => {
      expect(() => removePII(undefined)).toThrow('Input cannot be null or undefined');
    });

    test('should handle non-string input', () => {
      expect(() => removePII(123)).toThrow('Input must be a string');
      expect(() => removePII({})).toThrow('Input must be a string');
      expect(() => removePII([])).toThrow('Input must be a string');
    });

    test('should handle very long strings', () => {
      const longText = 'Regular text '.repeat(1000) + 'test@example.com';
      const result = removePII(longText);
      expect(result).toContain('[email removed]');
    });

    test('should handle strings with special characters', () => {
      const input = 'Email: test@example.com! Phone: (123) 456-7890? SSN: 123-45-6789.';
      const result = removePII(input);
      expect(result).toContain('[email removed]');
      expect(result).toContain('[phone removed]');
      expect(result).toContain('[SSN removed]');
    });

    test('should handle malformed PII-like strings', () => {
      const input = 'Not email: test@, Not phone: 123-45, Not SSN: 123-45-67890';
      const result = removePII(input);
      expect(result).toBe(input);
    });
  });

  describe('Performance and consistency', () => {
    test('should handle rapid processing', () => {
      const input = 'Email: test@example.com, Phone: 123-456-7890';
      
      for (let i = 0; i < 100; i++) {
        const result = removePII(input);
        expect(result).toContain('[email removed]');
        expect(result).toContain('[phone removed]');
      }
    });

    test('should produce consistent results', () => {
      const input = 'Email: test@example.com, Phone: 123-456-7890';
      const result1 = removePII(input);
      const result2 = removePII(input);
      const result3 = removePII(input);
      
      expect(result1).toBe(result2);
      expect(result2).toBe(result3);
    });

    test('should handle concurrent processing', async () => {
      const input = 'Email: test@example.com, Phone: 123-456-7890';
      
      const promises = Array.from({ length: 50 }, () => 
        Promise.resolve().then(() => removePII(input))
      );
      
      const results = await Promise.all(promises);
      results.forEach(result => {
        expect(result).toContain('[email removed]');
        expect(result).toContain('[phone removed]');
      });
    });
  });
});