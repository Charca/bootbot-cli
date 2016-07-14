#!/usr/bin/env node
'use strict';
const meow = require('meow');
const pkg = require('../package');

const cli = meow(`
  Usage:
    bootbot <command>
  Commands:
    n, new          Creates a new BootBot Project

  ${pkg.name} v${pkg.version}
  License: ${pkg.license}
  Website: ${pkg.homepage}
`, {
  alias: {
    n: 'new'
  }
});

module.exports = cli;
