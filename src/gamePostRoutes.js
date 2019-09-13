'use strict';
const http = require('http');
const Conf = require('conf');
const config = new Conf();

module.exports = {
  /**
     * @method authenticateUserSignIn triggers a POST request to /signin
     * @param username {string}
     * @param password {string}
     */
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

  /**
     * @method UserSignUp triggers a POST request to /singup
     * @param username {string}
     * @param password {string}
     */
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
      res.on('end', () => {
        //config.set('ty', res.headers.token);
        console.log('Thanks for signing up!');
      });
    });

    req.on('error', (e) => {
      console.log(e);
    });

    req.write(JSON.stringify(data));

    req.end();
  },

  /**
     * @method updateUserStats triggers a POST request to /update
     * @param incorrect {string} - the number of incorrect entries
     * @param correct {string} - the number of correct entries
     * @param WPM {string} - words per minute
     */
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
        console.log('\nProfile updated!');
      });
    });

    req.on('error', (e) => {
      console.log(e);
    });

    req.write(JSON.stringify(data));

    req.end();
  },

};

