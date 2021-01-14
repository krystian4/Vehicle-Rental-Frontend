import React, { useState, useEffect } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { format } from "date-fns";
import Button from '@material-ui/core/Button';
import Checkout from "./user/checkout/Checkout";

const CartPage = () => {
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")));
  const [payButtonClicked, setPayButtonClicked] = useState(false);
  
  const cartTotal = cart.reduce((total, { resPrice = 0 }) => total + resPrice, 0);

  const removeFromCart = (item) => {
    console.log("removing: " + item.id);
    setCart((currentCart) => {
      const indexOfItemToRemove = currentCart.findIndex((cartItem) => cartItem.id === item.id);
      console.log(indexOfItemToRemove);
      if (indexOfItemToRemove === -1) {
        return currentCart;
      }
      const newCart = [...currentCart.slice(0, indexOfItemToRemove),
        ...currentCart.slice(indexOfItemToRemove + 1),]
        console.log("cart after delete: ");
        console.log(newCart);
        sessionStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const handlePay = () =>{
    setPayButtonClicked(true);
  }

  if(payButtonClicked){
    return(
      <Checkout />
    )
  }

  return (

    <div className="container">
      <header className="jumbotron" style={{paddingBottom:"20px", paddingTop:"30px", marginBottom:"5px"}}>
      <h3>Ready to reserve</h3>

      </header>

        <TableContainer component={Paper}>
        <Table  aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell align="right">Model</TableCell>
                <TableCell align="right">Start Date</TableCell>
                <TableCell align="right">End Date</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {cart.map((vehicle, index) => (
                <TableRow key={index}>
                <TableCell component="th" scope="row">
                    {vehicle.brand}{vehicle.id}  
                </TableCell>
                <TableCell align="right">{vehicle.model}</TableCell>
                <TableCell align="right">{format(new Date(vehicle.startDate), "yyyy-MM-dd")}</TableCell>
                <TableCell align="right">{format(new Date(vehicle.endDate), "yyyy-MM-dd")}</TableCell>
                <TableCell align="right">{vehicle.resPrice.toFixed(2)}</TableCell>


                {/* <TableCell align="right">{format(new Date(vehicle.endDate), "yyyy-MM-dd")}</TableCell>
                <TableCell align="right">{format(vehicle.endDate, "yyyy-MM-dd")}</TableCell> */}

                <TableCell align="right">
                    <IconButton aria-label="delete" onClick={() => removeFromCart(vehicle)}>
                            <DeleteIcon />
                    </IconButton>
                </TableCell>
                </TableRow>
            ))}
            <TableRow >
                <TableCell  colSpan={5} align="right">Order total: <strong>{cartTotal}.00PLN</strong></TableCell>

            </TableRow>
            </TableBody>
        </Table>
        </TableContainer>
        <div className="row" style={{margin:0}}>
          <Button style={{ marginLeft:"auto", width:"16%", marginTop:"5px", marginBottom:"10px"}} variant="contained" color="primary" onClick={()=> handlePay()}>
                            Pay
          </Button>
        </div>
    </div>
  );
};

export default CartPage;