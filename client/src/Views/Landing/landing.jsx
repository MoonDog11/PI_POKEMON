import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./landing.module.css";
import MundoPokemon from "../../Imagenes/pikachu-15.mp4";
import LogoImage from "../../Imagenes/LOGO_POKEAPI FINAL-1.png";

function AuthForm({ onFormSubmit }) {
  const [username] = useState("");
  const [password] = useState("");
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const [isRegisterAnimationActive, setIsRegisterAnimationActive] = useState(false);

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(username, password);
  };

  const handleButtonContainerMouseEnter = () => {
    setIsAnimationActive(true);
  };

  const handleButtonContainerMouseLeave = () => {
    setIsAnimationActive(false);
  };

  const handleRegisterMouseEnter = () => {
    setIsRegisterAnimationActive(true);
  };

  const handleRegisterMouseLeave = () => {
    setIsRegisterAnimationActive(false);
  };


return (
    <>
      <link href="https://fonts.googleapis.com/css?family=Poppins:900i&display=swap" rel="stylesheet" />

      <form className={style.authForm} onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className={style.buttonContainer}>
          <div
            className={style.container}
            onMouseEnter={handleButtonContainerMouseEnter}
            onMouseLeave={handleButtonContainerMouseLeave}
          >
            <button className={style.button} disabled={!isAnimationActive}>
              <span>GO</span>
            </button>
            <div className={style["arrow-container"]}>
              <a href="/home">
                <div className={`${style.arrow} ${style.part1}`} onAnimationEnd={handleButtonContainerMouseLeave}>
                  <svg
                    width="155"
                    height="20"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    transform="translate(0, 68)"
                  >
                    <path d="M10 2L20 15L10 28" stroke="white" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </div>
              </a>
              <a href="/home">
                <div className={`${style.arrow} ${style.part2}`} onAnimationEnd={handleButtonContainerMouseLeave}>
                  <svg
                    width="155"
                    height="20"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    transform="translate(0, 52)"
                  >
                    <path d="M10 2L20 15L10 28" stroke="white" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </div>
              </a>
              <a href="/home">
                <div className={`${style.arrow} ${style.part3}`} onAnimationEnd={handleButtonContainerMouseLeave}>
                  <svg
                    width="155"
                    height="20"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    transform="translate(0, 35)"
                  >
                    <path d="M10 2L20 15L10 28" stroke="white" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
          <div className={style.registerContainer}>
            <a
              href="/home"
              className={`${style.register} ${isRegisterAnimationActive ? style.active : ""}`}
              onMouseEnter={handleRegisterMouseEnter}
              onMouseLeave={handleRegisterMouseLeave}
            >
              Register
            </a>
          </div>
        </div>
      </form>
    </>
  );
}

function Landing() {
  const history = useHistory();

  const handleFormSubmit = (username, password) => {
    console.log("Usuario:", username);
    console.log("Contraseña:", password);
    history.push("/home");
  };

  return (
    <div className={style.landingg}>
      <div className={style.containervideo}>
        <video className={style.video} autoPlay loop muted>
          <source src={MundoPokemon} type="video/mp4" />
        </video>
      </div>
      <div className={style.logoContainer}>
        <img className={style.logo} src={LogoImage} alt="Logo" />
      </div>
      <div className={style.authFormContainer}>
        <AuthForm onFormSubmit={handleFormSubmit} />
       
      </div>
    </div>
  );
}

export default Landing;