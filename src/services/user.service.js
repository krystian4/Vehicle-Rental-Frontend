import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getManagerBoard = () => {
  return axios.get(API_URL + "manager", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getUsers = () => {
  return axios.get('http://localhost:8081/usersData.json')
  .then((response)=>{
    return response.data
  });
};

const exp = {
  getPublicContent,
  getUserBoard,
  getManagerBoard,
  getAdminBoard,
  getUsers,
}

export default exp;