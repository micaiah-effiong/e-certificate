import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login_and_signup/Login';
import Register from './pages/login_and_signup/Register';
// import Dashboard from './components/Dashboard';


const Host =()=>{
    return(
        
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                {/* <Route path="/dashboard" exact component={Dashboard}/> */}
            </Switch>
        
    )
}


export default Host;