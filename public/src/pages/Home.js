import React, {Component} from 'react';
import cert from '../img/cert.svg';
import './Home.css';


class Home extends Component {
    render(){
        return(
            <div className="container">
            
                <div className="row banner">
                    <div className="col-md-6 col-sm-12">
                        <h1> Redefine <br></br>Your Certification <br></br> Experience</h1>
                        <p>Easiest way to get certified</p>
                        <button>Get Your Certificate</button>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <img src={cert} className="img-fluid" alt="landing image"/>                       
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Home;