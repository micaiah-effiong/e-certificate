import React,{Component} from 'react';
import './Header.css';



class Header extends Component{
    render(){
        return(
            <div>

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <a  className="navbar-brand" href="htttp://foobar.com">Navbar</a>
                
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav m-auto mt-2 mt-lg-0">
                        <li className="nav-item active mr-2">
                        <a  className="nav-link" href="htttp://foobar.com">Register Course<span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item mr-2">
                        <a  className="nav-link" href="htttp://foobar.com">Certificate</a>
                        </li>
                        <li className="nav-item mr-2">
                        <a  className="nav-link" href="htttp://foobar.com">About Us</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <button className="btn nav-btn  my-2 my-sm-0 mr-2" type="submit">Sign Up</button>
                        <button className="btn nav-btn my-2 my-sm-0" type="submit">Login</button>
                    </form>
                    </div>
                </nav>
            </div>
        )
    }
} 


export default Header;