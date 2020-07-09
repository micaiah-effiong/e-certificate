import React,{Component} from 'react';
import './Login';
import './Register.css'


class Register extends Component {
    render(){
        return(
            <div>

<div className="row">
                    <div className="d-none col-lg-3 d-lg-block sidebar-wrap" >
                        <div className="container">
                            <div className="side-bar">
                                <h2>Taking a step<br></br> to simplicity</h2>
                                <h1>Logo</h1>
                            </div>
                            
                        </div>


                    </div> 
                    <div className="col-12 col-lg-9 col-sm-12 col-xs-12" style={{backgroundColor:'#9b51e0'}}>
                        <div className="container">
                        <a href="#" className="fa fa-arrow-left back-home-link"> Back to Home</a>
                            <div className="card card-two">
                                <h4>Sign Up</h4>

                                <form method="#" >
                                    <label htmlFor="email">First Name</label>
                                    <input type="text"/>
                                    <label htmlFor="password">Last Name</label>
                                    <input type="text"/>
                                    <label htmlFor="password">Other Names</label>
                                    <input type="text"/>
                                    <label htmlFor="password">Email</label>
                                    <input type="email"/>
                                    <label htmlFor="password">Password</label>
                                    <input type="password"/>
                                    
                                    
                                    <br></br>
                                    <div style={{textAlign:'center'}}>
                                        <button className="register-btn" type="submit">Register</button>
                                        
                                    </div>
                            
                                    

                                </form>
                                <p className="foot-register-link" style={{color:'#9B51E0',fontSize:'.8rem'}}>Already have an account?<a href="#"> Register here</a></p>

                            </div>

                            

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Register