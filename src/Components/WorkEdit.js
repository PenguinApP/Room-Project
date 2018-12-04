import React, { Component } from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class workEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
        

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
        const { item, classes, openEdit, openDelete, anchorEl, editRoomOpen, editRoomClose, deleteRoomOpen, deleteRoomClose, deleteRoom, handleClose } = this.props
        return (
            <div>
                <Dialog
                    open={openEdit}
                    onClose={editRoomClose}
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
                        <Button onClick={editRoomClose} color="primary">
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
export default workEdit;