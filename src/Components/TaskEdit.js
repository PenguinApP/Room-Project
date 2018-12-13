import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Upload from './Upload'

import './Task.css'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({


})

class TaskEdit extends Component {
    constructor() {
        super()
        this.state = {
            value: 'toDo'
        };
    }
    changeResponsibleUser = (value) => {
        const { taskItem, roomUser, user } = this.props
        var taskUpdate = {
            name: taskItem.name,
            startAt: taskItem.startAt,
            endAt: taskItem.endAt,
            content: taskItem.content,
            isDone: value,
            workId: taskItem.workId,
            workGroupId: taskItem.workGroupId,
            taskId: taskItem.taskId,
            fileName: taskItem.fileName,
            fileURL: taskItem.fileURL,
            responsibleUser: user.uid,
        }
        this.props.changeTask(taskUpdate)
        console.log(taskUpdate)
    }


    handleChange = event => {
        this.setState({ value: event.target.value });
    };


    render() {
        const { classes, taskItem, roomUser, userRes, user, task, handleClose } = this.props

        return (
            <Dialog
                open={this.props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {taskItem.isDone === 'toDo' ?
                    <div>
                        <DialogTitle id="alert-dialog-title">{taskItem.name}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {taskItem.content}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                ยกเลิก
                            </Button>
                            <Button onClick={() => this.changeResponsibleUser('Doing')} color="primary" autoFocus>
                                รับผิดชอบงานนี้
                            </Button>
                        </DialogActions>
                    </div>
                    :

                    <div>

                        {taskItem.responsibleUser === userRes ?
                            <div>
                                <DialogTitle id="alert-dialog-title">{taskItem.name}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        {taskItem.content}
                                    </DialogContentText>
                                    <DialogContentText><br />
                                        อัพโหลดไฟล์งาน(PDF)
                                    </DialogContentText>

                                    <Upload
                                        onFileData={this.onFileData}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        ยกเลิก
                                    </Button>
                                    <Button onClick={() => this.changeResponsibleUser('Done')} color="primary" autoFocus>
                                        งานเสร็จสิ้น
                                    </Button>
                                </DialogActions>
                            </div>

                            :
                            <div>
                                <DialogTitle id="alert-dialog-title">คุณไม่ได้รับผิดชอบงานนี้</DialogTitle>
                            </div>
                        }

                    </div>
                }


            </Dialog>

        )

    }

}

TaskEdit.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskEdit);

