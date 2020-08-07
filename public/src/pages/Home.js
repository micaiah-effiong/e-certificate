import React, {Component} from 'react';
import cert from '../img/cert.svg';
import './Home.css';
import brand1 from  '../img/br1.png';
import brand2 from  '../img/br5.png';
import {Link} from 'react-router-dom';


class Home extends Component {
    render(){
        return(
            <div className="section">
                <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                        <Link className="navbar-brand" to="/">Navbar</Link>
                    
                
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav m-auto mt-2 mt-lg-0">
                        <Link to="/">

                            <li className="nav-item nav-link active mr-2">
                            Register Course<span className="sr-only">(current)</span>
                            </li>
                        </Link>
                        <Link to="/">

                            <li className="nav-item nav-link mr-2">
                             Certificate
                            </li>
                        </Link>

                        <Link to="/about">              
                            <li className="nav-item nav-link mr-2">
                                About Us
                            </li>
                        </Link>
                    </ul>
                    <form className="form-inline nav-form my-2 my-lg-0">
                        <Link to="/register">
                            <button className="btn nav-btn  my-2 my-sm-0 mr-2" type="submit">Sign Up</button>
                        </Link>
                        <Link to="/login">
                            <button className="btn nav-btn my-2 my-sm-0" type="submit">Login</button>
                        </Link>
                       
                        
                    </form>
                    </div>
                </nav>
                <section className="land">

                    <div className="container">          
                        <div className="row banner">
                            <div className="col-md-6 col-sm-12">
                                <h1> Redefine <br></br>Your Certification <br></br> Experience</h1>
                                <p>Easiest way to get certified</p>
                                <div className="btn-wrapper">
                                    <button className="cta-btn">Get Your Certificate</button>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <img src={cert} className="banner-img img-fluid" width="500" alt="landing"/>                       
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
                                    <i className="fa fa-sign-in"></i>
                                    
                                    <h4>Register</h4>
                                    <p>Students sign up and register their courses and school</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="step">
                                    <i className="fa fa-university"></i>
                                    
                                    <h4>Complete Course</h4>
                                    <p>Complete and Verify course</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="step">
                                    <i className="fa fa-certificate"></i>
                                    
                                    <h4>Get Certified</h4>
                                    <p>Get certification in PDF to your mail or download</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <section>
                    <div className="container">
                      
                    </div>
                </section>
                <section className="section companies">
                    <div className="container">
                        <h2>Trusted By</h2>
                        <p>"The company is a priceless tool that helps us drive sales <br></br> and support through every step of the funnel"</p>
                        <div className="row">
                            <div className="col-md-4">
                                <img className="brand-image" src={brand1} alt="brand one"/>                        
                            </div>
                            <div className="col-md-4">
                                <img className="brand-image" src={brand2} alt="brand one"/>                        
                            </div>
                            <div className="col-md-4">
                                <img className="brand-image" src={brand1} alt="brand one"/>                        
                            </div>

                        </div>
                    </div>

                </section>


                <div className="footer">
           <div className="container">
               <div className="row">
                   <div className="col-md-4">
					<ul className="footer-nav">
						<p>About</p>
						<li><a href="https://foobar.com">Blog</a></li>
						<li><a href="https://foobar.com">Demo</a></li>
						<li><a href="https://foobar.com">Customers</a></li>
						<li><a href="https://foobar.com">Terms of service</a></li>
					</ul>
                   </div>
                   <div className="col-md-4">
				   		<p>Info</p>	
					<ul className="footer-nav">
						<li><a href="https://foobar.com">Jobs</a></li>
						<li><a href="https://foobar.com">Support</a></li>
						<li><a href="https://foobar.com">Contact</a></li>
						
					</ul>
                   </div>
                   <div className="col-md-4">

				   	<h3>Join Our Newsletter</h3>
					   <div className="footer-form">
					   	<input type="email"  placeholder="Email"/><button className="footer-btn">Subscribe</button>
					   </div>
                   </div>
               </div>
           </div>
        </div>

                
            </div>

        )
    }
}

export default Home;