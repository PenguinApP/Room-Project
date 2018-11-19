import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Main from './Components/Main';
import Home from './Components/Home';
import Login from './Components/Login';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'Home',
      user: null,

    }
  }

  changePage = (Page) => {
    this.setState({
      page: Page
    })
  }

  onSetUser = (user) => {
    this.setState({ user: user }, () => {
    })
  }


  renderPage = () => {
    const { page } = this.state

    switch (page) {
      case 'Home':
        return (
          <div className="App">

            <Home
              changePage={this.changePage}
            />

          </div>
        );
      case 'Login':
        return (
          <div>

            <Login
              onSetUser={this.onSetUser}
            />

          </div>
        );

    }
  }

  render() {
    const { user } = this.state
    return (

      // user ?

        <div>
          <Main />
        </div>
        // :

        // <div>
        //   {this.renderPage()}
        // </div>
    )


  }
}

export default App;
