const { sequelize, registeredModels } = require("../models");

const DATA = {
  Cities: [{ name: "London" }, { name: "Manchester" }, { name: "New York" }],
  Brands: [
    { name: "McDonald's" },
    { name: "Burger King" },
    { name: "Sushimania" },
  ],
  DishTypes: [{ name: "Sushi" }, { name: "Burger" }, { name: "Pizza" }],
  Diets: [{ name: "Vegan" }, { name: "Vegetarian" }],
};

const seedDB = async () => {
  await sequelize.sync({ force: true });
  for (let idx in registeredModels) {
    const model = registeredModels[idx];
    const dataKey = model.getTableName();
    console.log(dataKey);
    await model.bulkCreate(DATA[dataKey]);
  }
};

seedDB().then(() => {
  console.log("Database seeded!");
  sequelize.close();
});
