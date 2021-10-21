import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AuthService from "../../../services/auth.service"
import { withStyles } from "@material-ui/core/styles";
import { useTranslation } from 'react-i18next';

const DarkerDisabledTextField = withStyles({
  root: {
    marginRight: 8,
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.68)" // (default alpha is 0.38)
    }
  }
})(TextField);

export default function AddressForm() {
  const { t } = useTranslation('navbar');

  const user = AuthService.getCurrentUser();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      {t('your-address')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <DarkerDisabledTextField
            disabled
            value={user.firstName}
            id="firstName"
            name="firstName"
            label={t('name')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DarkerDisabledTextField
            disabled
            value={user.lastName}
            id="lastName"
            name="lastName"
            label={t('last-name')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <DarkerDisabledTextField
            disabled
            value={user.address}
            id="address"
            name="address"
            label={t('adress')}
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DarkerDisabledTextField
            disabled
            value={user.city}
            id="city"
            name="city"
            label={t('city')}
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <DarkerDisabledTextField
            disabled
            value={user.country}
            id="country"
            name="country"
            label={t('country')}
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>

      </Grid>
    </React.Fragment>
  );
}