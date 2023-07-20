import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";
import Pokemon from "../../Imagenes/Pokemoncreado.png";

const Card = ({ id, name, img, types }) => {
  return (
    <div>
      {/* Aquí colocamos el componente Card dentro de un contenedor div */}
      <div className={styles.card}>
        <h3>{name}</h3>
        <div className={styles.imgcard}>
          {img ? (
            <img src={img} alt="" loading="lazy" />
          ) : (
            <img src={Pokemon} alt="Imagen por defecto" />
          )}
        </div>
        <div className={styles.types}>
          {types?.map((t, index) => (
            <span key={index}>
              {typeof t === "object" ? (
                <Link to={`/detail/${id}`}>{t.name}</Link>
              ) : (
                <span>{t}</span>
              )}
              {index < types.length - 1 && <span> - </span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;

