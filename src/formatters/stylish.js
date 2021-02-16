import _ from 'lodash';

/**
 * @returns { string }
 */
export default function stylish(diffObject) {
  const result = diffObject.map(item => {
    switch (item.type) {
      case 'added':
        return `  + ${item.key}: ${item.value.after}`;
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
