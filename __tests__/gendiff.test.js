/* eslint-disable */

import path from 'path';
import genDiff from '../src/gendiff.js';

const getFixitureFile = (fileName) => path.join('__tests__/__fixtures__/', fileName);

test('compare file1.json file2.json', () => {
  const diff = genDiff(getFixitureFile('file1.json'), getFixitureFile('file2.json'));

  expect(diff).toEqual(`{
    host: hexlet.io
  + verbose: true
  - proxy: 123.234.53.22
  - follow: false
  - timeout: 50
  + timeout: 20
}`);
});

test('compare file1.json file1.json ', () => {
  const diff = genDiff(getFixitureFile('file1.json'), getFixitureFile('file1.json'));

  expect(diff).toEqual(`{
    host: hexlet.io
    timeout: 50
    proxy: 123.234.53.22
    follow: false
}`);
});

test('compare file2.json file2.json ', () => {
  const diff = genDiff(getFixitureFile('file2.json'), getFixitureFile('file2.json'));

  expect(diff).toEqual(`{
    timeout: 20
    verbose: true
    host: hexlet.io
}`);
});

test('compare file1.json file3.json ', () => {
  const diff = genDiff(getFixitureFile('file1.json'), getFixitureFile('file3.json'));

  expect(diff).toEqual(`{
    follow: false
  + locathion: hexlet.io
  + schema: https
  + protocol: http
  - host: hexlet.io
  - timeout: 50
  - proxy: 123.234.53.22
}`);
});

test('compare file2.json file3.json ', () => {
  const diff = genDiff(getFixitureFile('file2.json'), getFixitureFile('file3.json'));

  expect(diff).toEqual(`{
  + locathion: hexlet.io
  + schema: https
  + protocol: http
  + follow: false
  - timeout: 20
  - verbose: true
  - host: hexlet.io
}`);
});


test('compare file3.json file3.json ', () => {
    const diff = genDiff(getFixitureFile('file3.json'), getFixitureFile('file3.json'));
  
    expect(diff).toEqual(`{
    locathion: hexlet.io
    schema: https
    protocol: http
    follow: false
}`);
  });

