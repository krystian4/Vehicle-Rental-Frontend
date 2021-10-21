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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Loading from "../../components/Loading";
import DeleteFaqDialog from "./DeleteFaqDialog";
import AddNewFAQModal from "./AddNewFAQModal";
import EditFAQModal from "./EditFAQModal";
import FaqService from '../../services/faq.service';
import { useTranslation } from 'react-i18next';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { t } = useTranslation('navbar');

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
        {t('question')}:
        </TableCell>
        <TableCell style={{  padding: 0 }} align="right">
              <IconButton aria-label="edit" className={classes.margin} onClick={()=>{
                props.setEditFAQOPEN(true);
                props.setFaqID(row.id);
                props.setFaq(row);
              }
                }>
                        <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" className={classes.margin} onClick={()=>{
                props.setDialogOpen(true);
                props.setFaqID(row.id);
              }
                }>
                        <DeleteIcon />
              </IconButton>

        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell align="left"></TableCell>
        <TableCell style={{fontSize:22}} align="left">{row.question}</TableCell>
      </TableRow>
      
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>{t('answer')}</TableCell>
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


const EditFaq = () => {
  const { t } = useTranslation('navbar');

    const [arrayFAQs, setFAQs] = useState([])
    const [loading, setLoading]= useState(true)
    const [message, setMessage] = useState(t('no-faq'))

    const [dialogOpen, setDialogOpen] = useState(false);
    const [addFaqOpen, setAddNewFAQOPEN] = useState(false);
    const [editFaqOpen, setEditFAQOPEN] = useState(false);

    const [faq, setFaq] = useState(null);

    const [FAQID, setFaqID] = useState(null);

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
    
    useEffect(() => {
      fetchFaq();
    }, [dialogOpen, addFaqOpen, editFaqOpen])

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

        <div style={{paddingBottom:"0.5rem"}}>
        <Button variant="contained" color="primary" onClick={()=>setAddNewFAQOPEN(true)}>
        {t('add-new-faq')}
        </Button>
        </div>
          {addFaqOpen && (
            <AddNewFAQModal 
                setOpen={setAddNewFAQOPEN}
                open={addFaqOpen}
                arrayFAQs={arrayFAQs}
                setFAQs={setFAQs}
                fetchFaq={fetchFaq}
            />
          )}
        </div>
    )
}

  return (
    
    
    <div className="container">

      {dialogOpen && (
        <DeleteFaqDialog
              faqId={FAQID}
              setOpen={setDialogOpen}
              open={dialogOpen}
          />
      )}
          
      {editFaqOpen && (
        <EditFAQModal 
            setOpen={setEditFAQOPEN}
            open={editFaqOpen}
            arrayFAQs={arrayFAQs}
            faq={faq}
            fetchFaq={fetchFaq}
        />
      )}

      {addFaqOpen && (
        <AddNewFAQModal 
            setOpen={setAddNewFAQOPEN}
            open={addFaqOpen}
            setFAQs={setFAQs}
            fetchFaq={fetchFaq}
        />
      )}

      <header className="jumbotron">
        <h3>{t('edit-faq')}</h3>
      </header>
      <div style={{paddingBottom:"0.5rem"}}>
        <Button variant="contained" color="primary" onClick={()=>setAddNewFAQOPEN(true)}>
        {t('add-new-faq')}
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {arrayFAQs.map((row) => (
              <Row key={row.id} row={row} setFaq={setFaq} setFaqID={setFaqID} setDialogOpen={setDialogOpen} setEditFAQOPEN={setEditFAQOPEN}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
    
  );
};

export default EditFaq;