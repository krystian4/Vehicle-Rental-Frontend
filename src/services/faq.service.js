import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const getFaqs = () => {
    return axios.get('http://localhost:8081/data.json')
    .then((response)=>{
      return response.data
    });
};

const addFaqToDatabase = (question, answer) => {
    return axios.post(API_URL + "addFaq", {
      question,
      answer,
    });
  };

  const deleteFaq = (id) =>{
    return axios.delete(API_URL + "deleteFaq",{id});
  };

  const exp = {
    getFaqs,
    addFaqToDatabase,
    deleteFaq,
}

export default exp;