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
    options.projectName = projectName;
    options.verifyToken = randomstring.generate();
    options.botPort = 8007;
    options.botTunnelSubDomain = 'bootbot' +
      projectName.replace(/[^a-z0-9]/gi,'').toLowerCase() +
      randomstring.generate({ length: 8, capitalization: 'lowercase'});
    options.botTunnelSubDomain = options.botTunnelSubDomain.slice(0, 60);
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
