import _ from 'lodash';

import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
  json: (obj) => JSON.stringify(obj, null, 4),
};

export default (content, format) => {
  if (!_.has(formatters, format)) {
    throw new Error(`Unknown format: ${format}`);
  }

  const formater = formatters[format];
  return formater(content);
};
