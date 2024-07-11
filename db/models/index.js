const { Sequelize, DataTypes, Model } = require("sequelize");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const smartSearchEnv = dotenv.config();
dotenvExpand.expand(smartSearchEnv);

const sequelize = new Sequelize(process.env.DATABASE_URL);

const City = sequelize.define("City", {
  name: { type: DataTypes.STRING },
});

const Brand = sequelize.define("Brand", {
  name: { type: DataTypes.STRING },
});

const DishType = sequelize.define("DishType", {
  name: { type: DataTypes.STRING },
});

const Diet = sequelize.define("Diet", {
  name: { type: DataTypes.STRING },
});

const registeredModels = [City, Brand, DishType, Diet];

module.exports = {
  sequelize,
  registeredModels,
};
