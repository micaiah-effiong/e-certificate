import React, { Component } from "react";
import "./Login.css";
import {Link} from 'react-router-dom';


class Login extends Component {
  // validation
  constructor() {
    super();
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
    };
  }

  validate = (e) => {
    // run checks here
    let emailValue = e.target.elements.email.value;
    let passwordValue = e.target.elements.password.value;
    if (emailValue === "") {
      this.setState({
        emailError: "Email field is blank",
      });
    }
    if (passwordValue === "") {
      this.setState({
        passwordError: "Password field is blank",
      });
      return false;
    }
    return true;
  };

  handleChange = () => {
    // clear the form
    this.setState({
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate(event);
    if (isValid) {
      this.setState({
        email: event.target.elements.email.value,
        password: event.target.elements.password.value,
      });
    }
    console.log(this.state.email);
  };
  render() {
    return (
      <div>
        <div className="row">
          <div className="d-none col-lg-3 d-lg-block sidebar-wrap">
            <div className="container">
              <div className="side-bar">
                <h2>
                  Taking a step<br></br> to simplicity
                </h2>
                <h1>Logo</h1>
              </div>
            </div>
          </div>
          <div
            className="col-12 col-lg-9 col-sm-12 col-xs-12"
            style={{ backgroundColor: "#9b51e0" }}
          >
            <div className="container main-wrap">
              <Link to="/" className="fa fa-arrow-left back-home-link">
                {" "}
                Back to Home
              </Link>
              <div className="card">
                <h4>Login</h4>

                <form onSubmit={this.handleSubmit}>
                  <div className="error-msg">{this.state.emailError}</div>
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" onChange={this.handleChange} />

                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    onChange={this.handleChange}
                  />

                  <div className="error-msg">{this.state.passwordError}</div>
                  <div className="checkbox-div">
                    <input type="checkbox" name="remember me" />
                    Remember me
                  </div>

                  <br></br>
                  <div style={{ textAlign: "center" }}>
                    <button className="login-btn" type="submit">
                      Login
                    </button>
                    <p style={{ fontWeight: "bold", margin: "20px" }}>Or</p>
                    <button className="google-btn" type="submit">
                      Login With Google
                    </button>
                  </div>
                </form>
              </div>
              <p className="foot-register-link">
                Don't have an account?<Link to="/register">Register here</Link> 
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default Login;
