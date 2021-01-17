import React from 'react';
import Progress from './progress';
import Classifier from './classifier';

function Content(prop) {
    var userData = prop.userData, trend = [null, null, null, null, null];
    if (prop.userData && prop.userData !== 'false') trend = Classifier(userData);

    return (
        <div>
            {userData && userData.competetive == null && (
                <div className="d-flex justify-content-center">
                    <p className="btn shadow text-center" style={{ color: "#d63031", backgroundColor: "#fab1a0" }}>
                        Data couldn't be fetched from Codeforces (Invalid Handle or Internal Error)
                </p>
                </div>
            )}

            <div className="row">
                <Progress
                    title="Overall Progress"
                    userData={userData}
                    refreshHandler={prop.refreshHandler}
                    bar_value={trend[0]}
                    bar_data={null} />
                <Progress
                    title="Data Structures Progress"
                    userData={userData}
                    refreshHandler={prop.refreshHandler}
                    bar_value={trend[1]}
                    bar_data={trend[2]} />
                <Progress
                    title="Algorithms Progress"
                    userData={userData}
                    refreshHandler={prop.refreshHandler}
                    bar_value={trend[3]}
                    bar_data={trend[4]} />

                <div className="col-lg-3 mb-4">
                    <div className="card">
                        <div className="card-header bg-primary text-center">
                            {(userData && userData !== "false") ? (
                                <h6 className="m-0 text-white">{`Welcome ${userData.personal.username}`}</h6>
                            ) : (
                                    <h6 className="m-0 text-white">Welcome User</h6>
                                )}
                        </div>
                        <div className="card-body text-center shadow">
                            <div className="btn-group-vertical btn-block">
                                <button
                                    onClick={() => { prop.refreshHandler() }}
                                    className="mb-2 btn btn-outline-success shadow-sm text-center">
                                    <i className="m-1 float-left fas fa-sync"></i> Refresh Data
                                </button>
                                <a href="/profile" className="mb-2 btn btn-outline-info shadow-sm">
                                    <i className="m-1 float-left fas fa-edit"></i> Update Details
                                </a>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem("tokens");
                                        localStorage.removeItem("userData");
                                        window.location.reload(false);
                                    }}
                                    className="mb-2 btn btn-outline-danger shadow-sm">
                                    <i className="m-1 float-left fas fa-sign-out-alt"></i> LogOut
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Content;