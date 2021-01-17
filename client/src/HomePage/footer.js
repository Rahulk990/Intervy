import React from 'react';

function Footer() {
    return (
        <div className="footer p-3">
            <p> Copyright © {new Date().getFullYear()} </p>
        </div>
    );
}

export default Footer;