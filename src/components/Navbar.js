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
                   <Link to={"/employee"} className="dropdown-item">
                           Employee
                   </Link>
                   <Link to={"/employee/editFAQ"} className="dropdown-item">
                           Edit FAQ
                   </Link>
                  <a className="dropdown-item" href="/#">Another action</a>
                  <a className="dropdown-item" href="/#">Something else here</a>
                </div>
              </li>
            )}

            {showManagerBoard && (
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdown" href="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Manager Board
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                   <Link to={"/manager"} className="dropdown-item">
                           Manager
                   </Link>
                   <Link to={"/manager/addVehicle"} className="dropdown-item">
                           New vehicle
                   </Link>
                  <a className="dropdown-item" href="/#" >Another action</a>
                  <a className="dropdown-item" href="/#">Something else here</a>
                </div>
              </li>
            )}

            {showAdminBoard && (
                
             <li className="nav-item dropdown">
             <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               Admin Board
             </a>
             <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to={"/admin"} className="dropdown-item">
                        Admin
                </Link>
                <Link to={"/admin/manageUsers"} className="dropdown-item">
                        Users
                </Link>
               <a className="dropdown-item" href="/#">Something else here</a>
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