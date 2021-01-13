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

const confirmOrder = (comments, payment) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const customerId = user.idCustomer;
    const rentals = JSON.parse(sessionStorage.getItem("cart"));
    console.log({customerId,rentals, comments, payment});
    const cart = [];
    sessionStorage.setItem("cart", JSON.stringify(cart));
    return axios.post(API_URL + "order/add", {customerId, rentals, comments, payment}, { headers: authHeader() })
    .then(
        (response)=>{
            return response.data;
        }
    )};

const exp = {
    getCustomerDriverLicense,
    confirmOrder,
  }
  
  export default exp;