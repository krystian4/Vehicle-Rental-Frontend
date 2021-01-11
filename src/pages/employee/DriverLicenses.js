import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import VerifyLicenseDialog from './VerifyLicenseDialog'

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
    const classes = useStyles();
    const [driverLicenses, setDriverLicenses] = useState([]);
    const [verifyDialogOpen, setOpenVerifyDialog] = useState(false);
    const [licenseNumber, setLicenseNumber] = useState('');
    const [userId, setUserId] = useState('');


  useEffect(() => {
    //get licenses to verification
    UserService.getDriverLicensesToVerification().then(
        (response)=>{
            setDriverLicenses(response);
            console.log(response);
        }
    )
  }, []);

  useEffect(() => {
    //get licenses to verification
    UserService.getDriverLicensesToVerification().then(
        (response)=>{
            setDriverLicenses(response);
            console.log(response);
        }
    )
  }, [verifyDialogOpen]);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Driver Licenses verification</h3>
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
            <Grid key={value.clientId} item xs={12} sm={6}>
              <Paper className={classes.paper}>
                  <ul style={{listStyleType:"none"}}>
                      <li>UserId: {value.id}</li>
                      <li>License number: {value.drivingLicenseNumber}</li>
                      <li>First Name: {value.firstName}</li>
                      <li>Last Name: {value.lastName}</li>
                      <li>Address: {value.address}</li>
                      <li>City: {value.city}</li>
                      <li>Country: {value.country}</li>
                  </ul>
                    <Button variant="contained" color="primary" onClick={()=>{
                        setLicenseNumber(value.licenseNumber);
                        setUserId(value.id)
                        setOpenVerifyDialog(true);
                    }}>
                        Verify
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