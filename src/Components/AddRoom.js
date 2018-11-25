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
});

class AddRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roomForm: false,
            roomName: '',
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
        const { classes } = this.props
        const { roomForm, roomName } = this.state
        return (
            <div>
                <Hidden smUp implementation="css">
                    <Button fullWidth="false" variant="contained" color="secondary" onClick={this.handleClickOpen} >Create Room</Button>
                </Hidden>

                <Hidden xsDown implementation="css" className={classes.addRoom}>
                    <Button variant="contained" color="secondary" onClick={this.handleClickOpen} >Create Room</Button>
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
AddRoom.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AddRoom);