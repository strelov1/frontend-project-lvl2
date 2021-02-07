import _ from 'lodash';

const objToString = (obj) => {
  const result = Object.entries(obj).map(([key, value]) => `      ${key}: ${value}`);
  return ['{', ...result, '    }'].join('\n');
};

const extractDiffValues = (diffValues) => Object.entries(diffValues)
  .map(([key, value]) => {
    if (typeof value === 'object') {
      return [key, objToString(value)];
    }
    return [key, value];
  })
  .map(([key, value]) => `${key}: ${value}`);

/**
 * Функция превращает объект сравнения в строку
 * @param { remain: {}, deleted: {}, added: {}, changed: [] } diffObject
 * @returns { string }
 */
export default function stylish(diffObject) {
  const remain = extractDiffValues(diffObject.remain)
    .map((item) => `  ${item}`);

  const added = extractDiffValues(diffObject.added)
    .map((item) => `+ ${item}`);

  const deleted = extractDiffValues(diffObject.deleted)
    .map((item) => `- ${item}`);

  const changed = Object.entries(diffObject.changed)
    .map(([key, [val1, val2]]) => {
      if (_.isObject(val1) || _.isObject(val2)) {
        return `${key}: ${stylish(val1)}`.split('\n')
          .map((item) => `  ${item}`).join('\n');
      }
      return [
        `- ${key}: ${val1}`,
        `+ ${key}: ${val2}`,
      ];
    }).flat();

  const contain = [...remain, ...added, ...deleted, ...changed]
    .map((item) => `  ${item}`);

  const result = ['{', ...contain, '}'];

  return result.join('\n');
}
