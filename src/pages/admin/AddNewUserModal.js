
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail, isNumeric } from "validator";
import { CountryDropdown} from 'react-country-region-selector';
import DatePicker from "react-datepicker";
import Select from "react-validation/build/select";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { useTranslation } from 'react-i18next';

import AuthService from "../../services/auth.service";

const required = (value) => {

  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const validPhone = (value) => {
  if (value.length !== 9 || !isNumeric(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid phone number.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const rpassword = (value, props, components) => {
  if(value !== components['password'][0].value) {
    return (
      <div className="alert alert-danger" role="alert">
        The passwords are not the same.
      </div>
    );
  }
};

const positionValidator = (value) => {
  if(value === ""){
      return (
          <div className="alert alert-danger" role="alert">
            Choose Position!
          </div>
        );
  }
}

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
        position:'absolute',
        width:'450px',
        top: `${top}%`,
        left: `${left}%`,
        overflow:'scroll',
        height:'90%',
        display:'block',
        transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }));

export default function AddNewFAQModal (props){
    const { t } = useTranslation('navbar');
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

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
    const [jobTitle, setPosition] = useState("");
    const [bonus, setBonus] = useState('0');

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

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
    const onChangePosition = (e) => {
      const temp = e.target.value;
      setPosition(temp);
    };
    const onChangeBonus = (e) => {
      const temp = e.target.value;
      setBonus(temp);
    };

  const [roles, setRoles] = useState([])

  const handleChangeRole = (event) => {
    const roleExists = roles.find(role => role === event.target.name) !== undefined;
    const newRoles = roleExists ? roles.filter(role => role !== event.target.name) : [...roles, event.target.name];
    setRoles(newRoles);
    console.log(newRoles);

  };
  const roleError = roles.filter((v) => v).length < 1;

  const user = AuthService.getCurrentUser();
  const bossId = user.id;

  const employeeDto = {bonus, bossId, userId:-1, jobTitle};

  const registerEmployee= () => {
    console.log(employeeDto);
    AuthService.registerEmployee(employeeDto).then(
      (response) => {
        console.log(response);
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
    )
  }
  
    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
          console.log('Wysylam role: ', roles);
        AuthService.register(username, email, password, name, lastname, address, city, phone, country, birthDate, roles).then(
            (response) => {
            console.log("User utworzony jego id: " + response.data.id);
            employeeDto.userId = response.data.id;
            setMessage(response.data.message);
            setSuccessful(true);
            registerEmployee();
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
        )
        }
    };


    const handleClose = () => {
        props.setOpen(false);
      };
        

        
        const modalBody = (
            <div style={modalStyle} className={classes.paper}>
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

                <hr />


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
                    validations={[required, validPhone]}
                    />
                </div>

                <div className="form-group">
                  <label htmlFor="country">{t('country')}</label>
                  <div>
                      <CountryDropdown 
                          className="form-control"
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
                <hr />
                <div className="form-group">
                  <label htmlFor="jobTitle">
                  {t('title')}
                  </label>
                  <Select className="form-control" name='jobTitle' onChange={onChangePosition} validations={[positionValidator]}>
                          <option value=''>{t('choose-title')}</option>
                          <option value='Employee'>{t('employee')}</option>
                          <option value='Manager'>{t('manager')}</option>
                          <option value='Admin'>{t('admin')}</option>
                  </Select>
                </div>

                <div className="form-group">
                  <label htmlFor="roles">
                  {t('roles')}
                  </label>
                  <br />
                <FormControl style ={{margin:0}} required error={roleError} component="fieldset" className={classes.formControl}>
                    <FormControlLabel
                      control={<Checkbox color="primary"  onChange={handleChangeRole} name="employee" />}
                      label="employee"
                    />
                    <FormControlLabel
                      control={<Checkbox color="primary" onChange={handleChangeRole} name="manager" />}
                      label="manager"
                    />
                    <FormControlLabel
                      control={<Checkbox color="primary" onChange={handleChangeRole} name="admin" />}
                      label="admin"
                    />
                  <FormHelperText>{t('pick-atleast-one')}</FormHelperText>
                </FormControl>
                </div>

                <div className="form-group">
                <label htmlFor="bonus">Bonus</label>
                <Input
                  type="number"
                  className="form-control w-25"
                  name="bonus"
                  value={bonus}
                  onChange={onChangeBonus}
                />
            </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-block">{t('add-employee')}</button>
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
        );

        return(
            <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
            {modalBody}
        </Modal>
        )
    }