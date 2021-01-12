import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddLicenseModal from "./AddLicenseModal";
import CustomerService from "../../services/customer.service";

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
    const user= AuthService.getCurrentUser();
    const classes = useStyles();
    const [licenseModalOpen, setOpenAddLicenseModal] = useState(false);
    const [licenseNumber, setLicenseNumber] = useState(false);

    useEffect(()=>{
      CustomerService.getCustomerDriverLicense(user.idCustomer).then(
        (response) => {
          console.log(response.idCustomer);
          setLicenseNumber(response.idCustomer);
        },
        (error)=>{
          console.log(error);
        }
      )
    })
    useEffect(()=>{
      CustomerService.getCustomerDriverLicense(user.idCustomer).then(
        (response) => {
          console.log(response.idCustomer);
          setLicenseNumber(response.idCustomer);
        },
        (error)=>{
          console.log(error);
        }
      )
    }, [licenseModalOpen])

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Your Driving License</h3>
      </header>

      <Grid item xs={12}>
        <Grid container justify="center" spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                  <ul style={{listStyleType:"none"}}>
                      <li><strong>License number:</strong> {licenseNumber ? licenseNumber: "EMPTY"}</li>
                      <li><strong>First Name:</strong> {user.firstName}</li>
                      <li><strong>Last Name: </strong>{user.lastName}</li>
                      <li><strong>Address: </strong>{user.address}</li>
                      <li><strong>City: </strong>{user.city}</li>
                      <li><strong>Country: </strong>{user.country}</li>
                  </ul>
                    {!licenseNumber && 
                      <Button variant="contained" color="primary" onClick={()=>{
                        setOpenAddLicenseModal(true);
                    }}>
                        Add license
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