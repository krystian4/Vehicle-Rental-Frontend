import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

const addVehicle = (vehicleDto, inspectionDto, insuranceDto) =>{
    const output = {
        vehicleDto,
        inspectionDto,
        insuranceDto
    }
    console.log(output);
    return axios.post(API_URL+"vehicle/add",output, { headers: authHeader() });
};

const getVehicles = () => {
    return axios.get(API_URL+"vehicle/active")
    .then((response)=>{
        return response.data;
    });
};

const updateVehicle = (vehicleDto) => {
    return axios.post(API_URL+"vehicle/update", vehicleDto, { headers: authHeader() });
};

const getReservationDates = (id) => {
    //return axios.get('http://localhost:8081/reservationDates.json')
    const out = {id,};
    return axios.post("http://localhost:8080/api/rental/vehicleRentals", out ,{ headers: authHeader() } )
    .then((response)=>{
        return response.data;
    });
};

const getRentalHistory = (id) =>{
    return axios.post(API_URL + "rental/vehicleRentalsDetails",{id} ,{ headers: authHeader() } )
    .then((response)=>{
        return response.data;
    });
}

const getVehicleComments = (id) =>{
    return axios.post(API_URL + "comment/all", {id})
    .then((response)=>{
        return response.data;
    });
}

const exp = {
    addVehicle,
    getVehicles,
    getReservationDates,
    getRentalHistory,
    getVehicleComments,
    updateVehicle,
}

export default exp;