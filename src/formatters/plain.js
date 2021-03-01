import _ from 'lodash';
import {
  ADDED, CHANGED, DELETED, NESTED, UNCHANGED,
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
export default function plain(tree, accKeys = []) {
  const filteredTree = tree.filter(({ type }) => type !== UNCHANGED);
  const lines = filteredTree.map(({
    type, key, value, children,
  }) => {
    const keys = [...accKeys, key];
    const propName = keys.join('.');
    switch (type) {
      case ADDED:
        return `Property '${propName}' was added with value: ${stringify(value.after)}`;
      case DELETED:
        return `Property '${propName}' was removed`;
      case CHANGED:
        return `Property '${propName}' was updated. From ${stringify(value.before)} to ${stringify(value.after)}`;
      case NESTED:
        return plain(children, keys);
      default:
        throw new Error(`Not existed type: ${type}`);
    }
  });

  return lines.join('\n');
}
