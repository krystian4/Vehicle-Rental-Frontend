import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";


const verifyLicense = (userId) =>{
    const out ={
        status:"verified",
        userId,
    }
    return axios.post(API_URL + "customer/update", out, { headers: authHeader() })
    .then((response)=>{
      console.log(response.data);
      return response.data
    });
}

const editEmployee = (employeeDto) => {
  return axios.post(API_URL + "employee/update", employeeDto, { headers: authHeader() })
};

const exp = {
    verifyLicense,
    editEmployee,
  }
  
  export default exp;