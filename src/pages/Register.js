import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { CountryDropdown} from 'react-country-region-selector';
import DatePicker from "react-datepicker";
import { useTranslation } from 'react-i18next';

import AuthService from "../services/auth.service";

const Register = (props) => {
  const { t } = useTranslation('navbar');

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          {t('field-cant-be-empty')}
        </div>
      );
    }
  };
  
  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          {t('not-valid-email')}
        </div>
      );
    }
  };
  
  const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          {t('user-between-3-and-20')}
        </div>
      );
    }
  };
  
  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          {t('pass-between-6-and-40')}
        </div>
      );
    }
  };
  const rpassword = (value, props, components) => {
    if(value !== components['password'][0].value) {
      return (
        <div className="alert alert-danger" role="alert">
          {t('pass-not-same')}
        </div>
      );
    }
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeLastName = (e) => {
    const lastname = e.target.value;
    setLastName(lastname);
  };

  const onChangeAddress = (e) => {
    const address = e.target.value;
    setAddress(address);
  };

  const onChangeCity = (e) => {
    const city = e.target.value;
    setCity(city);
  };

  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password, name, lastname, address, city, phone, country, birthDate).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card" style={{width: "425px"}}>
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">{t('username')}</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">{t('password')}</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="rpassword">{t('repeat-password')}</label>
                <Input
                  type="password"
                  className="form-control"
                  name="repeat_password"
                  validations={[required, rpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">{t('name')}</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChangeName}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastname">{t('last-name')}</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={lastname}
                  onChange={onChangeLastName}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">{t('adress')}</label>
                <Input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={onChangeAddress}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">{t('city')}</label>
                <Input
                  type="text"
                  className="form-control"
                  name="city"
                  value={city}
                  onChange={onChangeCity}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">{t('phone-number')}</label>
                <Input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={phone}
                  onChange={onChangePhone}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
               <label htmlFor="country">{t('country')}</label>
               <div>
                  <CountryDropdown
                    name="country"
                    value={country}
                    onChange={(value)=> setCountry(value)} 
                  />
              </div>
              </div>

              <div className="form-group">
                <label style={{ marginRight: "5px" }}htmlFor="birthDate">{t('birth-date')}:</label>
                <DatePicker  dateFormat="dd/MM/yyyy" className="form-control" selected={birthDate} onChange={date => setBirthDate(date)} />
            </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">{t('signup')}</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;