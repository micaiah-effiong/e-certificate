import React from 'react';
import './sidenav.css'


const SideNav = ()=>{
    return (
        <div className="container-fluid">
           <div className="sidenav">
                <h2>Welcome</h2>
                <a href="http://wpdemo">Courses</a>
                <a href="http://wpdemo">Get Certificate</a>
                <a href="http://wpdemo">Account</a>
                <a href="http://wpdemo">Support</a>
                <a href="http://wpdemo">Contact</a>
            </div>
            
            <div className="menu">
                <input type="checkbox" id="check" />
                <label htmlFor="check" className="button">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <nav>
                    <a href="http://wpdemo">Element 1</a>
                    <a href="http://wpdemo">Element 2</a>
                    <a href="http://wpdemo">Element 3</a>
                </nav>
            </div>	


           
        </div>
    )
}

export default SideNav;