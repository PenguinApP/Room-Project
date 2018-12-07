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
    changeTask = () => {
        const { roomUser } = this.props
        var taskUpdate = {
            name: this.props.taskItem.name,
            startAt: this.props.taskItem.startAt,
            endAt: this.props.taskItem.endAt,
            content: this.props.taskItem.content,
            isDone: this.state.value,
            workId: this.props.taskItem.workId,
            taskId: this.props.taskItem.taskId,
            fileName: this.props.taskItem.fileName,
            fileURL: this.props.taskItem.fileURL,
            responsibleUser: roomUser.userId,
        }
        this.props.changeTask(taskUpdate)
        console.log(taskUpdate)
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    };


    render() {
        const { classes, taskItem, roomUser, userRes } = this.props

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {taskItem.isDone === 'toDo' ?
                    <div>
                        <DialogTitle id="alert-dialog-title">{taskItem.name}</DialogTitle>
                        <DialogContent>
                            <RadioGroup
                                aria-label="Status"
                                name="Status"
                                className={classes.group}
                                value={this.state.value}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel value="toDo" control={<Radio />} label="To Do" />
                                <FormControlLabel value="Doing" control={<Radio />} label="Doing" />
                                <FormControlLabel value="Done" control={<Radio />} label="Done" />
                                <FormControlLabel
                                    value="disabled"
                                    disabled
                                    control={<Radio />}
                                    label="(Disabled option)"
                                />
                            </RadioGroup>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.props.handleClose} color="primary">
                                ยกเลิก
                            </Button>
                            <Button onClick={this.changeTask} color="primary" autoFocus>
                                ทำงาน
                            </Button>
                        </DialogActions>
                    </div>
                    :

                    <div>

                        {
                            taskItem.responsibleUser === userRes ?
                                <div>
                                    <DialogTitle id="alert-dialog-title">{taskItem.name}</DialogTitle>
                                    <DialogContent>
                                        <RadioGroup
                                            aria-label="Status"
                                            name="Status"
                                            className={classes.group}
                                            value={this.state.value}
                                            onChange={this.handleChange}
                                        >
                                            <FormControlLabel value="toDo" control={<Radio />} label="To Do" />
                                            <FormControlLabel value="Doing" control={<Radio />} label="Doing" />
                                            <FormControlLabel value="Done" control={<Radio />} label="Done" />
                                            <FormControlLabel
                                                value="disabled"
                                                disabled
                                                control={<Radio />}
                                                label="(Disabled option)"
                                            />
                                        </RadioGroup>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.props.handleClose} color="primary">
                                            ยกเลิก
                                    </Button>
                                        <Button onClick={this.changeTask} color="primary" autoFocus>
                                            ทำงาน
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

