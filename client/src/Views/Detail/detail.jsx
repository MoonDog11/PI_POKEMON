import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdPokemon, getNamePokemon } from "../../Redux/actions";
import { Link } from "react-router-dom";
import style from "./detail.module.css";
import Fondo from "../../Imagenes/Pokemon-Umbreon-Live-Wallpaper-Free-1.mp4";
import LogoImage from "../../Imagenes/LOGO_POKEAPI FINAL-1.png";

export default function Detail(props) {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(getIdPokemon(id))
      .then((response) => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        // Si no se encuentra el Pokemon por ID, buscar por nombre y actualizar el estado
        dispatch(getNamePokemon(id))
          .then(() => {
            setLoading(false);
          })
          .catch(() => setLoading(false));
      });
  }, [dispatch, id]);

  useEffect(() => {
    // Agregar la clase "active" después de que la página se ha cargado
    if (!loading) {
      const progressBarFills = document.querySelectorAll(
        `.${style["progress-bar-fill"]}`
      );
      progressBarFills.forEach((fill) => fill.classList.add(style.active));
    }
  }, [loading]);

  const pokemonById = useSelector((state) => state.detail); // Pokemon encontrado por ID
  const searchedPokemon = useSelector((state) => state.searchedPokemon); // Pokemon buscado por nombre

  // Utilizamos useMemo para almacenar en caché el resultado de la búsqueda
  const pokemonToShow = useMemo(() => {
    return searchedPokemon || pokemonById;
  }, [searchedPokemon, pokemonById]);

  return (
    <div>
      <video className={style.videobackground} autoPlay loop muted>
        <source src={Fondo} type="video/mp4" />
      </video>
      <div className={style.logoContainer}>
        <div className={style.logoBackground}></div>
        <img className={style.logo} src={LogoImage} alt="Logo" />
      </div>
      <div className={style.buttonsContainer}></div>

      {loading ? (
        <p className={style.detailp}>Loading...</p>
      ) : pokemonToShow ? ( // Muestra el bloque solo si se encontró un Pokémon
        <div className={style.detailcont}>
          <div className={style.detail}>
            <h1 className={style.detailh1}>{pokemonToShow.name}</h1>
            <div className={style.detailp}>
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
            {pokemonToShow.img && (
              <div className={style.imageContainer}>
                <img src={pokemonToShow.img} alt="" />
              </div>
            )}

            {/* Aquí se muestra el bloque de barras de progreso para los atributos */}
            <div className={style.attributeContainer}>
              <div className={style.attribute}>
                <p>HP:</p>
                <div className={style["progress-bar-container"]}>
                  <div
                    className={`${style["progress-bar-fill"]} ${
                      loading ? "" : style.active // Agregamos la clase "active" para que se active la animación al cargar la página
                    }`}
                    style={{ width: `${pokemonToShow.hp}%` }}
                  ></div>
                </div>
                <span>{pokemonToShow.hp}</span>
              </div>
              <div className={style.attribute}>
                <p>Attack:</p>
                <div className={style["progress-bar-container"]}>
                  <div
                    className={`${style["progress-bar-fill"]} ${
                      loading ? "" : style.active // Agregamos la clase "active" para que se active la animación al cargar la página
                    }`}
                    style={{ width: `${pokemonToShow.attack}%` }}
                  ></div>
                </div>
                <span>{pokemonToShow.attack}</span>
              </div>
              <div className={style.attribute}>
                <p>Defense:</p>
                <div className={style["progress-bar-container"]}>
                  <div
                    className={`${style["progress-bar-fill"]} ${
                      loading ? "" : style.active // Agregamos la clase "active" para que se active la animación al cargar la página
                    }`}
                    style={{ width: `${pokemonToShow.defense}%` }}
                  ></div>
                </div>
                <span>{pokemonToShow.defense}</span>
              </div>
              <div className={style.attribute}>
                <p>Speed:</p>
                <div className={style["progress-bar-container"]}>
                  <div
                    className={`${style["progress-bar-fill"]} ${
                      loading ? "" : style.active // Agregamos la clase "active" para que se active la animación al cargar la página
                    }`}
                    style={{ width: `${pokemonToShow.speed}%` }}
                  ></div>
                </div>
                <span>{pokemonToShow.speed}</span>
              </div>
              <div className={style.attribute}>
                <p>Height:</p>
                <div className={style["progress-bar-container"]}>
                  <div
                    className={`${style["progress-bar-fill"]} ${
                      loading ? "" : style.active // Agregamos la clase "active" para que se active la animación al cargar la página
                    }`}
                    style={{ width: `${pokemonToShow.height}%` }}
                  ></div>
                </div>
                <span>{pokemonToShow.height}</span>
              </div>
              <div className={style.attribute}>
                <p>Weight:</p>
                <div className={style["progress-bar-container"]}>
                  <div
                    className={`${style["progress-bar-fill"]} ${
                      loading ? "" : style.active // Agregamos la clase "active" para que se active la animación al cargar la página
                    }`}
                    style={{ width: `${pokemonToShow.weight}%` }}
                  ></div>
                </div>
                <span>{pokemonToShow.weight}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Si no se encuentra un Pokémon, muestra el mensaje "Pokemon not found"
        <p className={style.detailp}>Pokemon not found</p>
      )}

      {/* Botón "Back" que te llevará al home */}
      <Link
        to="/home"
        className={`${style.backButton} ${style.backButtonGray}`}
      >
        {/* Capa inferior del texto (gris) */}
        <span className={style.backButtonNormal}>Back</span>
        {/* Capa superior del texto (glow) */}
        <span className={style.backButtonGlow}></span>
      </Link>
    </div>
  );
}