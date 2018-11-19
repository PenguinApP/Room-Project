import React, { Component } from 'react';
import firebase from '../Config/Firebase';

// import logo from '../Picture/Ling logo.png';
// import './Login.css'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.resetPass = this.resetPass.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    resetPass(e) {
        e.preventDefault();
        firebase.auth().sendPasswordResetEmail(this.state.email).then((u) => {
            alert('Password Reset Email Sent!');
        }).catch((error) => {
            console.log(error);
            alert('อีเมลที่ใส่ไม่ถูกต้อง')
        });
    }

    render() {

        return (
            <div>
                <div class="loginpage"></div>
                <div className="loading container wrapper LoginFont">
                    <p className="logo">
                        {/* <img src={logo} className="App-logo" alt="logo" /> */}
                        <br /> กรอก Email ที่สมัคร
                    </p>
                    <div className="inputLogin">
                        <FormControl component="fieldset">
                            <FormGroup>
                                <Grid container spacing={8} alignItems="flex-end">
                                    <Grid item>
                                        <AccountCircle />
                                    </Grid>
                                    <Grid item>
                                        <TextField value={this.state.email} onChange={this.handleChange} name="email" type="email" id="exampleInputEmail" label="อีเมล" />
                                    </Grid>
                                </Grid>
                            </FormGroup>
                        </FormControl>
                    </div>
                    <br /><br /><br />
                    <div className="LoginButton">
                        <button type="submit" onClick={this.resetPass} className="loginBtn loginBtn--L">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ยืนยัน</button>
                        <br /><br /><br /><br /><br /><br /><br />
                        <Button onClick={() => this.props.changePage('login')}>ย้อนกลับ</Button>
                    </div><br />
                </div >
            </div>
        )
    }



}

Reset.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Reset);