import React from 'react';
import { ProgressBar } from 'react-bootstrap';

function createbar(data) {
    return (
        <div key={data.name} className="py-3">
            <h4 className="trend-data"> {data.name} <span className="float-right"> {data.value}% </span> </h4>
            <ProgressBar now={data.value} />
        </div>
    );
}

function Trend(prop) {
    return (
        <div className="col-lg-4 mb-4">
            <div className="card shadow">
                <div className="card-header">
                    <h6 className="m-0 text-primary">{prop.title}</h6>
                </div>
                <div className="card-body">
                    {prop.data.map(createbar)}
                </div>
            </div>
        </div>
    );
}

export default Trend;