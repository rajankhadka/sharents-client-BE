/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
// const { randomBytes, randomUUID } = require('crypto');

// console.log(`${randomBytes(32).toString('hex')}-${Date.now()}`);
// console.log(randomUUID())

const length = 10;
let _length = length
const min = 0;
const max = 2;
const arr = ['digit', 'small', 'capital'];
const randomPick = [];
let i= 0;
let rand = null;
const eachOtpLength = [];
while(i< 3){
    let _rand = Math.floor(Math.random() * (max-min+1)) + min;
    let pick = arr[_rand];
    if(rand !== _rand && !randomPick.find(item => pick === item)){
        rand = _rand;
        if(i === 2){
            eachOtpLength.push(_length);
        }else{
            const otpEachLength = Math.ceil(_length/2);
            _length = _length - otpEachLength;
            eachOtpLength.push(otpEachLength);
        }
        randomPick.push(pick);
        arr.slice()
        i++;
    }
}


let otp = '';

for(let i=0;i<3;i++){
    const letter = randomPick[i];
    const letterLength = eachOtpLength[i];
    let min, max;
    for(let j=0;j<= letterLength;j++){
        if(letter === 'digit'){
            min = 48;
            max = 57;
            const ascii = Math.floor(Math.random() *(max-min+1))+ min;
            otp+= String.fromCharCode(ascii);
        }else if(letter === 'small'){
            min = 97;
            max=122;
            const ascii = Math.floor(Math.random() *(max-min+1))+ min;
            otp+= String.fromCharCode(ascii);
        }else{
            min=65;
            max= 90;
            const ascii = Math.floor(Math.random() *(max-min+1))+ min;
            otp+= String.fromCharCode(ascii);
        }
    }
}

//random shuffle string;
let shuffle = '';
let shuffleChar = null;
while(i< length){
    let _shuffleChar = Math.floor(Math.random() * (length));
    let shuuflePick = otp[_shuffleChar];
    if(shuffleChar !== _shuffleChar ){
        shuffleChar = _shuffleChar;
    }
}

console.log(randomPick);
console.log(eachOtpLength);
console.log(otp);
console.log(shuuflePick);