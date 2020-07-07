import React, {Component}from 'react';
import './Login.css';


class Login extends Component {
    render(){
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="container">
                            <div className="side-bar">
                                <h2>Taking a step<br></br> to simplicity</h2>
                                <h1>Logo</h1>
                            </div>
                            
                        </div>


                    </div> 
                    <div className="col-md-8">
                        <div className="container">
                            <div className="card">

                                <form method="#" className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" placeholder="Email" />
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder="Password" />
                                    <button type="submit">LOG IN</button>
                                    

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