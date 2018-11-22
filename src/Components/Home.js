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
};
class Main extends Component {


  changePage = (Page) => {
    this.props.changePage(Page)
  }

  render() {
    
    let s2 = {textAlign: 'right'};
    return (
      <div >
         <Appbar className = "ColorBar">
       <table width="100%">
         <tbody>
           <tr style={s2}>

             <Button onClick={() => this.changePage('Login')} className="ButtonLogin" style={s2}>Login</Button>
           </tr>
         </tbody>
       </table>
      </Appbar>


        <div className="sidebar">
  <div class="mui--text-dark-secondary mui--text-display3">ROOM</div>
</div>
<div id="content" class="mui-container-fluid">
 
</div>
      </div>
    )
  }
}
Main.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Main);