import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import DraftsIcon from '@material-ui/icons/Drafts';
import Button from "@material-ui/core/Button";


const drawerWidth = 1000;

const styles = theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },


    toolbar: theme.mixins.toolbar,

    drawerPaper: {
        width: drawerWidth
    },

    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
    Button: {
        textAlign: 'center'
    },

});

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedPage: 'room',
            roomForm: false,
            roomName: '',
        }
    }

    handleListItemClick = (event, page) => {
        this.setState({ selectedPage: page });
        this.props.handleListItemClick(page)
    };

    addRoom = () => {
        var { roomName } = this.state
        var { addRoom } = this.props
        var self = this
        if (!roomName.trim()) {
            alert('กรุณากรอกชื่องาน')
            self.setState({ roomName: '', })
        } else {
            addRoom(roomName)
            self.setState({ roomName: '', })
        }
    }

    render() {
        const { classes, theme } = this.props;
        const { selectedPage, roomForm, mobileOpen, roomName, room } = this.state;
        return (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <ListItem
                        button
                        selected={selectedPage === 'room'}
                        onClick={event => this.handleListItemClick(event, 'room')}
                    >
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Room" />
                    </ListItem>

                    <ListItem
                        button
                        selected={selectedPage === 'setting'}
                        onClick={event => this.handleListItemClick(event, 'setting')}
                    >
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="ตั้งค่า" />
                    </ListItem>
                </List>

                <Divider />

                <Dialog
                    open={roomForm}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >

                    <DialogTitle id="form-dialog-title">Create Room</DialogTitle>

                    <DialogContent>
                        {/* <DialogContentText>
                            Room Name
                        </DialogContentText> */}
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Room Name"
                            type="Room"
                            name="roomName"
                            fullWidth
                            value={roomName}
                            onChange={this.handleOnchange}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.addRoom} color="primary">
                            Create Room
                        </Button>
                    </DialogActions>

                </Dialog>
            </div>

        )
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
    container: PropTypes.object,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Navigation);
