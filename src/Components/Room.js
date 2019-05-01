import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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

import BoardPic from '../Picture/board.jpg'
import './Room.css'
import { runInThisContext } from "vm";

import TaskDelete from './Taskdelete'

const theme = createMuiTheme({
    palette: {
        primary: {
            // light: '#757ce8',
            main: '#FAFAFA',
            // dark: '#002884',
            // contrastText: '#fff',
        },
    },
});

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

    editRoomOpen = () => {
        this.setState({
            openEdit: true,
            anchorEl: null,
        });
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

        return (
            <div class="row2">

                {room.map((value) => {
                    return (
                        <div class="column">
                            <div class="col s12 m7">
                                <div class="card">
                                    <div class="card-image">
                                        <img src={BoardPic} />
                                        <span class="card-title">
                                            {value.name}
                                        </span>
                                        <span class="settingRoom">
                                            {value.roomRole === 'teacher' ?
                                                <MuiThemeProvider theme={theme}>
                                                    <IconButton
                                                        aria-owns={anchorEl ? 'simple-menu' : null}
                                                        aria-haspopup="true"
                                                        color="primary"
                                                        onClick={(event) => this.handleMenuOpen(event, value)}
                                                    >

                                                        <MoreVertIcon />
                                                    </IconButton>
                                                </MuiThemeProvider>
                                                :
                                                <div></div>

                                            }
                                        </span>

                                    </div>
                                    <div class="card-content">
                                        <p>{value.subject}</p>
                                    </div>
                                    <div class="card-action">
                                        <Button color='secondary' onClick={() => this.handleWorkPageOpen(value, 'work')} >
                                            เข้าห้อง
                                    </Button>
                                    </div>
                                </div>
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