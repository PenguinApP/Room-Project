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
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
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

class UserWork extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dialogGroupOpen: false,
            dialogUserOpen: false,
            drawerOpen: false,
            role: 'head',
            groupName: '',
            email: '',
            emailCheck: null,
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

    addGroupDialogOpen = () => {
        this.setState({
            dialogGroupOpen: true,
        })
    }

    addGroupDialogClose = () => {
        this.setState({
            dialogGroupOpen: false,
        })
    }

    addUserDialogOpen = () => {
        this.setState({
            dialogUserOpen: true,
        })
    }

    addUserDialogClose = () => {
        this.setState({
            dialogUserOpen: false,
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    addGroup = (value) => {
        var { groupName, role } = this.state
        var { addGroup, roomName, user } = this.props
        var self = this

        var newGroup = {
            name: groupName,
            role: role,
            workId: roomName.workId,
            userId: user.uid,
        }
        if (!groupName.trim()) {
            alert('กรุณากรอกชื่อกลุ่ม')
        } else {
            addGroup(newGroup, value)
            self.setState({
                groupName: '',
                dialogOpen: false,
            })
        }
    }

    checkMember = () => {
        var { email } = this.state
        var { roomMember } = this.props
        var self = this
        var emailAll = roomMember
        var emailAllFilter = emailAll.find(value => value.email === email)
        if (emailAllFilter) {
            self.setState({
                emailCheck: emailAllFilter.email
            }, () => {
                this.addMember()
            })
        } else {
            this.addMember()
        }
    }

    addMember = () => {
        var { email, emailCheck } = this.state
        var { addGroupMember, roomName } = this.props
        var self = this
        var newMember = {
            email: email,
            userRole: 'member',
            workGroupId: roomName.workGroupId,
        }
        if (!email.trim()) {
            alert('กรุณากรอก email')
        } else if (email === emailCheck) {
            addGroupMember(newMember)
            self.setState({ email: '' })
        } else {
            alert('ไม่มี email นี้ในระบบ')
            self.setState({ email: '' })
        }
    }

    render() {
        const { classes, user, workGroup, roomName, workMember } = this.props
        const { drawerOpen, dialogGroupOpen, dialogUserOpen, role, email, groupName } = this.state
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
                    {roomName.workGroup === 'no group' ?
                        <div>
                            <div className={classes.drawerHeader}>

                                < IconButton onClick={this.onCloseUserDrawer}>
                                    {/* {theme.direction === 'rtl' ? <ChevronLeftIcon /> :  */}
                                    <ChevronRightIcon />
                                </IconButton>
                                {roomName.roomRole === 'teacher' ?
                                    null
                                    :
                                    <IconButton onClick={this.addGroupDialogOpen} >
                                        <AddIcon />
                                    </IconButton>
                                }
                            </div>

                            <Divider />

                            <div>
                                <List subheader={<ListSubheader>Group</ListSubheader>} className={classes.root}>
                                    {workGroup.map((value) => {
                                        return (
                                            <div>
                                                <ListItem
                                                    key={value.groupId}
                                                    button
                                                // onClick={() => this.handleTaskOpen(value, 'task')}
                                                >
                                                    {/* <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src={value.photoURL} />
                                                </ListItemAvatar> */}
                                                    <ListItemText
                                                        primary={value.name}
                                                    />
                                                </ListItem>
                                            </div>
                                        )
                                    }
                                    )
                                    }
                                </List>
                            </div>
                        </div>

                        :

                        <div>
                            <div className={classes.drawerHeader}>
                                <IconButton onClick={this.onCloseUserDrawer}>
                                    {/* {theme.direction === 'rtl' ? <ChevronLeftIcon /> :  */}
                                    <ChevronRightIcon />
                                </IconButton>
                                {roomName.workRole === 'head' ?
                                    <IconButton onClick={this.addUserDialogOpen} >
                                        <AddIcon />
                                    </IconButton>
                                    :
                                    null
                                }
                            </div>

                            <Divider />

                            <div>
                                <List subheader={<ListSubheader>Head</ListSubheader>} className={classes.root}>
                                    {workMember.map((value) => {
                                        return (
                                            <div>
                                                {value.workRole === 'head' ?
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
                                    }
                                </List>

                                < List subheader={<ListSubheader>Member</ListSubheader>} className={classes.root}>
                                    {workMember.map((value) => {
                                        return (
                                            <div>
                                                {value.workRole === 'member' ?
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
                                    }
                                </List>
                            </div>


                        </div>
                    }
                </Drawer>

                <Dialog
                    open={dialogGroupOpen}
                    onClose={this.addGroupDialogClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Group</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="groupName"
                            label="Group Name"
                            type="name"
                            name="groupName"
                            onChange={this.handleChange}
                            value={groupName}
                            fullWidth
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.addGroupDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.addGroup(roomName)} color="primary">
                            Add Group
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={dialogUserOpen}
                    onClose={this.addUserDialogClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add User</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="email"
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                            value={email}
                            fullWidth
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.addUserDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={this.checkMember} color="primary">
                            Add User
                        </Button>
                    </DialogActions>
                </Dialog>

            </span >
        )
    }
}

UserWork.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserWork);