import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Main from './Components/Main';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Page: 'Main',

    }
  }

  Page = () => {
 
  }
  render() {
    const { Page } = this.state
    return (
        
        <div className="App">
          <Main />
        </div>

    );
  }
}

export default App;
