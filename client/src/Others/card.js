import React from 'react';

function items(prop) {
    return (
        <div className="note">
            <a href={`/${prop.link}/${prop.name}/`}>{prop.name}</a>
        </div>
    );
}

export default items;