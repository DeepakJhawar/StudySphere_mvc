const crypto = require('crypto');

function generateSecureOTP() {
    return crypto.randomBytes(3).toString('hex').toUpperCase();
}

module.exports = generateSecureOTP;