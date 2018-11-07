import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


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
class Main extends Component{

    

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Room
          </Typography>
          <Button color="inherit" >Login</Button>
        </Toolbar>
      </AppBar>
    </div>
        )
    }
}
Main.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(Main);