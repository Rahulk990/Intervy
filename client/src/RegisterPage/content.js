import React, { useState, useEffect } from 'react';

function Content(prop) {
    const [isValid, setIsValid] = useState(null);
    const [isTried, setIsTried] = useState(false);
    const [credentials, setcredentials] = useState({
        "username": "",
        "password": "",
        "confirm_password": ""
    })

    useEffect(() => {
        if (credentials.username === "") setIsValid("Invalid Username");
        else if (credentials.password.length < 8) setIsValid("Password must be 8 Characters Long");
        else if (credentials.password !== credentials.confirm_password) setIsValid("Passwords do not Match");
        else setIsValid(null);
    }, [credentials]);

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
        setIsTried(true);        
        if (isValid == null) prop.submitHandler(credentials);
    }

    return (
        <div className="row justify-content-center" style={{ margin: 0 }}>
            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-7">
                <div className="card o-hidden border-0 shadow-lg my-4">
                    <div className="p-5">
                        <div className="text-center">
                            <h1 className="h4 mb-4">Create an Account</h1>
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
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="confirm_password"
                                    onChange={changeHandler}
                                    value={credentials.confirm_password}
                                    className="form-control form-control-user"
                                    placeholder="Confirm Password" />
                            </div>
                            {isTried && <p className="small text-center login_error" >{isValid}</p>}
                            {prop.isPresent && <p className="small text-center login_error" >Username Already Exists</p>}
                            {prop.isError && <p className="small text-center login_error" >Some Internal Error Occured</p>}
                            {(prop.isSent) ? (
                                <div className="text-center">
                                    <div className="spinner-border text-primary" role="status"></div>
                                </div>
                            ) : (
                                    <button type="submit" className="btn btn-primary btn-user btn-block" >
                                        Sign Up
                                    </button>
                                )}
                        </form>
                        <hr />
                        <div className="col text-center">
                            <a className="small" href="/login">Already have an Account? Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;
