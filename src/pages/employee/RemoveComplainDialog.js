import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EmpService from "../../services/employee.service";
import { useTranslation } from 'react-i18next';

export default function RemoveComplainDialog (props){
  const { t } = useTranslation('navbar');

  const handleCloseDelete = () => {
    console.log("Deleted complain id:" + props.complaintId);
    //send delete request
    EmpService.deleteComplaint(props.complaintId).then(
      (response)=>{
        console.log(response);
        props.fetchComplaints();
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
        <DialogTitle id="alert-dialog-title">{t('delete-complaint')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {t('delete-complaint-warning')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
          {t('delete')}
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
          {t('cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}