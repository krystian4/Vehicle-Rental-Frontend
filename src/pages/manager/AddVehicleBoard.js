import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { CountryDropdown} from 'react-country-region-selector';
import VehicleService from "../../services/vehicle.service";
import DatePicker from "react-datepicker";
import CurrencyInput from 'react-currency-input-field';

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

const brandValidator = (value) => {
    if(value === ""){
        return (
            <div className="alert alert-danger" role="alert">
              Choose Brand!
            </div>
          );
    }
}

const AddVehicleBoard = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [country, setCountry] = useState('');
    const [power, setPower] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDesc] = useState("");
    const [picture, setPicture] = useState('');
    const [inStartDate, setInStartDate] = useState(new Date());
    const [inExpDate, setInExpDate] = useState(new Date());
    const [inPrice, setInPrice] = useState('');
    const [carInStartDate, setCarInStartDate] = useState(new Date());
    const [carInExpDate, setCarInExpDate] = useState(new Date());
    const [carInPrice, setCarInPrice] = useState('');

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeBrand = (e) => {
        const brand = e.target.value;
        setBrand(brand);
    }

    const onChangeCategory = (e) => {
      const category = e.target.value;
      setCategory(category);
  }

    const onChangeModel = (e) =>{
        const model = e.target.value;
        setModel(model);
    }

    const onChangeYear = (e) =>{
        const year = e.target.value;
        setYear(year);
    }

    const onChangePower = (e) =>{
        const power = e.target.value;
        setPower(power);
    }
    const onChangeDesc = (e) =>{
        const description = e.target.value;
        setDesc(description);
    }
    const onChangePicture = (e) =>{
        const picture = e.target.value;
        setPicture(picture);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        form.current.validateAll();
        setMessage("");
        setSuccessful(false);

        if (checkBtn.current.context._errors.length === 0 && country !== "" )  {
            VehicleService.addVehicle(brand, category, model, year, country, power, price, description, inStartDate, inExpDate, inPrice, carInStartDate, carInExpDate, carInPrice,picture).then(
              (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
              },
              (error) => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();

          setMessage(resMessage);
          setSuccessful(false);
              }
            );
        }
    };

  return (
    <div className="container" >
      <header className="jumbotron" style={{marginBottom:0 , minWidth:"500px"}}>
        <h3>Add new Vehicle</h3>
      </header>
      
      <div className="col-md-12">
      <div className="card w-50" style={{marginTop:"5px", minWidth:"450px"}}>
        <Form ref={form} onSubmit={handleSubmit}>
            <div class="form-group">
                <label htmlFor="brand">
                    Brand:
                </label>
                <Select className="form-control" name='brand' onChange={onChangeBrand} validations={[brandValidator]}>
                        <option value=''>Choose brand...</option>
                        <option value='Audi'>Audi</option>
                        <option value='BMW'>BMW</option>
                        <option value='Ferrari'>Ferrari</option>
                        <option value='Mercedes'>Mercedes</option>
                        <option value='Nissan'>Nissan</option>
                        <option value='Volkswagen'>Volkswagen</option>
                </Select>
            </div>

            <div class="form-group">
                <label htmlFor="brand">
                    Brand:
                </label>
                <Select className="form-control" name='brand' onChange={onChangeCategory} validations={[brandValidator]}>
                        <option value=''>Choose category...</option>
                        <option value='Hatchback'>Hatchback</option>
                        <option value='Sedan'>Sedan</option>
                        <option value='SUV'>SUV</option>
                        <option value='Coupe'>Coupe</option>
                </Select>
            </div>

            <div className="form-group">
                <label htmlFor="model">Model</label>
                <Input
                  type="text"
                  className="form-control"
                  name="model"
                  value={model}
                  onChange={onChangeModel}
                  validations={[required]}
                />
            </div>

            <div className="form-group">
                <label htmlFor="year">Production Year</label>
                <Input
                  type="number"
                  className="form-control w-25"
                  name="year"
                  value={year}
                  onChange={onChangeYear}
                  validations={[required]}
                />
            </div>

            <div className="form-group">
               <label htmlFor="country">Country</label>
               <div>
                  <CountryDropdown
                    className="form-control"
                    name="country"
                    value={country}
                    onChange={(value)=> setCountry(value)}
                  />
              </div>
            </div>

            <div className="form-group">
                <label htmlFor="power">Power</label>
                <Input
                  type="number"
                  className="form-control w-25"
                  name="power"
                  value={power}
                  onChange={onChangePower}
                  validations={[required]}
                />
            </div>

            <div className="form-group">
                <label htmlFor="price">Price per Day</label>
                <CurrencyInput
                  className="form-control w-25"
                  name="price"
                  placeholder="PLN"
                  allowDecimals={true}
                  decimalsLimit={2}
                  onChange={(value) => setPrice(value)}
             />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    className="form-control"
                    name="description"
                    value={description}
                    onChange={onChangeDesc}
                />
            </div>


            <label htmlFor="insurance">INSURANCE</label>
            <div className="form-group">
                <label style={{ marginRight: "5px" }}htmlFor="insurance">Purchase date:</label>
                <DatePicker  dateFormat="dd/MM/yyyy" className="form-control" selected={inStartDate} onChange={date => setInStartDate(date)} />
            </div>

            <div className="form-group">
                <label style={{ marginRight: "5px" }}htmlFor="insuranceExp">Expiration date:</label>
                <DatePicker  dateFormat="dd/MM/yyyy" className="form-control" selected={inExpDate} onChange={date => setInExpDate(date)} />
            </div>

            <div className="form-group">
            <label htmlFor="inPrice">Price</label>
            <CurrencyInput
              className="form-control w-25"
              name="inPrice"
              placeholder="PLN"
              allowDecimals={true}
              decimalsLimit={2}
              onChange={(value) => setInPrice(value)}
            />
            </div>

            <label htmlFor="insurance">CAR INSPECTION</label>
            <div className="form-group">
                <label style={{ marginRight: "5px" }}htmlFor="inspection">Inspection date:</label>
                <DatePicker  dateFormat="dd/MM/yyyy" className="form-control" selected={carInStartDate} onChange={date => setCarInStartDate(date)} />
            </div>

            <div className="form-group">
                <label style={{ marginRight: "5px" }}htmlFor="insuranceExp">Expiration date:</label>
                <DatePicker  dateFormat="dd/MM/yyyy" className="form-control" selected={carInExpDate} onChange={date => setCarInExpDate(date)} />
            </div>

            <div className="form-group">
            <label htmlFor="carInPrice">Price</label>
            <CurrencyInput
              className="form-control w-25"
              name="carInPrice"
              placeholder="PLN"
              allowDecimals={true}
              decimalsLimit={2}
              onChange={(value) => setCarInPrice(value)}
            />
            </div>

            <div className="form-group">
                <label htmlFor="picture">Picture url</label>
                <Input
                  type="text"
                  className="form-control"
                  name="picture"
                  value={picture}
                  onChange={onChangePicture}
                  validations={[required]}
                />
                <br />
                <img className="w-100" src={picture} alt={picture}></img>
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Add new vehicle</button>
            </div>

            {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}

            <CheckButton style={{ display: "none" }} ref={checkBtn} />

        </Form>
      </div>
      </div>

    </div>
  );
};

export default AddVehicleBoard;