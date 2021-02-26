import yaml from 'js-yaml';
import _ from 'lodash';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  yaml: yaml.safeLoad,
};

/**
 * Парсинг строки в обект по заданному формату
 * @param {string} content
 * @param {string} format
 */
export default (content, format) => {
  if (!_.has(parsers, format)) {
    throw Error(`Неизвестный формат файла: ${format} | Используете: .json, .yml, .yaml`);
  }
  const parser = parsers[format];
  return parser(content);
};
