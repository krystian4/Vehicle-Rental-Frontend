import React from 'react';
import Vehicle from './Vehicle';
import { useTranslation } from 'react-i18next';

const VehiclesContainer = ({vehicles, removeVehicle}) => {
  const { t } = useTranslation('navbar');

    return(
        <section className='section'>
            <header className="jumbotron">
                <h2>{t('our-vehicles')}</h2>
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