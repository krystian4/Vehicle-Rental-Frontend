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
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Login:</strong> {currentUser.username}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Roles:</strong>
      <ul style={{marginLeft:"20px"}}>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>

      <p>
        <strong>First Name: </strong> {currentUser.firstName}<br />
        <strong>Last Name: </strong> {currentUser.lastName}<br />
        <strong>Phone Number: </strong> {currentUser.phone}<br />
        <strong>Address: </strong> {currentUser.address}<br />
        <strong>City: </strong> {currentUser.city}<br />
        <strong>Country: </strong> {currentUser.country}<br />
      </p>

      <p>
        <strong>Change password:</strong>
        <div>
        <Link to="/changepassword" className="btn btn-primary btn-block" style={{width:"200px"}}>Change Password</Link>
        </div>
      </p>
    </div>
  );
};

export default Profile;