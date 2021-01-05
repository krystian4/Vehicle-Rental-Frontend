import React, { useState, useEffect } from "react";
import FaqComp from "react-faq-component";

const BoardManager = () => {
    const [arrayFAQs, setFAQs] = useState([])
    const [loading, setLoading]= useState(true)
    
    const fetchFAQs = async () => {
        setLoading(true)
        try{
            const response = await fetch('data.json')
            const FAQs = await response.json()
            console.log(response)
            setLoading(false)
            setFAQs(FAQs)
        }catch(er){
            setLoading(false);
            console.log(er)
        }
    }
    useEffect(() => {
        fetchFAQs()
        console.log(arrayFAQs)
    }, [])

    const styles = {
        bgColor: 'white',
        rowContentColor: 'grey',
    };

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Edit FAQ</h3>
      </header>
      <FaqComp  data={arrayFAQs} styles={styles} />
    </div>
    
  );
};

export default BoardManager;