import React from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <div class="row">
        <div class="col-md-2">
          <strong>Token:</strong> 
        </div>
        <div class="col-md-10">
          {currentUser.accessToken.substring(0, 20)} ...{" "}
        </div>

        <div class="col-md-2">
          <strong>Id:</strong>
        </div>
        <div class="col-md-10">
          {currentUser.id}
        </div>

        <div class="col-md-2">
          <strong>Login:</strong>
        </div>
        <div class="col-md-10">
          {currentUser.username}
        </div>
        <div class="col-md-2">
          <strong>Email:</strong>
        </div>
        <div class="col-md-10">
          {currentUser.email}
        </div>

        <div class="col-md-2"><strong>First Name: </strong></div> <div class="col-md-10">{currentUser.firstName}</div>
        <div class="col-md-2"><strong>Last Name: </strong></div> <div class="col-md-10">{currentUser.lastName}</div>
        <div class="col-md-2"><strong>Phone Number: </strong></div> <div class="col-md-10">{currentUser.phone}</div>
        <div class="col-md-2"><strong>Address: </strong></div> <div class="col-md-10">{currentUser.address}</div>
        <div class="col-md-2"><strong>City: </strong></div> <div class="col-md-10">{currentUser.city}</div>
        <div class="col-md-2"><strong>Country: </strong></div> <div class="col-md-10">{currentUser.country}</div>

        <div class="col-md-2">
          <strong>Roles:</strong>
        </div>

        <div class="col-md-10">
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
        </div>

        <div class="col-md-2">
        <strong>Change password:</strong>
      </div>
      <div class="col-md-10">
        <Link to="/changepassword" className="btn btn-primary btn-block" style={{width:"200px"}}>Change Password</Link>
      </div>

      </div>
      
    </div>
  );
};

export default Profile;