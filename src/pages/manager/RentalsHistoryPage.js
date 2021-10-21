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
import VisibilityIcon from '@material-ui/icons/Visibility';
import Loading from "../../components/Loading";
import VehicleService from "../../services/vehicle.service";
import VehicleRentalHistoryModal from "./VehicleRentalHistoryModal";
import { useTranslation } from 'react-i18next';


const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
  
  function Row(props) {
    const { t } = useTranslation('navbar');
    const { vehicle } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();
    const [historyModalisOpen, setHistoryModalIsOpen] = useState(false);
    const [vehicleId, setVehicleId] = useState('');
  
    return (
      <React.Fragment>
        <TableRow className={classes.root} >
          <TableCell style={{width:"60px"}}>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell >
          <TableCell align="left" component="th" scope="row">
            <strong>ID: </strong>{vehicle.id}
          </TableCell>
          <TableCell align="left" >
            <strong>{t('brand')}: </strong>{vehicle.brand}
          </TableCell>
          <TableCell align="left"  >
            <strong>Model: </strong>{vehicle.model}
          </TableCell>
          <TableCell align="left" >
          <strong>{t('category')}: </strong>{vehicle.category}
          </TableCell>
          <TableCell align="right" >
          <strong>{t('price')}: </strong>{vehicle.price.toFixed(2)}PLN
          </TableCell>
          <TableCell style={{  padding: 0 }} align="right">
                <IconButton aria-label="edit" className={classes.margin} onClick={()=>{
                  setHistoryModalIsOpen(true);
                  setVehicleId(vehicle.id);
                }}>
                  <VisibilityIcon />
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
                      <TableCell>{t('details')}</TableCell>
                    </TableRow>
                  </TableHead>
  
                  <TableBody>
                    <TableRow>
                            <TableCell style={{borderBottom:"unset"}} align="left"><img style={{width:"10rem"}} src={vehicle.pictureUrl} alt="Vehicle" title={vehicle.pictureUrl} /></TableCell>
                            <TableCell style={{borderBottom:"unset"}} align="left"><strong>{t('prod-country')}:</strong><br />{vehicle.country}</TableCell>
                            <TableCell style={{borderBottom:"unset"}} align="left"><strong>{t('prod-year')}:</strong><br />{vehicle.yearOfProduction}</TableCell>
                            <TableCell style={{borderBottom:"unset"}} align="left"><strong>{t('power')}:</strong><br />{vehicle.power}{t('hp')}</TableCell>
                            <TableCell style={{borderBottom:"unset"}} align="right"><strong>{t('description')}:</strong><br /> {vehicle.description}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>

        {historyModalisOpen && (
        <VehicleRentalHistoryModal open={historyModalisOpen} setOpen={setHistoryModalIsOpen} vehicleId={vehicleId} />
      )}
  
      </React.Fragment>
    );
  }

  const RentalsHistoryPage = () => {
    const { t } = useTranslation('navbar');
    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading]= useState(true)
    const [message, setMessage] = useState(t('no-vehicles'))
    const [vehicle, setVehicle] = useState(null);

    //const [dialogOpen, setDialogOpen] = useState(false);
    const [editVehicleOpen, setEditVehicleOpen] = useState(false);

    const fetchVehicles = () =>{
      VehicleService.getVehicles().then((response)=>{
        setVehicles(response);
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
      fetchVehicles();
    }, [])

    useEffect(() => {
      fetchVehicles();
    }, [editVehicleOpen])

    if(loading){
      return(
          <div className='container'>
              <Loading type='bars' color='grey' />
          </div>
      )
  }
  if(vehicles.length === 0){
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

      <header className="jumbotron">
        <h3>{t('veh-rental-history')}</h3>
      </header>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {vehicles.map((vehicle) => (
              <Row key={vehicle.id} vehicle={vehicle} setVehicle={setVehicle} setEditVehicleOpen={setEditVehicleOpen}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
    
  );
};

export default RentalsHistoryPage;