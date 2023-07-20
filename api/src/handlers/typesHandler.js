const { getAllTypes } = require("../controllers/typeControllers.js");

const { Type } = require("../db");

const getTypesHandler = async (req, res) => {
  try {
    const types = await getAllTypes();
    res.json(types);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTypesHandler,
};
