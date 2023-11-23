const removePII = require("../index.js");

describe("removePII", () => {
  test("should replace email addresses with a placeholder", () => {
    const input = "My email is jane.doe@example.com.";
    const expected = "My email is [email removed].";
    expect(removePII(input)).toBe(expected);
  });

  test("should replace phone numbers with a placeholder", () => {
    const input = "Call me at 123-456-7890.";
    const expected = "Call me at [phone removed].";
    expect(removePII(input)).toBe(expected);
  });

  test("should replace social security numbers with a placeholder", () => {
    const input = "My SSN is 123-45-6789.";
    const expected = "My SSN is [SSN removed].";
    expect(removePII(input)).toBe(expected);
  });

  test("should replace credit card numbers with a placeholder", () => {
    const input = "My credit card number is 1234 5678 9012 3456.";
    const expected = "My credit card number is [credit card removed].";
    expect(removePII(input)).toBe(expected);
  });

  test("should replace addresses with a placeholder", () => {
    const input = "I live at 123 Main St.";
    const expected = "I live at [address removed].";
    expect(removePII(input)).toBe(expected);
  });

  test("should replace passport numbers with a placeholder", () => {
    const input = "My passport number is AB1234567.";
    const expected = "My passport number is [passport number removed].";
    expect(removePII(input)).toBe(expected);
  });

  test("should replace driver's license numbers with a placeholder", () => {
    const input = "My driver's license is D123456789.";
    const expected = "My driver's license is [driver's license removed].";
    expect(removePII(input)).toBe(expected);
  });

  test("should replace IP addresses with a placeholder", () => {
    const input = "My IP address is 192.168.1.1.";
    const expected = "My IP address is [IP address removed].";
    expect(removePII(input)).toBe(expected);
  });

  test("should handle a string with multiple types of PII", () => {
    const input = "Email: jane.doe@example.com, Phone: 123-456-7890, SSN: 123-45-6789.";
    const expected = "Email: [email removed], Phone: [phone removed], SSN: [SSN removed].";
    expect(removePII(input)).toBe(expected);
  });

  test("should leave the text unchanged if no PII is present", () => {
    const input = "Just a regular sentence with no PII.";
    const expected = "Just a regular sentence with no PII.";
    expect(removePII(input)).toBe(expected);
  });
});
