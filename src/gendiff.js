import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';

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
      const changedItem = { [key]: [obj1[key], obj2[key]] };
      return { ...acc, changed: { ...acc.changed, ...changedItem } };
    }
    return acc;
  }, {
    remain: {}, deleted: {}, added: {}, changed: [],
  });
}

/**
 * Функция превращает объект сравнения в строку
 * @param { remain: {}, deleted: {}, added: {}, changed: [] } diffObject
 * @returns { string }
 */
function diffToString(diffObject) {
  const extractDiffValues = (diffValues) => Object.entries(diffValues)
    .map(([key, value]) => `${key}: ${value}`);

  const remain = extractDiffValues(diffObject.remain)
    .map((item) => `  ${item}`);

  const added = extractDiffValues(diffObject.added)
    .map((item) => `+ ${item}`);

  const deleted = extractDiffValues(diffObject.deleted)
    .map((item) => `- ${item}`);

  const changed = Object.entries(diffObject.changed)
    .map(([key, [val1, val2]]) => [
      `- ${key}: ${val1}`,
      `+ ${key}: ${val2}`,
    ]).flat();

  const contain = [...remain, ...added, ...deleted, ...changed]
    .map((item) => `  ${item}`);

  const result = ['{', ...contain, '}'];

  return result.join('\n');
}

const parseObject = (file, format) => {
  if (format === '.json') {
    return JSON.parse(file);
  }
  if (['.yaml', '.yml'].includes(format)) {
    return yaml.safeLoad(file);
  }
  throw Error('Неизвестный формат файла, используете: .json, .yml, .yaml');
};

export default function genDiff(filepath1, filepath2) {
  const file1 = fs.readFileSync(path.resolve(filepath1), 'utf8');
  const file2 = fs.readFileSync(path.resolve(filepath2), 'utf8');

  const obj1 = parseObject(file1, path.extname(filepath1));
  const obj2 = parseObject(file2, path.extname(filepath2));

  const diff = compareObject(obj1, obj2);
  return diffToString(diff);
}
