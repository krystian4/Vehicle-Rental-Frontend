import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddNewInsModal from "./AddNewInsModal";
import { format } from "date-fns";

import EmpService from "../../services/employee.service";

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const CarFeeList = () => {
    const classes = useStyles();
    const [isInsurancesList, setIsInsurancesList] = useState(true);
    const [insurances, setInsurances] = useState([]);
    const [inspections, setInspections] = useState([]);
    const [activeList, setActiveList] = useState([]);
    const [addModalOpen, setAddModalOpen] = useState(false);


    const fetchInsurances = () => {
        EmpService.getInsurances().then(
            (response)=>{
                setInsurances(response);
                setActiveList(response);
            },
            (error)=>{
                console.log("Nie pobrano insurances");
                console.log(error);
            }
        )
    }

    const fetchInspections = () => {
        EmpService.getInspections().then(
            (response)=>{
                setInspections(response);
            },
            (error)=>{
                console.log("Nie pobrano inspections");
                console.log(error);
            }
        )
    }

    const fetchInspectionsAdd = () => {
      EmpService.getInspections().then(
          (response)=>{
              setInspections(response);
              setActiveList(response);
          },
          (error)=>{
              console.log("Nie pobrano inspections");
              console.log(error);
          }
      )
  }

    useEffect(() => {
        fetchInsurances();
        fetchInspections();
    }, []) 

    const handleListChange = () =>{
      if(isInsurancesList){
        setIsInsurancesList(false);
        setActiveList(inspections);
      }
      else{
        setIsInsurancesList(true);
        setActiveList(insurances);
      }
    }

    const handleAddModal=()=>{
      setAddModalOpen(true);
    }

    return (
        <div className="container">
          <header className="jumbotron">
            <h3>Vehicle fees</h3>
          </header> 
          {addModalOpen && (
            <AddNewInsModal
              setOpen={setAddModalOpen}
              open={addModalOpen}
              isInsurancesList={isInsurancesList}
              fetchInsurances={fetchInsurances}
              fetchInspectionsAdd={fetchInspectionsAdd}
            />
          )}

          <div style={{paddingBottom:"0.5rem"}}>
            <Button variant="contained" color="primary" onClick={handleListChange}>
              {isInsurancesList ? "Show Inspections" : "Show Insurances"}
            </Button>

            <Button style={{marginLeft:"5px" }} variant="contained" color="primary" onClick={handleAddModal}>
              {isInsurancesList ? "Add new insurance" : "Add new inspection"}
            </Button>
          </div>
    
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Vehicle ID</TableCell>
                <TableCell align="center">Brand</TableCell>
                <TableCell align="center">Model</TableCell>
                <TableCell align="center">Production country</TableCell>
                <TableCell align="center">Purchase Date</TableCell>
                <TableCell align="center" >Expiration Date</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activeList.map((item) => (
                <TableRow key={item.id} style={item.expirationDate > (format(new Date(), "yyyy-MM-dd")) ? {}:{backgroundColor:"rgba(255, 44, 44, 0.7)"}}>
                  <TableCell component="th" scope="row">
                    {item.vehicleId} 
                  </TableCell>
                    <TableCell align="right">{item.brand} </TableCell>
                    <TableCell align="right">{item.model} </TableCell>
                    <TableCell align="right">{item.country}</TableCell>
                    <TableCell align="right">{isInsurancesList ? item.dateOfPurchase : item.startDate}</TableCell>
                    <TableCell align="right" >{item.expirationDate}</TableCell>
                    <TableCell align="right">{item.price}.00PLN</TableCell>
                    <TableCell align="center">
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>  
                
        </div>
        
      );
}
export default CarFeeList;