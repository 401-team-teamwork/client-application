'use strict';

require('dotenv').config();

const socketIo = require('socket.io-client');
const initialUserPrompts = require('./userPrompts').initialUserPrompts;
const welcome = require('./userPrompts').welcome;

const gameView = require('gameView');


const clear = require('clear');

let API_URL = 'http://localhost:8080';

if(process.env.NODE_ENV === 'production'){
    API_URL = 'https://supertype-rev-socket-server.herokuapp.com/';
} else if (process.env.NODE_ENV === 'development'){
    API_URL = 'http://localhost:8080';
}

const server = socketIo.connect(`${API_URL}`);

//Socket listeners
server.on('log', message => {
    console.log(message);

});

server.on('new-game', game => {
    let view = new gameView(game.text, user.username);
    clear();
    console.log('New Game!');
    view.init();
});

server.on('end-game', message => {
    console.log(message);
    console.log(`Thank you for playing, ${user.username}!\n\n`);
    process.exit();
});

//Start the game flow
const run = async () => {
    welcome();
    let newUser = await initialUserPrompts()
    console.log(newUser);
    server.emit('new-player', newUser);
    return newUser;
};

let user = run();

module.exports = user;
