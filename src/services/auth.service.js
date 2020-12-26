import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password, name, lastname, address, city, phone, country) => {
  console.log(username, email, password, name, lastname, address, city, phone, country);
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    name,
    lastname,
    address,
    city,
    phone,
    country,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};