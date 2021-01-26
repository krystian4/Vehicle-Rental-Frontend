import React, { useEffect, useState } from 'react'
import 'date-fns';
import { format } from "date-fns";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import VehicleService from "../services/vehicle.service"
import Button from '@material-ui/core/Button';
import VehicleComments from "../components/VehicleComments";
import CustomerService from "../services/customer.service";


const SingleVehiclePage = () => {
  const vehicle = JSON.parse(sessionStorage.getItem("vehicle"));
  const user = JSON.parse(sessionStorage.getItem("user"));

  // const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  // const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [resPrice, setResPrice] = useState(vehicle.price);

  const [dates, setDates] = useState([]);

  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")));

  const cartItem = {
    id: vehicle.id,
    brand: vehicle.brand,
    model: vehicle.model,
    startDate,
    endDate,
    resPrice,
  };
  const countPrice = () => {
    var Difference_In_Time = endDate.getTime() - startDate.getTime();
    var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
    setResPrice((Difference_In_Days + 1) * vehicle.price);
  }

  useEffect(() => {
    countPrice();
  }, [startDate, endDate]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if(endDate < date){
      setEndDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const [status, setStatus] = useState(false);
  const fetchStatus = () =>{
    CustomerService.getLicenseVerificationStatus(user.idCustomer).then(
      (response) => {
        console.log(response);
        setStatus(response.status);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  useEffect(() => {
    VehicleService.getReservationDates(vehicle.id).then(
      (response) => {
        setDates(response);
        console.log("Basket: ");
        console.log(cart);
        console.log("Actual cart item: ");
        console.log(cartItem);
      })
      .catch((err) => {
        console.log(err);
      })
      if(user !== null){
        fetchStatus();
      }
  }, [])

  function filterDates(date) {
    const found = dates.find(res => res.startDate <= format(date, "yyyy-MM-dd") && res.endDate >= format(date, "yyyy-MM-dd"))
    if (found === undefined) {
      return false;
    }
    else return true;
  }

  function filterEndDates(date) {
    const found = dates.find(res => (res.startDate <= format(date, "yyyy-MM-dd")
      && res.endDate >= format(date, "yyyy-MM-dd"))
      || (format(date, "yyyy-MM-dd") >= res.startDate && res.startDate > format(startDate, "yyyy-MM-dd")));
    if (found === undefined) {
      return false;
    }
    else return true;
  }

  const handleAddToCart = () => {

    //console.log("Day diff: ");
    //countPrice();
    console.log("adding to cart");
    if (cart.length === 0) {
      console.log("Cart was empty");
      cart.push(cartItem);
      console.log(cart);

    }
    else {
      console.log("Cart existed: ");
      const found = cart.find(item => (item.id === cartItem.id));
      if(found !== undefined){
        window.alert("Vehicle already in cart!");
        return;
      }
      cart.push(cartItem);
      console.log(cart);
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload(false);
  }




  return (
    <div className="container" style={{ paddingBottom: "50px" }}>
      <header className="jumbotron" style={{ paddingBottom: "20px", paddingTop: "30px", marginBottom: "5px" }}>
        <h3>{vehicle.brand} {vehicle.model}</h3>

      </header>

      {/* <img className="w-100" src={vehicle.pictureUrl} title={vehicle.pictureUrl} alt={vehicle.pictureUrl} /> */}
      <div className="row" style={{ margin: 0 }}>
        <div className="col-lg-6" style={{ padding: 0 }}><img className="w-100" style={{ minWidth: "450px" }} src={vehicle.pictureUrl} title={vehicle.pictureUrl} alt={vehicle.pictureUrl} /></div>
        <div className="col-lg-6">
          <div className="row">
          

            <div className="col h3"><strong>Brand: </strong></div>
            <div className="col h3" style={{textAlign:"right"}}>{vehicle.brand}</div>
          </div>
          <hr style={{margin:0}}></hr>

          <div className="row">
            <div className="col h4"><strong>Model: </strong></div>
            <div className="col h4" style={{textAlign:"right"}}>{vehicle.model}</div>
          </div>
          <hr style={{margin:0}}></hr>

          <div className="row">
            <div className="col"><strong>HorsePower: </strong></div>
            <div className="col" style={{textAlign:"right"}}>{vehicle.power}HP</div>
          </div>
          <hr style={{margin:0}}></hr>

          <div className="row">
            <div className="col"><strong>Production country: </strong></div>
            <div className="col" style={{textAlign:"right"}}>{vehicle.country}</div>
          </div>
          <hr style={{margin:0}}></hr>

          <div className="row">
            <div className="col"><strong>Production year: </strong></div>
            <div className="col" style={{textAlign:"right"}}>{vehicle.yearOfProduction}</div>
          </div>
          <hr style={{margin:0}}></hr>

          <div className="row">
            <div className="col"><strong>Category: </strong></div>
            <div className="col" style={{textAlign:"right"}}>{vehicle.category}</div>
          </div>
          <hr style={{margin:0}}></hr>

          <br />
          <br />
          <p style={{margin:0, color:"rgb(51, 77, 77)"}}><i>Reservation</i> </p>
          <hr style={{margin:0}}></hr>
          <div className="row">
            <div className="col"><strong>Start Date: </strong></div>
            <div className="col">

              <MuiPickersUtilsProvider utils={DateFnsUtils}>

                <KeyboardDatePicker
                  value={startDate}
                  minDate={startDate}
                  onChange={handleStartDateChange}
                  format="yyyy-MM-dd"
                  shouldDisableDate={filterDates}
                />

              </MuiPickersUtilsProvider>
            </div>
          </div>

          <div className="row">
            <div className="col"><strong>End Date: </strong></div>
            <div className="col">
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
          </div>

          <div className="row">
            <div className="col"><strong>Price: </strong></div>
            <div className="col">{resPrice.toFixed(2)} PLN</div>
          </div>

        </div>
      </div>
      {user !== null && user.roles.includes("ROLE_USER") && resPrice>0 && status && (
        <div className="row" style={{margin:0}}>
        <Button style={{ marginLeft: "auto", marginTop:"20px" }} variant="contained" color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
      )} 
      
      <br />
      <VehicleComments vehicleId={vehicle.id} />

    </div>
  );
};

export default SingleVehiclePage;