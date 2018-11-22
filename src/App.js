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


  changePage = (page) => {
    this.setState({
      page: page
    })
  }

  onSetUser = (user) => {
    this.setState({ user: user }, () => {
      console.log(user)
    })
  }

  onsetUserNull = (page) => {
    this.setState({
      user: null,
      page: page
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
              onSetUser={this.onSetUser}
            />

          </div>
        );
    }
  }


  render() {
    const { user } = this.state
    return (
      user ?
        <div>
          <Main
            user={this.state.user}
            onsetUserNull={this.onsetUserNull}
          />
        </div>
        :

        <div>
          {this.renderPage()}
        </div>
    )
  }
}

export default App;
