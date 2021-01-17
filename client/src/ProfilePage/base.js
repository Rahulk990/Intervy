import React, { useState } from 'react';
import { useAuth } from '../context/auth';

import Header from '../Others/header';
import Title from '../Others/heading';
import Content from './content';

function Profile() {
    const { authTokens} = useAuth();
    const [isData, setIsData] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSent, setIsSent] = useState(false);

    // On Form Submit
    function submitHandler(data) {
        setIsSent(true);

        // Posting to Server
        const url = (process.env.REACT_APP_SERVER || "http://localhost:5000") + "/profile";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                handle_forces: data.handle_forces,
                token: authTokens
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data === true) {
                    localStorage.removeItem("userData");
                    setIsSent(false);
                } else {
                    setIsError(true);
                    setIsSent(false);
                }
            })
    }

    // First time Loading of Data
    function load_data() {
        const url = (process.env.REACT_APP_SERVER || "http://localhost:5000") + "/load_profile";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "token": authTokens
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data !== false) {
                    setIsData(true);
                    localStorage.setItem("profile", JSON.stringify(data));
                } else {
                    setIsError(true);
                }
            })

        return (
            <div className="text-center mb-4">
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        );
    }

    return (
        <div>
            <Header link={"home"} profile={true} leftbar={true} />
            <div className="container-fluid">
                <Title title={"Profile"} />
                {isData ? (
                    <Content submitHandler={submitHandler} isError={isError} isData={isData} isSent={isSent} />
                ) : (
                        load_data()
                    )}
            </div>
        </div>
    );
}

export default Profile;