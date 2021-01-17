import React from 'react';

import Header from '../Others/header';
import Title from '../Others/heading';
import Data from '../data_files/company_data';
import Card from '../Others/card';

function Companies() {
    return (
        <div>
            <Header link={"home"} current={"Companies"} profile={true} leftbar={true} />
            <div className="container-fluid text-center">
                <Title title="Companies" />
                {
                    Data.map(data => (
                        <Card
                            key={data.id}
                            name={data.name}
                            link="company"
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Companies;