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

  const diffJson = genDiff(getFixitureFile('file1.json'), getFixitureFile('file2.json'));

  expect(diffJson).toEqual(expected);

  
  const diffYaml = genDiff(getFixitureFile('file1.yaml'), getFixitureFile('file2.yaml'));
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

// test('compare file4.json file5.json ', () => {

//   const expected = `{
//     host: hexlet.io
//     timeout: 50
//     proxy: 123.234.53.22
//     follow: false
//   + server2: {
//       host: hexlet.io
//       timeout: 50
//       proxy: 123.234.53.22
//     }
//   - server: {
//       host: hexlet.io
//       timeout: 50
//       proxy: 123.234.53.22
//     }
// }`;
//     const diff = genDiff(getFixitureFile('file4.json'), getFixitureFile('file5.json'));
  
//     expect(diff).toEqual(expected);
// });

// test('compare file5.json file6.json ', () => {

//   const expected = `{
//     host: hexlet.io
//     timeout: 50
//     proxy: 123.234.53.22
//     follow: false
//     server2: {
//       timeout: 50
//       proxy: 123.234.53.22
//     - host: hexlet.io
//     + host: hexlet.com
//   }
// }`;
//     const diff = genDiff(getFixitureFile('file5.json'), getFixitureFile('file6.json'));
  
//     expect(diff).toEqual(expected);
// });
