const crypto = require('crypto');
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  // The standard secure default length for RSA keys is 2048 bits
  modulusLength: 2048,
});

const message = crypto.privateEncrypt(
  {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PADDING,
  },
  // We convert the data string to a buffer
  Buffer.from('plainText'),
);

console.log(message.toString('base64'));
