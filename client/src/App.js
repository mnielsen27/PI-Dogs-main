import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home/index";
import Detail from "./components/Detail";
import DogCreation from "./components/CreationForm";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/dog" component={DogCreation}></Route>
          <Route exact path="/detail/:id" component={Detail}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
