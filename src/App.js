import React, { Component } from 'react';
import logo from './logo.svg';
import firebase, { db, auth } from './Config/Firebase';

import Main from './Components/Main';
import Home from './Components/Home';
import Login from './Components/Login';

import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'Home',
      user: null,
      isWaitingForUserResult: true,
    }
  }

  componentWillMount() {
    var self = this
    auth.onAuthStateChanged((user) => {
      if (user) { self.onSetUser(user) }
      self.setState({ isWaitingForUserResult: false }, () => {
        // console.log(this.state.isWaitingForUserResult)
      })
    })
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
    const { user, isWaitingForUserResult } = this.state
    return (
      isWaitingForUserResult === false ?
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
        :
        <div>
        </div>
    )
  }
}

export default App;
