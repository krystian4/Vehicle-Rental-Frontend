import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import UserService from '../../services/user.service'
import { useTranslation } from 'react-i18next';

export default function DeleteFaqDialog (props){
  const { t } = useTranslation('navbar');

  const userId = props.userId;

  const handleCloseDelete = () => {
    
    //send delete request
    UserService.deactivateUser(userId).then(
      (response) =>{
        console.log(response);
        props.fetchUsers();
      },
      (error) => {
        console.log("User not deleted");
        console.log(error);
      },
    )
    handleClose();
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
        <DialogTitle id="alert-dialog-title">{t('delete-this-user')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('delete-user-question')}
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