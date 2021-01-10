import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/vehicle";

const addVehicle = (vehicleDto, inspectionDto, insuranceDto) =>{
    const output = {
        vehicleDto,
        inspectionDto,
        insuranceDto
    }
    console.log(output);
    return axios.post(API_URL+"/add",output, { headers: authHeader() });
};

const getVehicles = () => {
    return axios.get(API_URL+"/active")
    .then((response)=>{
        return response.data;
    });
};

const getReservationDates = (carId) => {
    return axios.get('http://localhost:8081/reservationDates.json')
    .then((response)=>{
        return response.data;
    });
};

const exp = {
    addVehicle,
    getVehicles,
    getReservationDates,
}

export default exp;