import React,{Component} from 'react';
import Login from './Login';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import './Login';
import './Login.css';
import './Register.css';


class Register extends Component {
    constructor() {
        super();
    
    
        
        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.conPasswordRef = React.createRef();
    
        this.state = {
            firstName:'',
            lastName:'',
            password:'',
            email:'',
            firstNameError:'',
            lastNameError:'',
            confirmPasswordError:'',
            emailError: '',
            passwordError: ''
        };
      }
    
      validate = ()=>{
        let firstNameError ='';
        let lastNameError='';
        let emailError ='';
        let passwordError = '';
        
        // run checks here
        console.log(this.firstNameRef.current.value)
    
        if (this.firstNameRef.current.value === ""){
          firstNameError = "first name cannot be blank"
        }
        if (this.lastNameRef.current.value === ""){
          lastNameError = "last name cannot be blank"
        }
        if (this.emailRef.current.value===""){
          emailError = "email cannot be blank"
        } 
        if (this.passwordRef.current.value === ""){
            passwordError = "please input a password"
        }
        if(firstNameError || lastNameError || emailError || passwordError){
          // updating the errors
          this.setState({firstNameError,lastNameError,emailError,passwordError})
          return false;
        }
        return true;
      }
    
      handleChange = (event)=>{
        
       this.setState(
           {
               firstNameError:'',
               lastNameError:'',
               emailError:'',
               passwordError:''
           }
       )
      }
    
        
      handleSubmit =(event)=>{
          event.preventDefault();
          const isValid = this.validate();
    
          if(isValid){ 
         console.log(this.setState({
          firstName:this.firstNameRef.current.value,
          lastName:this.lastNameRef.current.value,
          password:this.passwordRef.current.value,
          email :this.emailRef.current.value
        }))
          
            // clear form 
            // this.setState(initialState)
    
          }
    
          
    
      }
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
                        <Link to="/" className="fa fa-arrow-left back-home-link"> Back to Home</Link>
                            <div className="card card-two">
                                <h4>Sign Up</h4>

                                <form method="#" onSubmit={this.handleSubmit} >
                                    <label htmlFor="email">First Name</label>
                                    <input onChange={this.handleChange}
                                    ref={this.firstNameRef}
                                     type="text"/>
                                     <div className="error-msg">{this.state.firstNameError}</div>

                                    <label htmlFor="password">Last Name</label>
                                    <input onChange={this.handleChange}
                                    ref={this.lastNameRef}
                                     type="text"/>
                                     <div className="error-msg">{this.state.lastNameError}</div>


                                    <label htmlFor="password">Other Names</label>
                                    <input onChange={this.handleChange} 
                                    type="text"/>

                                    <label htmlFor="password">Email</label>
                                    <input onChange={this.handleChange}
                                    ref={this.emailRef}
                                    type="email"/>
                                    <div className="error-msg">{this.state.emailError}</div>

                                    <label htmlFor="password">Password</label>
                                    <input onChange={this.handleChange}
                                    ref={this.passwordRef}
                                    type="password"/>
                                     <div className="error-msg">{this.state.passwordError}</div>
                                    
                                    
                                    <br></br>
                                    <div style={{textAlign:'center'}}>
                                        <button className="register-btn" type="submit">Register</button>
                                        
                                    </div>
                            
                                    

                                </form>
                                <p className="foot-register-link" style={{color:'#9B51E0',fontSize:'.8rem'}}>Already have an account?<Link to="/login">Login here</Link></p>

                            </div>

                            

                        </div>
                    </div>
                </div>

                <Router>
                    <Switch>
                    <Route path="/login" exact component={Login}/>
                    </Switch>
                </Router>

            </div>
        )
    }
}

export default Register