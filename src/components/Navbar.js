import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import AuthService from "../services/auth.service";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import { grey } from '@material-ui/core/colors';



const Navbar = () =>{
  const [showEmployeeBoard, setShowEmployeeBoard] = useState(false);
  const [showManagerBoard, setShowManagerBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showCustomerMenu, setShowCustomerMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const userCart = JSON.parse(sessionStorage.getItem("cart"));

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
        setCurrentUser(user);
        console.log(user);
        setShowEmployeeBoard(user.roles.includes("ROLE_REGULAR"));
        setShowManagerBoard(user.roles.includes("ROLE_MANAGER"));
        setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        setShowCustomerMenu(user.roles.includes("ROLE_USER"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout(currentUser.id);
    sessionStorage.removeItem("user");
  };
  
    return(
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            
            <Link to={"/"} className="navbar-brand">
            VehicleRental
            </Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                Home
                </Link>
            </li>

            <li className="nav-item">
                <Link to={"/vehicles"} className="nav-link">
                Vehicles
                </Link>
            </li>

            <li className="nav-item">
                <Link to={"/faq"} className="nav-link">
                FAQ
                </Link>
            </li>

            {showEmployeeBoard && (
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Employee Board
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                   <Link to={"/employee/editFAQ"} className="dropdown-item">
                           Edit FAQ
                   </Link>

                   <Link to={"/employee/verifyLicense"} className="dropdown-item">
                           Verify License
                   </Link>

                   <Link to={"/employee/manageVehicles"} className="dropdown-item">
                           Manage Vehicles
                   </Link>

                   <Link to={"/employee/fees"} className="dropdown-item">
                           Vehicle fees
                   </Link>

                   <Link to={"/employee/payments"} className="dropdown-item">
                           Payments
                   </Link>

                   <Link to={"/employee/offers"} className="dropdown-item">
                           Offers
                   </Link>

                   <Link to={"/employee/complaints"} className="dropdown-item">
                           Complaints
                   </Link>
                   
                </div>
              </li>
            )}

            {showManagerBoard && (
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdown" href="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Manager Board
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                   <Link to={"/manager/addVehicle"} className="dropdown-item">
                           New vehicle
                   </Link>
                  
                   <Link to={"/manager/rentalsHistory"} className="dropdown-item">
                           Rentals history
                   </Link>
                </div>
              </li>
            )}

            {showAdminBoard && (
                
             <li className="nav-item dropdown">
             <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               Admin Board
             </a>
             <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                <Link to={"/admin/manageUsers"} className="dropdown-item">
                        Users
                </Link>
                <Link to={"/admin/manageEmployees"} className="dropdown-item">
                        Employees
                </Link>
             </div>
           </li>

            )}

            {showCustomerMenu && (
              <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                User
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                 <Link to={"/user/drivingLicense"} className="dropdown-item">
                         Driver License
                 </Link>
                 <Link to={"/user/orders"} className="dropdown-item">
                         Your Orders
                 </Link>
              </div>
              </li>
            )}

            </ul>
            </div>



            {currentUser ? (
            <div className="navbar-nav ml-auto">
              {showCustomerMenu && (
                  <li className="nav-item">
                  <Link to={"/cart"} className="nav-link" style={{padding:0}}>
                  <IconButton aria-label="cart" >
                            {(userCart.length === 0) ? <ShoppingCartIcon style={{ color: grey[50] }}/> : <ShoppingCartIcon style={{ color: "red" }}/> }
                  </IconButton>
                  </Link>
                </li>
              )}

                <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                </Link>
                </li>
                <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                    LogOut
                </a>
                </li>
            </div>
            ) : (
            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                    Login
                </Link>
                </li>

                <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                    Sign Up
                </Link>
                </li>
            </div>
            )}
        </nav>
    );
};

export default Navbar;