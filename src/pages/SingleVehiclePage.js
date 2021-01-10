import React, {useEffect, useState} from 'react'
import 'date-fns';
import { format } from "date-fns";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import VehicleService from "../services/vehicle.service"
import Button from '@material-ui/core/Button';


const SingleVehiclePage = () => {
  const vehicle = JSON.parse(sessionStorage.getItem("vehicle"));

  // const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  // const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [resPrice, setResPrice] = useState(vehicle.price);

  const [dates, setDates] = useState([]);

  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")));

  const cartItem = {
    id:vehicle.id,
    brand:vehicle.brand,
    model:vehicle.model,
    startDate,
    endDate,
    resPrice,
  };
  const countPrice = () =>{
    var Difference_In_Time = endDate.getTime() - startDate.getTime();
    var Difference_In_Days =Math.round(Difference_In_Time / (1000 * 3600 * 24));
    setResPrice( (Difference_In_Days+1) * vehicle.price );
  }

  useEffect(()=>{
    countPrice();
  }, [startDate, endDate]);

  const handleStartDateChange = (date) => {
    //console.log(format(date, "yyyy-MM-dd"));
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    //console.log(format(date, "yyyy-MM-dd"));
    setEndDate(date);
  };


  useEffect(() => {
    VehicleService.getReservationDates().then((response)=>{
      setDates(response);
       console.log("Basket: ");
       console.log(cart);
       console.log("Actual cart item: ");
       console.log(cartItem);
   })
   .catch((err) =>{
       console.log(err);
   })
}, [])

  // useEffect(() =>{
  //   countPrice();
  // }, [resPrice]);

  function filterDates(date) {
    const found = dates.find(res => res.startDate <= format(date, "yyyy-MM-dd") && res.endDate >= format(date, "yyyy-MM-dd"))
    if(found === undefined){
      return false;
    }
    else return true;
  }

  function filterEndDates(date) {
    const found = dates.find(res => (res.startDate <= format(date, "yyyy-MM-dd") 
                          && res.endDate >= format(date, "yyyy-MM-dd"))
                          || (format(date, "yyyy-MM-dd") >= res.startDate && res.startDate > format(startDate, "yyyy-MM-dd")) );
    if(found === undefined){
      return false;
    }
    else return true;
  }

  const handleAddToCart = () => {
    
    //console.log("Day diff: ");
    //countPrice();
    console.log("adding to cart");
    if(cart.length === 0){
      console.log("Cart was empty");
      cart.push(cartItem);
      console.log(cart);

    }
    else{
      console.log("Cart existed: ");
      cart.push(cartItem);
      console.log(cart);
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }




  return(
    <div className="container" style={{paddingBottom:"50px"}}>
      <header className="jumbotron" style={{paddingBottom:"20px", paddingTop:"30px", marginBottom:"5px"}}>
      <h3>{vehicle.brand} {vehicle.model}</h3>

      </header>
        
          <img className="w-100" src={vehicle.pictureUrl} title={vehicle.pictureUrl} alt={vehicle.pictureUrl} />
          <h3>Here will be car id= {vehicle.id} informations</h3>
        <div className="row" style={{margin:0}}>
          <div className="col-md-2 h2" ><strong>Brand: </strong></div>
          <div className="col-md-10 h3">{vehicle.brand}</div>

          <div className="col-md-2"><strong>Model: </strong></div> 
          <div className="col-md-10">{vehicle.model}</div>
          
          <div className="col-md-2"><strong>HorsePower: </strong></div> 
          <div className="col-md-10">{vehicle.power}HP</div>

          <div className="col-md-2"><strong>Production country: </strong></div> 
          <div className="col-md-10">{vehicle.country}</div>
          
          <div className="col-md-2"><strong>Production year: </strong></div> 
          <div className="col-md-10">{vehicle.yearOfProduction}</div>

          <div className="col-md-2"><strong>Category: </strong></div> 
          <div className="col-md-10">{vehicle.category}</div>
          <br />
          <br />
          <div className="col-md-2"><strong>Start Date: </strong></div> 
          <div className="col-md-10">
            
          <MuiPickersUtilsProvider utils={DateFnsUtils}>

            <KeyboardDatePicker
              value={startDate}
              onChange={handleStartDateChange}
              format="yyyy-MM-dd"
              shouldDisableDate={filterDates}
            />

          </MuiPickersUtilsProvider> 
          </div>

          <div className="col-md-2"><strong>End Date: </strong></div> 
          <div className="col-md-10">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>

            <KeyboardDatePicker
              value={endDate}
              onChange={handleEndDateChange}
              format="yyyy-MM-dd"
              shouldDisableDate={filterEndDates}
              minDate={startDate}
            />

          </MuiPickersUtilsProvider> 
          </div>
          <br />
          <br />
          <div className="col-md-2"><strong>Price: </strong></div> 
          <div className="col-md-10">{resPrice}.00 PLN</div>

          <Button style={{ marginLeft:"auto"}} variant="contained" color="primary" onClick={handleAddToCart}>
                            Add to Cart
          </Button>
           

      

        </div>
      
    </div>
  );
};

export default SingleVehiclePage;