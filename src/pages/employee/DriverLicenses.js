import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import VerifyLicenseDialog from './VerifyLicenseDialog'
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

const DriverLicenses = () => {
  const { t } = useTranslation('navbar');
    const classes = useStyles();
    const [driverLicenses, setDriverLicenses] = useState([]);
    const [verifyDialogOpen, setOpenVerifyDialog] = useState(false);
    const [licenseNumber, setLicenseNumber] = useState('');
    const [userId, setUserId] = useState('');


    const fetchDriverLicenses = () =>{
      UserService.getDriverLicensesToVerification().then(
        (response)=>{
            setDriverLicenses(response);
            console.log(response);
        }
    )
    }
  useEffect(() => {
    //get licenses to verification
    fetchDriverLicenses();
  }, []);

  useEffect(() => {
    //get licenses to verification
    fetchDriverLicenses();
  }, [verifyDialogOpen]);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{t('driver-licenses-ver')}</h3>
      </header>

      {verifyDialogOpen &&(
          <VerifyLicenseDialog
          setOpen={setOpenVerifyDialog}
          open={verifyDialogOpen}
          licenseNumber={licenseNumber}
          userId={userId}
          />
      )}

      <Grid item xs={12}>
        <Grid container justify="center" spacing={3}>
          {driverLicenses.map((value) => (
            <Grid key={value.id} item xs={12} sm={6}>
              <Paper noWrap className={classes.paper} >
                  <ul style={{listStyleType:"none"}}>
                      <li><strong>{t('customer-id')}: </strong> {value.id}</li>
                      <li><strong>{t('license-num')}: </strong>{value.drivingLicenseNumber}</li>
                      <li><strong>{t('name')}: </strong>{value.firstName}</li>
                      <li><strong>{t('last-name')}: </strong>{value.lastName}</li>
                      <li><strong>{t('adress')}: </strong>{value.address}</li>
                      <li><strong>{t('city')}: </strong>{value.city}</li>
                      <li><strong>{t('country')}: </strong>{value.country}</li>
                  </ul>
                    <Button variant="contained" color="primary" onClick={()=>{
                        setLicenseNumber(value.drivingLicenseNumber);
                        setUserId(value.id)
                        setOpenVerifyDialog(true);
                    }}>
                        {t('verify')}
                    </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>


    </div>
  );
};

export default DriverLicenses;