import React, { useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import FaqService from "../../services/faq.service";
import { useTranslation } from 'react-i18next';


function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 550,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export default function AddNewFAQModal (props){
    const { t } = useTranslation('navbar');
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [fieldError, setFieldError] = React.useState(false);
    const [helpText, setHelpText] = React.useState("");
    const [fieldError2, setFieldError2] = React.useState(false);

    const user = JSON.parse(sessionStorage.getItem("user"));
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const onChangeQuestion = (e) =>{
      const q = e.target.value;
      setQuestion(q);
    }

    const onChangeAnswer = (e) =>{
      const a = e.target.value;
      setAnswer(a);
    }

    const handleAddFAQ = () =>{
        if(question === ""){
            setFieldError(true);
            setHelpText(t('field-cant-be-empty'));
        }
        else setFieldError(false);
        if(answer === ""){
            setFieldError2(true);
            setHelpText(t('field-cant-be-empty'));
        }
        else setFieldError2(false);

        if(question === "" || answer === ""){
            return;
        }
        FaqService.addFaqToDatabase(user.idEmployee, question, answer).then(
          (response)=>{
            console.log(response);
            props.fetchFaq();
          },
          (error)=>{
            console.log(error);
          }
        )
        props.setOpen(false);
      }

      const handleClose = () => {
        props.setOpen(false);
      };
    
      const modalBody = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">{t('add-new-faq')}</h2>
          <form className={classes.root} noValidate autoComplete="off">
          <TextField error={fieldError} helperText={helpText} id="standard-basic" style={{minWidth:"500px"}} label={t('question')} onChange={onChangeQuestion}/>
          <TextField error={fieldError2} helperText={helpText} id="standard-basic" style={{minWidth:"500px"}} label={t('answer')} onChange={onChangeAnswer}/> <br /><br />
          <Button variant="contained" color="primary" onClick={() => handleAddFAQ()}>
          {t('add')}
          </Button>
        </form>
          
        </div>
      );

    return(
        <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
    )
}