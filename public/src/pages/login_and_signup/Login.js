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
                                    <input type="checkbox"/>Remember Me <br></br>
                                    <button  type="submit">LOG IN</button>
                                    <p>Or</p>
                                    <button type="submit">Login with Google</button>
                                    

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