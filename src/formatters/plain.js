import _ from 'lodash';

/**
 * Функция превращает объект сравнения в строку
 * @param { remain: {}, deleted: {}, added: {}, changed: [] } diffObject
 * @returns { string }
 */
export default function plain(diffObject, partKey = '') {
  const string = Object.entries(diffObject)
    .filter(([type]) => type !== 'remain')
    .map(([type, value]) => Object.entries(value).map(([key, diff]) => {
      if (_.isArray(diff)) {
        const [first, second] = diff;
        if (_.isObject(first)) {
          return diff.map((item) => {
            if (_.isObject(item)) {
              return plain(item, key);
            }
            return `Property '${partKey}.${key}' was updated. From '${first}' to '${second}'`;
          });
        }
        return `Property '${partKey}.${key}' was updated. From '${first}' to '${second}'`;
      }

      const val = _.isObject(diff) ? '[complex value]' : diff;

      return `Property1 '${key}' was ${type} with value: ${val}`;
    })).flat(10);

  return string.join('\n');
}
