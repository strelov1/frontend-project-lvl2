/* eslint-disable */

import fs from 'fs';
import path from 'path';
import genDiff from '../gendiff.js';

const getFixitureFile = (fileName) => path.join('./src/__tests__/__fixtures__/', fileName);
const getFileContent = (filePath) => fs.readFileSync(filePath, 'utf8');

test('compare file1 file2', () => {

  const expected = getFileContent(getFixitureFile('diff1.txt'));

  const diffJson = genDiff(getFixitureFile('file1.json'), getFixitureFile('file2.json'));
  expect(diffJson).toEqual(expected);

  
  const diffYaml = genDiff(getFixitureFile('file1.yaml'), getFixitureFile('file2.yaml'));
  expect(diffYaml).toEqual(expected);
});

test('compare file1 file1 ', () => {
  const expected = getFileContent(getFixitureFile('diff2.txt'));

  const diffJson = genDiff(getFixitureFile('file1.json'), getFixitureFile('file1.json'));

  expect(diffJson).toEqual(expected);

  
  const diffYaml = genDiff(getFixitureFile('file1.yaml'), getFixitureFile('file1.yaml'));
  expect(diffYaml).toEqual(expected);
});


test('compare file1 file3', () => {
  const expected = getFileContent(getFixitureFile('diff3.txt'));

  const diffJson = genDiff(getFixitureFile('file1.json'), getFixitureFile('file3.json'));

  expect(diffJson).toEqual(expected);

  
  const diffYaml = genDiff(getFixitureFile('file1.yaml'), getFixitureFile('file3.yaml'));

  expect(diffYaml).toEqual(expected);
});

test('compare file2 file3 ', () => {
  const expected = getFileContent(getFixitureFile('diff4.txt'));

  const diffJson = genDiff(getFixitureFile('file2.json'), getFixitureFile('file3.json'));

  expect(diffJson).toEqual(expected);

  
  const diffYaml = genDiff(getFixitureFile('file2.yaml'), getFixitureFile('file3.yaml'));

  expect(diffYaml).toEqual(expected);
});


test('compare file1 file4', () => {

  const expected = getFileContent(getFixitureFile('diff5.txt'));

  const diffJson = genDiff(getFixitureFile('file1.json'), getFixitureFile('file4.json'));

  expect(diffJson).toEqual(expected);

  
  const diffYaml = genDiff(getFixitureFile('file1.yaml'), getFixitureFile('file4.yaml'));

  expect(diffYaml).toEqual(expected);
});

test('compare file4 file5', () => {
  const expected = getFileContent(getFixitureFile('diff6.txt'));

  const diffJson = genDiff(getFixitureFile('file4.json'), getFixitureFile('file5.json'));

  expect(diffJson).toEqual(expected);

  
  const diffYaml = genDiff(getFixitureFile('file4.yaml'), getFixitureFile('file5.yaml'));

  expect(diffYaml).toEqual(expected);
    
  const diff = genDiff(getFixitureFile('file4.json'), getFixitureFile('file5.json'));
  
});

test('compare file5 file6 ', () => {
  const expected = getFileContent(getFixitureFile('diff7.txt'));

  const diffJson = genDiff(getFixitureFile('file5.json'), getFixitureFile('file6.json'));

  expect(diffJson).toEqual(expected);

  
  const diffYaml = genDiff(getFixitureFile('file5.yaml'), getFixitureFile('file6.yaml'));

  expect(diffYaml).toEqual(expected);
});
