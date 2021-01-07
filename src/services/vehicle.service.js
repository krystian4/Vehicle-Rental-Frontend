import axios from "axios";

const API_URL = "http://localhost:8080/api/vehicle";



const addVehicle = (brand, category, model, yearOfProduction, country, power, price, description, inStartDate, inExpDate, inPrice, carInStartDate, carInExpDate, carInPrice,pictureURL) =>{
    const vehicleDto = {
        brand:brand,
        model:model,
        yearOfProduction:yearOfProduction,
        country:country,
        power:power,
        price:price,
        description:description,
        pictureURL:pictureURL,
        category:category,
    };
    const inspectionDto = {
        startDate: carInStartDate,
        expirationDate: carInExpDate,
        price: carInPrice,
    }
    
    const insuranceDto = {
        dateOfPurchase: inStartDate,
        expirationDate: inExpDate,
        price: inPrice,
    }
    const output = {
        vehicleDto:vehicleDto,
        inspectionDto:inspectionDto,
        insuranceDto:insuranceDto,
    }
    //console.log(sessionStorage.getItem("user"));
    console.log(output);
    //console.log(brand, category, model, year, country, power, price, description, inStartDate, inExpDate, inPrice, carInStartDate, carInExpDate, carInPrice,pictureURL);
    return axios.post(API_URL+"/add",output);
    //return axios.post(API_URL+"/add",{brand, category, model, year, country, power, price, description, inStartDate, inExpDate, inPrice, carInStartDate, carInExpDate, carInPrice,pictureURL});
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