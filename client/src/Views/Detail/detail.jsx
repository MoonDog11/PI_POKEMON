import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdPokemon, getNamePokemon } from "../../Redux/actions";
import { Link, useHistory } from "react-router-dom";
import style from "./detail.module.css";
import Fondo from "../../Imagenes/Pokemon-Umbreon-Live-Wallpaper-Free-1.mp4";
import LogoImage from "../../Imagenes/LOGO_POKEAPI FINAL-1.png";


export default function Detail(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = props.match.params;
  const [loading, setLoading] = useState(true);
  const [redirectHome, setRedirectHome] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getIdPokemon(id))
      .then((response) => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        // Si no se encuentra el pokemon por id, buscar por nombre y actualizar el estado
        dispatch(getNamePokemon(id))
          .then((response) => {
            setLoading(false);
            if (response) {
              // Activa el estado para redireccionar al usuario al Home
              setRedirectHome(true);
            }
          })
          .catch(() => setLoading(false));
      });
  }, [dispatch, id]);

  // Agrega un efecto para realizar la redirección al Home
  useEffect(() => {
    if (redirectHome) {
      history.push("/home");
    }
  }, [redirectHome, history]);

  const pokemonById = useSelector((state) => state.detail); // Pokémon encontrado por ID
  const searchedPokemon = useSelector((state) => state.searchedPokemon); // Pokémon buscado por nombre
  const pokemonToShow = searchedPokemon || pokemonById; // Utilizamos el Pokémon buscado por nombre si existe, en caso contrario, el Pokémon encontrado por ID.

  return (
    <div>
      <video className={style.videobackground} autoPlay loop muted>
        <source src={Fondo} type="video/mp4" />
      </video>
      <div className={style.logoContainer}>
        <div className={style.logoBackground}></div>
        <img className={style.logo} src={LogoImage} alt="Logo" />
      </div>
      <div className={style.buttonsContainer}>
      </div>

      {loading ? (
        <p className={style.detailp}>Loading...</p>
      ) : searchedPokemon ? ( // Utilizamos searchedPokemon para mostrar la carta buscada por nombre
        <div className={style.detail} style={{ zIndex: 2 }}> {/* Agregamos zIndex para mostrar la carta por encima de los demás elementos */}
          <h1 className={style.detailh1}>{searchedPokemon.name}</h1>
          <div className={style.detailp}>
            <p>HP: {searchedPokemon.hp}</p>
            <p>Attack: {searchedPokemon.attack}</p>
            <p>Defense: {searchedPokemon.defense}</p>
            <p>Speed: {searchedPokemon.speed}</p>
            <p>Height: {searchedPokemon.height}</p>
            <p>Weight: {searchedPokemon.weight}</p>
            <div className={style.detailp}>
              {searchedPokemon.types?.map((t, index) => (
                <span key={index}>
                  {t.name ? (
                    <Link to={`/home/${searchedPokemon.id}`}>{t.name}</Link>
                  ) : (
                    <span>{t}</span>
                  )}
                  {index < searchedPokemon.types.length - 1 && <span> - </span>}
                </span>
              ))}
            </div>
          </div>
          {searchedPokemon.img && (
            <div className={style.imageContainer}>
              <img src={searchedPokemon.img} alt="" />
            </div>
          )}
        </div>
        ) : pokemonToShow ? (
      <div className={style.detailcont}>
        <div className={style.detail}>
          <h1 className={style.detailh1}>{pokemonToShow.name}</h1>
          <div className={style.detailp}>
            <p>HP: {pokemonToShow.hp}</p>
            <p>Attack: {pokemonToShow.attack}</p>
            <p>Defense: {pokemonToShow.defense}</p>
            <p>Speed: {pokemonToShow.speed}</p>
            <p>Height: {pokemonToShow.height}</p>
            <p>Weight: {pokemonToShow.weight}</p>
            <div className={style.detailp}>
              {pokemonToShow.types?.map((t, index) => (
                <span key={index}>
                  {t.name ? (
                    <Link to={`/home/${pokemonToShow.id}`}>{t.name}</Link>
                  ) : (
                    <span>{t}</span>
                  )}
                  {index < pokemonToShow.types.length - 1 && <span> - </span>}
                </span>
              ))}
            </div>
            </div>
          </div>
          {pokemonToShow.img && (
            <div className={style.imageContainer}>
              <img src={pokemonToShow.img} alt="" />
            </div>
          )}
        </div>
      ) : (
        <p className={style.detailp}>Pokemon no encontrado</p>
      )}
      {/* Botón "Back" que te llevará al home */}
      <Link to="/home" className={style.backButton}>
   
      </Link>
    </div>
  );
}