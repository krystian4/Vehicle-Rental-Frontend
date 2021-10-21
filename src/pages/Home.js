import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation('navbar');
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  console.log(content);

  return (
    <>
      <Hero> 
        <Banner title = {t('car-renting')} subtitle = {t('vehicles-for-every-occasion')}>
            <Link to="/vehicles" className="home-button">{t('find-vehicle')}</Link>
        </Banner>
      </Hero>
    </>
  );
};

export default Home;