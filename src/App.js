import './App.css';
import {BrowserRouter,Route,Switch} from "react-router-dom"
import LandingPage from "./componentes/LandingPage/LandingPage.jsx"
import Home from './componentes/Home/Home.jsx';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
       <Route exact path = "/" component={LandingPage}/>
       <Route exact path='/home' component={Home}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;