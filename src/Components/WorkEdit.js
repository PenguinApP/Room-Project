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

class workEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            workEdit: [],
           

        }
    }

    handleEditSubmit = (id) => {

        var item = {
            name: document.getElementById("name").value,
            
            roomId: id
        }

        this.props.editItem(item)

    }

    render() {
        const { item, classes, openWorkEdit, anchorEl,editWorkClose,openWorkDelete,handleClose } = this.props
        return (
            <div>
                <Menu
                    id={item.roomId}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => openWorkEdit()}>Edit</MenuItem>

                    <MenuItem onClick={() => openWorkDelete()}>Delete</MenuItem>

                </Menu>
                <Dialog
                    open={openWorkEdit}
                    onClose={editWorkClose}
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
                      
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={editWorkClose} color="primary">
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