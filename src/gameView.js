// #!/usr/bin/env node


require('dotenv').config();
const events = require('./events.js');
const color = require('colors');
const ansiEscapes = require('ansi-escapes');

const userSignUp = require('./gamePostRoutes').UserSignUp;

const updateUserStats = require('./gamePostRoutes').updateUserStats;
const clear = require('clear');
const colemak = require('convert-layout/colemak');
const dvorak = require('convert-layout/dvorak');

color.setTheme({
  correct: 'green',
  incorrect: 'red',
});

const EXIT_GAME = '\u0003';
const DELETE_LAST_ENTRY = '\u007f';
const INDICATE_INCORRECT_KEYPRESS = 'f';
const INDICATE_CORRECT_KEYPRESS = 't';
const ONE_MINUTE = 60000;
const ONE_SECOND = 1000;

const stdin = process.stdin;
const stdout = process.stdout;
let user;

/** Class representing a generic game view. */
class gameView{

  /**
   * Game View constructor
   * @param string {string} - the string to type in the game
   * @param name {string} - the name of the player
   */
  constructor(string, name){
    this.stringToType = string;
    this.player = {
      name: name,
      currentCursorPosition: 0,
      typedString: '',
      correctEntries: 0,
      incorrectEntries: 0,
      startTime: null,
      endTime: null,
      //this string will track if each letter is correct or incorrect as entered by the user
      typedStringInBooleanForm: '',
      wordsPerMinute: 0,
      finished: false,
    };
  }

  /**
   * Calculate the words typed per minute
   * @returns {number}
   */
  calculateWordsPerMinute(){
    const wordsArray = this.stringToType.split(' ');
    const length = wordsArray.length;
    const time = this.computeTimeInMinutes();
    return length/time;
  }

  /**
   * Compute the time in minutes it took to play the game
   * @returns {number} - number of minutes
   */
  computeTimeInMinutes(){
    return (this.player.endTime - this.player.startTime)/ONE_MINUTE;
  }

  /**
   * Compute the time in seconds it took to play the game
   * @returns {number} - number of seconds
   */
  computeTimeInSeconds(){
    return (this.player.endTime - this.player.startTime)/ONE_SECOND;
  }

  /**
   * Run end of game functionality to update the socket and game statistics
   */
  endTheGame() {
    if(!this.player.finished){
      stdout.write(`\nYou took ${this.computeTimeInSeconds()} Seconds`);
      stdout.write(`\nYou typed ${this.player.typedString} \n Correct Keys: ${this.player.correctEntries} \n Incorrect Keys: ${this.player.incorrectEntries}`);
      this.player.wordsPerMinute = this.calculateWordsPerMinute();
      this.player.finished = true;
      events.emit('player-finished', {player: this.player.name});
      updateUserStats(this.player.correct, this.player.incorrect, this.player.wordsPerMinute);
    }
  }

  correctKeyTyped(key){
    this.player.typedStringInBooleanForm += INDICATE_CORRECT_KEYPRESS;
    this.player.typedString += key;
    this.player.correctEntries++;
    stdout.write(key.correct);
  }

  /**
   * Updates the players data on an incorrect keystroke
   * @param key {string} - the key typed by the user
   */
  incorrectKeyTyped(key){
    this.player.typedStringInBooleanForm += INDICATE_INCORRECT_KEYPRESS;
    this.player.typedString += key;
    this.player.incorrectEntries++;
    stdout.write(key.incorrect);
  }

  /**
   * Ensures the game stops reading input once the user is finished typing the string
   * @returns {boolean}
   */
  stopRecordingUserInput(){
    if (this.player.currentCursorPosition >= this.stringToType.length){
      return true;
    }
    else{
      return false;
    }
  }

  init(){
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');

    stdout.write(`\nStart typing:\n${this.stringToType}\n\n`);

    this.player.startTime = Date.now();

    stdin.on('data', (key) => {
      if (key === EXIT_GAME) {
        process.exit();
      }
      if(user.keyboardInput === 'dvorak'){
        key = dvorak.fromEn(key);
      } else if(user.keyboardInput === 'colemak'){
        key = colemak.fromEn(key);
      }
      //control + C exits the program
      if(this.stopRecordingUserInput()){
        this.player.endTime = Date.now();
        this.endTheGame();

      } else {
        if (key === DELETE_LAST_ENTRY){
          //if the last letter you typed was wrong...
          if(this.player.typedStringInBooleanForm.slice(-1) === INDICATE_INCORRECT_KEYPRESS){
            this.player.incorrectEntries--;
          }
          //if the last letter you typed was correct
          else if (this.player.typedStringInBooleanForm.slice(-1) === INDICATE_CORRECT_KEYPRESS){
            this.player.correctEntries--;
          }
          this.player.typedString = this.player.typedString.slice(0, -1);
          this.player.currentCursorPosition -= 1;
          //move the cursor backone space
          stdout.write(ansiEscapes.cursorBackward(1));
        }
        else {
          if (key === this.stringToType[this.player.currentCursorPosition]) {
            this.correctKeyTyped(key);
          } else {
            this.incorrectKeyTyped(key);
          }
          this.player.currentCursorPosition++;
        }
      }
    });
    this.player.currentCursorPosition = 0;
  }

}

events.on('user', (userObject) => {
    user = userObject;
});

module.exports = gameView;
