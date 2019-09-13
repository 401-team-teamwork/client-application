'use strict';

const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const clear = require('clear');
const boxen = require('boxen');

module.exports = {
  initialUserPrompts: () => {
    let questions = [
      {
        name: 'username',
        type: 'input',
        message:chalk.greenBright.bold((boxen('Please Enter Your User Name:' , {
          margin: {top: 1},
          borderStyle: 'round',
          borderColor: 'white',
          float: 'center',
          padding: {left: 1, right: 1}
        }
          ))),
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please Enter Your User Name:';
          }
        },
      },
      {
        name: 'password',
        type: 'password',
        mask: '#',
        message: chalk.greenBright.bold((boxen('Please Enter Your Password:' , {
          margin: {top: 1},
          borderStyle: 'round',
          borderColor: 'white',
          float: 'center',
          padding: {left: 1, right: 1}
        }
        ))),
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please Enter Your Password';
          }
        },
      },
      {
      name:'keyboardInput',
        type: 'input',
        message: chalk.greenBright.bold((boxen('Please Select Your Keyboard: QWERTY  --  Dvorak  --  Colemak' , {
              margin: {top: 1},
              borderStyle: 'round',
              borderColor: 'white',
              float: 'center',
              padding: {left: 1, right: 1}

            }
        ))),
        validate: function(layout){
      if (layout.toLowerCase() === 'qwerty' || layout.toLowerCase() === 'dvorak' || layout.toLowerCase() === 'colemak') {
        return true;
      } else {
        return 'Please Pick a Valid Keyboard Layout';
      }
    },
  },
];
return inquirer.prompt(questions);
},

  welcome: () => {
    clear();
    console.log(
        chalk.blueBright(
            figlet.textSync('SUPERTYPE : REVOLUTION', {font:'ANSI Shadow', horizontalLayout: 'full' })

        ));
    return true;
  }
};


