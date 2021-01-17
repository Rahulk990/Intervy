import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import About from './about';

function Header(prop) {
    function position() {
        if(window.innerWidth < 576)
            return "bottom";
        return "left";
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary shadow">
            <a className="nav_title_home" href={`\\${prop.link}`}> <i className="fas fa-chart-line"></i> Intervy </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {prop.leftbar && (
                    <ul className="navbar-nav mr-auto">
                        <li className={`nav-item ${prop.current === "Dashboard" && "active"}`}>
                            <a className="nav-link mb-0" href="\home">Dashboard</a>
                        </li>
                        <li className={`nav-item ${prop.current === "Companies" && "active"}`}>
                            <a className="nav-link mb-0" href="\companies">Companies</a>
                        </li>
                        <li className={`nav-item ${prop.current === "Topics" && "active"}`}>
                            <a className="nav-link mb-0" href="\topics">Topics</a>
                        </li>
                    </ul>
                )}
                <ul className="navbar-nav ml-auto">
                    {prop.profile &&
                        <li className="nav-item">
                            <a className="nav-link mb-0" href="\profile">Profile</a>
                        </li>
                    }
                    <li>
                        <OverlayTrigger
                            trigger="click"
                            placement={position()}
                            overlay={
                                <Popover>
                                    <About />
                                </Popover>
                            }>
                            <p className="nav-link mb-0"> About </p>
                        </OverlayTrigger>
                    </li>
                    {prop.profile &&
                        <li className="nav-item">
                            <p className="nav-link mb-0" onClick={()=>{
                                localStorage.removeItem("tokens");
                                localStorage.removeItem("userData");
                                window.location.reload(false);
                                }} >Logout</p>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Header;