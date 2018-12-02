import React, { Component } from 'react';
import firebase, { db, auth, provider, provider2 } from '../Config/Firebase';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Register from './Register';
import Reset from './Reset';
import './Login.css';

// import logo from '../Picture/Ling logo.png'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';

const userRef = db.collection('user')

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

class Login extends Component {

    // static async getInitialProps() {
    //     return console.log('get init!')
    //     // auth.onAuthStateChanged((user) => {
    //     //     if (user) {
    //     //         this.setState({ user });
    //     //         console.log(user)
    //     //     }
    //     // });
    // }

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            email: '',
            password: '',
            page: 'login',
        }

    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    loginEmail = (e) => {
        e.preventDefault();
        var email = this.state.email
        var password = this.state.password
        firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
            // console.log(email);
            // console.log(password);
            var user = result.user;
            this.props.onSetUser(user)
        }).catch((error) => {
            alert("Username or Password incorrect")
            console.log(error);
        });
    }

    // loginFacebook = () => {
    //     var that = this;
    //     auth.signInWithPopup(provider).then(function (result) {
    //         var user = result.user;
    //         console.log(user);
    //         that.setState({ user: user });
    //         that.props.onSetUser(user)
    //     }).catch(function (error) {

    //     });
    // }

    loginGoogle = () => {
        var that = this;
        auth.signInWithPopup(provider2).then(function (result) {
            var user = result.user;

            var users = {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            }

            userRef.doc(user.uid).set(users)

            that.setState({
                user: user
            });
            that.props.onSetUser(user)

        }).catch(function (error) {
        });

    }


    changePage = (pageChange, pagelogin) => {
        this.setState({
            page: pageChange || pagelogin
        })
        console.log(pageChange, 'Page')
    }


    render() {
        const { classes } = this.props;
        switch (this.state.page) {
            case 'login':
                return (
                    //loading container wrapper LoginFont
                    <div>
                        <div class="loginpage"></div>
                        <div className=" loading container wrapper LoginFont">
                            <p className="logo">
                                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                                <br /> Room </p>
                            <div className="inputLogin">
                                <FormControl component="fieldset">
                                    <FormGroup>
                                        <Grid container spacing={8} alignItems="flex-end">
                                            <Grid item>
                                                <AccountCircle />
                                            </Grid>
                                            <Grid item>
                                                <TextField value={this.state.email} onChange={this.handleChange} name="email" type="email" label="อีเมล" />
                                            </Grid>
                                        </Grid>
                                    </FormGroup>
                                    <FormGroup>
                                        <Grid container spacing={8} alignItems="flex-end">
                                            <Grid item>
                                                <Lock />
                                            </Grid>
                                            <Grid item>
                                                <TextField value={this.state.password} onChange={this.handleChange} name="password" type="password" label="ป้อนรหัสผ่าน" />
                                            </Grid>
                                        </Grid>
                                    </FormGroup>
                                </FormControl>
                            </div>
                            <br />
                            <div className="LoginButton">
                                <button type="submit" onClick={this.loginEmail} className="loginBtn loginBtn--L">&nbsp;Log In with email</button>
                                <br />
                                <p className='Or'> or </p>

                                {/* <button className="loginBtn loginBtn--facebook" onClick={this.loginFacebook}>Log In with Facebook</button> */}
                                <button className="loginBtn loginBtn--google" onClick={this.loginGoogle}>Log In with Google</button><br />
                            </div>
                            <br />
                            <div className="regisBtn">
                                <Button onClick={() => this.changePage('register')} className={classes.button}>สมัครสมาชิก</Button>
                                <Button onClick={() => this.changePage('reset')} className={classes.button}>ลืมรหัสผ่าน</Button>
                            </div>
                            <br /> <br />
                        </div>
                    </div >
                )
            case 'register':
                return (
                    <Register
                        changePage={this.changePage}
                    />
                )
            case 'reset':
                return (
                    <Reset
                        changePage={this.changePage}
                    />
                )
            default: return null
        }
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);