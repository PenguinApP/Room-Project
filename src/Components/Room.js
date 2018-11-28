import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Work from './Work'
import Task from './Task'

import './Room.css'
import { runInThisContext } from "vm";

import TaskDelete from './Taskdelete'

const styles = {
    card: {
        width: 300,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        textAlign: 'left',
    },
    pos: {
        marginBottom: 12,
    },
};


class Room extends Component {

    constructor(props) {
        super(props)
        this.state = {
            roomName: [],
            anchorEl: null,
        }
    }


    handleWorkOpen = (value, page) => {
        this.setState({
            roomName: value,
        })

        this.props.pageChange(value, page)

        console.log(value, page)
    };

    handleMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    deleteRoom = (value) => {
        this.props.deleteRoom(value)

    }



    render() {
        const { room, classes, page } = this.props;
        const { roomName, mobileOpen, anchorEl } = this.state;

        // const bull = <span className={classes.bullet}>•</span>;


        return (
            < div class="frame" >
                {room.map((value) => {
                    return (
                        // <ListItem
                        //     key={value.id}
                        //     button
                        //     onClick={() => this.handleWorkOpen(value)}
                        // >
                        //     <ListItemText
                        //         primary={value.name}
                        //     />
                        // </ListItem>

                        <div class="card" >
                            <div class="container">

                                <div className="settingRoom">
                                    <IconButton
                                        aria-owns={anchorEl ? 'simple-menu' : null}
                                        aria-haspopup="true"
                                        color="inherit"
                                        onClick={this.handleMenuOpen}
                                        color="inherit"
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </div>

                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={() => this.deleteRoom(value)}>Edit</MenuItem>
                                    <MenuItem onClick={() => this.deleteRoom(value)}>Delete</MenuItem>

                                </Menu>

                                <h4><b>{value.name}</b></h4>
                                <h4><b>{value.subject}</b></h4>
                            </div>
                            <Button onClick={() => this.handleWorkOpen(value, 'work')} >
                                เข้าห้อง
                                    </Button>
                        </div>

                    )
                }
                )
                }
            </div >

        )

    }
}


Room.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Room);