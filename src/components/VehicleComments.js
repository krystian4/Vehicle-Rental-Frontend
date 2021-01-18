import React, { useEffect, useState } from 'react'
import 'date-fns';
import { format } from "date-fns";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import VehicleService from "../services/vehicle.service";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import Button from '@material-ui/core/Button';
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


const VehicleComments = (props) => {
    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState("");
    const user = AuthService.getCurrentUser();

    const fetchComments = () =>{
        VehicleService.getVehicleComments(props.vehicleId).then(
            (response) => {
                console.log(response);
                setComments(response);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    useEffect(() => {
        fetchComments();
    }, [])

    const handleComment = (e) => {
        setUserComment(e.target.value);
    }
    const handlePostComment = (e) =>{
        const comment = {vehicleId:props.vehicleId, customerUsername: user.username, message:userComment};
        UserService.postUserComment(comment).then(
            (response)=>{
                console.log(response);
                fetchComments();
            },
            (error)=>{
                console.log(error);
            }
        )
        console.log("Dodawanie komentarza");
        console.log(user.username);
        setUserComment("");
    }

    return (
        <div>
            <h1>Comments</h1>
            <br />
            <Paper justify="space-between" style={{ padding: "10px 20px 40px 20px" }}>

            {user !== null && (
                <div>
                <h5>Add your comment</h5>
                <TextareaAutosize onChange={handleComment} style={{ width: "100%", paddingLeft: "5px" }} rowsMin="5" />
                <Button style={{float:"right"}} variant="contained" color="primary" onClick={handlePostComment} >
                    Post comment
                </Button>
                </div>
            )}
                
                {comments.map((comment) => (
                    <React.Fragment>
                        <Grid container wrap="nowrap" spacing={2} style={{ paddingTop: "20px" }}>
                            <Grid item>
                                <Avatar alt="Profile pic" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <h5 style={{ margin: 0, textAlign: "left" }}>{comment.customerUsername}</h5>
                                <p style={{ textAlign: "left", paddingLeft: "20px" }}>
                                    {comment.message}
                                </p>
                                <p style={{ fontSize: "small", textAlign: "right", color: "gray" }}>
                                    posted {format(new Date(comment.date), "yyyy-MM-dd, HH:mm:ss")}
                                 </p>
                            </Grid>
                        </Grid>
                        <Divider variant="fullWidth" style={{ margin: 0 }} />
                    </React.Fragment>
                ))}

            </Paper>
        </div>
    )
}
export default VehicleComments;