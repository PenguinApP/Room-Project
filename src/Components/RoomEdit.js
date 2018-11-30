import React, { Component } from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class RoomEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            itemEdit: [],
        }
    }

    handleEditSubmit = (id) => {

        var item = {
            name: document.getElementById("name").value,
            subject: document.getElementById("subject").value,
            roomId: id
        }

        this.props.editItem(item)

    }

    render() {
        const { item, classes, open, anchorEl } = this.props
        return (
            <div>
                <Menu
                    id={item.roomId}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.props.handleClose}
                >
                    <MenuItem onClick={() => this.props.editRoomOpen()}>Edit</MenuItem>

                    <MenuItem onClick={() => this.props.deleteRoom()}>Delete</MenuItem>

                </Menu>

                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >

                    <DialogTitle id="form-dialog-title">{"Edit"}</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Room name"
                            type="email"
                            fullWidth
                            defaultValue={item.name}
                        />
                        <TextField

                            margin="dense"
                            id="subject"
                            label="Subject"
                            type="email"
                            fullWidth
                            defaultValue={item.subject}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.editRoomClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={() => this.handleEditSubmit(item.roomId)} color="primary">
                            Submit
            </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }

}

export default RoomEdit;