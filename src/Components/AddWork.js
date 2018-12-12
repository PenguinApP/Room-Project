import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Hidden from "@material-ui/core/Hidden";


import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fade';

import moment from 'moment';




const styles = theme => ({
    addRoom: {
        textAlign: 'right',
    },
    addWork: {
        margin: theme.spacing.unit,
    },

    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        // marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class AddWork extends Component {

    constructor() {
        super()
        this.state = {
            workName: '',
            content: '',
            endDate: moment().format('YYYY-MM-DD'),
            endTime: moment().format('hh:mm'),
            workForm: false,

        };
    }

    addWork = () => {
        var { workName, content, endDate, endTime } = this.state
        var { addWork, roomName } = this.props
        var self = this
        var endAt = endDate + 'T' + endTime



        console.log(endAt)
        var Work = {
            name: workName,
            startAt: new Date(),
            endAt: new Date(endAt),
            content: content,
            isDone: false,
            roomId: roomName.roomId,
        }
        if (!workName.trim()) {
            alert('กรุณากรอกชื่อห้อง')
            self.setState({ workName: '', content: '', endDate: '', endTime: null, })
        } else {
            addWork(Work)
            self.setState({ workName: '', content: '', endDate: '', endTime: null, workForm: false })
        }
    }

    handleClickOpen = () => {
        this.setState({ workForm: true });
    };

    handleClose = () => {
        this.setState({ workForm: false });
    };

    handleOnchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        const { classes, roomUser, roomName } = this.props
        const { workForm, workName, content, endDate, endTime } = this.state
        return (
            <span>
                {roomName.roomRole === 'teacher' ?
                    <span>
                        < Button variant="contained" color="secondary" aria-label="Add" className={classes.addWork} onClick={this.handleClickOpen} >
                            <AddIcon />
                        </Button>
                        <Dialog
                            open={workForm}
                            onClose={this.handleClose}
                            aria-labelledby="form-dialog-title"
                        >
                            <DialogTitle id="form-dialog-title">
                                Create Work
                             </DialogTitle>

                            <DialogContent>

                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="work"
                                    label="ชื่องาน"
                                    type="text"
                                    name="workName"
                                    fullWidth
                                    value={workName}
                                    onChange={this.handleOnchange}
                                />
                                <TextField
                                    margin="dense"
                                    id="content"
                                    label="รายละเอียด"
                                    type="text"
                                    name="content"
                                    fullWidth
                                    value={content}
                                    onChange={this.handleOnchange}
                                />

                                <TextField
                                    id="endDate"
                                    label="กำหนดส่ง"
                                    type="date"
                                    name="endDate"
                                    value={endDate}
                                    onChange={this.handleOnchange}
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
                                    value={endTime}
                                    onChange={this.handleOnchange}
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
                                <Button onClick={this.handleClose} color="primary">
                                    Cancel
                        </Button>
                                <Button onClick={this.addWork} color="primary">
                                    Create Work
                        </Button>
                            </DialogActions>
                        </Dialog>
                    </span>
                    :
                    null
                }
            </span>
        )
    }

}

export default withStyles(styles)(AddWork);