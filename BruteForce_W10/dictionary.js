const crypto = require('crypto');
const fs = require('fs');
const https = require('https');

const targetHash = '578ed5a4eecf5a15803abdc49f6152d6';

const passwordListUrl = 'https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/500-worst-passwords.txt';

function fetchPasswordList(url, callback) {
    https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            callback(null, data);
        });
    }).on('error', (err) => {
        callback(err, null);
    });
}

function dictionaryAttack(passwordList) {
    const passwords = passwordList.split('\n');

    for (const password of passwords) {
        const hash = crypto.createHash('md5').update(password.trim()).digest('hex');

        if (hash === targetHash) {
            return password.trim();
        }
    }
    return null; 
}

fetchPasswordList(passwordListUrl, (err, data) => {
    if (err) {
        console.error('Error fetching the password list:', err);
        return;
    }

    console.log('Password list fetched successfully.');
    const password = dictionaryAttack(data);

    if (password) {
        console.log(`Bob's password is: ${password}`);
    } else {
        console.log('Password not found in the dictionary.');
    }
});