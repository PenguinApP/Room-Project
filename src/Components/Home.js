import React, { Component } from 'react';
//Grid
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import './Home.css'
import Login from './Login'

//Appbar
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

//Carousel
import { Carousel } from 'antd';
//Paper 
import Paper from '@material-ui/core/Paper';

//รูป

import School from '../Picture/school.png'
import bookshelf from '../Picture/bookshelf.png'
import student from '../Picture/student.png'
import professor from '../Picture/professor.png'


const styles = theme => ({
  root: {
    flexGrow: 1,


  },
  grow: {
    flexGrow: 1,

  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  button: {
    margin: theme.spacing.unit,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  home: {
    width: '80%',
    margin: 'auto',
  },
  login: {
    textAlign: 'right',
  },
  AppBar: {
    backgroundColor: '#009688',
  }
});




class Home extends Component {

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

    const { classes } = this.props;


    return (

      <div >

        <div >
          <Row>
            <AppBar className={classes.AppBar}>
              <Toolbar>
                <Col span={18} pull={8}  >
                  <Typography variant="h6" color="inherit" className={classes.grow}>
                    Room
          </Typography>
                </Col>

                {/* <Col span={3} pull={4}>
                    <Button variant="outlined" color="inherit" href="#outlined-buttons" className={classes.button}>
                      Home
      </Button>
                  </Col>

                  <Col span={3} pull={4}>
                    <Button variant="outlined" color="inherit" href="#outlined-buttons" className={classes.button}>
                      About
      </Button>
                  </Col>
               */}


                <Col span={6} push={1}   >
                  <table width="100%">
                    <Button onClick={() => this.handleClickOpen()} variant="contained" color="secondary" className={classes.button}>Login</Button>
                  </table>
                </Col>
              </Toolbar>

            </AppBar>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
              fullWidth='true'
            >
              <DialogTitle id="form-dialog-title">Login</DialogTitle>

              <Login
                onSetUser={this.onSetUser}
              />

            </Dialog>
          </Row>

        </div>
        <br /><br /><br /><br /><br />

        <div className={classes.home}>
          <Carousel autoplay>
            <div> <img src={School}/></div> 
            <div> <img src={bookshelf} /></div>
            <div> <img src={student} /></div>
            <div> <img src={professor} /></div>
          </Carousel>
          <br /><br />
          <Paper className={classes.paper} elevation={1} >
            <Typography variant="h5" component="h3">
              About
        </Typography>
            <Typography component="p">
            Web Application สร้างขึ้นเพื่อให้อาจารย์และนักเรียนได้ทดลองใช้ระบบ Room <br/>
                  Web Application นี้เป็น Version ทดสอบเท่านั้น 
        </Typography>
          </Paper>
        </div>


      </div>


    )
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);