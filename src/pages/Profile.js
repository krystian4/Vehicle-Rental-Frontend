import React, { useState } from "react";
import AuthService from "../services/auth.service";
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
        <div className="col-sm-3" style={{ display: "flex", alignContent: "center", justifyContent: "center" }} >
          <img alt="Profile pic" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" style={{ maxHeight: "100px" }} />
        </div>
        <div className="col-sm-9">
          <p style={{ margin: 0, color: "rgb(51, 77, 77)" }}><i>Account informations</i> </p>
          <hr style={{ margin: 0 }}></hr>
          <strong>Login: </strong>
          {currentUser.username}
          <br />
          <strong>Email: </strong>
          {currentUser.email}
        </div>
      </div>

      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-9">
          <p style={{ margin: 0, color: "rgb(51, 77, 77)" }}><i>Personal informations</i> </p>
          <hr style={{ margin: 0 }} />
        </div>
        <div className="col-sm-3"></div>
        <div className="col-sm-2"><strong>First Name: </strong></div> <div className="col-sm-7">{currentUser.firstName}</div>

        <div className="col-sm-3"></div>
        <div className="col-sm-2"><strong>Last Name: </strong></div> <div className="col-sm-7">{currentUser.lastName}</div>

        <div className="col-sm-3"></div>
        <div className="col-sm-2"><strong>Phone Number: </strong></div> <div className="col-sm-7">{currentUser.phone}</div>

        <div className="col-sm-3"></div>
        <div className="col-sm-2"><strong>Address: </strong></div> <div className="col-sm-7">{currentUser.address}</div>

        <div className="col-sm-3"></div>
        <div className="col-sm-2"><strong>City: </strong></div> <div className="col-sm-7">{currentUser.city}</div>

        <div className="col-sm-3"></div>
        <div className="col-sm-2"><strong>Country: </strong></div> <div className="col-sm-7">{currentUser.country}</div>

        <div className="col-sm-3"></div>
        <div className="col-sm-2">
          <strong>Roles:</strong>
        </div>
        <div className="col-sm-7">
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <p style={{ margin: 0, color: "rgb(51, 77, 77)" }}><i>Options</i> </p>
          <hr style={{ marginTop: 0 }} />

        </div>
      </div>

      <div className="row">
        <div className="col-sm-3">
          <strong>Change password:</strong>
        </div>

        <div className="col">
          <Button style={{ marginLeft: "50px" }} variant="contained" color="primary" onClick={() => {
            setChangePasswordModalOpen(true);
          }}>
            Change
          </Button>
        </div>
      </div>

      <div className="row">
      <div className="col-sm-12"><hr></hr></div>
        <div className="col-sm-3">
          <strong>Remove account:</strong>
        </div>

        <div className="col">
          <Button style={{ marginLeft: "50px" }} variant="contained" color="primary" onClick={() => {
            setChangePasswordModalOpen(true);
          }}>
            Delete
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