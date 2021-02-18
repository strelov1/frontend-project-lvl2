/* eslint-disable */

import fs from 'fs';
import path from 'path';
import genDiff from '../src/gendiff.js';

const getFixitureFile = (fileName) => path.join('./__fixtures__/', fileName);
const getFileContent = (filePath) => fs.readFileSync(filePath, 'utf8');

const runCases = (path1, path2, diffPath) => {
  const expectedStylish = getFileContent(getFixitureFile(`stylish/${diffPath}.txt`));
  const expectedPlain = getFileContent(getFixitureFile(`plain/${diffPath}.txt`));

  const diffJsonStylish = genDiff(getFixitureFile(`json/${path1}.json`), getFixitureFile(`json/${path2}.json`), 'stylish');
  expect(diffJsonStylish).toEqual(expectedStylish);

  const diffJsonPlain = genDiff(getFixitureFile(`json/${path1}.json`), getFixitureFile(`json/${path2}.json`), 'plain');
  expect(diffJsonPlain).toEqual(expectedPlain);

  const diffYamlStylish = genDiff(getFixitureFile(`yaml/${path1}.yaml`), getFixitureFile(`yaml/${path2}.yaml`), 'stylish');
  expect(diffYamlStylish).toEqual(expectedStylish);

  const diffYamlPlain = genDiff(getFixitureFile(`yaml/${path1}.yaml`), getFixitureFile(`yaml/${path2}.yaml`), 'plain');
  expect(diffYamlPlain).toEqual(expectedPlain);
}


test('compare file1 file2', () => {
  runCases('file1', 'file2', 'diff1');
});

test('compare file1 file1 ', () => {
  runCases('file1', 'file1', 'diff2');
});

test('compare file1 file3', () => {
  runCases('file1', 'file3', 'diff3');
});

test('compare file2 file3 ', () => {
  runCases('file2', 'file3', 'diff4');
});

test('compare file1 file4', () => {
  runCases('file1', 'file4', 'diff5');
});

test('compare file4 file5', () => {
  runCases('file4', 'file5', 'diff6');
});

test('compare file5 file6 ', () => {
  runCases('file5', 'file6', 'diff7');
});

test('compare file7 file8 ', () => {
  runCases('file7', 'file8', 'diff8');
});
