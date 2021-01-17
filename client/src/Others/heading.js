import React from 'react';

function Title(props) {
    return (
        <div className="title-card shadow" style={{ marginLeft: -15, marginRight: -15 }}>
            <h3 className="title">
                <em>{props.title}</em>
            </h3>
        </div>
    );
}

export default Title;