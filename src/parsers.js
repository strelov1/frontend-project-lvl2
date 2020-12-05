import yaml from 'js-yaml';

/**
 * Парсинг строки в обект по заданному формату
 * @param {string} content
 * @param {string} format
 */
export default (content, format) => {
  if (format === '.json') {
    return JSON.parse(content);
  }
  if (['.yaml', '.yml'].includes(format)) {
    return yaml.safeLoad(content);
  }
  throw Error('Неизвестный формат файла, используете: .json, .yml, .yaml');
};
