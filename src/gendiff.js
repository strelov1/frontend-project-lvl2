import fs from 'fs';
import path from 'path';
import _ from 'lodash';

function compareObject(obj1, obj2) {
  const mergedObject = { ...obj1, ...obj2 };
  const initAcc = {
    remain: {},
    deleted: {},
    added: {},
    changed: [],
  };

  return Object.entries(mergedObject).reduce((acc, curr) => {
    const [key, value] = curr;
    if (!_.has(obj2, key)) {
      const deletedItem = { [key]: value };
      return { ...acc, deleted: { ...acc.deleted, ...deletedItem } };
    }
    if (!_.has(obj1, key)) {
      const addItem = { [key]: value };
      return { ...acc, added: { ...acc.added, ...addItem } };
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        const remainItem = { [key]: value };
        return { ...acc, remain: { ...acc.remain, ...remainItem } };
      }
      const changedItem = { [key]: [obj1[key], obj2[key]] };
      return { ...acc, changed: { ...acc.changed, ...changedItem } };
    }
    return acc;
  }, initAcc);
}

function extractDiffValues(diffValues) {
  return Object.entries(diffValues).map(([key, value]) => `${key}: ${value}`);
}

function showDiff(diff) {
  const remain = extractDiffValues(diff.remain)
    .map((item) => `  ${item}`);

  const added = extractDiffValues(diff.added)
    .map((item) => `+ ${item}`);

  const deleted = extractDiffValues(diff.deleted)
    .map((item) => `- ${item}`);

  const changed = Object.entries(diff.changed)
    .map(([key, [val1, val2]]) => [
      `- ${key}: ${val1}`,
      `+ ${key}: ${val2}`,
    ]).flat();

  const contain = [...remain, ...added, ...deleted, ...changed]
    .map((item) => `\t${item}`);

  const result = ['{', ...contain, '}'];

  console.log(result.join('\n'));
}

export default function genDiff(filepath1, filepath2) {
  const file1 = fs.readFileSync(path.resolve(filepath1), 'utf8');
  const file2 = fs.readFileSync(path.resolve(filepath2), 'utf8');
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);

  const diff = compareObject(obj1, obj2);
  showDiff(diff);
}
