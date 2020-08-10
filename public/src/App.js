import React from 'react';
import './App.css';
import Host from './Host';
import {BrowserRouter as Router} from 'react-router-dom';




function App() {
  return (
    <Router>
      <div className="App">     
     
            <Host />
      </div>
    </Router>
  );
}

export default App;
