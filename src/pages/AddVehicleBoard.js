import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { CountryDropdown} from 'react-country-region-selector';
import VehicleService from "../services/vehicle.service";

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
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [country, setCountry] = useState('');
    const [power, setPower] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDesc] = useState("");
    const [picture, setPicture] = useState('');


  
    const onChangeBrand = (e) => {
        const brand = e.target.value;
        setBrand(brand);
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
    const onChangePrice = (e) =>{
        const price = e.target.value;
        setPrice(price);
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

        if (checkBtn.current.context._errors.length === 0 && country !== "" )  {
            console.log("dodano pojazd");
            VehicleService.addVehicle(brand, model, year, country, power, price, description, picture);
        }

    }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Add new Vehicle</h3>
      </header>
      
      <div className="col-md-12">
      <div className="card w-50" >
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
                <Input
                  type="number"
                  className="form-control w-25"
                  name="price"
                  value={price}
                  onChange={onChangePrice}
                  validations={[required]}
                />
            </div>

            <div className="form-group">
                <label htmlFor="price">Description</label>
                <textarea
                    className="form-control"
                    name="description"
                    value={description}
                    onChange={onChangeDesc}
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
                <img className="w-100" src={picture}></img>
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Add new vehicle</button>
            </div>

            <CheckButton style={{ display: "none" }} ref={checkBtn} />

        </Form>
      </div>
      </div>

    </div>
  );
};

export default AddVehicleBoard;