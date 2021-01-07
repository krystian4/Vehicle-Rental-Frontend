import React from 'react';
import { Link } from 'react-router-dom';

const Vehicle = ({id, brand, category, country, dailyCost, description, model, power, yearOfProduction, url, removeVehicle}) => {

    const vehicle = {
        id:id,
        brand:brand,
        url:url
    };

    const onClickVehicle = () =>{
        sessionStorage.setItem("vehicle", JSON.stringify(vehicle));
    };

    return(
        <article className='single-vehicle'>
            <Link to={`/vehicle`} onClick={onClickVehicle}>
                <img src={url} alt={brand} className='photo-vehicle'/>
            </Link>
            <footer>
                <div className='vehicle-info'>
                    <h4>{brand}</h4>
                    <h5>Day cost: {dailyCost}PLN</h5>
                    <h5>{category.name}</h5>
                    <h5>{id}</h5>

                    
                </div>
            </footer>
        </article>
    );
};

export default Vehicle;