"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Cities", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING },
    });
    await queryInterface.createTable("Brands", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING },
    });
    await queryInterface.createTable("DishTypes", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING },
    });
    await queryInterface.createTable("Diets", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING },
    });

    await queryInterface.addIndex("Cities", ["name"]);
    await queryInterface.addIndex("Brands", ["name"]);
    await queryInterface.addIndex("DishTypes", ["name"]);
    await queryInterface.addIndex("Diets", ["name"]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Cities");
    await queryInterface.dropTable("Brands");
    await queryInterface.dropTable("DishTypes");
    await queryInterface.dropTable("Diets");
  },
};
