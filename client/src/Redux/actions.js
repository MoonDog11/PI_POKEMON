import axios from "axios";

export const GET_POKEMON = "GET_POKEMON";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const FILTER_IF_CREATED = "FILTER_IF_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const GET_NAME_POKEMON = "GET_NAME_POKEMON";
export const GET_TYPES = "GET_TYPES";
export const POST_POKEMON = "POST_POKEMON";
export const GET_ID_POKEMON = "GET_ID_POKEMON";

const cache = {};

export function getPokemon() {
  return async function (dispatch) {
    try {
      if (cache["all"]) {
        dispatch({
          type: GET_POKEMON,
          payload: cache["all"],
        });
      } else {
        const json = await axios.get("http://localhost:3001/pokemon");
        const pokemonData = json.data;

        cache["all"] = pokemonData;

        dispatch({
          type: GET_POKEMON,
          payload: pokemonData,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    const info = await axios.get("http://localhost:3001/type");
    const types = info.data.map((name) => ({ id: name, name }));
    return dispatch({
      type: GET_TYPES,
      payload: types,
    });
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/pokemon", payload);
    return dispatch({
      type: POST_POKEMON,
      payload: response.data,
    });
  };
}

export function filterByType(payload) {
  console.log(payload);
  return {
    type: FILTER_BY_TYPES,
    payload,
  };
}

export function filterIfCreated(payload) {
  return {
    type: FILTER_IF_CREATED,
    payload,
  };
}

export function orderByname(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByAttack(payload) {
  return {
    type: ORDER_BY_ATTACK,
    payload,
  };
}

export function getNamePokemon(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/pokemon?name=${name}`);
      return dispatch({
        type: GET_NAME_POKEMON,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getIdPokemon(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/pokemon/${id}`);
      console.log(json.data);
      return dispatch({
        type: GET_ID_POKEMON,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
