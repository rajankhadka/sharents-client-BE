const fs = require('fs');
const date = new Date();

console.log(date);
console.log(date.getFullYear());
console.log(date.getDate());
console.log(date.getMonth() + 1);


fs.openSync('open.txt', 'w');