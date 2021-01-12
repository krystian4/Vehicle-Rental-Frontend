import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AuthService from "../../../services/auth.service"
import { withStyles } from "@material-ui/core/styles";

const DarkerDisabledTextField = withStyles({
  root: {
    marginRight: 8,
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.68)" // (default alpha is 0.38)
    }
  }
})(TextField);

export default function AddressForm() {
  const user = AuthService.getCurrentUser();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Your address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <DarkerDisabledTextField
            disabled
            value={user.firstName}
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DarkerDisabledTextField
            disabled
            value={user.lastName}
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <DarkerDisabledTextField
            disabled
            value={user.address}
            id="address"
            name="address"
            label="Address line 1"
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
            label="City"
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
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>

      </Grid>
    </React.Fragment>
  );
}