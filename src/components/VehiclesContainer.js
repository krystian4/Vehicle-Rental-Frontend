import React from 'react';
import Vehicle from './Vehicle';

const VehiclesContainer = ({vehicles, removeVehicle}) => {
    return(
        <section className='section'>
            <header className="jumbotron">
                <h2>Our Vehicles</h2>
            </header>
            <div className='vehicles-container'>
                {vehicles.map((vehicle) =>{
                    return <Vehicle key={vehicle.id} {...vehicle} removeVehicle={removeVehicle} />;
                })}
            </div>
        </section>
    );
};

export default VehiclesContainer;