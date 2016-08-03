'use strict';
const _ = require('lodash');
const fs = require('fs-extra');

const templateDir = global.path + '/template/';
const templateFiles = [
  'config/default.json',
  'package.json',
  'README.md'
];

module.exports = (dest, options) => {
  if (!dest) {
    console.log('Dest folder not specified.');
    process.exit(1);
  }

  if (fs.existsSync(dest)) {
    console.log(`Error: A directory with that name already exists.`)
    process.exit(1);
  }

  fs.mkdirsSync(dest);
  try {
    fs.copySync(templateDir, dest);
    templateFiles.forEach((file) => {
      const filePath = dest + '/' + file;
      const fileContents = fs.readFileSync(filePath, 'utf8');
      fs.writeFileSync(filePath, _.template(fileContents)(options));
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
