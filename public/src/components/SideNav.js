import React from 'react';
import './sidenav.css';
import { Link } from 'react-router-dom';



const SideNav = ()=>{
    return (
        <div className="container-fluid">
           <div className="sidenav">
                <h2>Welcome</h2>
                <Link>Courses</Link>
                <Link to="/">Get Certificate</Link>
                <Link to="/">Account</Link>
                <Link to="/">Support</Link>
                <Link to="/">Contact</Link>
            </div>
            
            <div className="menu">
                <input type="checkbox" id="check" />
                <label for="check" class="button">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <div className="diff-nav">
                    <a href="#">Element 1</a>
                    <a href="#">Element 2</a>
                    <a href="#">Element 3</a>
                </div>
            </div>	


           
        </div>
    )
}

export default SideNav;