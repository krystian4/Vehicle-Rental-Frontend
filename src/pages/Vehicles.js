import React, { useState, useEffect } from "react";

import VehiclesContainer from "../components/VehiclesContainer";
import Loading from "../components/Loading";

const Vehicles = () =>  {
    const [vehicles, setVehicles]= useState([])
    const [loading, setLoading]= useState(true)
    
    const removeVehicle = (id) => {
        const newVehicles = vehicles.filter((vehicle) => vehicle.id !== id)
        setVehicles(newVehicles)
    }

    const fetchVehicles = async () => {
        setLoading(true)
        try{
            const response = await fetch('http://localhost:8080/api/vehicle/all')
            const vehicles = await response.json()
            setLoading(false)
            setVehicles(vehicles)
        }catch(er){
            setLoading(false)
            console.log(er)
        }
    }

    useEffect(() => {
        fetchVehicles()
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
                <h2>No vehicles here</h2>
            </header>
            </div>
        )
    }

    return (

            <div className="container">
            <main>
                <VehiclesContainer vehicles = {vehicles} removeVehicle={removeVehicle} />
            </main>
            </div>
    );
   };
  export default Vehicles;