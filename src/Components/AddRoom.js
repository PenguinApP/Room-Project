import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Hidden from "@material-ui/core/Hidden";

const styles = theme => ({
    addRoom: {
        textAlign: 'right',
    },
    button: {
        width: 130,
    },
});

class AddRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roomForm: false,
            roomName: '',
            subject: '',
        }
    }

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
        var { roomName, subject } = this.state
        var { addRoom } = this.props
        var self = this

        var Room = {
            name: roomName,
            subject: subject,
        }
        if (!roomName.trim()) {
            alert('กรุณากรอกชื่อห้อง')
            self.setState({ roomName: '', subject: '' })
        } else {
            addRoom(Room)
            self.setState({ roomName: '', subject: '', roomForm: false })
        }
    }

    render() {
        const { classes } = this.props
        const { roomForm, roomName, subject } = this.state
        return (
            <div>
                <Hidden smUp implementation="css">
                    <Button fullWidth="false" variant="contained" color="secondary" onClick={this.handleClickOpen} >Create Room</Button>
                </Hidden>

                <Hidden xsDown implementation="css" className={classes.addRoom}>
                    <Button variant="contained" color="secondary" onClick={this.handleClickOpen} className={classes.button}>Create Room</Button>
                </Hidden>

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
                            id="room"
                            label="ชื่อห้อง"
                            type="text"
                            name="roomName"
                            fullWidth
                            value={roomName}
                            onChange={this.handleOnchange}
                        />
                        <TextField
                            margin="dense"
                            id="subject"
                            label="ชื่อวิชา"
                            type="text"
                            name="subject"
                            fullWidth
                            value={subject}
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
AddRoom.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AddRoom);