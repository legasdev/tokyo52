import React from "react";
import { Redirect } from "react-router-dom";

const Home = props => {

    return <Redirect to={'/admin/login'} />;
};

export default Home;