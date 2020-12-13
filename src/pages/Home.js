import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";

const Home = () => {
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

  return (
    <>
      <Hero> 
        <Banner title = "Car renting" subtitle = "Vehicles for every occasion!">
            <Link to="/vehicles" className="home-button">Find vehicle</Link>
        </Banner>
      </Hero>
    </>
  );
};

export default Home;