import React from 'react';
import SideNav from './SideNav';
import './userprofile.css';
import ellipse from '../img/ellipse.svg';



const Userprofile =()=>{
    return (
        <div className="container-fluid">
            <SideNav/>
            <div className="main">

                <div className="dashboard-header" style={{backgroundColor:'#fff',overflow:'hidden'}}>
                    <p>User Profile</p>
                </div>
                 
               

                <div className="card">
                    <div className="avatar-section">
                        <img src={ellipse} alt="profile picture" />
                        <div className="avatar-btn-wrap">
                            <button className="fake-btn">Change Avatar</button>
                            {/* <input type="file" size="10" /> */}
                        </div>                       
                    </div>
                    <div className="vl"></div>
                    <div className="">
                        <form className="form-group">
                            <div className="row">

                                <div className="col-md-6">
                                    <label>First Name</label>
                                    <input type="text" className="form-control"/>
                                </div>
                                <div className="col-md-6">
                                <label>Last Name</label>
                                    <input type="text" className="form-control"/>
                                </div>
                            </div>
                            <div className="row">
                            <div className="col-md-6">
                                    <label>Other Names</label>
                                    <input type="text" className="form-control"/>
                                </div>
                                <div className="col-md-6">
                                <label>Email</label>
                                    <input type="email" className="form-control"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label>Location</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <button className="fake-btn" type="submit">Edit</button>
                                </div>
                            </div>
                        
                        </form>

                    </div>


                </div>

            </div>
        </div>
    )
}


export default Userprofile;