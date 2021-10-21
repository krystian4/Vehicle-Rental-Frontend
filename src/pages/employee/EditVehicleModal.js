import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { CountryDropdown} from 'react-country-region-selector';
import VehicleService from "../../services/vehicle.service";
import DatePicker from "react-datepicker";
import CurrencyInput from 'react-currency-input-field';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';


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

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
        position:'absolute',
        width:'450px',
        top: `${top}%`,
        left: `${left}%`,
        overflow:'scroll',
        height:'90%',
        display:'block',
        transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }));

const EditVehicleModal = (props) => {
    const { t } = useTranslation('navbar');
    const vehicle = props.vehicle;
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const form = useRef();
    const checkBtn = useRef();

    const [brand, setBrand] = useState(vehicle.brand);
    const [category, setCategory] = useState(vehicle.category);
    const [model, setModel] = useState(vehicle.model);
    const [year, setYear] = useState(vehicle.yearOfProduction);
    const [country, setCountry] = useState(vehicle.country);
    const [power, setPower] = useState(vehicle.power);
    const [price, setPrice] = useState(vehicle.price);
    const [description, setDesc] = useState(vehicle.description);
    const [picture, setPicture] = useState(vehicle.pictureUrl);

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
          
          const vehicleDto = {id:vehicle.id,brand, model, yearOfProduction:year, country, power, price, description, pictureUrl:picture, category};
          console.log("Pressed edit button");
            VehicleService.updateVehicle(vehicleDto).then(
                (response)=>{
                    console.log(response);
                    handleClose();
                },
                (error)=>{
                    console.log(error);
                }
            )
        }
    };

    const handleClose = () => {
        props.setOpen(false);
      };

    const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      
        <Form ref={form} onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="brand">
                {t('brand')}:
                </label>
                <Select className="form-control" value={brand} name='brand' onChange={onChangeBrand} validations={[brandValidator]}>
                        <option value=''>{t('choose-brand')}</option>
                        <option value='Audi'>Audi</option>
                        <option value='BMW'>BMW</option>
                        <option value='Ferrari'>Ferrari</option>
                        <option value='Mercedes'>Mercedes</option>
                        <option value='Nissan'>Nissan</option>
                        <option value='Volkswagen'>Volkswagen</option>
                </Select>
            </div>

            <div className="form-group">
                <label htmlFor="category">
                {t('category')}:
                </label>
                <Select className="form-control" name='category' value={category} onChange={onChangeCategory} validations={[brandValidator]}>
                        <option value=''>{t('choose-category')}</option>
                        <option value='HATCHBACK'>Hatchback</option>
                        <option value='SEDAN'>Sedan</option>
                        <option value='SUV'>SUV</option>
                        <option value='COUPE'>Coupe</option>
                        <option value='SPORTS'>Sports</option>
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
                <label htmlFor="year">{t('prod-year')}</label>
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
               <label htmlFor="country">{t('country')}</label>
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
                <label htmlFor="power">{t('power')}</label>
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
                <label htmlFor="price">{t('price-per-day')}</label>
                <CurrencyInput
                  className="form-control w-25"
                  name="price"
                  placeholder="PLN"
                  value={price}
                  allowDecimals={true}
                  decimalsLimit={2}
                  onChange={(value) => setPrice(value)}
             />
            </div>

            <div className="form-group">
                <label htmlFor="description">{t('description')}</label>
                <textarea
                    className="form-control"
                    name="description"
                    value={description}
                    onChange={onChangeDesc}
                />
            </div>

            <div className="form-group">
                <label htmlFor="picture">{t('pic-url')}</label>
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
                <button type="submit" className="btn btn-primary btn-block">{t('edit-vehicle')}</button>
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

    )
    return(
        <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
        {modalBody}
    </Modal>
    );
    
  
};

export default EditVehicleModal;