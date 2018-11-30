import React, { Component } from 'react';
import logo from './logo.svg';
import firebase, { db, auth } from './Config/Firebase';

import Main from './Components/Main';
import Home from './Components/Home';
import Login from './Components/Login';

import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const userRef = db.collection('user')

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

    var self = this
    // const queryUserRef = userRef.where('userId', '==', user.uid)
    // queryUserRef
    //   .get()
    //   .then(function (querySnapshot) {
    //     querySnapshot.forEach(function (doc) {
    //       if (doc.data().userId === user.uid) {
    //         // self.setState({
    //         //   user: user
    //         // });
    //         console.log(user, 'if');
    //       } else {
    // var users = {
    //   userId: user.uid,
    //   userName: user.displayName,
    //   email: user.email,
    // }
    // userRef.add(users)

    // self.setState({
    //   user: users
    // }, () => {
    //   console.log(users, 'else,', user);
    // });
    //     console.log(users, 'else,', user);
    //   }


    this.setState({ user: user }, () => {
      console.log(this.state.user)
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
