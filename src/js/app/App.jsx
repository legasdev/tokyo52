import React from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import { LastLocationProvider } from 'react-router-last-location';
import {useSelector} from "react-redux";

import LoginPage from "@js/app/components/Login";
import Home from "@js/app/components/Home";
import CreatorPage from "@js/app/components/Creator";
import OrdersPage from "@js/app/components/Orders";
import NavigatePages from "@js/app/components/common/NavigatePages";

const App = props => {

    const isAuth = useSelector(state => state.auth.auth);

    return (
        <div className={'content'}>
            {
                isAuth &&
                <NavigatePages />
            }
            <LastLocationProvider watchOnlyPathname>
                <Switch>
                    <Route
                        exact
                        path={'/admin'}
                        render={ () => <Home /> }
                    />
                    <Route
                        path={'/admin/creator'}
                        render={ () => <CreatorPage /> }
                    />
                    <Route
                        path={'/admin/orders'}
                        render={ () => <OrdersPage /> }
                    />
                    <Route
                        path={'/admin/login'}
                        render={ () => <LoginPage /> }
                    />
                    <Route
                        render={ () => <Home /> }
                    />
                </Switch>
            </LastLocationProvider>
        </div>
    );
};

export default withRouter(App);