import React from 'react'

const SingleVehiclePage = () => {

  const vehicle = JSON.parse(sessionStorage.getItem("vehicle"));

  return(
    <div className="container">
      <header className="jumbotron">
        <img className="w-100" src={vehicle.url} title={vehicle.url} />
        <h3>BRAND {vehicle.brand}</h3>
        <h3>Here will be car id= {vehicle.id} informations</h3>

        <h3>hi</h3>

      </header>
    </div>
  );
};

export default SingleVehiclePage;