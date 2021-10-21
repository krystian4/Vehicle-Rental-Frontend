import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { format } from "date-fns";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const { t } = useTranslation('navbar');

  const classes = useStyles();
  const card = props.card;

  const [cart, setCart] = React.useState(JSON.parse(sessionStorage.getItem("cart")));
  const cartTotal = cart.reduce((total, { resPrice = 0 }) => total + resPrice, 0);
  
  const handleAddInfChange = (event) =>{
      props.setInfo(event.target.value);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      {t('order-summary')}
      </Typography>
      <List disablePadding>
        {cart.map((product, index) => (
          <ListItem className={classes.listItem} key={index}>
            <ListItemText primary={index+1 + ". " +product.brand + " " + product.model} secondary={format(new Date(product.startDate), "yyyy/MM/dd") + " - " + format(new Date(product.endDate), "yyyy/MM/dd")} />
            <Typography variant="body2">{product.resPrice}.00PLN</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {cartTotal}.00PLN
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
          {t('our-localization')}
          </Typography>
          <Typography gutterBottom>VehicleRental</Typography>
          <Typography gutterBottom>Słoneczna 10</Typography>
          <Typography gutterBottom>Kraków</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
          {t('payment-details')}
          </Typography>
          
              {card.cash && (
                  <Grid container>
                    <Grid item xs={12}>
                    <Typography gutterBottom>{t('paid-with-cash')}</Typography>  
                    </Grid>
                  </Grid>
              )}

              {!card.cash && (
                <Grid container>
                    <Grid item xs={6}>
                    <Typography gutterBottom>{t('name')}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <Typography gutterBottom>{card.cardName}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                    <Typography gutterBottom>{t('card-number')}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <Typography gutterBottom>{card.cardNumber}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                    <Typography gutterBottom>{t('exp-date')}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <Typography gutterBottom>{card.expDate}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                    <Typography gutterBottom>CVV</Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <Typography gutterBottom>{card.cvv}</Typography>
                    </Grid>
                </Grid>
              )}
        </Grid>
        <Typography variant="h6" gutterBottom className={classes.title}>{t('additional-info')}</Typography>
        <TextareaAutosize onChange={handleAddInfChange} style={{width:"100%"}} rowsMin="5" />
      </Grid>
    </React.Fragment>
  );
}