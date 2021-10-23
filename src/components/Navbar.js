import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import { grey } from '@material-ui/core/colors';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@material-ui/icons/Language';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import cookies from 'js-cookie';
import i18next from 'i18next';

const Navbar = () => {
  const { t } = useTranslation('navbar');
  const [showEmployeeBoard, setShowEmployeeBoard] = useState(false);
  const [showManagerBoard, setShowManagerBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showCustomerMenu, setShowCustomerMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  
  const currentLanguageCode = cookies.get('i18next') || 'en';
  
  const [lang, setLang] = useState(currentLanguageCode);

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

  const handleLangChange = (event, newLang) =>{
    console.log(newLang);
    setLang(newLang);
    i18next.changeLanguage(newLang);
  }

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">

      <Link to={"/"} className="navbar-brand">
        VehicleRental
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              {t('home-button')}
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/vehicles"} className="nav-link">
              {t('vehicles-button')}
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/faq"} className="nav-link">
              {t('faq')}
            </Link>
          </li>

          {showEmployeeBoard && (
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {t('employee-button')}

              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                <Link to={"/employee/editFAQ"} className="dropdown-item">
                  {t('edit-faq')}

                </Link>

                <Link to={"/employee/verifyLicense"} className="dropdown-item">
                  {t('verify-license')}
                </Link>

                <Link to={"/employee/manageVehicles"} className="dropdown-item">
                  {t('manage-vehicles')}
                </Link>

                <Link to={"/employee/fees"} className="dropdown-item">
                  {t('vehicle-fees')}
                </Link>

                <Link to={"/employee/payments"} className="dropdown-item">
                  {t('payments-button')}
                </Link>

                <Link to={"/employee/offers"} className="dropdown-item">
                  {t('offers-button')}

                </Link>

                <Link to={"/employee/complaints"} className="dropdown-item">
                  {t('complaints-button')}
                </Link>

              </div>
            </li>
          )}

          {showManagerBoard && (
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" href="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {t('manager-button')}

              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                <Link to={"/manager/addVehicle"} className="dropdown-item">
                  {t('new-vehicle-button')}
                </Link>

                <Link to={"/manager/rentalsHistory"} className="dropdown-item">
                  {t('rentals-history-button')}
                </Link>
              </div>
            </li>
          )}

          {showAdminBoard && (

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {t('admin-button')}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                <Link to={"/admin/manageUsers"} className="dropdown-item">
                  {t('users-button')}
                </Link>
                <Link to={"/admin/manageEmployees"} className="dropdown-item">
                  {t('emp-button')}
                </Link>
              </div>
            </li>

          )}

          {showCustomerMenu && (
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {t('user-dropdown')}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to={"/user/drivingLicense"} className="dropdown-item">
                  {t('driver-license')}
                </Link>
                <Link to={"/user/orders"} className="dropdown-item">
                  {t('user-orders')}
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
              <Link to={"/cart"} className="nav-link" style={{ padding: 0 }}>
                <IconButton aria-label="cart" >
                  {(userCart.length === 0) ? <ShoppingCartIcon style={{ color: grey[50] }} /> : <ShoppingCartIcon style={{ color: "red" }} />}
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
              {t('logout')}
            </a>
          </li>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              {t('login')}

            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              {t('signup')}
            </Link>
          </li>
        </div>
      )}
      <ToggleButtonGroup
  value={lang}
  exclusive
  onChange={handleLangChange}
>
  <ToggleButton value="pl" style={{ color: grey[50] }}>PL</ToggleButton>
  <ToggleButton value="en" style={{ color: grey[50] }}>EN</ToggleButton>
</ToggleButtonGroup>
    </nav>
  );
};

export default Navbar;