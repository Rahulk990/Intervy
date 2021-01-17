import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth';

import Header from '../Others/header';
import Content from './content';

function Login() {
    const { setAuthTokens } = useAuth();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isWrong, setIsWrong] = useState(false);
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
        const url = (process.env.REACT_APP_SERVER || "http://localhost:5000") + "/login";
        console.log(url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.text())
            .then(data => {
                if (data !== "Not Found") {
                    setAuthTokens(data);
                    setLoggedIn(true);
                    setIsSent(false);
                } else {
                    setIsWrong(true);
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
            {isLoggedIn && <Redirect to="/home" />}
            <Header link={"login"} leftbar={false} />
            <Content submitHandler={submitHandler} isError={isError} isWrong={isWrong} isSent={isSent} />
        </div>
    );
}

export default Login;
