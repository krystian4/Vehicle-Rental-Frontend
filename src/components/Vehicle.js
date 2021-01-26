import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(300),
        },
    },
}));

const Vehicle = ({ id, brand, category, model, yearOfProduction, country, power, price, description, pictureUrl, discount, removeVehicle }) => {
    const classes = useStyles();
    const vehicle = {
        id,
        brand,
        model,
        yearOfProduction,
        country,
        power: power,
        price: (100 - discount) / 100 * price,
        description,
        pictureUrl,
        category,
        discount,
    };

    const onClickVehicle = () => {
        sessionStorage.setItem("vehicle", JSON.stringify(vehicle));
    };

    return (
        <div className={classes.root}>
            <Paper elevation={10} style={{paddingBottom:"0.4rem"}}>
                <Link to={`/vehicle`} onClick={onClickVehicle}>
                    <img src={pictureUrl} alt={brand} className='photo-vehicle' style={{borderRadius:"1%"}} />
                </Link>
                <footer>
                    <div style={{margin:"20px"}}>
                        <h4 style={{fontFamily:"Roboto"}}>{brand} {model} {yearOfProduction}</h4>
                        <h5 style={vehicle.discount === 0 ? {} : { color: "red" }}>Day cost: {vehicle.price.toFixed(2)}PLN</h5>
                        <div style={{display:"flex", justifyContent:"center", width:"100%"}}>
                        <Link style={{ width:"100%" }} to={`/vehicle`} onClick={onClickVehicle}>
                            <Button style={{ width:"100%" }}  variant="contained" color="primary" >
                                Reserve now
                        </Button>
                        </Link>
                        </div>
                    </div>
                </footer>
            </Paper>
        </div>

    );
};

export default Vehicle;