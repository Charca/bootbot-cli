#!/usr/bin/env node
'use strict';
const meow = require('meow');
const pkg = require('../package');

const cli = meow(`
  Usage:
    bootbot <command>
  Commands:
    n, new <name>       Creates a new BootBot Project
    s, start            Starts your bot with a localtunnel server

  ${pkg.name} v${pkg.version}
  License: ${pkg.license}
  Website: ${pkg.homepage}
`, {
  alias: {
    n: 'new',
    s: 'start'
  }
});

module.exports = cli;
