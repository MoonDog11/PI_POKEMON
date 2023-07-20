import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdPokemon } from "../../Redux/actions";
import { Link } from "react-router-dom";
import Pokemon from "../../Imagenes/Pokemoncreado.png";
import style from "./detail.module.css";
import Fondo from "../../Imagenes/Fondo.mp4";

export default function Detail(props) {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const [state, setState] = useState({
    loading: true,
  });

  useEffect(() => {
    dispatch(getIdPokemon(id));

    setTimeout(() => {
      setState((prevState) => ({ ...prevState, loading: false }));
    }, 1000);
  }, [dispatch, id, state.loading]);

  const myPokemon = useSelector((state) => state.detail);

  return (
    <div>
      <video className={style.videobackground} autoPlay loop muted>
        <source src={Fondo} type="video/mp4" />
      </video>
      <div>
        <Link to="/home">
          <button className={style.detaillink}>Volver</button>
        </Link>
      </div>
      <div className={style.detail}>
        {state.loading ? (
          <p className={style.detailp}>Loading...</p>
        ) : myPokemon ? (
          <div>
            <h1 className={style.detailh1}>{myPokemon.name}</h1>
            <div detailimg>
              {myPokemon.img ? (
                <img src={myPokemon.img} alt="" />
              ) : (
                <img src={Pokemon} alt="Imagen por defecto" />
              )}
            </div>
            <div className={style.detailp}>
              <p>HP: {myPokemon.hp}</p>
              <p>Attack: {myPokemon.attack}</p>
              <p>Defense: {myPokemon.defense}</p>
              <p>Speed: {myPokemon.speed}</p>
              <p>Height: {myPokemon.height}</p>
              <p>Weight: {myPokemon.weight}</p>
              <div className={style.detailp}>
                {myPokemon.types?.map((t, index) => (
                  <span key={index}>
                    {t.name ? (
                      <Link to={`/home/${id}`}>{t.name}</Link>
                    ) : (
                      <span>{t}</span>
                    )}
                    {index < myPokemon.types.length - 1 && <span> - </span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className={style.detailp}>Pokemon no encontrado</p>
        )}
      </div>
    </div>
  );
}
