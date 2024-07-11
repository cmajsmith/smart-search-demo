const express = require("express");
const { sequelize, initDB } = require("../db/models");
const extractEntities = require("./extractEntities");

const index = express();
index.use(express.json());

index.get("/extract", async (req, res) => {
  try {
    if (!req.query.q) {
      return res.status(400).send("Missing query parameter 'q'");
    }
    const entities = await extractEntities(sequelize, req.query.q);
    res.json(entities);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

const PORT = process.env.PORT || 3000;
index.listen(PORT, async () => {
  await sequelize.sync();
  console.log(`Server is running on port ${PORT}`);
});
