import React from "react";
import { Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/dropdown';
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import Vehicles from "./pages/Vehicles";
import SingleVehiclePage from "./pages/SingleVehiclePage";
import CartPage from "./pages/CartPage";

import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

import BoardUser from "./pages/BoardUser";
import UserDrivingLicense from "./pages/user/UserDrivingLicense";

import EditFaq from "./pages/employee/EditFaq";
import DriverLicenses from "./pages/employee/DriverLicenses";
import ManageVehicleBoard from "./pages/employee/ManageVehiclesBoard";
import CarFeeList from "./pages/employee/CarFeeList";
import Payments from "./pages/employee/Payments";

import BoardManager from "./pages/manager/BoardManager";
import AddVehicleBoard from "./pages/manager/AddVehicleBoard";
import RentalsHistoryPage from "./pages/manager/RentalsHistoryPage";

import BoardAdmin from "./pages/admin/BoardAdmin";
import ManageUsersBoard from "./pages/admin/ManageUsersBoard";
import ManageEmployeesBoard from "./pages/admin/ManageEmployeesBoard";



const App = () => {

  return (
    <>
    <Navbar />
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/vehicles" component={Vehicles} />
          <Route exact path="/vehicle" component={SingleVehiclePage} />
          <Route exact path="/faq" component={FAQ} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/cart" component={CartPage} />

          <Route exact path="/user" component={BoardUser} />
          <Route exact path="/user/drivingLicense" component={UserDrivingLicense} /> 

          <Route exact path="/employee/editFAQ" component={EditFaq} />
          <Route exact path="/employee/verifyLicense" component={DriverLicenses} />
          <Route exact path="/employee/manageVehicles" component={ManageVehicleBoard} />
          <Route exact path="/employee/fees" component={CarFeeList} />
          <Route exact path="/employee/payments" component={Payments} />

          <Route exact path="/manager" component={BoardManager} />
          <Route exact path="/manager/addVehicle" component={AddVehicleBoard} />
          <Route exact path="/manager/rentalsHistory" component={RentalsHistoryPage} />


          <Route exact path="/admin" component={BoardAdmin} />
          <Route exact path="/admin/manageUsers" component={ManageUsersBoard} />
          <Route exact path="/admin/manageEmployees" component={ManageEmployeesBoard} />

        </Switch>
        </>
  );
};

export default App;