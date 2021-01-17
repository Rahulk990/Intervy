import React from 'react';

import Header from '../Others/header';
import Title from '../Others/heading';
import Data from '../data_files/topic_data';
import Card from '../Others/card';

function Topics() {
    var ds = [], algo = [];
    return (
        <div>
            <Header link={"home"} current={"Topics"} profile={true} leftbar={true} />
            <div className="container-fluid">
                <Title title="Topics" />
                <div className="row">
                    <div className="col-lg-6 mb-4">
                        <div className="card">
                            <div className="card-header text-center">
                                <h6 className="m-0 text-primary">Data Structures</h6>
                            </div>
                            <div class="bg-white rounded-lg p-5 shadow text-center">
                                {
                                    Object.entries(Data).forEach(([key, value]) => {
                                        if (value === 1) ds.push(<Card name={key} link="topic" />)
                                    })
                                }
                                {ds}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                        <div className="card">
                            <div className="card-header text-center">
                                <h6 className="m-0 text-primary">Algorithms</h6>
                            </div>
                            <div class="bg-white rounded-lg p-5 shadow text-center">
                                {
                                    Object.entries(Data).forEach(([key, value]) => {
                                        if (value === 2) algo.push(<Card name={key} link="topic" />)
                                    })
                                }
                                {algo}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topics;