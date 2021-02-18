import _ from 'lodash';

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
export default function plain(diffObject) {
  const result = diffObject.filter((item) => item.type !== 'remain').map((item) => {
    switch (item.type) {
      case 'added':
        return `Property '${item.key}' was added with value: ${stringify(item.value.after)}`;
      case 'deleted':
        return `Property '${item.key}' was removed`;
      case 'changed':
        if (_.isObject(item.value.before) || _.isObject(item.value.after)) {
          return `Property '${item.key}' was updated. From ${stringify(item.value.before)} to ${stringify(item.value.after)}`;
        }
        return `Property '${item.key}' was updated. From ${stringify(item.value.before)} to ${stringify(item.value.after)}`;
      default:
        throw new Error(`Not existed type ${item.type}`);
    }
  });

  return result.join('\n');
}
