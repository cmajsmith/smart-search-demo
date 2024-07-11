const { escapeLiteral, escapeIdentifier } = require("pg/lib/utils");
const { registeredModels } = require("../db/models");

const toCamelCase = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

const minLengthFilter = (minLength) => (item) => item.length >= minLength;

const parseSearch = (search, minLengthAllowed = 3) => {
  const rawTerms = search ? search.split(/\s+/) : [];
  return rawTerms.filter(minLengthFilter(minLengthAllowed));
};

const modelToSmartSearchSelectQuery = (searchTerms) => (model) => {
  const { tableName, name: modelName } = model;
  const bunchOfQueryTerms = searchTerms
    .map((t) => escapeLiteral(`%${t}%`))
    .join(` OR name ILIKE `);
  return `
    SELECT ${escapeLiteral(modelName)} as type, id, name FROM ${escapeIdentifier(tableName)} 
    WHERE name ILIKE ${bunchOfQueryTerms}
  `;
};

const searchToQuery = (search, minSearchTermLengthAllowed = 2) => {
  const tokens = parseSearch(search, minSearchTermLengthAllowed);
  return registeredModels
    .map(modelToSmartSearchSelectQuery(tokens))
    .join(` UNION ALL `);
};

function* cartesianProduct(arrays) {
  if (arrays.length === 0) {
    yield [];
  } else {
    const [first, ...rest] = arrays;
    for (const item of first) {
      for (const items of cartesianProduct(rest)) {
        yield [item, ...items];
      }
    }
  }
}

const searchResultToDistributedCombinations = (dataArray) => {
  console.log(dataArray);
  const groupedByType = dataArray.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  const keys = Object.keys(groupedByType);
  const arrays = keys.map((key) => groupedByType[key]);

  const result = [];
  for (const combination of cartesianProduct(arrays)) {
    const combinationObject = {};
    keys.forEach((key, index) => {
      const { type, ...rest } = combination[index];
      combinationObject[toCamelCase(key)] = { ...rest };
    });

    if (Array.from(Object.keys(combinationObject)).length > 0) {
      result.push(combinationObject);
    }
  }
  return result;
};

module.exports = {
  searchToQuery,
  searchResultToDistributedCombinations,
};
