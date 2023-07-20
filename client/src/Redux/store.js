import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //  sirve para conectar nuestra App con la extensión REDUX DEVTOOLS DEL NAVEGADOR

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunkMiddleware)) // sirve para que podamos hacer peticiones a una Api/servidor
);

export default store;