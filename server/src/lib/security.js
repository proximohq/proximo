const crypto = require('crypto');

// Source:
// https://ciphertrick.com/2016/01/18/salt-hash-passwords-using-nodejs-crypto/

/**
 * Generates a random string of the given length.
 *
 * @param {Number} length
 * @return {String}
 */
function generateRandomString (length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

/**
 * Hashes the given string using the salt provided.
 *
 * @param {String} text - The text string to hash.
 * @param {String} salt - The salt to use for hashing.
 * @return {String}
 */
function hash (text, salt) {
  const hasher = crypto.createHmac('sha512', salt);

  hasher.update(text);

  return hasher.digest('hex');
}

module.exports = {
  generateRandomString,
  hash
};
