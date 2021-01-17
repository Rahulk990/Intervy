import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from './context/auth';

import Private from './private_route';
import Home from './HomePage/base';
import Companies from './Groups/companies';
import Topics from './Groups/topics';
import Login from './LoginPage/base';
import Register from './RegisterPage/base';
import Profile from './ProfilePage/base';
import Topic from './TopicPage/base';
import Company from './CompanyPage/base';

function App() {
    const existingTokens = JSON.parse(localStorage.getItem("tokens"));
    const [authTokens, setAuthTokens] = useState(existingTokens);

    const setTokens = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    }

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <BrowserRouter>
                <Switch>
                    <Redirect exact from='/' to='/login' />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Private path="/profile" component={Profile} />
                    <Private path="/home" component={Home} />
                    <Private path='/companies' component={Companies}/>
                    <Private path='/topics' component={Topics}/>
                    <Private path="/company/:name" component={Company} />
                    <Private path="/topic/:name" component={Topic} />
                </Switch>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;