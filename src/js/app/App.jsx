import React from "react";
import {NavLink, Route, Switch, withRouter} from "react-router-dom";
import { LastLocationProvider } from 'react-router-last-location';

import LoginPage from "@js/app/components/Login";
import Home from "@js/app/components/Home";

const App = props => {

    return (
        <div className={'content'}>
            <LastLocationProvider watchOnlyPathname>
                <Switch>
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

export default App;