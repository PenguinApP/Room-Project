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



import Work from './Work'
import Task from './Task'
import RoomEdit from './RoomEdit'

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
            openEdit: false,
            openDelete: false,
            roomName: '',
            subject: '',
            item: [],
        }
    }


    handleWorkOpen = (value, page) => {
        this.setState({
            roomName: value,
        })

        this.props.pageChange(value, page)

        console.log(value, page)
    };

    handleMenuOpen = (event, value) => {
        this.setState({
            anchorEl: event.currentTarget,
            item: value
        }, () => {
            console.log(this.state.anchorEl, this.state.item)
        });

    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    deleteRoom = (item) => {
        this.setState({
            openDelete: false
        })
        this.props.deleteRoom(item)
        console.log(item)
    }

    editItem = (item) => {
        this.setState({
            openEdit: false
        })
        this.props.editRoom(item)

        console.log(item)
    }


    editRoomOpen = (value) => {
        this.setState({
            openEdit: true,
            anchorEl: null,
        });
        console.log(value)
    }

    editRoomClose = () => {
        this.setState({
            openEdit: false
        })
    }

    deleteRoomOpen = (value) => {
        this.setState({
            openDelete: true,
            anchorEl: null,
        });
        console.log(value)
    }

    deleteRoomClose = () => {
        this.setState({
            openDelete: false
        })
    }




    render() {
        const { room, classes, page, fullScreen } = this.props;
        const { roomName, mobileOpen, anchorEl, item, openEdit, openDelete } = this.state;

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
                                        onClick={(event) => this.handleMenuOpen(event, value)}
                                        color="inherit"
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </div>


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
                <RoomEdit
                    item={item}
                    openEdit={openEdit}
                    openDelete={openDelete}
                    anchorEl={anchorEl}

                    editRoomOpen={this.editRoomOpen}
                    editRoomClose={this.editRoomClose}
                    deleteRoomOpen={this.deleteRoomOpen}
                    deleteRoomClose={this.deleteRoomClose}
                    handleClose={this.handleClose}
                    editItem={this.editItem}
                    deleteRoom={this.deleteRoom}
                />

            </div >

        )

    }
}


Room.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Room);