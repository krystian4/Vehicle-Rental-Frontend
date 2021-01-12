import axios from "axios";
import authHeader from "./auth-header";


const API_URL = "http://localhost:8080/api/";

const register = (username, email, password, firstName, lastName, address, city, phone, country, birthdate) => {
  return axios.post(API_URL + "auth/signup", {
    username,
    email,
    password,
    firstName,
    lastName,
    address,
    city,
    country,
    phone,
    birthdate,
  });
};
const registerEmployee = (employeeDto) => {
  return axios.post(API_URL + "employee/add", employeeDto, { headers: authHeader() });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
        const date = new Date().toLocaleString();
        sessionStorage.setItem("loginDate", date);
        var newArr = [];
        sessionStorage.setItem("cart", JSON.stringify(newArr));
      }

      return response.data;
    });
};


const logout = (userId) => {
  const out={
    userId,
    startDate:sessionStorage.getItem("loginDate"),
  };
  console.log(out);
  return axios.post(API_URL + "user/logOut", out, { headers: authHeader() }); //lub klamerki
};

const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};


const exp = {
  register,
  registerEmployee,
  login,
  logout,
  getCurrentUser,
}

export default exp;