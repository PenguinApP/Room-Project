import React, { Component } from 'react';
import firebase, { auth } from '../Config/Firebase';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// import logo from '../Picture/Ling logo.png';
// import './Login.css'

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Lock from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';

const userRef = db.collection('user')

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.registerU = this.registerU.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    registerU(e) {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {

            alert('Register Complete');
        }).catch((error) => {
            alert('username ที่ใส่ไม่ถูกต้อง หรือ ได้ถูกใช้ไปแล้ว')
            console.log(error);
        });

    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                var users = {
                    displayName: user.email,
                    email: user.email,
                    photoURL: user.photoURL,
                }
                userRef.doc(user.uid).set(users)
                this.setState({ user });
            }
        });
    }
    verifyEmail(e) {
        e.preventDefault();
        firebase.auth().currentUser.sendEmailVerification().then((u) => {
            alert("Please Check Your Mail");
        }).catch((error) => {
            console.log(error);
            alert("Error");
        });
    }



    render() {
        const { classes } = this.props;
        return (
            <div>
                <div class="loginpage"></div>
                <div className="loading container wrapper LoginFont">
                    <p class="logo">
                        {/* <img src={logo} className="App-logo" alt="logo" /> */}
                        <br /> สมัครสมาชิก </p>
                    <div class="inputLogin">
                        <FormControl component="fieldset">
                            <FormGroup>
                                <Grid container spacing={8} alignItems="flex-end">
                                    <Grid item>
                                        <AccountCircle />
                                    </Grid>
                                    <Grid item>
                                        <TextField value={this.state.email} onChange={this.handleChange} name="email" type="email" id="Email" label="อีเมล" aria-describedby="emailHelp" />
                                    </Grid>
                                </Grid>
                            </FormGroup>
                            <FormGroup>
                                <Grid container spacing={8} alignItems="flex-end">
                                    <Grid item>
                                        <Lock />
                                    </Grid>
                                    <Grid item>
                                        <TextField value={this.state.password} onChange={this.handleChange} name="password" type="password" id="Password" label="ป้อนรหัสผ่าน 6 ตัวขึ้นไป" />
                                    </Grid>
                                </Grid>
                            </FormGroup>
                        </FormControl>
                    </div>
                    <br />
                    <div class="LoginButton">
                        <button type="submit" onClick={this.registerU} class="loginBtn loginBtn--L">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ยืนยัน</button>
                        <br /><br /><br /><br /><br /><br /><br />
                        <Button onClick={() => this.props.changePage('login')} className={classes.button}>ย้อนกลับ</Button>
                    </div>
                    <br />
                </div>
            </div>
        )
    }
}


Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);