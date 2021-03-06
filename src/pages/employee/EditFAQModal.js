import React, { useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import AuthService from '../../services/auth.service';
import FaqService from "../../services/faq.service";



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


export default function EditFAQModal (props){
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [fieldError, setFieldError] = React.useState(false);
    const [fieldError2, setFieldError2] = React.useState(false);
    const [helpText, setHelpText] = React.useState("");
    const [helpText2, setHelpText2] = React.useState("");

    const faq = props.faq;
    const [question, setQuestion] = useState(faq.question);
    const [answer, setAnswer] = useState(faq.answer);

    const user = AuthService.getCurrentUser();
        
    const onChangeQuestion = (e) =>{
      const q = e.target.value;
      setQuestion(q);
    }

    const onChangeAnswer = (e) =>{
      const a = e.target.value;
      setAnswer(a);
    }

    const handleEditFAQ = () =>{
        if(question === ""){
            setFieldError(true);
            setHelpText("Field can't be empty!");
        }
        else setFieldError(false);
        if(answer === ""){
            setFieldError2(true);
            setHelpText2("Field can't be empty!");
        }
        else setFieldError2(false);

        if(question === "" || answer === ""){
            return;
        }
        //edit with server

        //fetch new array after edit
        //props.fetchFaq();
        FaqService.editFaq(faq.id, question, answer).then(
          (response)=>{
            console.log(response);
            props.fetchFaq();
          },
          (error)=>{
            console.log(error);
          }
        )

        //==========================
        props.setOpen(false);
      }

      const handleClose = () => {
        setFieldError(false);
        setFieldError2(false);
        setHelpText("");
        setHelpText2("");

        props.setOpen(false);
      };
    
      const modalBody = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Edit FAQ</h2>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField error={fieldError} helperText={helpText} id="standard-basic" style={{minWidth:"500px"}} label="Question" onChange={onChangeQuestion} defaultValue={faq.question} />
          <TextField error={fieldError2} helperText={helpText2} id="standard-basic" style={{minWidth:"500px"}} label="Answer" onChange={onChangeAnswer} defaultValue={faq.answer}/> <br /><br />
          <Button variant="contained" color="primary" onClick={() => handleEditFAQ()}>
            Edit
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