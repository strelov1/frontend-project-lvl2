import _ from 'lodash';

const stringifyObj = (obj) => {
  const result = Object.entries(obj).map(([key, value]) => `        ${key}: ${value}`);

  return ['{', ...result, '    }'].join('\n');
};

/**
 * @returns { string }
 */
export default function stylish(diffObject) {
  
  const stringify = (value) => _.isObject(value) ? stringifyObj(value) : value;

  const result = diffObject.map((item) => {
    switch (item.type) {
      case 'added':
        return `  + ${item.key}: ${stringify(item.value.after)}`;
      case 'deleted':
        return `  - ${item.key}: ${stringify(item.value.before)}`;
      case 'remain':
        return `    ${item.key}: ${stringify(item.value.before)}`;
      case 'changed':
        if (_.isObject(item.value.before) || _.isObject(item.value.after)) {
          return `    ${item.key}: ${stylish(item.value.after).split('\n').join('\n    ')}`;
        }
        return `  - ${item.key}: ${stringify(item.value.before)}\n  + ${item.key}: ${stringify(item.value.after)}`;
      default:
        throw new Error(`Not existed type ${item.type}`);
    }
  });

  return ['{', ...result, '}'].join('\n');
}
