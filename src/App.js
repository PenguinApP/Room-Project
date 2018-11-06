import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import Main from './Components/Main'
import SemiMain from './Components/semiMain';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SemiMain/>
      </div>
    );
  }
}

export default App;
