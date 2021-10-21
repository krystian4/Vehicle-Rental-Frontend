import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail, isNumeric } from "validator";
import { CountryDropdown} from 'react-country-region-selector';
import DatePicker from "react-datepicker";
import UserService from "../../services/user.service";
import PasswordResetModal from "../../components/PasswordResetModal";
import Button from '@material-ui/core/Button';
import { parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';



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

export default function EditUserModal (props){
  const { t } = useTranslation('navbar');
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    console.log("Editing: " + props.user.username + "Brithdate: " + props.user.birthdate + "ID: " + props.user.id);
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState(props.user.username);
    const [email, setEmail] = useState(props.user.email);
    const [name, setName] = useState(props.user.firstName);
    const [lastname, setLastName] = useState(props.user.lastName);
    const [address, setAddress] = useState(props.user.address);
    const [city, setCity] = useState(props.user.city);
    const [phone, setPhone] = useState(props.user.phone);
    const [country, setCountry] = useState(props.user.country);
    const [birthDate, setBirthDate] = useState(parseISO(props.user.birthdate));

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    //change Password modal
    const [changePassOpen, setChangePasswordModalOpen] = useState(false);


    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
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
  
    const handleEdit = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
        // edit query
        UserService.editUser(props.user.id, username, email, name, lastname, birthDate, address, city, country, phone).then(
          (response)=>{
            console.log(response);
            handleClose();
          },
          (error)=>{
            console.log(error);
          }
        )
        }
    };

    const handleClose = () => {
        props.setOpen(false);
      };
        

        
        const modalBody = (
            <div style={modalStyle} className={classes.paper}>

            {changePassOpen && (<PasswordResetModal
              open={changePassOpen}
              setOpen={setChangePasswordModalOpen}
              userId={props.user.id}
              />
            )}

            <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
            />

            <Form onSubmit={handleEdit} ref={form}>
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
                <div style={{paddingBottom:"0.5rem"}}>
                  <Button variant="contained" color="primary" onClick={()=>setChangePasswordModalOpen(true)}>
                  {t('change-password')}
                  </Button>
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
                    <DatePicker  dateFormat="yyyy-MM-dd" className="form-control" selected={birthDate} onChange={date => setBirthDate(date)} />
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-block">{t('edit')}</button>
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