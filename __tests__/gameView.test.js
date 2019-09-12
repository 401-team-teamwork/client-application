'use strict';

const gameView = require('../src/gameView');

let newView = new gameView('This is a test string, Jessica', 'Jessica');
newView.player.startTime = Date.now();
newView.player.endTime = newView.player.startTime + 60000;

describe('Client Application Functionality',  () => {

  it('Can initialize a new gameView', () => {
        expect(newView.stringToType).toEqual('This is a test string, Jessica');
        expect(newView.player.name).toEqual('Jessica');
  });

    it('Can calculate words per minute', () => {
        expect(newView.calculateWordsPerMinute()).toEqual(6)
    });

    it('Can compute time in minutes', () => {
        expect(newView.computeTimeInMinues()).toEqual(1)
    });

    it('Can compute time in seconds', () => {
        expect(newView.computeTimeInMinues()).toEqual(60)
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
