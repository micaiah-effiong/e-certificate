import React, {Component} from 'react';
import SideNav from './SideNav';
import './userprofile.css';

class Dashboard extends Component {
    render(){
        return(
            <div className="continer-fluid">

                <SideNav/>
                <div className="main">
                    <div className="dashboard-header" style={{backgroundColor:'#fff',overflow:'hidden'}}>
                        <p>My Courses</p>
                    </div>
                </div>

            </div>
        )
    }
}

export default Dashboard;