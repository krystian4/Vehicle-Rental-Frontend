import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";


const verifyLicense = (userId) =>{
    const out ={
        status:"verified",
        id:userId,
    }
    return axios.post(API_URL + "customer/update", out, { headers: authHeader() })
    .then((response)=>{
      console.log(response.data);
      return response.data
    });
}

const getInsurances = () =>{
  return axios.get(API_URL + "insurance/active", { headers: authHeader() })
  .then((response)=>{
    console.log(response.data);
    return response.data;
  })
}

const addInsurance = (vehicleId, dateOfPurchase, expirationDate, price) =>{
  return axios.post(API_URL + "insurance/add", {vehicleId, dateOfPurchase, expirationDate, price}, { headers: authHeader() })
  .then(
    (response)=>{
      return response.data;
    }
  )
}

const getInspections = () =>{
  return axios.get(API_URL + "inspection/active", { headers: authHeader() })
  .then((response)=>{
    console.log(response.data);
    return response.data;
  })
}

const addInspection = (vehicleId, startDate, expirationDate, price) =>{
  return axios.post(API_URL + "inspection/add", {vehicleId, startDate, expirationDate, price}, { headers: authHeader() })
  .then(
    (response)=>{
      return response.data;
    }
  )
}

const editEmployee = (employeeDto) => {
  return axios.post(API_URL + "employee/update", employeeDto, { headers: authHeader() })
  .then(
    (response)=>{
      return response.data;
    }
  )
};

const getUnpaidOrders = () =>{
  return axios.get(API_URL + "order/unpaid", { headers: authHeader() })
  .then((response)=>{
    console.log(response.data);
    return response.data;
  })
}

const getActiveOffers = () =>{
  return axios.get(API_URL + "offer/active", { headers: authHeader() })
  .then((response)=>{
    console.log(response.data);
    return response.data;
  })
}

const verifyPayment = (orderId) => {
  return axios.post(API_URL + "order/payment", {orderId}, { headers: authHeader() })
};

const addOffer = (discount, description, employeeId, vehicleIds) => {
  return axios.post(API_URL + "offer/add", {discount, description, employeeId, vehicleIds}, { headers: authHeader() })
  .then((response)=>{
    return response.data;
  })
};

const deleteOffer = (id) => {
  return axios.post(API_URL + "offer/deactivate", {id}, { headers: authHeader() })
  .then((response)=>{
    return response.data;
  })
};

const exp = {
    verifyLicense,
    verifyPayment,
    editEmployee,
    getInsurances,
    getInspections,
    getActiveOffers,
    getUnpaidOrders,
    addInsurance,
    addInspection,
    addOffer,
    deleteOffer,
  }
  
  export default exp;