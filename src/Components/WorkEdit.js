import React, { Component } from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class WorkEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            workEdit: [],


        }
    }

    handleEditSubmit = (id) => {
        const { item } = this.props

        var workUpdate = {
            name: document.getElementById("name").value,
            startAt: item.startAt,
            endAt: item.endAt,
            content: item.content,
            isDone: item.isDone,
            roomId: item.roomId,
            workId: id
        }

        this.props.editItem(workUpdate)

    }

    render() {
        const { item, classes, openEdit, openDelete, anchorEl, editWorkOpen, editWorkClose, deleteWorkOpen, deleteWorkClose, deleteWork, handleMenuClose } = this.props
        return (
            <div>
                <Menu
                    id={item.workId}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => editWorkOpen()}>Edit</MenuItem>

                    <MenuItem onClick={() => deleteWorkOpen()}>Delete</MenuItem>
                </Menu>
                <Dialog
                    open={openEdit}
                    onClose={editWorkClose}
                    aria-labelledby="form-dialog-title"
                >

                    <DialogTitle id="form-dialog-title">{"Edit"}</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Work name"
                            type="name"
                            fullWidth
                            defaultValue={item.name}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={editWorkClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleEditSubmit(item.workId)} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openDelete}
                    onClose={editWorkClose}
                    aria-labelledby="form-dialog-title"
                >

                    <DialogTitle id="form-dialog-title">{"Delete"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            เมื่อลบงานแล้วจะไม่สามารถกู้คืนได้
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={deleteWorkClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => deleteWork(item.workId)} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>


            </div>
        )
    }
}
export default WorkEdit;