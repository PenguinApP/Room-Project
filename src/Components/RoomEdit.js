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

        var roomUpdate = {
            name: document.getElementById("name").value,
            subject: document.getElementById("subject").value,
            roomRole: 'teacher',
            roomId: id
        }

        this.props.editItem(roomUpdate)

    }

    render() {
        const { item, classes, openEdit, openDelete, anchorEl, editRoomOpen, editRoomClose, deleteRoomOpen, deleteRoomClose, deleteRoom, handleMenuClose } = this.props
        return (
            <div>
                <Menu
                    id={item.roomId}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => editRoomOpen()}>แก้ไข</MenuItem>

                    <MenuItem onClick={() => deleteRoomOpen()}>ลบ</MenuItem>

                </Menu>

                <Dialog
                    open={openEdit}
                    onClose={editRoomClose}
                    aria-labelledby="form-dialog-title"
                >

                    <DialogTitle id="form-dialog-title">{"แก้ไข"}</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="ชื่อห้อง"
                            type="text"
                            fullWidth
                            defaultValue={item.name}
                        />
                        <TextField

                            margin="dense"
                            id="subject"
                            label="ชื่อวิชา"
                            type="text"
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

                <Dialog
                    open={openDelete}
                    onClose={editRoomClose}
                    aria-labelledby="form-dialog-title"
                >

                    <DialogTitle id="form-dialog-title">{"ลบ"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            เมื่อลบห้องนี้แล้วจะไม่สามารถกู้คืนได้
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={deleteRoomClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => deleteRoom(item.roomId)} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }

}

export default RoomEdit;