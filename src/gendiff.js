import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import getFormater from './formatters/index.js';

/**
 * Функция сравнивает два обекта и возвращат результат в виде объекта
 *
 * @param {*} obj1
 * @param {*} obj2
 */
function compareObject(obj1, obj2) {
  const keys = Object.keys({ ...obj1, ...obj2 });

  return keys.sort().reduce((acc, key) => {
    const existObj1 = _.has(obj1, key);
    const existObj2 = _.has(obj2, key);

    const value = {
      before: obj1[key],
      after: obj2[key],
    };

    if (!existObj1 && existObj2) {
      return [...acc, { key, type: 'added', value }];
    }
    if (existObj1 && !existObj2) {
      return [...acc, { key, type: 'deleted', value }];
    }
    if (existObj1 && existObj2) {
      if (_.isEqual(obj1[key], obj2[key])) {
        return [...acc, { key, type: 'remain', value }];
      }
      if (_.isObject(value.before) && _.isObject(value.after)) {
        return [...acc,
          {
            key,
            type: 'changed',
            value: {
              before: value.before,
              after: compareObject(value.before, value.after),
            },
          },
        ];
      }
      return [...acc, { key, type: 'changed', value }];
    }
    return acc;
  }, []);
}

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const file1 = fs.readFileSync(path.resolve(filepath1), 'utf8');
  const file2 = fs.readFileSync(path.resolve(filepath2), 'utf8');

  const obj1 = parse(file1, path.extname(filepath1));
  const obj2 = parse(file2, path.extname(filepath2));

  const diff = compareObject(obj1, obj2);

  return getFormater(formatName)(diff);
}
