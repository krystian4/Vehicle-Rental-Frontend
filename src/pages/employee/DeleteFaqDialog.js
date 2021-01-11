import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FaqService from "../../services/faq.service";

export default function DeleteFaqDialog (props){
  const fId = props.faqId;

  const handleCloseDelete = () => {
    console.log("Deleted faq id:" + fId);
    //send delete request
    FaqService.deleteFaq(fId).then(
      (response)=>{
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    )
    props.setOpen(false);
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
        <DialogTitle id="alert-dialog-title">{"Delete this FAQ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this FAQ? You cannot undo this operation!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Delete
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}