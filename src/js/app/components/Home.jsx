import React, {useEffect} from "react";
import { Redirect } from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {useLastLocation} from "react-router-last-location";

import {getAuth} from "@js/app/redux/auth-reducer";

const Home = ({getAuth}) => {

    const isAuth = useSelector(state => state.auth.auth);
    const isInitialized = useSelector(state => state.auth.initialized);
    const lastPage = useLastLocation();

    useEffect(() => {
        getAuth();
    });

    return (
        isInitialized ?
            isAuth ?
                <Redirect to={lastPage ? lastPage.pathname : '/admin/creator/rolls'} /> :
                <Redirect to={'/admin/login'} />
                : <p>Загрузка...</p>
    );
};

export default connect(null, {getAuth})(Home);