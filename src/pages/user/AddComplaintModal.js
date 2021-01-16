import React, { useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import UserService from "../../services/user.service";


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

export default function AddComplaintModal(props){
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [helpText, setHelpText] = React.useState("Describe your problem please");

    const user = JSON.parse(sessionStorage.getItem("user"));
    const [complaint, setComplaint] = useState("");

    const onChangeComplaint = (e) =>{
      const q = e.target.value;
      setComplaint(q);
    }

    const handleAddComplaint = () =>{
        if(complaint === ""){
            setHelpText("Field can't be empty!");
            return;
        }
        UserService.addComplaint(props.rentalId, complaint).then(
          (response)=>{
            console.log(response);
            window.alert("New complaint created");
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
          <h2 id="simple-modal-title">Create complaint for rental #{props.rentalId}</h2>
          
          <TextareaAutosize placeholder={helpText} id="standard-basic" style={{ width: "100%", paddingLeft: "5px", border:"1px solid black" }} rowsMin="5" onChange={onChangeComplaint}/>

          <Button variant="contained" color="primary" onClick={() => handleAddComplaint()}>
            Make a complain
          </Button>
          
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