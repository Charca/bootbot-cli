'use strict';
const inquirer = require('inquirer');
const questions = [
  {
    name: 'appSecret',
    type: 'password',
    message: 'Facebook App Secret:',
    default: ''
  },
  {
    name: 'accessToken',
    type: 'password',
    message: 'Facebook Page Access Token:',
    default: ''
  }
];

module.exports = () => inquirer.prompt(questions);
