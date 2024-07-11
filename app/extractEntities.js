const { QueryTypes } = require("sequelize");
const {
  searchToQuery,
  searchResultToDistributedCombinations,
} = require("./convert");

const extractEntities = async (db, searchTerm) => {
  try {
    const query = searchToQuery(searchTerm, 3);
    const records = await db.query(query, {
      type: QueryTypes.SELECT,
      raw: true,
    });
    return searchResultToDistributedCombinations(records);
  } catch (error) {
    return [];
  }
};

module.exports = extractEntities;
