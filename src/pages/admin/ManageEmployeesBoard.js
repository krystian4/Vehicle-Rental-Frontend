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
import Button from '@material-ui/core/Button';
import DeleteUserDialog from './DeleteUserDialog';
import AddNewUserModal from './AddNewUserModal';
import EditEmployeeModal from './EditEmployeeModal';

import UserService from "../../services/user.service"

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const ManageUsersBoard = () => {
    const classes = useStyles();
    
    const [users, setUsers] = useState([])
    const [user, setUser] = useState("")
    
    const [loading, setLoading]= useState(true)
    const [message, setMessage] = useState("No users here")
    const [userId, setUserId] = useState("");

    const [addUserModalOpen, setAddUserModalOpen] = useState(false);
    const [deleteDialogOpen, setDelDialogOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    

    const fetchUsers = () =>{
      UserService.getEmployees()
        .then((response) =>{
          setUsers(response);
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
  }, [addUserModalOpen, deleteDialogOpen, editModalOpen])  


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
        <h3>Employees</h3>
      </header>

      <DeleteUserDialog
              userId={userId}
              setOpen={setDelDialogOpen}
              open={deleteDialogOpen}
          />
      
      <AddNewUserModal
          setOpen={setAddUserModalOpen}
          open={addUserModalOpen}
      />
      {editModalOpen && (
        <EditEmployeeModal
          setOpen={setEditModalOpen}
          open={editModalOpen}
          user={user}
        />
      )}
      


      <div style={{paddingBottom:"0.5rem"}}>
        <Button variant="contained" color="primary" onClick={()=>setAddUserModalOpen(true)}>
          Add Employee
        </Button>
      </div>

      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">employeeId</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">E-mail</TableCell>
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">Salary</TableCell>
            <TableCell align="right">Bonus</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell component="th" scope="row">
                {user.userId}  
              </TableCell>
              <TableCell align="right">{user.employeeId}</TableCell>
              <TableCell align="right">{user.firstName}</TableCell>
              <TableCell align="right">{user.lastName}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.jobTitle}</TableCell>
              <TableCell align="right">{user.salary}PLN</TableCell>
              <TableCell align="right">{user.bonus}PLN</TableCell>
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