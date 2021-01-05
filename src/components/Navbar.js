import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import AuthService from "../services/auth.service";


const Navbar = () =>{
  const [showEmployeeBoard, setShowEmployeeBoard] = useState(false);
  const [showManagerBoard, setShowManagerBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
        setCurrentUser(user);
        setShowEmployeeBoard(user.roles.includes("ROLE_ADMIN"));
        setShowManagerBoard(user.roles.includes("ROLE_MANAGER"));
        setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };
    return(
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            
            <Link to={"/"} className="navbar-brand">
            VehicleRental
            </Link>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
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
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Employee Board
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                   <Link to={"/employee"} class="dropdown-item">
                           Employee
                   </Link>
                   <Link to={"/editFAQ"} class="dropdown-item">
                           Edit FAQ
                   </Link>
                  <a class="dropdown-item" >Another action</a>
                  <a class="dropdown-item">Something else here</a>
                </div>
              </li>
            )}

            {showManagerBoard && (
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Manager Board
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                   <Link to={"/manager"} class="dropdown-item">
                           Manager
                   </Link>
                   <Link to={"/addVehicle"} class="dropdown-item">
                           New vehicle
                   </Link>
                  <a class="dropdown-item" >Another action</a>
                  <a class="dropdown-item">Something else here</a>
                </div>
              </li>
            )}

            {showAdminBoard && (
                
             <li class="nav-item dropdown">
             <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               Admin Board
             </a>
             <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to={"/admin"} class="dropdown-item">
                        Admin
                </Link>
               <a class="dropdown-item" href="#">Another action</a>
               <a class="dropdown-item" href="#">Something else here</a>
             </div>
           </li>

            )}

            {currentUser && (
                <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                    User
                </Link>
                </li>
            )}
            </ul>
            </div>

            {currentUser ? (
            <div className="navbar-nav ml-auto">
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