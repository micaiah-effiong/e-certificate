import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import './Header.css';



class Header extends Component{
    render(){
        return(
            <div>

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                    <form className="form-inline my-2 my-lg-0">
                        <Link to="/register">
                            <button className="btn nav-btn  my-2 my-sm-0 mr-2" type="submit">Sign Up</button>
                        </Link>
                        <Link to="/login">
                            <button className="btn nav-btn my-2 my-sm-0" type="submit">Login</button>
                        </Link>
                       
                        
                    </form>
                    </div>
                </nav>
                
            </div>
        )
    }
} 


export default Header;