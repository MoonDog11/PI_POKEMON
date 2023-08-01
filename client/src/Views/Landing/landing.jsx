import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./landing.module.css";
import Pikachu from "../../Imagenes/pikachu-15.mp4";
import LogoImage from "../../Imagenes/LOGO_POKEAPI FINAL-1.png";

function AuthForm({ onFormSubmit, isValidCredentials }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAnimationActive, setIsAnimationActive] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

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

  return (
    <>
      <link href="https://fonts.googleapis.com/css?family=Poppins:900i&display=swap" rel="stylesheet" />

      <form className={style.authForm} onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div className={style.buttonContainer}>
          <div
            className={style.container}
            onMouseEnter={handleButtonContainerMouseEnter}
            onMouseLeave={handleButtonContainerMouseLeave}
          >
            <button className={style.button} disabled={!isAnimationActive || !isValidCredentials}>
              <span>GO</span>
            </button>
            {isValidCredentials ? null : <p className={style.warningMessage}>Please enter your username and password</p>}
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
              <a href="/contact">
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
              <a href="/contact">
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
              href="/contact"
              className={`${style.register} ${isAnimationActive ? style.active : ""}`}
              onMouseEnter={handleButtonContainerMouseEnter}
              onMouseLeave={handleButtonContainerMouseLeave}
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
  const [isValidCredentials, setIsValidCredentials] = useState(true);

  const handleFormSubmit = (username, password) => {
    const users = [
      { username: "MoonDog", password: "Jphv19840625*" },
      { username: "user2", password: "password2" },
      // Agrega más usuarios según tus necesidades
    ];

    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      console.log("Authenticated User", user.username);
      setIsValidCredentials(true);
      history.push("/home");
    } else {
      console.log("Invalid Password,Try Again");
      setIsValidCredentials(false);
    }
  };

  return (
    <div className={style.landingg}>
      <div className={style.containervideo}>
        <video className={style.video} autoPlay loop muted>
          <source src={Pikachu} type="video/mp4" />
        </video>
      </div>
      <div className={style.logoContainer}>
        <img className={style.logo} src={LogoImage} alt="Logo" />
      </div>
      <div className={style.authFormContainer}>
        <AuthForm onFormSubmit={handleFormSubmit} isValidCredentials={isValidCredentials} />
      </div>
    </div>
  );
}

export default Landing;