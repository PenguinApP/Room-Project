import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import moment from 'moment';

const styles = theme => ({
    textField: {
        // marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class TaskEdit2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            workEdit: [],

        }
    }

    handleEditSubmit = (id) => {
        const { itemEdit, editTaskClose } = this.props

        var taskUpdate = {
            name: document.getElementById("name").value,
            startAt: itemEdit.startAt,
            endAt: itemEdit.endAt,
            content: document.getElementById("content").value,
            comment: itemEdit.commemt,
            isDone: itemEdit.isDone,
            workId: itemEdit.workId,
            workGroupId: itemEdit.workGroupId,
            displayName: itemEdit.displayName,
            photoURL: itemEdit.photoURL,
            fileName: itemEdit.fileName,
            fileURL: itemEdit.fileURL,
            taskId: itemEdit.taskId,
            responsibleUser: itemEdit.responsibleUser

        }

        this.props.editTask(taskUpdate)
        editTaskClose()
    }

    render() {
        const { itemEdit, classes, openEdit, openDelete, anchorEl, editTaskOpen, editTaskClose, deleteTaskOpen, deleteTaskClose, deleteTask, handleMenuClose } = this.props
        return (
            <div>
                <Menu
                    id={itemEdit.taskId}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => editTaskOpen()}>แก้ไข</MenuItem>

                    <MenuItem onClick={() => deleteTaskOpen()}>ลบ</MenuItem>
                </Menu>
                <Dialog
                    open={openEdit}
                    onClose={editTaskClose}
                    aria-labelledby="form-dialog-title"
                >

                    <DialogTitle id="form-dialog-title">{"Edit"}</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="ชื่องาน"
                            type="name"
                            fullWidth
                            defaultValue={itemEdit.name}
                        />

                        <TextField
                            margin="dense"
                            id="content"
                            label="รายละเอียด"
                            type="text"
                            name="content"
                            fullWidth
                            defaultValue={itemEdit.content}
                            onChange={itemEdit.content}
                        />


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={editTaskClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleEditSubmit(itemEdit.taskId)} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openDelete}
                    onClose={editTaskClose}
                    aria-labelledby="form-dialog-title"
                >

                    <DialogTitle id="form-dialog-title">{"Delete"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            เมื่อลบงานแล้วจะไม่สามารถกู้คืนได้
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={deleteTaskClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => deleteTask(itemEdit)} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>


            </div>
        )
    }
}
export default withStyles(styles)(TaskEdit2);