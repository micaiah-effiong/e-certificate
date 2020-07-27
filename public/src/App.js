import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/login_and_signup/Login';

import Register from './pages/login_and_signup/Register';
// import Dashboard from './components/Dashboard';



function App() {
  return (
    <Router>

      <div className="App">

      
        <Header/>
        <Switch>
          <Route path="/" exact component={Home}/>
            <Route path="/about"  component={About}/> 
            <Route path="/register" component={Register}/> 
            <Route path="/login" component={Login}/> 
        </Switch>
        

        <Footer/>
      </div>
    </Router>
  );
}

export default App;
