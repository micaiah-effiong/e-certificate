import React, {Component} from 'react';
import cert from '../img/cert.svg';
import './Home.css';


class Home extends Component {
    render(){
        return(
            <div>
                <section>

                    <div className="container">          
                        <div className="row banner">
                            <div className="col-md-6 col-sm-12">
                                <h1> Redefine <br></br>Your Certification <br></br> Experience</h1>
                                <p>Easiest way to get certified</p>
                                <button className="cta-btn">Get Your Certificate</button>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <img src={cert} className="img-fluid" width="500" alt="landing"/>                       
                            </div>
                        </div>
                        
                    </div>

                </section>
                <section className="steps">
                    <div className="container">
                        <h2>How to Get Your Certificate</h2>
                        <div className="row cert-sect">
                            <div className="col-md-4">
                                <div className="step">
                                    <h1 className="fa fa-sign-in"></h1>
                                    
                                    <h4>Register</h4>
                                    <p>Students sign up and register their courses and school</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="step">
                                    <h1 className="fa fa-university"></h1>
                                    
                                    <h4>Complete Course</h4>
                                    <p>Complete and Verify course</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="step">
                                    <h1 className="fa fa-certificate"></h1>
                                    
                                    <h4>Get Certified</h4>
                                    <p>Get certification in PDF to your mail or download</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <section>
                    <div className="container">
                        <div className="col">

                        </div>
                    </div>
                </section>

                
            </div>

        )
    }
}

export default Home;