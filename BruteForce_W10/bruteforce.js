const crypto = require('crypto');

const targetHash = '5531a5834816222280f20d1ef9e95f69';

function bruteForcePsw() {
    for (let i = 0; i <= 9999; i++) {
        const psw = i.toString().padStart(4, '0');

        const hash = crypto.createHash('md5').update(psw).digest('hex');

        if (hash === targetHash) {
            return psw;
        }
    }
    return null; 
}

const psw = bruteForcePsw();
if (psw) {
    console.log(`Alice's PIN is: ${psw}`);
} else {
    console.log('PIN not found.');
}