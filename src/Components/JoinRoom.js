import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import firebase, { db, auth } from '../Config/Firebase';

import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Hidden from "@material-ui/core/Hidden";

const roomRef = db.collection('room')
const roomMemberRef = db.collection('roomMember')

const styles = theme => ({
    addRoom: {
        textAlign: 'right',
    },
    button: {
        width: 140,
    },
});

class JoinRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roomForm: false,
            roomId: '',
            roomAll: [],
            roomCheck: null,
            roomAllMemChecks: [],
            roomAllMemCheck: null,
        }
    }

    handleClickOpen = () => {
        this.queryRoomAll()
        this.checkUser()
        this.setState({ roomForm: true });
    };

    handleClose = () => {
        this.setState({ roomForm: false, roomAll: [] });
    };

    handleOnchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    queryRoomAll = () => {
        var roomAll = []
        var self = this
        roomRef
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    roomAll.push({
                        roomId: doc.id
                    })
                    self.setState({
                        roomAll
                    }, () => {
                        console.log(roomAll)
                    })
                })
            })
    }

    checkUser = () => {
        var roomAllMemChecks = []
        var { user, roomName } = this.props
        var self = this
        var uid = user.uid

        roomMemberRef.where('userId', '==', uid)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    roomAllMemChecks.push({
                        roomId: doc.data().roomId
                    })
                    self.setState({
                        roomAllMemChecks
                    }, () => {
                        console.log(self.state.roomAllMemChecks)
                    })
                })
            })
    }

    checkRoom = () => {
        var { roomId, roomAll, roomAllMemCheck, roomAllMemChecks } = this.state
        var { user } = this.props
        var self = this
        var roomAllFilter = roomAll.find(value => value.roomId === roomId)
        var roomFilter = roomAllMemChecks.find(value => value.roomId === roomId)

        if (roomAllFilter) {
            if (roomFilter) {
                self.setState({
                    roomAllMemCheck: roomFilter.roomId,
                    roomCheck: roomAllFilter.roomId
                }, () => {
                    console.log(this.state.roomAllMemCheck)
                    this.joinRoom()
                })
            } else {
                self.setState({
                    roomCheck: roomAllFilter.roomId
                }, () => {
                    this.joinRoom()
                })
            }
        } else {
            this.joinRoom()
        }
    }


    joinRoom = () => {
        var { roomAll, roomId, roomCheck, roomAllMemCheck, } = this.state
        var { joinRoomMember, user } = this.props
        var self = this
        var uid = user.uid


        if (!roomId.trim()) {
            alert('กรุณากรอกชื่อ')
        } else if (roomId === roomCheck) {
            if (roomAllMemCheck) {
                alert('คุณอยู่ในห้องนี้แล้ว')
                self.setState({
                    roomAllMemCheck: null
                }, () => {
                    console.log(self.state.roomAllMemCheck)
                })
            }
            else {
                joinRoomMember(roomId)
                self.setState({ roomId: '', roomCheck: null })
            }
        } else {
            alert('ไม่มีห้องนี้ในระบบ')
            self.setState({ roomId: '' })
        }
    }

    render() {
        const { classes } = this.props
        const { roomForm, roomId } = this.state
        return (
            <div>
                <Hidden smUp implementation="css">
                    <Button fullWidth="false" variant="contained" color="secondary" onClick={this.handleClickOpen} >Join Room</Button>
                </Hidden>

                <Hidden xsDown implementation="css" className={classes.addRoom}>
                    <Button variant="contained" color="secondary" onClick={this.handleClickOpen} className={classes.button}>Join Room</Button>
                </Hidden>

                <Dialog
                    open={roomForm}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Join Room</DialogTitle>

                    <DialogContent>
                        {/* <DialogContentText>
                            Room Name
                        </DialogContentText> */}
                        <TextField
                            autoFocus
                            margin="dense"
                            id="joinRoom"
                            label="Room ID"
                            type="text"
                            name="roomId"
                            fullWidth
                            value={roomId}
                            onChange={this.handleOnchange}
                        />

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.checkRoom} color="primary">
                            Join Room
                        </Button>
                    </DialogActions>

                </Dialog>

            </div >
        )
    }
}
JoinRoom.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(JoinRoom);