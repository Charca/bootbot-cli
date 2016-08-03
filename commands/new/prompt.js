'use strict';
const inquirer = require('inquirer');
const questions = [
  {
    name: 'app_secret',
    type: 'password',
    message: 'Facebook App Secret:',
    default: ''
  },
  {
    name: 'access_token',
    type: 'password',
    message: 'Facebook Page Access Token:',
    default: ''
  }
];

module.exports = () => inquirer.prompt(questions);
