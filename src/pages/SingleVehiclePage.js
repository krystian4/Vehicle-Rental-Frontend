import React from 'react'
import Loading from '../components/Loading'

const SingleVehiclePage = () => {

  const vehicle = JSON.parse(sessionStorage.getItem("vehicle"));

  return(
    <div className="container">
      <header className="jumbotron">
        <img src={vehicle.url} title={vehicle.url} />
        <h3>BRAND {vehicle.brand}</h3>
        <h3>Here will be car id= {vehicle.id} informations</h3>

        <h3>hi</h3>

      </header>
    </div>
  );
};

export default SingleVehiclePage;