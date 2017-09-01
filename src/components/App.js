import React, { Component } from 'react';
import logo from '../logo.svg';

import './App.css';

import Articles from './Articles.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>WELCOME TO HACKER NEWS</h2>
        </div>


        
        <Articles />
        
      </div>
    );
  }
}

export default App;
