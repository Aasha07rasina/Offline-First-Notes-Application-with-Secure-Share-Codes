const { nanoid } = require('nanoid'); // Use version 3 for require() support

/**
 * Utility to generate a short, unique, uppercase alphanumeric code.
 * Fulfills the "Short alphanumeric code generation" requirement. 
 */
const generateShareCode = () => {
  // Generates a 6-character random string and makes it uppercase for better UX
  return nanoid(6).toUpperCase(); 
};

module.exports = { generateShareCode };