import axios from "axios";

const API_URL = "http://localhost:8080/api/vehicle/";

const addVehicle = (brand, category, model, year, country, power, price, description, inStartDate, inExpDate, inPrice, carInStartDate, carInExpDate, carInPrice,picture) =>{
    console.log(brand, category, model, year, country, power, price, description, inStartDate, inExpDate, inPrice, carInStartDate, carInExpDate, carInPrice,picture);
    return axios.post(API_URL,{brand, category, model, year, country, power, price, description, inStartDate, inExpDate, inPrice, carInStartDate, carInExpDate, carInPrice,picture});
};

export default {
    addVehicle,
};