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
        expect(newView.computeTimeInMinutes()).toEqual(1)
    });

    it('Can compute time in seconds', () => {
        expect(newView.computeTimeInSeconds()).toEqual(60)
    });

    it('Can update the player info if the correct key is typed', () => {
        newView.correctKeyTyped('a');
        expect(newView.player.typedStringInBooleanForm).toEqual('t');
        expect(newView.player.typedString).toEqual('a');
        expect(newView.player.correctEntries).toEqual(1);
    });

    it('Can update the player info if the incorrect key is typed', () => {
        newView.incorrectKeyTyped('b');
        expect(newView.player.typedStringInBooleanForm).toEqual('tf');
        expect(newView.player.typedString).toEqual('ab');
        expect(newView.player.incorrectEntries).toEqual(1);
    });

    it('Can stop recording user input', () => {
        newView.player.currentCursorPosition = 100;
        expect(newView.stopRecordingUserInput()).toBe(true);

    });

    // it('Can read input for the game', () => {
    //     newView.init();
    //     newView.player.currentCursorPosition = 0;
    //     process.env.stdin.write('T');
    //     expect(newView.player.currentCursorPosition).toBe(1);
    // });

    it('Can end the game', () => {
        newView.endTheGame();
        expect(newView.player.finished).toBe(true);
    });


});
