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
import Loading from "../../components/Loading";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import { format } from "date-fns";
import ErrorIcon from '@material-ui/icons/Error';


const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
  
  function Row(props) {
    const { order } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();
    const [historyModalisOpen, setHistoryModalIsOpen] = useState(false);
    const [vehicleId, setVehicleId] = useState('');
  
    return (

      <React.Fragment >
         <TableRow className={classes.root} >
          <TableCell style={{width:"60px"}}>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell >
          <TableCell align="left" component="th" scope="row">
            <strong>ID: </strong>{order.id}
          </TableCell>
          <TableCell align="left" >
            <strong>Order Date: </strong>{format(new Date(order.date), "yyyy-MM-dd")}
          </TableCell>
          <TableCell align="right" >
          <strong>Total Cost: </strong>{order.cost.toFixed(2)}PLN
          </TableCell>
        </TableRow>

        <TableRow >
          <TableCell  colSpan={10} style={{paddingBottom: 0, paddingTop: 0, backgroundColor:"rgba(122,121,122, 0.1)"}}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1} >
                <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow >
                    <TableCell style={{borderBottom: '1px solid black'}}>Pos.</TableCell>
                      <TableCell colSpan={4} style={{borderBottom: '1px solid black'}}>Details</TableCell>
                      <TableCell style={{borderBottom: '1px solid black'}} align="right">Complaint</TableCell>
                    </TableRow>
                  </TableHead>
  
                  <TableBody >
                    {order.rentals.map((rental, index)=>(
                      <TableRow >
                            {/* <TableCell style={{borderBottom:"unset"}} align="left"><img style={{width:"10rem"}} src={vehicle.pictureUrl} alt="Vehicle" title={vehicle.pictureUrl} /></TableCell> */}
                            <TableCell style={{borderBottom:"unset"}} align="left"><strong>{index}</strong></TableCell>
                            <TableCell style={{borderBottom:"unset"}} align="left"><strong>Brand:</strong><br />{rental.brand}</TableCell>
                            <TableCell style={{borderBottom:"unset"}} align="left"><strong>Model:</strong><br />{rental.model}</TableCell>
                            <TableCell style={{borderBottom:"unset"}} align="left"><strong>Period:</strong><br />{rental.startDate} - {rental.endDate}</TableCell>
                            

                            <TableCell style={{borderBottom:"unset"}} align="right"><strong>Cost:</strong><br /> {rental.resPrice.toFixed(2)}</TableCell>
                            <TableCell style={{borderBottom:"unset", width:"50px"}} align="right">
                              <IconButton >
                                <ErrorIcon style={{color:"red"}} />
                              </IconButton>
                            </TableCell>

                      </TableRow>
                    ))}
                    
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow> 

      </React.Fragment>
    );
  }

  const UserOrdersPage = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading]= useState(true)
    const [message, setMessage] = useState("No FAQs here")
    const [vehicle, setVehicle] = useState(null);
    const user = AuthService.getCurrentUser();

    //const [dialogOpen, setDialogOpen] = useState(false);
    const [editVehicleOpen, setEditVehicleOpen] = useState(false);

    const fetchOrders = () =>{
      console.log(user.idCustomer);
      UserService.getUserOrders(user.idCustomer).then((response)=>{
        setOrders(response);
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
      fetchOrders();
    }, [])

    useEffect(() => {
      fetchOrders();
    }, [editVehicleOpen])

    if(loading){
      return(
          <div className='container'>
              <Loading type='bars' color='grey' />
          </div>
      )
  }
  if(orders.length === 0){
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

      {/* {dialogOpen && (
        <DeleteFaqDialog
              faqId={FAQID}
              setOpen={setDialogOpen}
              open={dialogOpen}
          />
      )} */}


      <header className="jumbotron">
        <h3>Your orders</h3>
      </header>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {orders.map((order) => (
              <Row  key={order.id} order={order}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
    
  );
};

export default UserOrdersPage;