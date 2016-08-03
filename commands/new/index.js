'use strict';
const isBlank = require('is-blank');
const randomstring = require('randomstring');
const cli = require('../../bin/cli');
const prompt = require('./prompt');
const generate = require('./generate');
const command = cli.input[0];
const projectName = cli.input[1];

if (command === 'new') {
  if (isBlank(projectName)) {
    console.log('You need to specify a name for your new project.');
    process.exit(1);
  }

  prompt().then((options) => {
    console.log('Creating new BootBot Project...');
    options.project_name = projectName;
    options.verify_token = randomstring.generate();
    options.bot_port = 8007;
    options.bot_tunnel_subdomain = 'bootbot' + projectName + randomstring.generate({ length: 8, capitalization: 'lowercase'});
    options.bot_tunnel_subdomain = options.bot_tunnel_subdomain.slice(0, 60);
    generate(projectName, options);
    console.log(`
      Project created!

      Next steps:
      1) cd ${projectName}/
      2) npm install
      3) bootbot start

      For BootBot Documentation go to: https://github.com/Charca/bootbot

      Have fun!
    `);
    process.exit(0);
  });
}
