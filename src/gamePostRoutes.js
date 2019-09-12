'use strict';
const http = require('http');
const Conf = require('conf');
const config = new Conf();

module.exports = {

    authenticateUserSignIn: (username, password) => {
        const data = {
            username: username,
            password: password,
            token: config.get('ty'),
        };
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/signin',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            // console.log(data);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {

                // console.log(chunk);
            });
            res.on('end', () => {
                console.log('Thanks for signing in!');
            });
        });

        req.on('error', (e) => {
            console.log(e);
        });

        req.write(JSON.stringify(data));

        req.end();
    },

    UserSignUp: (username, password) =>
{
    const data = {
        username: username,
        password: password,
    };
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/signup',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
           // console.log(chunk);
        });
        res.on('end', () => {;
            console.log('Thanks for signing up!');
        });
    });

    req.on('error', (e) => {
        console.log(e);
    });

    req.write(JSON.stringify(data));

    req.end();
},

updateUserStats: (incorrectE, correctE, WPM) => {
    const data = {
        token: config.get('ty'),
        incorrectEntries: incorrectE,
        correctEntries: correctE,
        wordsPerMinute: WPM,
    };
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/update',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            // console.log(chunk);
        });
        res.on('end', () => {
            console.log('Profile updated!');
        });
    });

    req.on('error', (e) => {
        console.log(e);
    });

    req.write(JSON.stringify(data));

    req.end();
  },

};

