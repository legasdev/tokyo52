import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

const useRedirectToHome = props => {
    const isAuth = useSelector(state => state.auth.auth);
    if (!isAuth) return <Redirect to={'/login'} />;
    return !isAuth;
};

export default useRedirectToHome;