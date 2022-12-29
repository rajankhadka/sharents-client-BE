/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const { randomBytes, randomUUID } = require('crypto');

console.log(randomBytes(64).toString('hex'));
// console.log(randomUUID())
