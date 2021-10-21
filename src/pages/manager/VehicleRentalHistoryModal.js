import React, { useState, useRef, useEffect } from "react";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VehicleService from "../../services/vehicle.service";
import { format } from "date-fns";
import { useTranslation } from 'react-i18next';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
        position:'absolute',
        //width:'90%',
        top: `${top}%`,
        left: `${left}%`,
        //overflow:'scroll',
        // height:'90%',
        display:'block',
        transform: `translate(-${top}%, -${left}%)`,
    };
}
  
const useStyles = makeStyles((theme) => ({
paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
},
root: {
    display: 'flex',
},
formControl: {
    margin: theme.spacing(3),
},
}));

const EditVehicleModal = (props) => {
    const { t } = useTranslation('navbar');
    const vehicleId = props.vehicleId;
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [rentals, setRentals] = useState([]);

    const handleClose = () => {
        props.setOpen(false);
    };

    useEffect(() => {
        console.log(vehicleId);
        VehicleService.getRentalHistory(vehicleId).then(
            (response)=>{
                console.log(response);
                setRentals(response.rentals);
            },
            (error)=>{
                console.log(error);
            }
        )
      }, [])

const modalBody = (
    <div style={modalStyle} className={classes.paper}>
        <TableContainer component={Paper}>
            <Table  aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">{t('start-date')}</TableCell>
                        <TableCell align="right">{t('end-date')}</TableCell>
                        <TableCell align="right">{t('price')}</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                {rentals.map((rental) => (
                    <TableRow key={rental.id}>
                        <TableCell component="th" scope="row">
                            {rental.id}  
                        </TableCell>
                        <TableCell align="right">{format(new Date(rental.startDate), "yyyy-MM-dd")}</TableCell>
                        <TableCell align="right">{format(new Date(rental.endDate), "yyyy-MM-dd")}</TableCell>
                        <TableCell align="right">{rental.cost.toFixed(2)}</TableCell>
                    </TableRow>
                ))}
                </TableBody> 

            </Table>
        </TableContainer>
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
);
    
  
};

export default EditVehicleModal;