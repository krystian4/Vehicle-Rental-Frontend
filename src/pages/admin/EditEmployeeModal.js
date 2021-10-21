import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Select from "react-validation/build/select";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import EmpService from "../../services/employee.service";
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

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
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

export default function EditEmployeeModal (props){
  const { t } = useTranslation('navbar');
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState(props.user.username);
    const [email, setEmail] = useState(props.user.email);
    const [firstName, setName] = useState(props.user.firstName);
    const [lastName, setLastName] = useState(props.user.lastName);
    const [jobTitle, setPosition] = useState(props.user.jobTitle);
    const [bonus, setBonus] = useState(props.user.bonus);

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const [roles, setRoles] = useState([])

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
    
    const onChangePosition = (e) => {
      const temp = e.target.value;
      setPosition(temp);
    };
    const onChangeBonus = (e) => {
      const temp = e.target.value;
      setBonus(temp);
    };


  const handleChangeRole = (event) => {

    const roleExists = roles.find(role => role === event.target.name) !== undefined;
    const newRoles = roleExists ? roles.filter(role => role !== event.target.name) : [...roles, event.target.name];
    setRoles(newRoles);

  };
  const roleError = roles.filter((v) => v).length < 1;

  const employeeDto = {userId:props.user.userId, username,email, firstName, lastName, jobTitle, roles, bonus};

  
    const handleEdit = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
          console.log(employeeDto);
          EmpService.editEmployee(employeeDto).then(
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

                <hr />

                <div className="form-group">
                    <label htmlFor="firstName">{t('name')}</label>
                    <Input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={firstName}
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
                    value={lastName}
                    onChange={onChangeLastName}
                    validations={[required]}
                    />
                </div>

                <div className="form-group">
                  <label htmlFor="jobTitle">
                  {t('title')}
                  </label>
                  <Select className="form-control" name='jobTitle' value={jobTitle} onChange={onChangePosition} validations={[positionValidator]}>
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
                <FormControl style ={{margin:0}} required error={roleError} value={roles} component="fieldset" className={classes.formControl}>
                    <FormControlLabel
                      control={<Checkbox color="primary" onChange={handleChangeRole} name="employee" />}
                      label="regular"
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
                    <button className="btn btn-primary btn-block">{t('edit-employee')}</button>
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