import _ from 'lodash';
import {
  ADDED, CHANGED, DELETED, NESTED, UNCHANGED,
} from '../constants.js';

const spacesCount = 4;
const replacer = ' ';
const openSymbol = '{';
const closeSymbol = '}';

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const indentSize = depth * spacesCount;
  const currentIndent = replacer.repeat(indentSize);
  const closeIndent = replacer.repeat(indentSize - spacesCount);

  const lines = Object
    .entries(value)
    .map(([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`);

  return [
    openSymbol,
    ...lines,
    `${closeIndent}${closeSymbol}`,
  ].join('\n');
};

const signMap = {
  [ADDED]: '+',
  [DELETED]: '-',
};

/**
 * Функция превращает объект сравнения в строку
 * @returns { string }
 */
export default function stylish(three) {
  const iter = (currentValue, depth) => {
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize - 2);
    const closeIndent = replacer.repeat(indentSize - spacesCount);

    const prefix = (type, key) => {
      const sign = signMap[type] || replacer;
      return `${currentIndent}${sign}${replacer}${key}`;
    };

    const lines = currentValue.flatMap(({
      key, type, value, children,
    }) => {
      switch (type) {
        case ADDED:
          return `${prefix(type, key)}: ${stringify(value.after, depth + 1)}`;
        case DELETED:
          return `${prefix(type, key)}: ${stringify(value.before, depth + 1)}`;
        case UNCHANGED:
          return `${prefix(type, key)}: ${stringify(value.before, depth + 1)}`;
        case CHANGED:
          return [
            `${prefix(DELETED, key)}: ${stringify(value.before, depth + 1)}`,
            `${prefix(ADDED, key)}: ${stringify(value.after, depth + 1)}`,
          ];
        case NESTED:
          return `${prefix(type, key)}: ${iter(children, depth + 1)}`;
        default:
          throw new Error(`Not existed type ${type}`);
      }
    });

    return [
      openSymbol,
      ...lines,
      `${closeIndent}${closeSymbol}`,
    ].join('\n');
  };

  return iter(three, 1);
}
