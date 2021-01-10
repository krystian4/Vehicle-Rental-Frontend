import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

const getFaqs = () => {
    //return axios.get('http://localhost:8081/data.json', { headers: authHeader() })
    return axios.get(API_URL + 'faq/all', { headers: authHeader() })
    .then((response)=>{
      return response.data
    });
};

  const addFaqToDatabase = (employeeId, question, answer) => {
    const out ={employeeId, question, answer,};
      return axios.post(API_URL + "faq/add", out, { headers: authHeader() });
  };

  const editFaq = (id, question, answer) => {
    const out ={id, question, answer,};
    console.log(out);
      return axios.post(API_URL + "faq/update", out, { headers: authHeader() });
    };

  const deleteFaq = (id) =>{
    return axios.post(API_URL + "deleteFaq",{id}, { headers: authHeader() });
  };

  const exp = {
    getFaqs,
    addFaqToDatabase,
    deleteFaq,
    editFaq,
}

export default exp;