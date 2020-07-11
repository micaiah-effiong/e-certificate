import React from 'react';
import './sidenav.css'


const SideNav = ()=>{
    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                    <div className="sidebar-sticky">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link" href="">
                                <span data-feather="file"></span>
                                Orders
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="">
                                <span data-feather="file"></span>
                                Orders
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default SideNav;