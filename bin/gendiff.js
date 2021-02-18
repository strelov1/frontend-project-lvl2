#!/usr/bin/env node

import Command from 'commander';
import genDiff from '../src/gendiff.js';

const program = new Command();

program
  .version('0.1.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .description(' Compares two configuration files and shows a difference.')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.format));
  });

program.parse(process.argv);
