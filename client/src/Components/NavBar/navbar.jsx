import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getNamePokemon} from "../../Redux/actions";
import style from "./navBar.module.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  

  const handleSearchInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSearchButtonClick = () => {
    dispatch(getNamePokemon(name));
  };


  return (

    <div className={style.navbar}>
      <link href="https://fonts.googleapis.com/css?family=Poppins:900i&display=swap" rel="stylesheet" />
      <div className={style.containernav}>
        {/* Botón para ir a la página Home */}
        <ul>
          <li className={`${style.linknavli} ${style.home}`} href="#">
            <Link to="/home" >Home</Link>
          </li>
        </ul>

        {/* Botón para crear Pokemon */}
        <ul>
          <li className={`${style.linknavli} ${style.create}`} href="#">
            <Link to="/Create">Create</Link>
          </li>
        </ul>

        {/* Botón para contactar */}
        <ul>
          <li className={`${style.linknavli} ${style.contact}`} href="#">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
    </div>
        {/* Contenedor para el input y el botón FIND */}
        <div className={style.searchContainer}>
          <input
            className={style.navinput} 
            type="text"
            value={name}
            onChange={handleSearchInputChange}
            placeholder="Search your Pokemon..."
          />
          {/* Contenedor para el botón FIND */}
            <button className={style.buttonnav} onClick={handleSearchButtonClick}>
            </button>
          </div>
     </div>
  );
};

export default NavBar;