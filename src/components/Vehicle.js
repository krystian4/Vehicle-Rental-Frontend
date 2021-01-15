import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


const Vehicle = ({id, brand, category, model, yearOfProduction, country, power, price, description,pictureUrl, discount, removeVehicle}) => {

    const vehicle = {
        id,
        brand,
        model,
        yearOfProduction,
        country,
        power:power,
        price:(100 - discount)/100 * price,
        description,
        pictureUrl,
        category,
        discount,
    };

    React.useEffect(()=>{
        if(discount !== 0){
            //vehicle.price = ;
            console.log(vehicle.price);
        }
    }, [])

    const onClickVehicle = () =>{
        sessionStorage.setItem("vehicle", JSON.stringify(vehicle));
    };

    return(
        <article className='single-vehicle'>
            <Link to={`/vehicle`} onClick={onClickVehicle}>
                <img src={pictureUrl} alt={brand} className='photo-vehicle'/>
            </Link>
            <footer>
                <div className='vehicle-info'>
                    <h4>{brand}</h4>
                    <h5 style={vehicle.discount === 0 ? {} : {color:"red"}}>Day cost: {vehicle.price.toFixed(2)}PLN</h5>
                    <h5>{category.name}</h5>
                    <Link to={`/vehicle`} onClick={onClickVehicle}>
                        <Button style={{width:"100%"}} variant="contained" color="primary" >
                            Reserve now
                        </Button>
                    </Link>

                    
                </div>
            </footer>
        </article>
    );
};

export default Vehicle;