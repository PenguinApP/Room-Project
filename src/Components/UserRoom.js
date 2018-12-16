import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import firebase, { db, auth } from '../Config/Firebase';
import update from 'immutability-helper';

import PicDummy from '../Picture/User-dummy-300x300.png'

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

import Typography from '@material-ui/core/Typography';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { BottomNavigationAction } from "@material-ui/core";


const drawerWidth = 260;

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

class UserRoom extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dialogOpen: false,
            drawerOpen: false,
            role: 'student',
            email: '',
            emailCheck: null,
        }
    }

    onOpenUserDrawer = () => {
        this.props.queryEmailUser()
        this.setState({
            drawerOpen: true,
        });
    }

    onCloseUserDrawer = () => {
        this.props.onClearEmail()
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

    checkMember = () => {
        var { email } = this.state
        var { emailAll } = this.props
        var self = this
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
        var { email, role, emailCheck } = this.state
        var { addRoomMember, roomName } = this.props
        var self = this
        var newMember = {
            email: email,
            userRole: role,
            roomId: roomName.roomId,
        }
        if (!email.trim()) {
            alert('กรุณากรอก email')
        } else if (email === emailCheck) {
            addRoomMember(newMember)
            self.setState({ email: '', role: 'student', emailCheck: null, })
        } else {
            alert('ไม่มี email นี้ในระบบ')
            self.setState({ email: '' })
        }
    }

    render() {
        const { classes, user, roomMember, roomUser, roomName } = this.props
        const { drawerOpen, dialogOpen, role, email } = this.state
        return (
            <span>
                <Button onClick={() => this.onOpenUserDrawer()} >
                    User
                </Button>

                <Drawer
                    className={classes.drawer}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    open={drawerOpen}
                    onClose={this.onCloseUserDrawer}
                    anchor="right"
                    variant="temporary"
                // variant="persistent"

                // onClose={this.toggleDrawer()}
                >
                    <div className={classes.drawerHeader}>
                        {/* <IconButton onClick={this.onCloseUserDrawer}>
                            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            <ChevronRightIcon />
                        </IconButton> */}
                        {roomName.roomRole === 'teacher' ?
                            <IconButton onClick={this.addUserDialogOpen} >
                                <AddIcon />
                            </IconButton>
                            :
                            null
                        }
                        <Typography variant="body2" gutterBottom>
                            รหัสห้อง : {roomName.roomId}
                        </Typography>
                    </div>

                    <Divider />

                    <div>
                        <List subheader={<ListSubheader>Teacher</ListSubheader>} className={classes.root}>
                            {roomMember.map((value) => {
                                return (
                                    <div>
                                        {value.roomRole === 'teacher' ?
                                            <ListItem
                                            // key={value.roomId}
                                            // button
                                            // onClick={() => this.handleTaskOpen(value, 'task')}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src={value.photoURL || PicDummy} />
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

                        < List subheader={<ListSubheader>Student</ListSubheader>} className={classes.root}>
                            {roomMember.map((value) => {
                                return (
                                    <div>
                                        {value.roomRole === 'student' ?
                                            <ListItem
                                            // key={value.roomId}
                                            // button
                                            // onClick={() => this.handleTaskOpen(value, 'task')}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src={value.photoURL || PicDummy} />
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

                </Drawer>

                <Dialog
                    open={dialogOpen}
                    onClose={this.addUserDialogClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add User</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                            value={email}
                            fullWidth
                        />

                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-simple">role</InputLabel>
                                <Select
                                    value={role}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'role',
                                        id: 'role-simple',
                                    }}
                                >
                                    <MenuItem value={'teacher'}>Teacher</MenuItem>
                                    <MenuItem value={'student'}>Student</MenuItem>
                                </Select>
                            </FormControl>
                        </form>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.addUserDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.checkMember} color="primary">
                            Add Member
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
