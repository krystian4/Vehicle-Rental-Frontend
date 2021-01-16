import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "test/all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "test/user", { headers: authHeader() });
};

const getManagerBoard = () => {
  return axios.get(API_URL + "test/manager", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "test/admin", { headers: authHeader() });
};


const getUsers = () => {
  return axios.get(API_URL + "user/all", { headers: authHeader() })
  .then((response)=>{
    console.log(response.data);
    return response.data
  });
};

const getActiveUsers = () => {
  return axios.get(API_URL + "user/active", { headers: authHeader() })
  .then((response)=>{
    return response.data
  });
};

const getEmployees = () => {
  return axios.get(API_URL + "employee/active", { headers: authHeader() })
  .then((response)=>{
    return response.data
  });
};

const editUser = (id, username, email, firstName, lastName, birthdate, address, city, country, phone) => {
  const out ={id, username, email, firstName, lastName, birthdate, address, city, country, phone};
  return axios.post(API_URL + "user/update", out, { headers: authHeader() })
};

const changePassword = (id, password) => {
  const out = {id, password};
  return axios.post(API_URL + "user/password", out, { headers: authHeader() });
}

const deactivateUser = (id) => {
  return axios.post(API_URL + "user/deactivate", {id}, { headers: authHeader() })
  .then((response)=>{
    console.log(response.data);
    return response.data
  });
};

const getUsersPersonalInformation = () => {
  return axios.get(API_URL + "personalinformation/all", { headers: authHeader() })
  .then((response)=>{
    return response.data
  });
};

const updateLicenseNumber = (id, drivingLicenseNumber) => {
  const out={
    id, drivingLicenseNumber,
  }
  return axios.post(API_URL + "customer/update", out, { headers: authHeader() })
  .then((response)=>{
    console.log(response.data);
    return response.data
  });
};

const getDriverLicensesToVerification = () => {
    // return axios.get('http://localhost:8081/data.json', { headers: authHeader() })
    return axios.get(API_URL + "customer/unverified", { headers: authHeader() })
    .then((response)=>{
      return response.data
    });
};

const getUserOrders = (id) => {
  return axios.post(API_URL + "order/customerOrders", {id}, { headers: authHeader() })
  .then((response)=>{
    return response.data;
  })
}

const postUserComment = (comment) =>{
  return axios.post(API_URL + "comment/add", comment, { headers: authHeader() })
  .then((response)=>{
    return response.data;
  })
}

const addComplaint = (rentalId, description) =>{
  return axios.post(API_URL + "complaint/add", {rentalId, description}, { headers: authHeader() })
  .then((response)=>{
    return response.data;
  })
}

const exp = {
  getPublicContent,
  getUserBoard,
  getManagerBoard,
  getAdminBoard,
  getUsers,
  getActiveUsers,
  getEmployees,
  getUsersPersonalInformation,
  getUserOrders,
  deactivateUser,
  editUser,
  changePassword,
  getDriverLicensesToVerification,
  updateLicenseNumber,
  postUserComment,
  addComplaint,
}

export default exp;