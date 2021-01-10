import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Select from "react-validation/build/select";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
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
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    console.log("Editing: " + props.user.username + "Brithdate: " + props.user.birthdate);
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState(props.user.username);
    const [email, setEmail] = useState(props.user.email);
    const [name, setName] = useState(props.user.firstName);
    const [lastname, setLastName] = useState(props.user.lastName);
    const [jobTitle, setPosition] = useState(props.user.jobTitle);
    const [bonus, setBonus] = useState(props.user.bonus);

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

  const [roles, setRoles] = useState([])

  const handleChangeRole = (event) => {
    const roleExists = roles.find(role => role === event.target.name) !== undefined;
    const newRoles = roleExists ? roles.filter(role => role !== event.target.name) : [...roles, event.target.name];
    setRoles(newRoles);

  };
  const roleError = roles.filter((v) => v).length < 1;

  const user = AuthService.getCurrentUser();
  const bossId = user.id;

  const employeeDto = {bonus, bossId, userId:-1, jobTitle};

  
    const handleEdit = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
          
        AuthService.register(username, email, name, lastname).then(
            (response) => {
            console.log("User utworzony jego id: " + response.data.id);
            employeeDto.userId = response.data.id;
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
                    <label htmlFor="username">Username</label>
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
                    <label htmlFor="name">Name</label>
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
                    <label htmlFor="lastname">Last Name</label>
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
                  <label htmlFor="jobTitle">
                      Title
                  </label>
                  <Select className="form-control" name='jobTitle' onChange={onChangePosition} validations={[positionValidator]}>
                          <option value=''>Choose job title...</option>
                          <option value='Employee'>Employee</option>
                          <option value='Manager'>Manager</option>
                          <option value='Admin'>Admin</option>
                  </Select>
                </div>

                <div className="form-group">
                  <label htmlFor="roles">
                      Roles
                  </label>
                  <br />
                <FormControl style ={{margin:0}} required error={roleError} component="fieldset" className={classes.formControl}>
                    <FormControlLabel
                      control={<Checkbox color="primary"  onChange={handleChangeRole} name="regular" />}
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
                  <FormHelperText>Pick at least one.</FormHelperText>
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
                    <button className="btn btn-primary btn-block">Sign Up</button>
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