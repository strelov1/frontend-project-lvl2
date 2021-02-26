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
export default function plain(three, accKeys = []) {
  const filteredThree = three.filter(({ type }) => type !== REMAIN);
  const result = filteredThree.map((item) => {
    const keys = [...accKeys, item.key];
    const propertyName = keys.join('.');
    switch (item.type) {
      case ADDED:
        return `Property '${propertyName}' was added with value: ${stringify(item.value.after)}`;
      case DELETED:
        return `Property '${propertyName}' was removed`;
      case CHANGED:
        return `Property '${propertyName}' was updated. From ${stringify(item.value.before)} to ${stringify(item.value.after)}`;
      case NESTED:
        return plain(item.children, keys);
      default:
        throw new Error(`Not existed type ${item.type}`);
    }
  });

  return result.join('\n');
}
