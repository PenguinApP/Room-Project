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
            anchorEl: null,
            openEdit: false,
            openDelete: false,
            subject: '',
            item: [],
        }
    }

    editItem = (item) => {
        this.setState({
            openEdit: false
        })
        this.props.editRoom(item)

        console.log(item)
    }

    deleteRoom = (id) => {
        this.setState({
            openDelete: false
        })
        this.props.queryDeleteRoom(id)
    }

    handleWorkPageOpen = (value, page) => {
        this.setState({
            roomName: value,
        })

        this.props.pageChange(value, page)
    };

    handleMenuOpen = (event, value) => {
        this.setState({
            anchorEl: event.currentTarget,
            item: value
        }, () => {
            console.log(this.state.item)
        });

    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

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

    deleteRoomOpen = () => {
        this.setState({
            openDelete: true,
            anchorEl: null,
        });
    }

    deleteRoomClose = () => {
        this.setState({
            openDelete: false
        })
    }

    render() {
        const { room, classes, page, fullScreen } = this.props;
        const { mobileOpen, anchorEl, item, openEdit, openDelete } = this.state;

        // const bull = <span className={classes.bullet}>•</span>;

        return (
            < div class="row" >

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

                        <div class="column">
                            <div class="card" >
                                <div class="container">

                                    <div className="settingRoom">
                                        {value.roomRole === 'teacher' ?

                                            <IconButton
                                                aria-owns={anchorEl ? 'simple-menu' : null}
                                                aria-haspopup="true"
                                                color="inherit"
                                                onClick={(event) => this.handleMenuOpen(event, value)}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            :
                                            <div>

                                            </div>
                                        }
                                    </div>


                                    <h4><b>{value.name}</b></h4>
                                    <h4><b>{value.subject}</b></h4>
                                </div>
                                <Button onClick={() => this.handleWorkPageOpen(value, 'work')} >
                                    เข้าห้อง
                            </Button>
                            </div>
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
                    handleMenuClose={this.handleMenuClose}
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