/* eslint-disable */

import path from 'path';
import genDiff from '../src/gendiff.js';

const getFixitureFile = (fileName) => path.join('__tests__/__fixtures__/', fileName);

test('compare file1.yml file2.yml', () => {

  const expected = `{
    host: hexlet.io
  + verbose: true
  - proxy: 123.234.53.22
  - follow: false
  - timeout: 50
  + timeout: 20
}`

  const diff = genDiff(getFixitureFile('file1.yml'), getFixitureFile('file2.yml'));
  
  expect(diff).toEqual(expected);
});

test('compare file1.yml file1.yml ', () => {
  const expected = `{
    host: hexlet.io
    timeout: 50
    proxy: 123.234.53.22
    follow: false
}`;

  const diff = genDiff(getFixitureFile('file1.yml'), getFixitureFile('file1.yml'));
  
  expect(diff).toEqual(expected);
});

test('compare file2.yml file2.yml ', () => {
  const expected = `{
    timeout: 20
    verbose: true
    host: hexlet.io
}`;

  const diff = genDiff(getFixitureFile('file2.yml'), getFixitureFile('file2.yml'));
  
  expect(diff).toEqual(expected);
});

test('compare file1.yml file3.yml ', () => {

  const expected = `{
    follow: false
  + locathion: hexlet.io
  + schema: https
  + protocol: http
  - host: hexlet.io
  - timeout: 50
  - proxy: 123.234.53.22
}`;

  const diff = genDiff(getFixitureFile('file1.yml'), getFixitureFile('file3.yml'));

  expect(diff).toEqual(expected);
});

test('compare file2.yml file3.yml ', () => {
  const expected = `{
  + locathion: hexlet.io
  + schema: https
  + protocol: http
  + follow: false
  - timeout: 20
  - verbose: true
  - host: hexlet.io
}`;

  const diff = genDiff(getFixitureFile('file2.yml'), getFixitureFile('file3.yml'));

  expect(diff).toEqual(expected);
});
