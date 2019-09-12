'use strict';

const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const clear = require('clear');

module.exports = {
  getUserNameAndPassword: () => {
    let questions = [
      {
        name: 'username',
        type: 'input',
        message: 'Please Enter Your User Name:',
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
        message: 'Please Enter your Password',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please Enter Your Password';
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
            figlet.textSync('SUPERTYPE :   REVOLUTION', {font:'ANSI Shadow', horizontalLayout: 'full' })
        ))
  }
};


