import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Loading from "../../components/Loading";
import DeleteUserDialog from './DeleteUserDialog';
import EditUserModal from './EditUserModal';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

import UserService from "../../services/user.service"

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const ManageUsersBoard = () => {
  const { t } = useTranslation('navbar');

    const classes = useStyles();
    
    const [users, setUsers] = useState([])
    const [activeList, setActiveList] = useState([])
    const [isCustomersList, setIsCustomerList] = useState(false);

    const [user, setUser] = useState("")

    const [loading, setLoading]= useState(true)
    let msg = t('no-users-here');
    const [message, setMessage] = useState(msg)
    const [userId, setUserId] = useState("");

    const [deleteDialogOpen, setDelDialogOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const fetchUsers = () =>{
      UserService.getActiveUsers()
        .then((response) =>{
          setUsers(response);
          setActiveList(response);
          setLoading(false);
        })
        .catch((err) =>{
          console.log(err);
            setMessage("Connection error")
            setLoading(false);
        });
    }

    useEffect(() => {
      fetchUsers();
  }, [])      

    useEffect(() => {
      fetchUsers();
    }, [deleteDialogOpen, editModalOpen])

  const handleUsersChange = () =>{
    if(!isCustomersList){
      const newCustomers = users.filter((v) => v.roles.includes("ROLE_USER"));
      console.log(newCustomers);
      setActiveList(newCustomers);
      setIsCustomerList(true);
    }
    else{
      setActiveList(users);
      setIsCustomerList(false);
    }
  }

  if(loading){
      return(
          <div className='container'>
              <Loading type='bars' color='grey' />
          </div>
      )
  }

  if(users.length === 0){
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
        <h3>{t('users-button')}</h3>
      </header>
      <div style={{paddingBottom:"0.5rem"}}>
        <Button variant="contained" color="primary" onClick={()=>handleUsersChange()}>
          {isCustomersList ? t('show-all') : t('show-customers')}
        </Button>
      </div>
      {deleteDialogOpen && (
        <DeleteUserDialog
              userId={userId}
              setOpen={setDelDialogOpen}
              open={deleteDialogOpen}
              fetchUsers={fetchUsers}
          />
      )}

      {editModalOpen && (
        <EditUserModal
          setOpen={setEditModalOpen}
          open={editModalOpen}
          user={user}
        />
      )}

      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">{t('name')}</TableCell>
            <TableCell align="right">{t('last-name')}</TableCell>
            <TableCell align="right">{t('username')}</TableCell>
            <TableCell align="right">E-mail</TableCell>
            <TableCell align="right">{t('adress')}</TableCell>
            <TableCell align="right">{t('city')}</TableCell>
            <TableCell align="center">{t('action')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activeList.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {user.id} 
              </TableCell>
              <TableCell align="right">{user.firstName} </TableCell>
              <TableCell align="right">{user.lastName} </TableCell>
              <TableCell align="right">{user.username}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.address}</TableCell>
              <TableCell align="right">{user.city}</TableCell>
              <TableCell align="center">
              <IconButton aria-label="edit" className={classes.margin} onClick={()=>{
                setEditModalOpen(true);
                setUser(user);
              }}>
                        <EditIcon />
              </IconButton>

                <IconButton aria-label="delete" className={classes.margin} onClick={()=>{
                setDelDialogOpen(true);
                setUserId(user.id);
              }} >
                        <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>  
            
    </div>
    
  );
  
}
export default ManageUsersBoard;