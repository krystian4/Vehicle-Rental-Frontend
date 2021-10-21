import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useTranslation } from 'react-i18next';

export default function PaymentForm(props) {
  const { t } = useTranslation('navbar');

  const [paymentMethod, setPaymentMethod] = React.useState(props.card.cash? "cash":"card");
  const [cardPayment, setCardPayment] = React.useState(!props.card.cash);

  const [cardName, setCardName] = React.useState(props.card.cardName);
  const [cardNumber, setCardNumber] = React.useState(props.card.cardNumber);
  const [expDate, setExpDate] = React.useState(props.card.expDate);
  const [cvv, setCvv] = React.useState(props.card.cvv);

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
    if(event.target.value === "cash"){
      setCardPayment(false);
      props.card.cash=true;
    }
    else {
      setCardPayment(true)
      props.card.cash=false;
    };
  };

  const handleCardNameChange = (event) => {
    setCardName(event.target.value);
    props.card.cardName = event.target.value;
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
    props.card.cardNumber = event.target.value;
  };

  const handleExpDateChange = (event) => {
    setExpDate(event.target.value);
    props.card.expDate = event.target.value;
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
    props.card.cvv = event.target.value;
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      {t('payment-method')}
      </Typography>
      <Grid item xs={12}>
          <FormControl component="fieldset">
                <RadioGroup aria-label="method" name="method" value={paymentMethod} onChange={handleChange}>
                  <FormControlLabel value="card" control={<Radio color="primary"/>} label={t('use-card')} />
                  <FormControlLabel value="cash" control={<Radio color="primary"/>} label={t('pay-with-cash')} />
              </RadioGroup>
           </FormControl>
        </Grid>
       
       {cardPayment && (
          <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField required id="cardName" value={cardName} onChange={handleCardNameChange} label={t('name-on-card')} fullWidth autoComplete="cc-name" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              label={t('card-number')}
              fullWidth
              autoComplete="cc-number"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="expDate" value={expDate} onChange={handleExpDateChange} label={t('exp-date')} fullWidth autoComplete="cc-exp" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              label="CVV"
              helperText={t('card-helper')}
              fullWidth
              autoComplete="cc-csc"
              value={cvv}
              onChange={handleCvvChange}
            />
          </Grid>
         </Grid>

       )}
      
    </React.Fragment>
  );
}