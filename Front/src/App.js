import React from 'react';
import { Switch, Route, BrowserRouter, useHistory } from "react-router-dom";
import { Provider } from "react-redux";
import './App.css'

// componentes
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";

import Wines from "./components/Wines";
import SingleWine from "./components/SingleWine";
import Navbar from "./components/Navbar";
import PanelAdmin from './components/panelAdmin/PanelAdmin';
import HistoryCart from './components/HistoryCart'

// store
import store from "./store/store";
import Home from './components/home/Home';


function App() {

  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={Wines} />

            <Route path="/search/:query"  render={({match}) => <Wines search={match}/> } />
            
            <Route
              exact
              path="/products/:id"
              render={({ match }) => <SingleWine match={match} />}
            />
            <Route path='/admin' component={PanelAdmin} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/historycart" component={HistoryCart} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
