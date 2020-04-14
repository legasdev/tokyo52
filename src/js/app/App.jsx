import React from "react";
import {NavLink, Route, Switch, withRouter} from "react-router-dom";
import { LastLocationProvider } from 'react-router-last-location';

import LoginPage from "@js/app/components/Login";

const App = props => {

    return (
        <div>
            <NavLink
                exact to={'/admin/login'}>
                <span>Профиль</span>
            </NavLink>
            <LastLocationProvider watchOnlyPathname>
                <Switch>
                    <Route
                        exact
                        path={'/admin/login'}
                        render={ () => <LoginPage /> }
                    />
                </Switch>
            </LastLocationProvider>
        </div>
    );
};

export default App;