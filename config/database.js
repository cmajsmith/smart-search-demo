const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const smartSearchEnv = dotenv.config();
dotenvExpand.expand(smartSearchEnv);

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
};
