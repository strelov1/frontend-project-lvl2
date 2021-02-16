/* eslint-disable */

import path from 'path';
import genDiff from '../gendiff.js';

const getFixitureFile = (fileName) => path.join('./src/__tests__/__fixtures__/', fileName);

test('compare file1.json file2.json', () => {

  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  - timeout: 20
  + verbose: true
}`

  const diff = genDiff(getFixitureFile('file1.json'), getFixitureFile('file2.json'));
  
  expect(diff).toEqual(expected);
});

test('compare file1.json file1.json ', () => {
  const expected = `{
    follow: false
    host: hexlet.io
    proxy: 123.234.53.22
    timeout: 50
}`;

  const diff = genDiff(getFixitureFile('file1.json'), getFixitureFile('file1.json'));
  
  expect(diff).toEqual(expected);
});

test('compare file2.json file2.json ', () => {
  const expected = `{
    host: hexlet.io
    timeout: 20
    verbose: true
}`;

  const diff = genDiff(getFixitureFile('file2.json'), getFixitureFile('file2.json'));
  
  expect(diff).toEqual(expected);
});

test('compare file1.json file3.json ', () => {

  const expected = `{
    follow: false
  - host: hexlet.io
  + locathion: hexlet.io
  + protocol: http
  - proxy: 123.234.53.22
  + schema: https
  - timeout: 50
}`;

  const diff = genDiff(getFixitureFile('file1.json'), getFixitureFile('file3.json'));

  expect(diff).toEqual(expected);
});

test('compare file2.json file3.json ', () => {
  const expected = `{
  + follow: false
  - host: hexlet.io
  + locathion: hexlet.io
  + protocol: http
  + schema: https
  - timeout: 20
  - verbose: true
}`;

  const diff = genDiff(getFixitureFile('file2.json'), getFixitureFile('file3.json'));

  expect(diff).toEqual(expected);
});

test('compare file3.json file3.json ', () => {

  const expected = `{
    follow: false
    locathion: hexlet.io
    protocol: http
    schema: https
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
