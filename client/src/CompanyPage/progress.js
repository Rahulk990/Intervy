import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import { easeQuadInOut } from "d3-ease";

import AnimatedProgressProvider from "../Styles/AnimatedProgressProvider";
import "react-circular-progressbar/dist/styles.css";
import { progress_value } from './create_trends';

function circularProgressBar(data, done, company) {
    var color, value = progress_value(data, done, company);
    if (value > 75) color = "#28A745"
    else if (value > 40 && value <= 75) color = "#FFC107"
    else color = "#DC3545"

    return (
        <div className="bg-white rounded-lg p-5 shadow">
            <div className="p-3">
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
                <div className="mt-4 text-center">
                    <p className="btn btn-sm btn-primary shadow-sm mb-0"> Keep Going!! </p>
                </div>
            </div>
        </div>
    );
}

function Progress(prop) {
    if (prop.userData == null) prop.refresh();
    if (prop.done == null) prop.load_data();

    return (
        <div className="col-lg-4 mb-4">
            <div className="card">
                <div className="card-header text-center">
                    <h6 className="m-0 text-primary">Chances of Clearing Company's Coding Round</h6>
                </div>
                {prop.userData == null || prop.done == null ? (
                    <div className="text-center mb-4 mt-4">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                        <div>
                            {circularProgressBar(prop.userData, prop.done, prop.company)}
                        </div>
                    )}
            </div>
        </div>
    );
}

export default Progress;