import _ from 'lodash';

import {
  ADDED, CHANGED, DELETED, NESTED, REMAIN,
} from './constants.js';

const buildThree = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  return keys.map((key) => {
    const value = {
      before: obj1[key],
      after: obj2[key],
    };

    if (!_.has(obj1, key)) {
      return { key, type: ADDED, value };
    }

    if (!_.has(obj2, key)) {
      return { key, type: DELETED, value };
    }

    if (_.isPlainObject(value.before) && _.isPlainObject(value.after)) {
      return {
        key,
        type: NESTED,
        value: null,
        children: buildThree(value.before, value.after),
      };
    }

    if (_.isEqual(obj1[key], obj2[key])) {
      return { key, type: REMAIN, value };
    }

    return { key, type: CHANGED, value };
  });
};

export default buildThree;
