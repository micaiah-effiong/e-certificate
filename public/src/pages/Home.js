import React, {Component} from 'react';
import cert from '../img/cert.svg';
import './Home.css';


class Home extends Component {
    render(){
        return(
            <div className="container">
            
                <div className="row">
                    <div className="col-sm-12 order-2 "> <img src={cert} className="img-fluid" alt="landing image"/></div>
                    <div className="col-md-12 order-1">
                        APPLY HERE
                       
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Home;