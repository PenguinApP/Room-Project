import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import firebase, { db, auth } from '../Config/Firebase';
import update from 'immutability-helper';

import Button from '@material-ui/core/Button';

import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import MenuItem from '@material-ui/core/MenuItem';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { BottomNavigationAction } from "@material-ui/core";


const drawerWidth = 240;

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
});

class UserRoom extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dialogOpen: false,
            drawerOpen: false,
            role: 'head',
            groupName: '',
        }
    }

    onOpenUserDrawer = () => {
        this.setState({
            drawerOpen: true,
        });
    }

    onCloseUserDrawer = () => {
        this.setState({
            drawerOpen: false,
        });
    }

    addUserDialogOpen = () => {
        this.setState({
            dialogOpen: true,
        })
    }

    addUserDialogClose = () => {
        this.setState({
            dialogOpen: false,
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    addGroup = () => {
        var { groupName, role } = this.state
        var { addGroup, roomName } = this.props
        var self = this

        var newGroup = {
            groupName: groupName,
            workRole: role,
            workId: roomName.workId,
        }
        if (!groupName.trim()) {
            alert('กรุณากรอกชื่อกลุ่ม')
        } else {
            addGroup(newGroup)
            self.setState({ groupName: '', role: 'head' })
        }
    }

    render() {
        const { classes, user, roomMember } = this.props
        const { drawerOpen, dialogOpen, role, email } = this.state
        return (
            <span>
                <Button onClick={() => this.onOpenUserDrawer()} >
                    Group
                </Button>

                <Drawer
                    className={classes.drawer}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    open={drawerOpen}
                    onClose={this.onCloseUserDrawer}
                    anchor="right"
                    variant="persistent"

                // onClose={this.toggleDrawer()}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.onCloseUserDrawer}>
                            {/* {theme.direction === 'rtl' ? <ChevronLeftIcon /> :  */}
                            <ChevronRightIcon />
                        </IconButton>
                        <IconButton onClick={this.addUserDialogOpen} >
                            <AddIcon />
                        </IconButton>
                    </div>

                    <Divider />

                    <div>
                        <List subheader={<ListSubheader>Group Name</ListSubheader>} className={classes.root}>
                            {/* {roomMember.map((value) => {
                                return (
                                    <div>
                                        {value.userRole === 'teacher' ?
                                            <ListItem
                                            // key={value.roomId}
                                            // button
                                            // onClick={() => this.handleTaskOpen(value, 'task')}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src={value.photoURL} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={value.displayName}
                                                />
                                            </ListItem>
                                            :
                                            null
                                        }
                                    </div>
                                )
                            }
                            )
                            } */}
                        </List>
                    </div>

                </Drawer>

                <Dialog
                    open={dialogOpen}
                    onClose={this.addUserDialogClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Group</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="groupName"
                            label="groupName"
                            type="name"
                            name="groupName"
                            onChange={this.handleChange}
                            value={email}
                            fullWidth
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.addUserDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.addGroup} color="primary">
                            Add Group
                        </Button>
                    </DialogActions>
                </Dialog>

            </span >
        )
    }
}

UserRoom.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserRoom);