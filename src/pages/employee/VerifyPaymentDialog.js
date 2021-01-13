import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EmpService from "../../services/employee.service";

export default function VerifyLicenseDialog (props){

  const handleVerify = () => {
    console.log("Verified order: " + props.orderId);
    //send delete request
    EmpService.verifyPayment(props.orderId).then(
      ()=>{
        props.setOpen(false);
      }
    )
  };
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Verification"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Payment finished? {props.licenseNumber}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVerify} color="primary">
            Accept
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}