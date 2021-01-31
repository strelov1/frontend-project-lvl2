/* eslint-disable */

import path from 'path';
import genDiff from '../src/gendiff.js';

const getFixitureFile = (fileName) => path.join('__tests__/__fixtures__/', fileName);

test('compare file1.json file2.json', () => {

  const expected = `{
    host: hexlet.io
  + verbose: true
  - proxy: 123.234.53.22
  - follow: false
  - timeout: 50
  + timeout: 20
}`

  const diff = genDiff(getFixitureFile('file1.json'), getFixitureFile('file2.json'));
  
  expect(diff).toEqual(expected);
});

test('compare file1.json file1.json ', () => {
  const expected = `{
    host: hexlet.io
    timeout: 50
    proxy: 123.234.53.22
    follow: false
}`;

  const diff = genDiff(getFixitureFile('file1.json'), getFixitureFile('file1.json'));
  
  expect(diff).toEqual(expected);
});

test('compare file2.json file2.json ', () => {
  const expected = `{
    timeout: 20
    verbose: true
    host: hexlet.io
}`;

  const diff = genDiff(getFixitureFile('file2.json'), getFixitureFile('file2.json'));
  
  expect(diff).toEqual(expected);
});

test('compare file1.json file3.json ', () => {

  const expected = `{
    follow: false
  + locathion: hexlet.io
  + schema: https
  + protocol: http
  - host: hexlet.io
  - timeout: 50
  - proxy: 123.234.53.22
}`;

  const diff = genDiff(getFixitureFile('file1.json'), getFixitureFile('file3.json'));

  expect(diff).toEqual(expected);
});

test('compare file2.json file3.json ', () => {
  const expected = `{
  + locathion: hexlet.io
  + schema: https
  + protocol: http
  + follow: false
  - timeout: 20
  - verbose: true
  - host: hexlet.io
}`;

  const diff = genDiff(getFixitureFile('file2.json'), getFixitureFile('file3.json'));

  expect(diff).toEqual(expected);
});

test('compare file3.json file3.json ', () => {

  const expected = `{
    locathion: hexlet.io
    schema: https
    protocol: http
    follow: false
}`;
    const diff = genDiff(getFixitureFile('file3.json'), getFixitureFile('file3.json'));
  
    expect(diff).toEqual(expected);
});


test('compare file1.json file4.json ', () => {

  const expected = `{
    host: hexlet.io
    timeout: 50
    proxy: 123.234.53.22
    follow: false
  + server: {
      host: hexlet.io
      timeout: 50
      proxy: 123.234.53.22
    }
}`;
    const diff = genDiff(getFixitureFile('file1.json'), getFixitureFile('file4.json'));
  
    expect(diff).toEqual(expected);
});
