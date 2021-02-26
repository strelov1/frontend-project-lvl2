import fs from 'fs';
import path from 'path';

import parse from './parsers.js';
import buildThree from './buildThree.js';
import formater from './formatters/index.js';

const getFileFormat = (filepath) => path.extname(filepath).slice(1);

export default function genDiff(filepath1, filepath2, styleFormat = 'stylish') {
  const file1 = fs.readFileSync(path.resolve(filepath1), 'utf8');
  const file2 = fs.readFileSync(path.resolve(filepath2), 'utf8');

  const obj1 = parse(file1, getFileFormat(filepath1));
  const obj2 = parse(file2, getFileFormat(filepath2));

  const three = buildThree(obj1, obj2);

  return formater(three, styleFormat);
}
