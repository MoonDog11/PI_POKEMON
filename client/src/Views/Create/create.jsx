import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { postPokemon, getTypes } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Validate from "../../Components/Validate/Validate";
import style from "./create.module.css";
import Fondo from "../../Imagenes/aesthetic-room-desktop-wallpaperwaifu.com.mp4";
import LogoImage from "../../Imagenes/LOGO_POKEAPI FINAL-1.png";

export default function Create() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    img: "",
    hp: 0,
    attack: 0,
    defense: 0,
    height: 0,
    weight: 0,
    speed: 0,
    types: [],
  });

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleChange(e) {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });

    setErrors(
      Validate({
        ...input,
        [name]: value,
      })
    );
  }

  function handleSelect(e) {
    const selectedType = e.target.value;
    if (!input.types.includes(selectedType)) {
      setInput({
        ...input,
        types: [...input.types, selectedType],
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (isFormComplete()) {
      dispatch(postPokemon(input))
        .then(() => {
          alert("Pokemon Creado");
          setInput({
            name: "",
            img: "",
            hp: "",
            attack: 0,
            defense: 0,
            height: 0,
            weight: 0,
            speed: 0,
            types: [],
          });
          history.push("/home");
        })
        .catch((error) => {
          console.error("Error al crear el Pokémon:", error);
        });
    }
  }

  function isFormComplete() {
    const { name, hp, attack, defense, height, weight, speed } = input;
    return (
      name !== "" &&
      hp >= 1 &&
      hp <= 100 &&
      attack >= 20 &&
      attack <= 100 &&
      defense >= 20 &&
      defense <= 100 &&
      height >= 20 &&
      height <= 100 &&
      weight >= 20 &&
      weight <= 100 &&
      speed >= 20 &&
      speed <= 950
    );
  }

  function handleDelete(el) {
    setInput({
      ...input,
      types: input.types.filter((typ) => typ !== el),
    });
  }

  return (
    <div>
      <div className={style.container}></div>
      <video className={style.videobackground} autoPlay loop muted>
        <source src={Fondo} type="video/mp4" />
      </video>
      <div className={style.logoContainer}>
        <div className={style.logoBackground}></div>
        <img className={style.logo} src={LogoImage} alt="Logo" />
      </div>
      <div className={style.contc}>
        <h1 className={style.ch1}>Create a Pokemon</h1>
        <form className={style.formc} onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div>
            <label>Image:</label>
            <input
              type="text"
              value={input.img}
              name="img"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Hp:</label>
            <input
              type="number"
              value={input.hp}
              name="hp"
              min={1}
              max={100}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Attack:</label>
            <input
              type="number"
              value={input.attack}
              name="attack"
              min={20}
              max={100}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Defense:</label>
            <input
              type="number"
              value={input.defense}
              name="defense"
              min={20}
              max={100}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Speed:</label>
            <input
              type="number"
              value={input.speed}
              name="speed"
              min={20}
              max={100}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Height:</label>
            <input
              type="number"
              value={input.height}
              name="height"
              min={20}
              max={100}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Weight:</label>
            <input
              type="number"
              value={input.weight}
              name="weight"
              min={20}
              max={950}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={style.types}>
            <h4>Types:</h4>
            <select onChange={(e) => handleSelect(e)}>
              {types.map((typ) => (
                <option
                  value={typ.id}
                  key={typ.id}
                  disabled={input.types.includes(typ.id)}
                >
                  {typ.name}
                </option>
              ))}
            </select>
          </div>
          <br />
          <br />
          {isFormComplete() && (
            <button className={style.buttonc} type="submit">
              CREATE POKEMON
            </button>
          )}
        </form>
        {input.types.map((el) => (
          <div className={style.Px}>
          <div key={el}>
            <p className={style.px}>{el}</p>
            <button className={style.dx} onClick={() => handleDelete(el)}>
              X
            </button>
            </div>
          </div>
        ))}
      <div className={style.backButton}>
       {/* Botón "Back" que te llevará a la página anterior */}
      <Link to="/home" className={`${style.backButton} ${style.backButtonGray}`}>
  {/* Capa inferior del texto (gris) */}
  <span className={style.backButtonNormal}>Back</span>
  {/* Capa superior del texto (glow) */}
  <span className={style.backButtonGlow}>Back</span>
</Link>
    </div>
      </div>
    </div>
  );
}