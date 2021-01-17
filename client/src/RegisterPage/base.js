import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth';

import Header from '../Others/header';
import Content from './content';

function Register() {
    const { setAuthTokens } = useAuth();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isRegisteredIn, setRegisteredIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isPresent, setIsPresent] = useState(false);
    const [isSent, setIsSent] = useState(false);

    // One Time Check for Already login
    useEffect(() => {
        var data = localStorage.getItem("tokens");
        if (data) setLoggedIn(true);
    }, [])

    // On Form Submit
    function submitHandler(data) {
        setIsSent(true);

        // Posting to Server
        const url = (process.env.REACT_APP_SERVER || "http://localhost:5000") + "/register";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": data.username,
                "password": data.password,
            }),
        })
            .then(res => res.text())
            .then(data => {
                if (data !== "Username Already Exists") {
                    setAuthTokens(data);
                    setRegisteredIn(true);
                    setIsSent(false);
                } else {
                    setIsPresent(true);
                    setIsSent(false);
                }
            })
            .catch(() => {
                setIsError(true);
                setIsSent(false);
            })
    }

    return (
        <div>
            {isRegisteredIn && <Redirect to="/profile" />}
            {isLoggedIn && <Redirect to="/home" />}
            <Header link={"register"} leftbar={false} />
            <Content submitHandler={submitHandler} isError={isError} isPresent={isPresent} isSent={isSent} />
        </div>
    );
}

export default Register;
