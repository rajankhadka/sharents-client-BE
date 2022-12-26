/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const { randomBytes } = require('crypto');

console.log(randomBytes(32).toString('hex'));
