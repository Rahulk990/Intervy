import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth';

import Header from '../Others/header';
import Title from '../Others/heading';
import { create_trends } from './create_trends';
import Progress from './progress';
import Trend from './trend';
import { extract_topics } from '../data_files/extract';
import Content from './content';

function Company(prop) {
    const title = prop.match.params.name;
    const question_data = extract_topics(title)

    const { authTokens, setAuthTokens } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [done, setData] = useState(null);
    const [userData, setUserData] = useStickyState(JSON.parse(localStorage.getItem('userData')), 'userData');

    // For Initial Loading of Data    
    function load_data() {
        const url = (process.env.REACT_APP_SERVER || "http://localhost:5000") + "/load_question_data";
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
                    console.log(data);
                    setData(data.done);
                } else {
                    setIsLogin(false);
                    setAuthTokens(null);
                    localStorage.removeItem("tokens");
                }
            })
    }

    // Saving Data
    function save_data(newData) {
        const url = (process.env.REACT_APP_SERVER || "http://localhost:5000") + "/save_question_data";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "token": authTokens,
                "done": newData
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data !== false) {
                    setData(newData);
                } else {
                    setIsLogin(false);
                    setAuthTokens(null);
                    localStorage.removeItem("tokens");
                }
            })
    }

    // Refreshing Data
    function refresh() {
        console.log("Refreshing...");
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

    var trend = create_trends(question_data);
    return (
        <div>
            {!isLogin && <Redirect to="/login" />}
            <Header link={"home"} profile={true} leftbar={true} />
            <div className="container-fluid">
                <Title title={title} />

                {userData && userData.competetive === null && (
                    <div className="mb-2 d-flex justify-content-center">
                        <p className="btn shadow text-center" style={{ color: "#d63031", backgroundColor: "#fab1a0" }}>
                            Data couldn't be fetched from Codeforces (Invalid Handle or Internal Error)
                        </p>
                    </div>
                )}
                
                <div className="row">
                    <Progress
                        done={done}
                        company={title}
                        userData={userData}
                        refresh={refresh}
                        load_data={load_data} />
                    <Trend title="Data Structures Trends" data={trend[0]} />
                    <Trend title="Algorithm Trends" data={trend[1]} />
                </div>
                <Content load_data={load_data} save_data={save_data} done={done} question_data={question_data} />
            </div>
        </div>
    );
}

export default Company;

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