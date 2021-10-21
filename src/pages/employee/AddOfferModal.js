import React, { useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import VehicleService from '../../services/vehicle.service';
import Checkbox from '@material-ui/core/Checkbox';
import EmpService from '../../services/employee.service';
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

  const listStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 450,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
      },
      nested: {
        paddingLeft: theme.spacing(4),
      },
  }));

export default function AddNewFAQModal (props){
    const { t } = useTranslation('navbar');
    const classes = useStyles();
    const listClasses = listStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const user = JSON.parse(sessionStorage.getItem("user"));
    const [vehicles, setVehicles] = React.useState([]);

    useEffect(()=>(
        VehicleService.getVehicles().then(
            (response)=>{
                setVehicles(response);
                console.log(response);
            },
            (error)=>{
                console.log(error);
            }
        )
    ), [])

    const [checked, setChecked] = React.useState([]);
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        console.log(newChecked);
        setChecked(newChecked);
      };

    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
      setOpen(!open);
    };


    const [description, setDesc] = useState("");
    const [errorDesc, setErrorDesc] = useState(false);
    const onChangeDesc = (e) =>{
        if(e.target.value === ""){
            setErrorDesc(true);
            return;
        }
        else setErrorDesc(false);
      const q = e.target.value;
      setDesc(q);
    }

    const [discount, setDiscount] = useState(0);
    const [errorDiscount, setErrorDiscount] = useState(false);
    const onChangeDiscount = (e) =>{
        if(e.target.value > 50){
            console.log("discount too big!");
            setErrorDiscount(true);
            return;
        }
        else setErrorDiscount(false);
        const q = e.target.value;
        setDiscount(q);
      }


    const handleAddOffer = () =>{
        if(description === "" || discount === 0 || checked.length === 0){
            if(description ===""){
                setErrorDesc(true);
            }
            if(discount === 0){
                setErrorDiscount(true);
            }
            if(checked.length === 0){
                console.log("No vehicles selected!");
            }
            return;
        }

        EmpService.addOffer(discount, description, user.idEmployee, checked)
        .then((response)=>{
            console.log(response);
            props.fetchOffers();
            props.setOpen(false);
        },
        (error)=>{
            console.log(error);
        })
      }

      const handleClose = () => {
        props.setOpen(false);
      };
    
      const modalBody = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">{t('add-new-offer')}</h2>
          <form className={classes.root} noValidate autoComplete="off">

          <TextField id="standard-basic" style={{minWidth:"450px", marginBottom:"15px"}} label={t('description')} onChange={onChangeDesc} error={errorDesc}/>
          <TextField id="standard-basic" style={{minWidth:"100px", marginBottom:"15px"}} label={t('discount')} onChange={onChangeDiscount} type="number" error={errorDiscount}/>

            {/* VEHICLES LIST */}
            <List className={listClasses.root} style={{marginBottom:"15px"}}>

                      <ListItem button onClick={handleClick}>
                          <ListItemText primary={t('vehicles-button')} />
                          {open ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>

                      <Collapse in={open} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            {vehicles.map((vehicle)=>{
                                const labelId = `checkbox-list-label-${vehicle.id}`;

                                return (
                                    <ListItem key={vehicle.id} role={undefined} dense button onClick={handleToggle(vehicle.id)}>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={checked.indexOf(vehicle.id) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': labelId }}
                                                color="primary"
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={`ID: ${vehicle.id} \t| Brand: ${vehicle.brand} | Model: ${vehicle.model}`} />

                                    </ListItem>
                                );
                            })}
                              
                          </List>
                      </Collapse>
            </List>

          <Button variant="contained" color="primary" onClick={handleAddOffer}>
          {t('add-offer')}
          </Button>
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