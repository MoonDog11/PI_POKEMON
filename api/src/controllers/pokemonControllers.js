const axios = require("axios");
const { Pokemon, Type } = require("../db");

const fetchData = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const processPokemonData = async (pokemonData) => {
  return {
    id: pokemonData.id,
    name: pokemonData.name,
    img: pokemonData.sprites.other.dream_world.front_default,
    hp: pokemonData.stats[0].base_stat,
    attack: pokemonData.stats[1].base_stat,
    defense: pokemonData.stats[2].base_stat,
    speed: pokemonData.stats[5].base_stat,
    height: pokemonData.height,
    weight: pokemonData.weight,
    types: pokemonData.types.map((type) => type.type.name),
  };
};

const getApiInfo = async () => {
  const firstPageUrl =
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0.";
  const apiInfo = [];
  let nextUrl = firstPageUrl;

  while (nextUrl) {
    const apiUrl = await fetchData(nextUrl);
    const pokemonDataList = await Promise.all(
      apiUrl.results.map(async (el) => {
        const pokemonData = await fetchData(el.url);
        return processPokemonData(pokemonData);
      })
    );
    apiInfo.push(...pokemonDataList);
    nextUrl = apiUrl.next;
  }

  return apiInfo;
};
const getDbInfo = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllpokemon = async (name) => {
  let infoTotal;

  if (!name) {
    const [apiInfo, dbInfo] = await Promise.all([getApiInfo(), getDbInfo()]);
    infoTotal = [...apiInfo, ...dbInfo];
  } else {
    // Realiza una búsqueda específica en la base de datos local
    const dbInfo = await getDbInfo();
    const filteredDbInfo = dbInfo.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );

    // Realiza una búsqueda específica en la API externa
    const apiInfo = await getApiInfo();
    const filteredApiInfo = apiInfo.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );

    // Combina los resultados
    infoTotal = [...filteredDbInfo, ...filteredApiInfo];
  }

  return infoTotal;
};

const getPokemonId = async (id) => {
  const allPoke = await getAllpokemon();

  const pokemon = allPoke.find((d) => d.id.toString() === id);
  return pokemon;
};

const postPokemons = async (pokemonData) => {
  const { name, img, hp, attack, defense, speed, height, weight, types } =
    pokemonData;

  const newPokemon = await Pokemon.create({
    name,
    img,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
  });

  if (Array.isArray(types) && types.length > 0) {
    const typeToAssociate = await Promise.all(
      types.map((typeName) => Type.findOrCreate({ where: { name: typeName } }))
    );
    //Relacion pokemon - types
    await newPokemon.addType(typeToAssociate.map((type) => type[0]));
  }

  return newPokemon;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllpokemon,
  postPokemons,
  getPokemonId,
};
