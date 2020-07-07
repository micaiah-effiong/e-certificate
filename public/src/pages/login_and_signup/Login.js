import React, {Component}from 'react';
import './Login.css';


class Login extends Component {
    render(){
        return (
            <div>
                <div className="row">
                    <div className="col-md-4" style={{backgroundColor:'#5F07B1',height:'100vh'}}>
                        <div className="container">
                            <div className="side-bar">
                                <h2>Taking a step<br></br> to simplicity</h2>
                                <h1>Logo</h1>
                            </div>
                            
                        </div>


                    </div> 
                    <div className="col-md-8" style={{backgroundColor:'#9b51e0'}}>
                        <div className="container">
                            <div className="card">
                                <h4>Login</h4>

                                <form method="#" >
                                    <label>Email</label>
                                    <input type="email"/>
                                    <label>Password</label>
                                    <input type="password"/>
                                    <div className="checkbox-div">
                                        <input   type="checkbox" name="remember me" /> 
                                    </div>
                                    
                                    <br></br>
                                    <div style={{textAlign:'center'}}>
                                        <button className="login-btn" type="submit">Login</button>
                                        <p>Or</p>
                                        <button className="google-btn" type="submit">Login With Google</button>
                                        
                                    </div>
                            
                                    

                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Login;