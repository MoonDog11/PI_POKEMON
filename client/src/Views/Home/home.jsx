import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon, filterByType, filterIfCreated, orderByname, orderByAttack } from "../../Redux/actions";
import { Link } from "react-router-dom";
import Card from "../../Components/Card/card";
import Pagination from "../../Components/Pagination/pagination";
import NavBar from "../../Components/NavBar/navbar";
import style from "./home.module.css";
import Fondo from "../../Imagenes/Fondo.mp4";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemon = useSelector((state) => state.pokemon);

  const [orden, setOrden] = useState("");
  const [attack, setAttack] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = allPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginado = (pageNumber) => {
    setcurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemon());
  }, [dispatch, currentPage, pokemonPerPage]);

  function handleFilterType(e) {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
    setcurrentPage(1);
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterIfCreated(e.target.value));
    setcurrentPage(1);
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByname(e.target.value));
    setcurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleAttack(e) {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setAttack(e.target.value);
    setcurrentPage(1);
  }

  // Función para cambiar la cantidad de Pokémon mostrados por página
  function handlePokemonPerPage(e) {
    setPokemonPerPage(Number(e.target.value));
    setcurrentPage(1); // Cuando cambiamos la cantidad de Pokémon por página, volvemos a la página 1
  }


  return (
    <div>
      <video className={style.videobackground} autoPlay loop muted>
        <source src={Fondo} type="video/mp4" />
      </video>
      <div className={style.container}>
        <NavBar />
        <div className={style.filters}>
          <div>
            <span>Tipos</span>
            <select onChange={e => handleFilterType(e)}>
              <option value='all'>All</option>
              <option value='grass'>Grass</option>
              <option value='poison'>Poison</option>
              <option value='fire'>Fire</option>
              <option value='flying'>Flying</option>
              <option value='water'>Water</option>
              <option value='bug'>Bug</option>
              <option value='normal'>Normal</option>
              <option value='electric'>Electric</option>
              <option value='ground'>Ground</option>
              <option value='fairy'>Fairy</option>
              <option value='rock'>Rock</option>
              <option value='ghost'>Ghost</option>
              <option value='steel'>Steel</option>
              <option value='psychic'>Psychic</option>
              <option value='ice'>Ice</option>
              <option value='dragon'>Dragon</option>
              <option value='stedarkel'>Stedarkel</option>
              <option value='shadow'>Shadow</option>
              <option value='unknown'>Unknown</option>
            </select>
          </div>
          <div>
            <span>Orden by Pokemons</span>
            <select onChange={(e) => handleSort(e)}>
              <option value="OrdenBy">Orden by Pokemons</option>
              <option value="ascPokemon">[A-Z]</option>
              <option value="descPokemon">[Z-A]</option>
            </select>
            {orden && <span>{orden}</span>}
          </div>
          <div>
            <span> Existentes o creados</span>
            <select onChange={(e) => handleFilterCreated(e)}>
              <option value="all">Todos</option>
              <option value="created">Creados</option>
              <option value="api">Existentes</option>
            </select>
          </div>
          <div>
            <span>Orden by Ataque</span>
            <select onChange={(e) => handleAttack(e)}>
              <option value="attack">Orden By Ataque</option>
              <option value="ascA">Menor Ataque</option>
              <option value="descA">Mayor Ataque</option>
            </select>
            {attack && <span>{`Filtrado por ataque: ${attack}`}</span>}
          </div>
          <div>
            <span>Pokémon por página</span>
            <select onChange={(e) => handlePokemonPerPage(e)} value={pokemonPerPage}>
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="50">50</option>
              {/* Agrega más opciones según tus necesidades */}
            </select>
          </div>
        </div>
        <div className={style.card}>
          {currentPokemon?.map((props) => (
            <Link to={`/detail/${props.id}`} key={props.id}>
              <Card name={props.name} img={props.img} types={props.types} />
            </Link>
          ))}
          <div></div>
        </div>
        <Pagination
        pokemonPerPage={pokemonPerPage}
        allPokemon={allPokemon.length}
        paginado={paginado}
        currentPage={currentPage}
    />
      </div>
      <br />
      <br />
    </div>
  );
}