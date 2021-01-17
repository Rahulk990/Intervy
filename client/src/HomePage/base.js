import React from 'react';
import { useAuth } from '../context/auth';

import Header from '../Others/header';
import Title from '../Others/heading';
import Content from './Content';
import Footer from './footer';

function Home() {
    const { authTokens, setAuthTokens } = useAuth();
    const [userData, setUserData] = useStickyState(null, 'userData');

    // Refreshing Data
    function refresh() {
        setUserData("false");
        const url = (process.env.REACT_APP_SERVER || "http://localhost:5000") + "/refresh";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "token": authTokens
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data !== false) {
                    setUserData(data);
                } else {
                    setAuthTokens(null);
                    localStorage.removeItem("tokens");
                    localStorage.removeItem("userData");
                }
            })
    }

    return (
        <div>
            <Header link={"home"} current={"Dashboard"} leftbar={true} />
            <div className="container-fluid">
                <Title title="Dashboard" />
                <Content userData={userData} refreshHandler={refresh} />
            </div>
            <Footer />
        </div>
    );
}

export default Home;

function useStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(() => {
        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    });

    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}