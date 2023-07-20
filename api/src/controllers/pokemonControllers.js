const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getApiInfo = async () => {
  const firstPageUrl = "https://pokeapi.co/api/v2/pokemon?limit=48";
  const apiInfo = [];
  let nextUrl = firstPageUrl;

  while (nextUrl) {
    const apiUrl = await axios.get(nextUrl);
    apiInfo.push(
      ...(await Promise.all(
        apiUrl.data.results.map(async (el) => {
          const pokemonData = await axios.get(el.url);
          return {
            id: pokemonData.data.id,
            name: pokemonData.data.name,
            img: pokemonData.data.sprites.other.dream_world.front_default,
            hp: pokemonData.data.stats[0].base_stat,
            attack: pokemonData.data.stats[1].base_stat,
            defense: pokemonData.data.stats[2].base_stat,
            speed: pokemonData.data.stats[5].base_stat,
            height: pokemonData.data.height,
            weight: pokemonData.data.weight,
            types: pokemonData.data.types.map((type) => type.type.name),
          };
        })
      ))
    );

    nextUrl = apiUrl.data.next;
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
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = [...apiInfo, ...dbInfo];

  if (name) {
    const pokemontotal = infoTotal.filter((p) => {
      if (p.name.toLowerCase().includes(name.toLowerCase())) {
        return p;
      }
    });

    if (pokemontotal.length <= 0) {
      throw new Error("Error: there is no such Pokemon");
    } else {
      return pokemontotal;
    }
  } else {
    return infoTotal;
  }
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
