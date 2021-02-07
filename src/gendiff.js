import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import stylish from './formater.js';

/**
 * Функция сравнивает два обекта и возвращат результат в виде объекта
 *
 * @param {*} obj1
 * @param {*} obj2
 * @returns { remain: {}, deleted: {}, added: {}, changed: [] }
 */
function compareObject(obj1, obj2) {
  return Object.entries({ ...obj1, ...obj2 }).reduce((acc, curr) => {
    const [key, value] = curr;

    if (!_.has(obj2, key)) {
      const deletedItem = { [key]: value };
      return { ...acc, deleted: { ...acc.deleted, ...deletedItem } };
    }
    if (!_.has(obj1, key)) {
      const addItem = { [key]: value };
      return { ...acc, added: { ...acc.added, ...addItem } };
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        const remainItem = { [key]: value };
        return { ...acc, remain: { ...acc.remain, ...remainItem } };
      }
      if (_.isObject(obj1[key]) || _.isObject(obj2[key])) {
        const changedItem = { [key]: [compareObject(obj1[key], obj2[key])] };
        return { ...acc, changed: { ...acc.changed, ...changedItem } };
      }
      const changedItem = { [key]: [obj1[key], obj2[key]] };
      return { ...acc, changed: { ...acc.changed, ...changedItem } };
    }
    return acc;
  }, {
    remain: {}, deleted: {}, added: {}, changed: [],
  });
}

export default function genDiff(filepath1, filepath2) {
  const file1 = fs.readFileSync(path.resolve(filepath1), 'utf8');
  const file2 = fs.readFileSync(path.resolve(filepath2), 'utf8');

  const obj1 = parse(file1, path.extname(filepath1));
  const obj2 = parse(file2, path.extname(filepath2));

  const diff = compareObject(obj1, obj2);
  return stylish(diff);
}
