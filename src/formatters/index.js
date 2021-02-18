import stylish from './stylish.js';
import plain from './plain.js';

export default (formatName) => {
  const formatters = {
    stylish,
    plain,
    json: (obj) => JSON.stringify(obj, null, 4),
  };

  const formater = formatters[formatName] ?? false;

  if (!formater) {
    throw new Error(`Не известный формат представления ${formatName}`);
  }

  return formater;
};
