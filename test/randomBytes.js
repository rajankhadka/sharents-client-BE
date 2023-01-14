/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const { randomBytes, randomUUID } = require('crypto');

console.log(`${randomBytes(32).toString('hex')}-${Date.now()}`);
// console.log(randomUUID())
