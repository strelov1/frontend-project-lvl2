import _ from 'lodash';
import {
  ADDED, CHANGED, DELETED, NESTED, REMAIN,
} from '../constants.js';

const addBraces = (value, space) => ['{', ...value, `${space}}`];

const addSpace = (str, space) => str.split('\n').join(`\n${space}`);

const stringifyObj = (obj, space = '    ') => {
  const result = Object.entries(obj).map(([key, value]) => {
    if (_.isObject(value)) {
      return `${key}: ${addSpace(stringifyObj(value, `${space}`), space)}`;
    }
    return `${key}: ${value}`;
  });

  return addBraces(result.map((item) => `${space}${space}${item}`), space).join('\n');
};

const stringify = (value) => (_.isObject(value) ? stringifyObj(value) : value);

/**
 * Функция превращает объект сравнения в строку
 * @returns { string }
 */
export default function stylish(three) {
  const result = three.map((item) => {
    switch (item.type) {
      case ADDED:
        return `  + ${item.key}: ${stringify(item.value.after)}`;
      case DELETED:
        return `  - ${item.key}: ${stringify(item.value.before)}`;
      case REMAIN:
        return `    ${item.key}: ${stringify(item.value.before)}`;
      case CHANGED:
        return `  - ${item.key}: ${stringify(item.value.before)}\n  + ${item.key}: ${stringify(item.value.after)}`;
      case NESTED:
        return `    ${item.key}: ${addSpace(stylish(item.children), '    ')}`;
      default:
        throw new Error(`Not existed type ${item.type}`);
    }
  });

  return addBraces(result, '').join('\n');
}
