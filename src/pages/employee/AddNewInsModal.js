import React, { useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import CurrencyInput from 'react-currency-input-field';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import { format } from "date-fns";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import EmpService from "../../services/employee.service";
import { useTranslation } from 'react-i18next';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 550,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));


export default function EditFAQModal (props){
    const { t } = useTranslation('navbar');
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const [vehicleId, setId] = useState('');
    const [price, setPrice] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());



        
    const onChangeId = (e) =>{
      const q = e.target.value;
      setId(q);
    }


    const handleAdd = () =>{
        if(props.isInsurancesList){
            console.log("add insurance");
            EmpService.addInsurance(vehicleId, startDate, endDate, price).then(
                (response)=>{
                    console.log(response);
                    props.fetchInsurances();
                },
                (error=>{
                    console.log(error);
                })
            )
        }
        else{
            console.log("add inspection");
            EmpService.addInspection(vehicleId, startDate, endDate, price).then(
                (response)=>{
                    console.log(response);
                    props.fetchInspectionsAdd();
                },
                (error=>{
                    console.log(error);
                })
            )
        }
        props.setOpen(false);
      }

      const handleClose = () => {

        props.setOpen(false);
      };

      const handleStartDateChange = (date) => {
        setStartDate(date);
      };
    
      const handleEndDateChange = (date) => {
        setEndDate(date);
      };
    
      const modalBody = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">{props.isInsurancesList ? t('add-insurance') : t('add-inspection')}</h2>
        <form className={classes.root} autoComplete="off">
        <Grid container spacing={3}>
            <Grid item xs={12}>
            <TextField type="number" label={t('vehicleid')} onChange={onChangeId} />
        </Grid>
            <Grid item xs={12} sm={2}>
                <label style={{paddingTop:"8px"}} htmlFor="price">{t('price')}: </label>
            </Grid>

            <Grid item xs={12} sm={10}>
                <CurrencyInput
                        style={{minWidth:"6rem"}}
                        className="form-control w-25"
                        name="price"
                        placeholder="PLN"
                        allowDecimals={true}
                        decimalsLimit={2}
                        onChange={(value) => setPrice(value)}
                    />
            </Grid>

            <Grid item xs={12} sm={4}>
                <label style={{paddingTop:"8px"}} htmlFor="price">{t('purchase-date')}: </label>
            </Grid>
            <Grid item xs={12} sm={8}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                    <KeyboardDatePicker
                    value={startDate}
                    onChange={handleStartDateChange}
                    format="yyyy-MM-dd"
                    />

                </MuiPickersUtilsProvider> 
            </Grid>

            <Grid item xs={12} sm={4}>
                <label style={{paddingTop:"8px"}} htmlFor="price">{t('exp-date')}: </label>
            </Grid>
             
            <Grid item xs={12} sm={8}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                    <KeyboardDatePicker
                    value={endDate}
                    minDate={startDate}
                    onChange={handleEndDateChange}
                    format="yyyy-MM-dd"
                    />

                </MuiPickersUtilsProvider> 
            </Grid>


            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={() => handleAdd()}>
                {t('add')}
                </Button>
            </Grid>
          </Grid>
        </form>
          
        </div>
      );

    return(
        <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
    )
}