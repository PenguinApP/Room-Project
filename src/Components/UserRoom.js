import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import firebase, { db, auth } from '../Config/Firebase';
import update from 'immutability-helper';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
import PersonAdd from '@material-ui/icons/PersonAdd';
import { BottomNavigationAction } from "@material-ui/core";

const roomMemberRef = db.collection('roomMember')
const userRef = db.collection('user')


const drawerWidth = 280;

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing.unit,
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
            roomMemCheck: null,
            roomMemAll: [],
            copied: false,
        }
    }

    componentDidMount() {
        const { roomName } = this.props
        var self = this
        roomMemberRef.where("roomId", "==", roomName.roomId)
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {
                    if (change.type === "added") {
                        // self.props.queryWork(roomName)
                    }

                    if (change.type === "modified") {
                        // self.props.queryWork(roomName)
                    }
                    if (change.type === "removed") {
                        // self.props.queryWork(roomName)
                    }
                });
            });
    }

    onOpenUserDrawer = () => {
        this.props.queryEmailUser()
        // this.checkUserOnRoom()
        this.setState({
            drawerOpen: true,
        });
    }

    // checkUserOnRoom = () => {
    //     var queryRoomMemAll = []
    //     var { roomMemAll } = this.state
    //     var { user, roomName } = this.props
    //     var self = this
    //     var uid = user.uid

    //     roomMemberRef.where('roomId', '==', roomName.roomId)
    //         .get()
    //         .then(function (querySnapshot) {
    //             querySnapshot.forEach(function (doc) {
    //                 const { userId } = doc.data()
    //                 console.log(userId)
    //                 userRef.doc(userId)
    //                     .get()
    //                     .then(function (doc2) {
    //                         queryRoomMemAll.push({
    //                             email: doc2.data().email
    //                         })

    //                         const updateroomMemAll = update(roomMemAll, { $push: queryRoomMemAll })

    //                         self.setState({
    //                             roomMemAll: updateroomMemAll
    //                         }, () => {
    //                             console.log(self.state.roomMemAll, 'checkUser')
    //                         })
    //                     })
    //             })
    //         })
    // }

    onCloseUserDrawer = () => {
        this.props.onClearEmail()
        this.setState({
            drawerOpen: false,
            roomMemAll: [],
            copied: false,
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

    checkUserAdd = () => {
        var { email, roomMemCheck, emailCheck } = this.state
        var { roomMember, emailAll } = this.props
        var self = this


        var roomMemFilter = roomMember.find(value => value.email === email)
        var emailFilter = emailAll.find(value => value.email === email)


        if (emailFilter) {
            self.setState({
                emailCheck: emailFilter.email
            }, () => {
                if (roomMemFilter) {
                    self.setState({
                        roomMemCheck: roomMemFilter.email
                    }, () => {
                        this.addMember()
                    })
                } else {
                    this.addMember()
                }
            })
        } else {
            this.addMember()
        }
    }

    addMember = () => {
        var { email, role, roomMemAll, emailCheck, roomMemCheck } = this.state
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
            if (roomMemCheck) {
                alert('สมาชิกนี้อยู่ในห้องแล้ว')
                self.setState({ roomMemCheck: null, email: '', role: 'student', emailCheck: null, })
            } else {
                addRoomMember(newMember)
                self.setState({ email: '', role: 'student', emailCheck: null, })
            }

        } else {
            alert('ไม่มี email นี้ในระบบ')
            self.setState({ email: '' })
        }
        console.log(roomMemCheck, emailCheck)
    }

    onCopy = () => {
        this.setState({ copied: true });
    };

    render() {
        const { classes, user, roomMember, roomUser, roomName } = this.props
        const { drawerOpen, dialogOpen, role, email } = this.state
        return (
            <span>
                <Button onClick={() => this.onOpenUserDrawer()} variant="contained" className={classes.button} >
                    สมาชิกในห้อง
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
                                <PersonAdd />
                            </IconButton>
                            :
                            null
                        }
                        <Typography variant="body2" gutterBottom>
                            รหัสห้อง : {roomName.roomId}
                        </Typography>

                        <CopyToClipboard onCopy={this.onCopy} text={roomName.roomId}>
                            {this.state.copied === false ?
                                <button style={{ color: 'red' }}>Copy ID</button> :
                                <button style={{ color: 'green' }}>Copy ID</button>
                            }
                        </CopyToClipboard>

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
                    <DialogTitle id="form-dialog-title">เพิ่มสมาชิก</DialogTitle>
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
                        <Button onClick={this.checkUserAdd} color="primary">
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
