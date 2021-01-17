import React from 'react';
import { easeQuadInOut } from "d3-ease";
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import AnimatedProgressProvider from "../Styles/AnimatedProgressProvider";
import "react-circular-progressbar/dist/styles.css";

function details(key, value) {
    return (
        <div key={key} className="row text-center mt-2 mb-2">
            <div className="col-12 text-center">
                <div className="h4 font-weight-bold mb-0">{value}
                    <sup className="small">%</sup>
                </div>
                <span className="small text-gray">{key}</span>
            </div>
        </div>
    );
}

function circularProgressBar(value, data) {
    var color, items = [];
    if (value > 75) color = "#28A745"
    else if (value > 40 && value <= 75) color = "#FFC107"
    else color = "#DC3545"

    return (
        <div className="bg-white rounded-lg p-5 shadow">
            <AnimatedProgressProvider
                valueStart={0}
                valueEnd={value}
                duration={1.4}
                easingFunction={easeQuadInOut} >
                {value => {
                    const roundedValue = Math.round(value);
                    return (
                        <CircularProgressbarWithChildren
                            value={value}
                            strokeWidth={2}
                            styles={buildStyles({
                                pathTransition: "none",
                                pathColor: color
                            })}>
                            <div className="h2 font-weight-bold">{roundedValue}<sup className="small">%</sup></div>
                        </CircularProgressbarWithChildren>
                    );
                }}
            </AnimatedProgressProvider>
            {data != null ? (
                <OverlayTrigger
                    trigger="click"
                    placement={'right'}
                    overlay={
                        <Popover>
                            <Popover.Content>
                                {Object.entries(data).forEach(([key, value]) => { items.push(details(key, value)) })}
                                {items}
                            </Popover.Content>
                        </Popover>
                    }>
                    <div className="mt-4 text-center">
                        <button
                            className="btn btn-sm btn-outline-primary shadow-sm">
                            More Details
                    </button>
                    </div>
                </OverlayTrigger>
            ) : (
                    <div className="mt-4 text-center">
                        <p className="btn btn-sm btn-primary shadow-sm mb-0"> Keep Going!! </p>
                    </div>
                )}
        </div>
    );
}

function Progress(prop) {
    return (
        <div className="col-lg-3 mb-4">
            <div className="card">
                <div className="card-header text-center">
                    <h6 className="m-0 text-primary">{prop.title}</h6>
                </div>
                {(prop.userData !== null && prop.userData !== "false") ? (
                    <div>
                        {circularProgressBar(prop.bar_value, prop.bar_data)}
                    </div>
                ) : (
                        <div className="d-flex p-3 justify-content-center align-items-center">
                            {(prop.userData && prop.userData === 'false') ? (
                                <div className="spinner-border text-primary" role="status"></div>
                            ) : (
                                    <button
                                        onClick={() => { prop.refreshHandler() }}
                                        className="btn btn-outline-primary shadow-sm text-center">
                                        Refresh
                                    </button>
                                )}
                        </div>
                    )}
            </div>
        </div>
    );
}

export default Progress;