import React from "react";
import {Link} from "react-router-dom"
import style from "./landing.module.css";
import MundoPokemon from "../../Imagenes/MundoPokemon.mp4" 

 function Landing(){
    return(
        <div className={style.landingg}>
            <div className={style.containervideo}>
            <video className={style.video} autoPlay loop muted>
          <source src={MundoPokemon} type="video/mp4" />
        </video>
        <div className={style.buttonlanding}>
            <Link to = "/home">
            <button >Ingresar</button>
             </Link>
             </div>
             </div>
        </div>
    )
}

export default Landing;