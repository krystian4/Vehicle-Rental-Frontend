import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";


const getCustomerDriverLicense = (id) => {
    return axios.post(API_URL + "customer/license", {id}, { headers: authHeader() })//rola usera
    .then(
        (response)=>{
            return response.data;
        }
    )};

const exp = {
    getCustomerDriverLicense,
  }
  
  export default exp;