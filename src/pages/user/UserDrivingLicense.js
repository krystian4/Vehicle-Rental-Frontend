import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddLicenseModal from "./AddLicenseModal";
import CustomerService from "../../services/customer.service";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    control: {
      padding: theme.spacing(2)
    }
  }));

const UserDrivingLicense = () => {
    const { t } = useTranslation('navbar');
    const user= AuthService.getCurrentUser();
    const classes = useStyles();
    const [licenseModalOpen, setOpenAddLicenseModal] = useState(false);
    const [licenseNumber, setLicenseNumber] = useState(false);
    const [status, setStatus] = useState(false);

    const fetchLicense = () =>{
      CustomerService.getCustomerDriverLicense(user.idCustomer).then(
        (response) => {
          console.log(response.idCustomer);
          setLicenseNumber(response.idCustomer);
        },
        (error)=>{
          console.log(error);
        }
      )
    }
    const fetchStatus = () =>{
      CustomerService.getLicenseVerificationStatus(user.idCustomer).then(
        (response) => {
          console.log(response);
          setStatus(response.status);
        },
        (error)=>{
          console.log(error);
        }
      )
    }

    useEffect(()=>{
      fetchLicense();
      fetchStatus();
    }, [])

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{t('your-driving-license')}</h3>
      </header>

      <Grid item xs={12}>
        <Grid container justify="center" spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                  <ul style={{listStyleType:"none"}}>
                      <li style={licenseNumber ? {} : { color: "red" }} ><strong>{t('license-num')}:</strong> {licenseNumber ? licenseNumber: "EMPTY"}</li>
                      <li><strong>{t('name')}:</strong> {user.firstName}</li>
                      <li><strong>{t('last-name')}: </strong>{user.lastName}</li>
                      <li><strong>{t('adress')}: </strong>{user.address}</li>
                      <li><strong>{t('city')}: </strong>{user.city}</li>
                      <li><strong>{t('country')}: </strong>{user.country}</li>
                      <li style={status ? {color: "green"} : { color: "red" }} ><strong>Status:</strong> {status ? t('verified'): t('not') + ' ' + t('verified')}</li>

                  </ul>
                    {!licenseNumber && 
                      <Button variant="contained" color="primary" onClick={()=>{
                        setOpenAddLicenseModal(true);
                    }}>
                        {t('add-license')}
                    </Button>
                    }
                    
              </Paper>
            </Grid>
        </Grid>
      </Grid>

      {licenseModalOpen && (
        <AddLicenseModal 
            setOpen={setOpenAddLicenseModal}
            open={licenseModalOpen}
            setLicenseNumber={setLicenseNumber}
        />
      )}


    </div>
  );
};

export default UserDrivingLicense;