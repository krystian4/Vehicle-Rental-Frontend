import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import AuthService from "../services/auth.service";


const Navbar = () =>{
  const [showManagerBoard, setShowManagerBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
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
            <div className="navbar-nav mr-auto">
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

            {showManagerBoard && (
                <li className="nav-item">
                <Link to={"/manager"} className="nav-link">
                    Manager Board
                </Link>
                </li>
            )}

            {showAdminBoard && (
                <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                    Admin Board
                </Link>
                </li>
            )}

            {currentUser && (
                <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                    User
                </Link>
                </li>
            )}
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