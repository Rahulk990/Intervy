import React, { useState, useEffect } from 'react';

function Content(prop) {
    const [credentials, setcredentials] = useState({
        username: "",
        handle_forces: ""
    })

    useEffect(() => {
        var data = JSON.parse(localStorage.getItem("profile"));
        setcredentials({
            username: data.username,
            handle_forces: data.handle_forces
        });
        localStorage.removeItem("profile");
    }, [])

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
        <div className="row justify-content-center">
            <div className="col-11 mb-4">
                <div className="card mb-4">
                    <div className="card-body">
                        <form onSubmit={submitHandler}>
                            <h6 className="heading-small text-muted mb-4">User information</h6>
                            <div className="pl-lg-4">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label className="form-control-label" >Username</label>
                                            <input
                                                type="text"
                                                name="username"
                                                value={credentials.username}
                                                className="form-control"
                                                placeholder="Username" readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label className="form-control-label">Codeforces Handle</label>
                                            <input
                                                type="text"
                                                name="handle_forces"
                                                onChange={changeHandler}
                                                value={credentials.handle_forces}
                                                className="form-control"
                                                placeholder="Handle" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="mt-2 mb-3" />
                            <div className="text-center">
                                {prop.isError && <p className="small text-center login_error" >Some Internal Error Occured</p>}
                                {(prop.isSent) ? (
                                    <div className="text-center">
                                        <div className="spinner-border text-primary" role="status"></div>
                                    </div>
                                ) : (
                                        <button type="submit" className="btn btn-primary btn-user" >
                                            Save Changes
                                        </button>
                                    )}
                                <a href="/home" className="ml-3 btn btn-primary btn-user" > Back to Home </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Content;
