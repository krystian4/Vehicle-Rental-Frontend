import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Loading from "../components/Loading";

import FaqService from '../services/faq.service';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root} >
        <TableCell style={{width:"60px"}}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell >

        <TableCell align="left" component="th" scope="row">
          Question:
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell align="left" style={{paddingTop:0}}></TableCell>
        <TableCell style={{fontSize:22, paddingTop:0}} align="left" >{row.question}</TableCell>
      </TableRow>
      
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Answer</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell style={{fontSize:22}} align="left">{row.answer}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

    </React.Fragment>
  );
}

const FAQ = () => {
  const [arrayFAQs, setFAQs] = useState([])
  const [loading, setLoading]= useState(true)
  const [message, setMessage] = useState("No FAQs here")

  const fetchFaq = () =>{
    FaqService.getFaqs()
      .then((response) =>{
        setFAQs(response);
        setLoading(false);
      })
      .catch((err) =>{
        console.log(err);
          setMessage("Connection error")
          setLoading(false);
      });
  }

  useEffect(() => {
    fetchFaq();
  }, [])

  if(loading){
    return(
        <div className='container'>
            <Loading type='bars' color='grey' />
        </div>
    )
}
if(arrayFAQs.length === 0){
  return(
      <div className="container">
      <header className="jumbotron">
          <h2>{message}</h2>
      </header>
      </div>
  )
}

  return (
    <div className="container">
      <header className="jumbotron">
        <h2>FAQ</h2>
      </header>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {arrayFAQs.map((row) => (
              <Row key={row.id} row={row}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
 };
export default FAQ;