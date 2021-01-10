import React, {useState} from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import PasswordResetModal from "../components/PasswordResetModal";



const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [changePassOpen, setChangePasswordModalOpen] = useState(false);

  console.log(currentUser);
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <div className="row">

        <div className="col-md-2">
          <strong>Id:</strong>
        </div>
        <div className="col-md-10">
          {currentUser.id}
        </div>

        <div className="col-md-2">
          <strong>Login:</strong>
        </div>
        <div className="col-md-10">
          {currentUser.username}
        </div>
        <div className="col-md-2">
          <strong>Email:</strong>
        </div>
        <div className="col-md-10">
          {currentUser.email}
        </div>
        <div className="col-md-12">
          <hr />
        </div>

        <div className="col-md-2"><strong>First Name: </strong></div> <div className="col-md-10">{currentUser.firstName}</div>
        <div className="col-md-2"><strong>Last Name: </strong></div> <div className="col-md-10">{currentUser.lastName}</div>
        <div className="col-md-2"><strong>Phone Number: </strong></div> <div className="col-md-10">{currentUser.phone}</div>
        <div className="col-md-2"><strong>Address: </strong></div> <div className="col-md-10">{currentUser.address}</div>
        <div className="col-md-2"><strong>City: </strong></div> <div className="col-md-10">{currentUser.city}</div>
        <div className="col-md-2"><strong>Country: </strong></div> <div className="col-md-10">{currentUser.country}</div>

        <div className="col-md-2">
          <strong>Roles:</strong>
        </div>

        <div className="col-md-10">
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
        </div>

        <div className="col-md-2">
        <strong>Change password:</strong>
        </div>
        <div className="col-md-10">
        <Button variant="contained" color="primary" onClick={()=>{
                        setChangePasswordModalOpen(true);
                    }}>
                      Change
          </Button>
        </div>

      </div>
      

      {changePassOpen && (<PasswordResetModal
              open={changePassOpen}
              setOpen={setChangePasswordModalOpen}
              userId={currentUser.id}
              />
            )}

    </div>
  );
};

export default Profile;