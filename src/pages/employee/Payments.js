import React, { useState, useEffect } from "react";
import EmpService from "../../services/employee.service";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import VerifyPaymentDialog from './VerifyPaymentDialog'
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
    const [payments, setPayments] = useState([]);
    const [verifyDialogOpen, setOpenVerifyDialog] = useState(false);
    const [orderID, setOrderID] = useState('');


    const fetchDriverLicenses = () =>{
        EmpService.getUnpaidOrders().then(
        (response)=>{
            setPayments(response);
            console.log(response);
        }
    )
    }

  useEffect(() => {
    //get licenses to verification
    fetchDriverLicenses();
  }, [verifyDialogOpen]);

  if(payments.length === 0){
    return(
        <div className="container">
    <header className="jumbotron">
      <h3>{t('no-payments')}</h3>
    </header>
    </div>
    );
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{t('payments-button')}</h3>
      </header>

      {verifyDialogOpen &&(
          <VerifyPaymentDialog
          setOpen={setOpenVerifyDialog}
          open={verifyDialogOpen}
          orderId={orderID}
          />
      )}

      <Grid item xs={12}>
        <Grid container justify="center" spacing={3}>
          {payments.map((value) => (
            <Grid key={value.orderId} item xs={12} sm={6}>
              <Paper style={{flexWrap:"wrap", wordWrap:"break-word"}} className={classes.paper}>
                  <ul style={{listStyleType:"none"}}>
                      <li><strong>{t('customer-id')}: </strong>{value.customerId}</li>
                      <li><strong>{t('order-id')}: </strong>{value.orderId}</li>
                      <li><strong>{t('name')}: </strong>{value.firstName}</li>
                      <li><strong>{t('last-name')}: </strong>{value.lastName}</li>
                      <li><strong>{t('date')}: </strong>{value.date}</li>
                      <li><strong>{t('total-cost')}: </strong>{value.cost}.00PLN</li>
                      <li><strong>{t('additional-info')}: </strong><br />{value.comments}</li>
                  </ul>
                    <Button variant="contained" color="primary" onClick={()=>{
                        setOrderID(value.orderId);
                        setOpenVerifyDialog(true);
                    }}>
                        {t('finish')}
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