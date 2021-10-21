import React, { useState } from "react";
import AuthService from "../services/auth.service";
import Button from '@material-ui/core/Button';
import PasswordResetModal from "../components/PasswordResetModal";
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation('navbar');
  const currentUser = AuthService.getCurrentUser();
  const [changePassOpen, setChangePasswordModalOpen] = useState(false);

  console.log(currentUser);
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong></strong> {t('profile')}
        </h3>
      </header>

      <div className="row">
        <div className="col-sm-3" style={{ display: "flex", alignContent: "center", justifyContent: "center" }} >
          <img alt="Profile pic" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" style={{ maxHeight: "100px" }} />
        </div>
        <div className="col-sm-9">
          <p style={{ margin: 0, color: "rgb(51, 77, 77)" }}><i>{t('acc-inf')}</i> </p>
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
          <p style={{ margin: 0, color: "rgb(51, 77, 77)" }}><i>{t('personal-inf')}</i> </p>
          <hr style={{ margin: 0 }} />
        </div>
        <div className="col-sm-3"></div>
        <div className="col-sm-2"><strong>{t('name')}: </strong></div> <div className="col-sm-7">{currentUser.firstName}</div>

        <div className="col-sm-3"></div>
        <div className="col-sm-2"><strong>{t('last-name')}: </strong></div> <div className="col-sm-7">{currentUser.lastName}</div>

        <div className="col-sm-3"></div>
        <div className="col-sm-2"><strong>{t('phone-number')}: </strong></div> <div className="col-sm-7">{currentUser.phone}</div>

        <div className="col-sm-3"></div>
        <div className="col-sm-2"><strong>{t('adress')}: </strong></div> <div className="col-sm-7">{currentUser.address}</div>

        <div className="col-sm-3"></div>
        <div className="col-sm-2"><strong>{t('city')}: </strong></div> <div className="col-sm-7">{currentUser.city}</div>

        <div className="col-sm-3"></div>
        <div className="col-sm-2"><strong>{t('country')}: </strong></div> <div className="col-sm-7">{currentUser.country}</div>

        <div className="col-sm-3"></div>
        <div className="col-sm-2">
          <strong>{t('roles')}:</strong>
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
          <p style={{ margin: 0, color: "rgb(51, 77, 77)" }}><i>{t('options')}</i> </p>
          <hr style={{ marginTop: 0 }} />

        </div>
      </div>

      <div className="row">
        <div className="col-sm-3">
          <strong>{t('change-pass')}:</strong>
        </div>

        <div className="col">
          <Button style={{ marginLeft: "50px" }} variant="contained" color="primary" onClick={() => {
            setChangePasswordModalOpen(true);
          }}>
            {t('change')}
          </Button>
        </div>
      </div>

      <div className="row">
      <div className="col-sm-12"><hr></hr></div>
        <div className="col-sm-3">
          <strong>{t('remove-acc')}:</strong>
        </div>

        <div className="col">
          <Button style={{ marginLeft: "50px" }} variant="contained" color="primary" onClick={() => {
            setChangePasswordModalOpen(true);
          }}>
            {t('delete')}
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