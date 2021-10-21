import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Loading from "../../components/Loading";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AddOfferModal from './AddOfferModal';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EmpService from "../../services/employee.service";
import { useTranslation } from 'react-i18next';

const useRowStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function Row(props) {
  const { t } = useTranslation('navbar');

    const { offer } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();

    const removeOffer = (id) =>{
        EmpService.deleteOffer(id).then(
            (response)=>{
                console.log(response);
                props.fetchOffers();
            },
            (error)=>{
                console.log(error);
            }
        )
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root} >
                <TableCell style={{ width: "60px" }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell >
                <TableCell component="th" scope="row">
                    <strong>{t('offer-id')}:</strong> {offer.offerId}
                </TableCell>
                <TableCell align="right"><strong>{t('created-by')}:</strong> {offer.employeeUsername} </TableCell>
                <TableCell align="right"><strong>{t('descrption')}: </strong>{offer.description} </TableCell>
                <TableCell align="right"><strong>{t('discount')}:</strong> {offer.discount}%</TableCell>
                <TableCell align="right">
                    <IconButton aria-label="edit" className={classes.margin} onClick={()=>removeOffer(offer.offerId)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: "rgba(122,121,122, 0.1)" }} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={10}>{t('vehicles-covered-by-prom')}</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {offer.vehicles.map((vehicle) => (
                                        <TableRow key={vehicle.vehicleId}>
                                            <TableCell style={{ borderBottom: "unset" }} align="left"><strong>{t('vehicleid')}:</strong><br />{vehicle.vehicleId}</TableCell>
                                            <TableCell style={{ borderBottom: "unset" }} align="left"><strong>{t('brand')}:</strong><br />{vehicle.brand}</TableCell>
                                            <TableCell style={{ borderBottom: "unset" }} align="left"><strong>Model:</strong><br />{vehicle.model}</TableCell>
                                            <TableCell style={{ borderBottom: "unset" }} align="right"><strong>{t('standard-price')}:</strong><br /> {vehicle.price.toFixed(2)}PLN</TableCell>
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


const Offers = () => {
  const { t } = useTranslation('navbar');

    const [offers, setOffers] = useState([]);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(t('no-offers'));

    const [addModalIsOpen, setAddModalOpen] = useState(false);

    const fetchOffers = () => {
        EmpService.getActiveOffers()
            .then((response) => {
                setOffers(response);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setMessage("Connection error")
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchOffers();
    }, [])

    if (loading) {
        return (
            <div className='container'>
                <Loading type='bars' color='grey' />
            </div>
        )
    }

    if (offers.length === 0) {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h2>{message}</h2>
                </header>
                <div style={{ paddingBottom: "0.5rem" }}>
                    <Button variant="contained" color="primary" onClick={() => setAddModalOpen(true)}>
                    {t('add-new-offer')}
                    </Button>
                </div>

                {addModalIsOpen && (
                    <AddOfferModal setOpen={setAddModalOpen} open={addModalIsOpen} fetchOffers={fetchOffers}/>
                )}
            </div>
        )
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{t('offers-button')}</h3>
            </header>
            <div style={{ paddingBottom: "0.5rem" }}>
                <Button variant="contained" color="primary" onClick={() => setAddModalOpen(true)}>
                {t('add-new-offer')}
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableBody>
                        {offers.map((offer) => (
                            <Row key={offer.offerId} offer={offer} fetchOffers={fetchOffers} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {addModalIsOpen && (
                <AddOfferModal setOpen={setAddModalOpen} open={addModalIsOpen} fetchOffers={fetchOffers}/>
            )}

        </div>

    );

}
export default Offers;