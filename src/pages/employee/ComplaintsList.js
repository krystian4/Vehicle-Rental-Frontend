import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CancelIcon from '@material-ui/icons/Cancel';
import Loading from "../../components/Loading";
import EmpService from "../../services/employee.service";
import RemoveComplainDialog from "./RemoveComplainDialog";


const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
  
  function Row(props) {
    const { complaint } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();
  
    return (
      <React.Fragment>
        <TableRow className={classes.root} >
          <TableCell style={{width:"60px"}}>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell >
          <TableCell align="left" component="th" scope="row">
            <strong>Rental ID: </strong><br />{complaint.rentalId}
          </TableCell>
          <TableCell align="left" >
            <strong>Customer: </strong><br />{complaint.firstName} {complaint.lastName}
          </TableCell>
          <TableCell align="left" >
            <strong>E-mail: </strong><br />{complaint.email}
          </TableCell>
          <TableCell align="left" >
            <strong>Vehicle ID: </strong><br />{complaint.vehicleId}
          </TableCell>
          <TableCell align="left" >
            <strong>Brand: </strong><br />{complaint.brand}
          </TableCell>
          <TableCell align="left"  >
            <strong>Model: </strong><br />{complaint.model}
          </TableCell>
          <TableCell align="right" >
          <strong>Price: </strong><br />{complaint.resPrice.toFixed(2)}PLN
          </TableCell>
          <TableCell style={{  padding: 0 }} align="right">
                <IconButton aria-label="cancel" className={classes.margin} onClick={()=>{
                    props.setDialogOpen(true);
                    props.setComplaintId(complaint.complaintId);
                }}>
                          <CancelIcon />
                </IconButton>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>
  
                  <TableBody>
                    <TableRow>
                            <TableCell style={{borderBottom:"unset"}} align="left">{complaint.description}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
  
      </React.Fragment>
    );
  }

  const ComplaintsList = () => {
    const [complaints, setComplaints] = useState([])
    const [loading, setLoading]= useState(true)
    const [message, setMessage] = useState("No complaints available")
    const [complaintId, setComplaintId] = useState('');

    const [dialogOpen, setDialogOpen] = useState(false);


    const fetchComplaints = () =>{
      EmpService.getComplaints().then((response)=>{
        setComplaints(response);
        console.log(response);
        setLoading(false);
    })
    .catch((err) =>{
        console.log(err);
        setMessage("Connection error")
        setLoading(false);
    }) 
    }
    useEffect(() => {
      fetchComplaints();
    }, [])


    if(loading){
      return(
          <div className='container'>
              <Loading type='bars' color='grey' />
          </div>
      )
  }
  if(complaints.length === 0){
    return(
        <div className="container">
        <header className="jumbotron">
            <h2>{message}</h2>
        </header>
        </div>
    )
}

  return (
    
    
    <div className="container">

      {dialogOpen && (
        <RemoveComplainDialog
              complaintId={complaintId}
              setOpen={setDialogOpen}
              open={dialogOpen}
              fetchComplaints={fetchComplaints}
          />
      )} 

      <header className="jumbotron">
        <h3>Customers complaints</h3>
      </header>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {complaints.map((complaint) => (
              <Row key={complaint.id} complaint={complaint} setComplaintId={setComplaintId} setDialogOpen={setDialogOpen}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
    
  );
};

export default ComplaintsList;