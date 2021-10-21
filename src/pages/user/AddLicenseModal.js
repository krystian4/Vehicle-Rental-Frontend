import React, { useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import UserService from "../../services/user.service";
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
      width: 500,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export default function AddLicenseModal (props){
    const { t } = useTranslation('navbar');
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [fieldError, setFieldError] = React.useState(false);
    const [helpText, setHelpText] = React.useState("");

    const user = JSON.parse(sessionStorage.getItem("user"));
    const [licenseNumber, setNumber] = useState(null);

    const onChangeNumber = (e) =>{
      const q = e.target.value;
      setNumber(q);
    }

    const handleAddLicense = () =>{
        if(licenseNumber === ""){
            setFieldError(true);
            setHelpText(t('field-cant-be-empty'));
            return;
        }
        else setFieldError(false);
        console.log(licenseNumber);
        console.log(user.idCustomer);
        props.setLicenseNumber(licenseNumber);
        UserService.updateLicenseNumber(user.idCustomer, licenseNumber).then(
            (response)=>{
                console.log(response);
            },
            (error)=>{
                console.log(error);
            }
        )
        props.setOpen(false);
      }

      const handleClose = () => {
        props.setOpen(false);
      };
    
      const modalBody = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">{t('add-license-num')}</h2>
          <form className={classes.root} noValidate autoComplete="off">
          <TextField error={fieldError} type="number" helperText={helpText} id="standard-basic" style={{minWidth:"400px"}} label={t('license-num')} onChange={onChangeNumber}/>
          <br /><br />
          <Button variant="contained" color="primary" onClick={() => handleAddLicense()}>
          {t('add')}
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