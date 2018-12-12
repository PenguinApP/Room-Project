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

class WorkEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            workEdit: [],


        }
    }

    handleEditSubmit = (id) => {
        const { item } = this.props
        var endDate = document.getElementById("endDate").value
        var endTime = document.getElementById("endTime").value
        var endAt = endDate + 'T' + endTime
        var time = new Date()
        console.log(endAt)

        var workUpdate = {
            name: document.getElementById("name").value,
            startAt: item.startAt,
            endAt: new Date(endAt),
            content: document.getElementById("content").value,
            isDone: item.isDone,
            roomId: item.roomId,
            workId: id,
            workGroupId: item.workGroupId,
            workGroup: item.workGroup,
            workRole: item.workRole,

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

                        <TextField
                            margin="dense"
                            id="content"
                            label="รายละเอียด"
                            type="text"
                            name="content"
                            fullWidth
                            defaultValue={item.content}
                            onChange={item.content}
                        />

                        <TextField
                            id="endDate"
                            label="กำหนดส่ง"
                            type="date"
                            name="endDate"
                            defaultValue={moment(item.endAt).format('YYYY-MM-DD')}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            id="endTime"
                            label="เวลาส่ง"
                            type="time"
                            name="endTime"
                            defaultValue={moment(item.endAt).format('HH:mm')}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
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
export default withStyles(styles)(WorkEdit);