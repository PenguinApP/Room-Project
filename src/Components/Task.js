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


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class FormRow extends Component {

    render() {
        const { classes, work } = this.props;

        return (
            <div>
                <div className="list-wrapper">
                    <div class="card2" >
                        <div class="container2">
                            <h4><b>1</b></h4>
                            <p>description</p>
                        </div>
                        {/* <Button onClick={() => this.handleWorkOpen(value)} >
                            เข้าห้อง
                                </Button> */}
                    </div>

                    {/* <Grid item xs={4}>
                        <Paper className={classes.paper}>To Do</Paper>
                    </Grid> */}
                </div>
                <div className="list-wrapper">
                    <div class="card2" >
                        <div class="container2">
                            <h4><b>2</b></h4>
                            <p>description</p>
                        </div>
                        {/* <Button onClick={() => this.handleWorkOpen(value)} >
                            เข้าห้อง
                                </Button> */}
                    </div>

                    {/* <Grid item xs={4}>
                        <Paper className={classes.paper}>Doing</Paper>
                    </Grid> */}
                </div>
                <div className="list-wrapper">
                    <div class="card2" >
                        <div class="container2">
                            <h4><b>3</b></h4>
                            <p>description</p>
                        </div>
                        {/* <Button onClick={() => this.handleWorkOpen(value)} >
                            เข้าห้อง
                                </Button> */}
                    </div>

                    {/* <Grid item xs={4}>
                    <Paper className={classes.paper}>Done</Paper>
                </Grid> */}
                </div>




                {task.map((value) => {
                    return (
                        <ListItem
                            key={value.workId}
                            button
                            onClick={() => this.handleTaskOpen(value, 'task')}
                        >
                            <ListItemText
                                primary={value.name}
                            />
                        </ListItem>


                    )
                }
                )
                }
            </div>
        );
    }
}
FormRow.propTypes = {
    classes: PropTypes.object.isRequired,
};

class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            taskName: '',
            fileURL: null,
            fileName: null,
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOnchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onButtonTaskBack = (roomName, page) => {

        this.props.backPage(roomName, page)

        console.log(roomName, page)
    };

    handleSubmit = (file) => {
        var { taskName, fileName, fileURL } = this.state
        var { user, roomName, work, task } = this.props
        var self = this

        if (!this.state.taskName.trim()) {
            alert('กรุณากรอกชื่องาน')
            this.setState({ name: '', })
        } else {

            var Task = {
                name: taskName,
                startAt: new Date(),
                endAt: new Date(),
                content: '',
                isDone: false,
                workId: roomName.workId,
                fileName: fileName,
                fileURL: fileURL,
            }

            this.props.addTask(Task)

            self.setState({
                taskName: '',
                open: false
            }, () => {
                console.log(Task)
            })

        }

        // itemTask.push(task)
    }

    onFileData = (file) => {
        this.setState({
            fileName: file.fileName,
            fileURL: file.fileURL,
        });
    }

    render() {
        const { classes, roomName, } = this.props;


        return (
            <div className="list-wrapper">
                <Button onClick={() => this.onButtonTaskBack(roomName, 'work')} >
                    ย้อนกลับ
                </Button>
                <Button onClick={this.handleClickOpen}>
                    เพิ่มงาน
                </Button>

                <Grid container spacing={12}>
                    <Grid container item xs={4} spacing={12}>
                        <FormRow classes={classes}
                            task={this.props.task} />
                    </Grid>
                </Grid>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">เพิ่ม Task งาน</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            รายละเอียดงาน
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="custom-css-input"
                            name="taskName"
                            onChange={this.handleOnchange}
                            value={this.state.taskName}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="Name"
                            fullWidth
                        />

                        <DialogContentText><br />
                            อัพโหลดไฟล์งาน(PDF)
                        </DialogContentText>

                        <Upload
                            onFileData={this.onFileData}
                        />

                    </DialogContent>


                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>

                        <Button onClick={this.handleSubmit} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>

            </div >




        );
    }
}
Task.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Task);
