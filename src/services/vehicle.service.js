import axios from "axios";

const API_URL = "http://localhost:8080/api/vehicle/add";

const addVehicle = (brand, category, model, year, country, power, price, description, inStartDate, inExpDate, inPrice, carInStartDate, carInExpDate, carInPrice,pictureURL) =>{
    console.log(brand, category, model, year, country, power, price, description, inStartDate, inExpDate, inPrice, carInStartDate, carInExpDate, carInPrice,pictureURL);
    return axios.post(API_URL,{brand, category, model, year, country, power, price, description, inStartDate, inExpDate, inPrice, carInStartDate, carInExpDate, carInPrice,pictureURL});
};

export default {
    addVehicle,
};