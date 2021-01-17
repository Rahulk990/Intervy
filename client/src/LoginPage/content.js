import React, { useState } from 'react';

function Content(prop) {
    const [credentials, setcredentials] = useState({
        "username": "",
        "password": ""
    })

    function changeHandler(event) {
        const key = event.target.name;
        const val = event.target.value;

        setcredentials({
            ...credentials,
            [key]: val
        });
    };

    function submitHandler(event) {
        event.preventDefault();
        prop.submitHandler(credentials);
    }

    return (
        <div className="row justify-content-center" style={{ margin: 0 }}>
            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-7">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="p-5">
                        <div className="text-center">
                            <h1 className="h4 mb-4">Welcome Back!</h1>
                        </div>
                        <form className="user" onSubmit={submitHandler}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="username"
                                    onChange={changeHandler}
                                    value={credentials.username}
                                    className="form-control form-control-user"
                                    placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    onChange={changeHandler}
                                    value={credentials.password}
                                    className="form-control form-control-user"
                                    placeholder="Password" />
                            </div>
                            {prop.isWrong && <p className="small text-center login_error" >Wrong Username or Password</p>}
                            {prop.isError && <p className="small text-center login_error" >Some Internal Error Occured</p>}
                            {(prop.isSent) ? (
                                <div className="text-center">
                                    <div className="spinner-border text-primary" role="status"></div>
                                </div>
                            ) : (
                                    <button type="submit" className="btn btn-primary btn-user btn-block" >
                                        Login
                                    </button>
                                )}
                        </form>
                        <hr />
                        <div className="row">
                            <div className="col text-center">
                                <a className="small" href="/register">New User? Create an Account!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Content;
