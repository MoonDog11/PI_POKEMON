import "./App.css";
import { Route, Switch } from "react-router-dom";
import Create from "./Views/Create/create";
import Detail from "./Views/Detail/detail";
import Home from "./Views/Home/home";
import Landing from "./Views/Landing/landing";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/create" component={Create} />
        <Route path="/" component={Landing} />
      </Switch>
    </div>
  );
}

export default App;
