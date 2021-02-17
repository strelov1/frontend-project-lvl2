import _ from 'lodash';

const stringifyObj = (obj) => {
  const result = Object.entries(obj).map(([key, value]) => `        ${key}: ${value}`);

  return ['{', ...result, '    }'].join('\n');
};

/**
 * @returns { string }
 */
export default function stylish(diffObject) {
  const result = diffObject.map((item) => {
    switch (item.type) {
      case 'added':
        return `  + ${item.key}: ${_.isObject(item.value.after) ? stringifyObj(item.value.after) : item.value.after}`;
      case 'deleted':
        return `  - ${item.key}: ${item.value.before}`;
      case 'remain':
        return `    ${item.key}: ${item.value.before}`;
      case 'changed':
        return `  - ${item.key}: ${item.value.before}\n  - ${item.key}: ${item.value.after}`;
    }
  });

  return ['{', ...result, '}'].join('\n');
}
