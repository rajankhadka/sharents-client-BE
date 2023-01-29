/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
// const { randomBytes, randomUUID } = require('crypto');

// console.log(`${randomBytes(32).toString('hex')}-${Date.now()}`);
// console.log(randomUUID())

// const length = 10;
// let _length = length
// const min = 0;
// const max = 2;
// const arr = ['digit', 'small', 'capital'];
// const randomPick = [];
// let i= 0;
// let rand = null;
// const eachOtpLength = [];

/**
 * get random position of digit, small, and capital letter
 * with respect of there length
 */
// while(i< 3){
//     let _rand = Math.floor(Math.random() * (max-min+1)) + min;
//     let pick = arr[_rand];
//     if(rand !== _rand && !randomPick.find(item => pick === item)){
//         rand = _rand;
//         if(i === 2){
//             eachOtpLength.push(_length);
//         }else{
//             const otpEachLength = Math.ceil(_length/2);
//             _length = _length - otpEachLength;
//             eachOtpLength.push(otpEachLength);
//         }
//         randomPick.push(pick);
//         arr.slice()
//         i++;
//     }
// }

// /**
//  * generate the new otp with respective their length defined
//  */
// let otp = '';
// for(let i=0;i<3;i++){
//     const letter = randomPick[i];
//     const letterLength = eachOtpLength[i];
//     let min, max;
//     for(let j=0;j<= letterLength-1;j++){
//         if(letter === 'digit'){
//             min = 48;
//             max = 57;
//             const ascii = Math.floor(Math.random() *(max-min+1))+ min;
//             otp+= String.fromCharCode(ascii);
//         }else if(letter === 'small'){
//             min = 97;
//             max=122;
//             const ascii = Math.floor(Math.random() *(max-min+1))+ min;
//             otp+= String.fromCharCode(ascii);
//         }else{
//             min=65;
//             max= 90;
//             const ascii = Math.floor(Math.random() *(max-min+1))+ min;
//             otp+= String.fromCharCode(ascii);
//         }
//     }
// }

// /**
//  * random shuffle of their string
//  */
// const shuffle = otp.split("").sort(() => 0.5-Math.random()).join('');

// console.log(randomPick);
// console.log(eachOtpLength);
// console.log(otp);
// console.log(shuffle);

// const m1 = moment().format();

// const m2 = moment(m1).add(2, 'minute').format();

// console.log(m1)
// console.log(m2);

function addMinutes(date, minutes) {
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}

const d1 = new Date();
let d2 = addMinutes(new Date(d1), 5);
console.log(d1); // 👉️ 2024-03-14T10:08:03.000Z
console.log(d2);
// console.log(d1);