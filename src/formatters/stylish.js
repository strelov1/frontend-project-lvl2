import _ from 'lodash';

const addBraces = (value, space) => ['{', ...value, `${space}}`];

const addSpace = (str, space = '    ') => str.split('\n').join(`\n${space}`);

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
 * @returns { string }
 */
export default function stylish(diffObject) {
  const result = diffObject.map((item) => {
    switch (item.type) {
      case 'added':
        return `  + ${item.key}: ${stringify(item.value.after)}`;
      case 'deleted':
        return `  - ${item.key}: ${stringify(item.value.before)}`;
      case 'remain':
        return `    ${item.key}: ${stringify(item.value.before)}`;
      case 'changed':
        if (_.isObject(item.value.before) && _.isObject(item.value.after)) {
          return `    ${item.key}: ${addSpace(stylish(item.value.after))}`;
        }
        return `  - ${item.key}: ${stringify(item.value.before)}\n  + ${item.key}: ${stringify(item.value.after)}`;
      default:
        throw new Error(`Not existed type ${item.type}`);
    }
  });

  return ['{', ...result, '}'].join('\n');
}
