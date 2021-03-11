import { Switch, Route, BrowserRouter, useHistory } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";

// componentes
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Wines from "./components/Wines";
import SingleWine from "./components/SingleWine";
import Navbar from "./components/Navbar";

// store
import store from "./store/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Wines} />
            <Route exact path="/products" component={Wines} />
            <Route
              exact
              path="/products/:id"
              render={({ match }) => <SingleWine match={match} />}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
