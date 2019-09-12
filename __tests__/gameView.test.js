'use strict';

const gameView = require('../src/gameView');

beforeAll(async (done) => {
    let gameView = new gameView('This is a test string, Jessica', 'Jessica');
    gameView.player.startTime = Date.now();
    gameView.player.endTime = startTime + 60000;
});

afterAll( () => {

});

describe('Client Application Functionality',  () => {

  it('Can initialize a new gameView', () => {

        expect(gameView.stringToType).toEqual('This is a test string');
        expect(gameView.player.name).toEqual('Jessica');
  });

    it('Can calculate words per minute', () => {
        expect(gameView.calculateWordsPerMinute()).toEqual(6)
    });

    it('Can compute time in minutes', () => {
        expect(gameView.computeTimeInMinues()).toEqual(1)
    });

    it('Can compute time in seconds', () => {
        expect(gameView.computeTimeInMinues()).toEqual(60)
    });

    it('Can end the game', () => {

    });

    it('Can update the player info if the correct key is typed', () => {

    });

    it('Can update the player info if the incorrect key is typed', () => {

    });

    it('Can stop recording user input', () => {

    });



});
