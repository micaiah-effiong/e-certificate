import React from 'react';
import './Footer.css'

const Footer = () => {
    return(
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
    )
}

export default Footer;