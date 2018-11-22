import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import DraftsIcon from '@material-ui/icons/Drafts';
import Button from "@material-ui/core/Button";

import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const drawerWidth = 240;

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
            selectedIndex: 0,
            roomForm: false,
            roomName: '',
        }
    }

    handleListItemClick = (event, index) => {
        this.setState({ selectedIndex: index });
        this.props.handleListItemClick(event, index)
    };

    handleClickOpen = () => {
        this.setState({ roomForm: true });
    };

    handleClose = () => {
        this.setState({ roomForm: false });
    };

    handleOnchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

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
        const { selectedIndex, roomForm, mobileOpen, roomName, room } = this.state;
        return (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>

                    <ListItem
                        button
                        selected={selectedIndex === 0}
                        onClick={event => this.handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Room" />
                    </ListItem>
                    
                    <ListItem
                        button
                        selected={selectedIndex === 1}
                        onClick={event => this.handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="ตั้งค่า" />
                    </ListItem>

                </List>
                <Divider />
                {selectedIndex === 0 ?
                    <div className={classes.Button}>
                        <Button variant="contained" color="secondary" onClick={this.handleClickOpen} >Create Room</Button>
                    </div>
                    :
                    null
                }

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
