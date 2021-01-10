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

const editUser = (id, username, email, firstName, lastName, birthDate, address, city, country, phone) => {
  const out ={id, username, email, firstName, lastName, birthDate, address, city, country, phone};
  return axios.post(API_URL + "user/edit", out, { headers: authHeader() })
};

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
    console.log(response.data);
    return response.data
  });
};

const getDriverLicensesToVerification = () => {
    return axios.get('http://localhost:8081/data.json', { headers: authHeader() })
};

const exp = {
  getPublicContent,
  getUserBoard,
  getManagerBoard,
  getAdminBoard,
  getUsers,
  getActiveUsers,
  getUsersPersonalInformation,
  deactivateUser,
  editUser,
  getDriverLicensesToVerification,
}

export default exp;