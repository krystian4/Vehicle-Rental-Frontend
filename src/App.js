import React from "react";
import { Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/dropdown';
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

import BoardUser from "./pages/BoardUser";

import BoardManager from "./pages/BoardManager";
import AddVehicleBoard from "./pages/AddVehicleBoard";

import BoardAdmin from "./pages/BoardAdmin";

import FAQ from "./pages/FAQ";
import Vehicles from "./pages/Vehicles"
import SingleVehiclePage from "./pages/SingleVehiclePage"

import Navbar from "./components/Navbar";

const App = () => {

  return (
    <>
    <Navbar />
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/vehicles" component={Vehicles} />
          <Route exact path="/faq" component={FAQ} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/manager" component={BoardManager} />
          <Route path="/addVehicle" component={AddVehicleBoard} />
          <Route path="/admin" component={BoardAdmin} />
          <Route path="/changepassword" component={BoardUser} />
          <Route exact path="/vehicle" component={SingleVehiclePage} />
        </Switch>
        </>
  );
};

export default App;