import axios from "axios";

const API_URL = "http://localhost:8080/api/vehicle";



const addVehicle = (brand, category, model, year, country, power, price, description, inStartDate, inExpDate, inPrice, carInStartDate, carInExpDate, carInPrice,pictureURL) =>{
    console.log(brand, category, model, year, country, power, price, description, inStartDate, inExpDate, inPrice, carInStartDate, carInExpDate, carInPrice,pictureURL);
    return axios.post(API_URL+"/add",{brand, category, model, year, country, power, price, description, inStartDate, inExpDate, inPrice, carInStartDate, carInExpDate, carInPrice,pictureURL});
};

const getVehicles = () => {
    return axios.get(API_URL+"/all")
    .then((response)=>{
        return response.data;
    });
};

const exp = {
    addVehicle,
    getVehicles,
}

export default exp;