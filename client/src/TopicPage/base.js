import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth';

import Header from '../Others/header';
import Title from '../Others/heading';
import { extract_companies } from '../data_files/extract';
import Content from './content';

function Topic(prop) {
    const title = prop.match.params.name;
    const question_data = extract_companies(title)

    const { authTokens, setAuthTokens } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [done, setData] = useState(null);

    // For Initial Loading of Data    
    function load_data() {
        const url = (process.env.REACT_APP_SERVER || "http://localhost:5000") + "/load_question_data";

        console.log(url);
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
            }).catch(err => {
                console.log(err);
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

    return (
        <div>
            {!isLogin && <Redirect to="/login" />}
            <Header link={"home"} profile={true} leftbar={true} />
            <div className="container-fluid">
                <Title title={title} />
                <Content load_data={load_data} save_data={save_data} done={done} question_data={question_data}/>
            </div>
        </div>
    );
}

export default Topic;