import _ from 'lodash';
import {
  ADDED, CHANGED, DELETED, NESTED, REMAIN,
} from '../constants.js';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

/**
 * Функция превращает объект сравнения в строку
 * @returns { string }
 */
export default function plain(diffObject, parentKeys = '') {
  const result = diffObject.filter((item) => item.type !== REMAIN).map((item) => {
    switch (item.type) {
      case ADDED:
        return `Property '${parentKeys}${item.key}' was added with value: ${stringify(item.value.after)}`;
      case DELETED:
        return `Property '${parentKeys}${item.key}' was removed`;
      case CHANGED:
        return `Property '${parentKeys}${item.key}' was updated. From ${stringify(item.value.before)} to ${stringify(item.value.after)}`;
      case NESTED:
        return plain(item.children, `${parentKeys}${item.key}.`);
      default:
        throw new Error(`Not existed type ${item.type}`);
    }
  });

  return result.join('\n');
}
