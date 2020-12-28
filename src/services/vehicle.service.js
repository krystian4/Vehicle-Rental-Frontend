import axios from "axios";

const API_URL = "http://localhost:8080/api/vehicle/";

const addVehicle = (brand, model, year, country, power, price, description, url) =>{
    console.log(brand, model, year, country, power, price, description, url);
    return axios.post(API_URL,{brand, model, year, country, power, price, description, url});
};

export default {
    addVehicle,
};