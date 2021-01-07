import React, { useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

import FaqService from '../../services/faq.service';

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
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [fieldError, setFieldError] = React.useState(false);
    const [helpText, setHelpText] = React.useState("");
    const [fieldError2, setFieldError2] = React.useState(false);


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
            setHelpText("Field can't be empty!");
        }
        else setFieldError(false);
        if(answer === ""){
            setFieldError2(true);
            setHelpText("Field can't be empty!");
        }
        else setFieldError2(false);

        if(question === "" || answer === ""){
            return;
        }

        //fetch new array after add
        //props.fetchFaq();
  
        //adding without server
        const newArr = props.arrayFAQs;
        newArr.push({id:3, "question":question, "answer":answer});
        props.setFAQs([...newArr]);
        //==========================
        console.log("Added by " + sessionStorage.getItem("user"));
        console.log(props.arrayFAQs);
        props.setOpen(false);
      }

      const handleClose = () => {
        props.setOpen(false);
      };
    
      const modalBody = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Add new FAQ</h2>
          <form className={classes.root} noValidate autoComplete="off">
          <TextField error={fieldError} helperText={helpText} id="standard-basic" style={{minWidth:"500px"}} label="Question" onChange={onChangeQuestion}/>
          <TextField error={fieldError2} helperText={helpText} id="standard-basic" style={{minWidth:"500px"}} label="Answer" onChange={onChangeAnswer}/> <br /><br />
          <Button variant="contained" color="primary" onClick={() => handleAddFAQ()}>
            Add
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