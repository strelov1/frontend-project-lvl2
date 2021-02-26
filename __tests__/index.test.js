import { test, expect, describe } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const formats = [
  'yaml',
  'json',
];

const stylishResult = readFixture('result_stylish.txt');
const plainResult = readFixture('result_plain.txt');

describe('gendiff', () => {
  test.each(formats)('gendiff --format %s', (format) => {
    const filepath1 = getFixturePath(`file1.${format}`);
    const filepath2 = getFixturePath(`file2.${format}`);

    expect(genDiff(filepath1, filepath2)).toEqual(stylishResult);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(stylishResult);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plainResult);

    const jsonData = genDiff(filepath1, filepath2, 'json');
    expect(() => JSON.parse(jsonData)).not.toThrow();
  });
});
