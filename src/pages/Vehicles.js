import React, { useState, useEffect } from "react";
import VehicleService from "../services/vehicle.service"

import VehiclesContainer from "../components/VehiclesContainer";
import Loading from "../components/Loading";

const Vehicles = () =>  {
    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("No vehicles here")
    
    const removeVehicle = (id) => {
        const newVehicles = vehicles.filter((vehicle) => vehicle.id !== id)
        setVehicles(newVehicles)
    }

     useEffect(() => {
         VehicleService.getVehicles().then((response)=>{
            setVehicles(response);
            setLoading(false);
        })
        .catch((err) =>{
            console.log(err);
            setMessage("Connection error")
            setLoading(false);
        })    
     }, [])

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
    console.log("Debuger2");
    return (   
            <div className="container">
            <main>
                <VehiclesContainer vehicles = {vehicles} removeVehicle={removeVehicle} />
            </main>
            </div>
    );
   };
  export default Vehicles;