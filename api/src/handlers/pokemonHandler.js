const {
  getAllpokemon,
  postPokemons,
  getPokemonId,
} = require("../controllers/pokemonControllers.js");

const getPokemonHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const response = await getAllpokemon(name);
      return res.status(200).json(response);
    }
    const response = await getAllpokemon();
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPokemonHandlerId = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getPokemonId(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postPokemonHandler = async (req, res) => {
  try {
    const response = await postPokemons(req.body);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPokemonHandler,
  postPokemonHandler,
  getPokemonHandlerId,
};
