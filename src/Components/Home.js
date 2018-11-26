import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import './Home.css'


import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Login from './Login';

//Dialog Modal
import ButtonUI from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    textAlign: 'left',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  ButtonLogin: {

  }
};
class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  changePage = (Page) => {
    this.props.changePage(Page)
  }

  onSetUser = (user) => {
    this.props.onSetUser(user)
  }

  render() {

    let s2 = { textAlign: 'right' };
    let style = { height: '10px' };

    return (

      <div >
        <br />
        <Appbar className="ColorBar">
          <table width="100%">
            <tbody>
              <tr style={s2}>con
                <Button onClick={() => this.handleClickOpen()} className="ButtonLogin" style={s2}>Login</Button>
              </tr>
            </tbody>
          </table>
        </Appbar>

        <div className="sidebar">
          <div class="mui--text-dark-secondary mui--text-display3">ROOM</div>
        </div>

        <br />

        <div className="mui--bg-accent" style={style}></div>
        <div className="mui--bg-accent-dark" style={style}></div>
        <div className="mui--bg-accent-light" style={style}></div>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>

          <Login
            onSetUser={this.onSetUser}
          />

        </Dialog>

      </div>


    )
  }
}
Main.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Main);