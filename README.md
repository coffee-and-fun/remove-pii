# Remove PII

The `remove-pii` module is a Node.js package designed to help with privacy by removing personally identifiable information (PII) from text. Created by Coffee & Fun LLC and initially developed for Helperbird.com, this module aims to become a standard tool for protecting privacy in text processing.

## Features

- Removes various types of PII, such as email addresses, phone numbers, social security numbers, and more.
- Customizable to suit different use cases.
- Easy to integrate into Node.js projects.

### PII Removal
The core functionality of `remove-pii` includes the identification and removal of various types of PII, such as:

- Email Addresses
- Phone Numbers
- Social Security Numbers (SSN)
- Credit Card Numbers
- Physical Addresses
- Passport Numbers
- Driver's License Numbers
- IP Addresses



## Installation

To install the `@coffeeandfun/remove-pii` module, run the following command in your Node.js project:

```bash
npm install @coffee-and-fun/remove-pii
```
 


## Usage

After installation, you can import and use remove-pii in your Node.js application:

```js

const removePII = require('@coffeeandfun/remove-pii');

const text = "John's email is john@example.com and his phone number is 123-456-7890.";
const cleanedText = removePII(text);

console.log(cleanedText); // Output: "John's email is [email removed] and his phone number is [phone removed]."

```


## Customization Example

To customize the `remove-pii` module, you can pass an options object. For example, to replace email addresses with a specific placeholder and not remove phone numbers, you would use the module as follows:

```javascript
const removePII = require('@coffee-and-fun/remove-pii');

const options = {
  email: { remove: true, replacement: "[custom email placeholder]" },
  phone: { remove: false }
};

const text = "Contact me at john.doe@example.com or 123-456-7890.";
const cleanedText = removePII(text, options);

console.log(cleanedText); // Output: "Contact me at [custom email placeholder] or 123-456-7890."

```


## Contributing
We welcome and encourage contributions to enhance remove-pii, including adding more default cases for PII removal. If you'd like to contribute, please feel free to submit a pull request.


## Running Tests
The module comes with a suite of Jest tests. To run these tests, navigate to the root of the project and execute:

```bash
npm test
```

This command will run all tests and show you the results.


## Acknowledgments
- Developed by: Coffee & Fun LLC.
- Initially Created for: Helperbird - An accessibility extension that makes the web more accessible for everyone.


## License
This project is open source and available under the MIT License.
