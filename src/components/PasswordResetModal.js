import React, { useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import AuthService from '../services/auth.service';
import UserService from "../services/user.service";
import { useTranslation } from 'react-i18next';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 550,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));


export default function EditFAQModal (props){
  const { t } = useTranslation('navbar');
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [fieldError, setFieldError] = React.useState(false);
    const [fieldError2, setFieldError2] = React.useState(false);

    const [helpText, setHelpText] = React.useState("");
    const [helpText2, setHelpText2] = React.useState("");

    const userId = props.userId;
    const [password, setPassword] = useState('');
    const [rpassword, setRPassword] = useState('');

    const user = AuthService.getCurrentUser();
        
    const onChangePassword = (e) =>{
      const t = e.target.value;
      setPassword(t);
    }

    const onChangeRPassword = (e) =>{
      const t = e.target.value;
      setRPassword(t);
    }

    const handleChangePassword = () =>{
        
        if(password === "" || rpassword === ""){
            if(password === ""){
              setFieldError(true);
              setHelpText(t('field-cant-be-empty'));
            }
            else setFieldError(false);

            if(rpassword === ""){
              setFieldError2(true);
              setHelpText2(t('field-cant-be-empty'));
            }
            else setFieldError2(false);

            return;
        }

        if(password !== rpassword){
          setFieldError2(true);
          setHelpText2(t('password-confirmation-failed'));
          return;
        }
        //edit with server
        UserService.changePassword(userId, password).then(
          (response)=>{
            console.log(response);
          },
          (error)=>{
            console.log(error);
          }
        )

        //fetch new array after edit
        //props.fetchFaq();

        //==========================
        console.log("Edited id: " + userId + " by userid: " + user.id);
        props.setOpen(false);
      }

      const handleClose = () => {
        setFieldError(false);
        setFieldError2(false);
        setHelpText("");
        setHelpText2("");

        props.setOpen(false);
      };
    
      const modalBody = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">{t('change-password')}</h2>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField error={fieldError} type="password" helperText={helpText} id="standard-basic" style={{minWidth:"500px"}} label={t('password')} onChange={onChangePassword} />
          <TextField error={fieldError2} type="password" helperText={helpText2} id="standard-basic2" style={{minWidth:"500px"}} label={t('repeat-password')} onChange={onChangeRPassword}/> <br /><br />
          <Button variant="contained" color="primary" onClick={() => handleChangePassword()}>
          {t('change-password')}
          </Button>
        </form>
          
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