#!/usr/bin/env node

const { readFileSync } = require('node:fs');

const chartToJson = require('../src');

const [file] = process.argv.slice(2);

if (!file) {
  process.stderr.write('Error: Missing input file.\n');
  process.exit(1);
}

process.stdout.write(
  JSON.stringify(chartToJson(readFileSync(file, 'utf8')), null, 2)
);
process.exit();
