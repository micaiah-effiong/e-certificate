import React from 'react';
import './sidenav.css'


const SideNav = ()=>{
    return (
        <div className="container-fluid">
           <div className="sidenav">
                <h2>Welcome</h2>
                <a href="#">Courses</a>
                <a href="#">Get Certificate</a>
                <a href="#">Account</a>
                <a href="#">Support</a>
                <a href="#">Contact</a>
            </div>
            
            <div className="menu">
                <input type="checkbox" id="check" />
                <label for="check" class="button">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <nav>
                    <a href="#">Element 1</a>
                    <a href="#">Element 2</a>
                    <a href="#">Element 3</a>
                </nav>
            </div>	


           
        </div>
    )
}

export default SideNav;