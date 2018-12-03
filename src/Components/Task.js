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
import TaskEdit from './TaskEdit';
import UserWork from './UserWork';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    demo: {
        height: 240,
    },
    paper: {
        padding: theme.spacing.unit * 2,

        textAlign: 'center',
        color: theme.palette.text.secondary,

    },
    paper2: {
        padding: theme.spacing.unit * 2,
        height: '100%',
        color: theme.palette.text.secondary,
        textAlign: 'center',
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});

class FormRow extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            taskItem: []
        };
    }

    handleClickOpen = (value) => {
        this.setState({
            open: true,
            taskItem: value
        }, () => {
            console.log(value)
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    changeTask = (value) => {
        this.props.changeTask(value)
        console.log(value)

    }

    render() {
        const { classes, task, editItem } = this.props;

        return (
            <div>

                <div className="FrameLeft" >

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

                        <Grid container spacing={4}>
                            <Paper className={classes.paper}>To Do</Paper>

                        </Grid>
                        <div className="list-wrapper">
                            <div className="card2">
                                <div className="container2">
                                    {task.map((value) => {
                                        return (
                                            <div>
                                                {value.isDone === 'toDo' ?

                                                    <ListItem
                                                        key={value.workId}
                                                        button
                                                        onClick={() => this.handleClickOpen(value)}
                                                    >
                                                        <div className="list-wrapper">
                                                            <div className="card3">
                                                                <div className="container2">
                                                                    <ListItemText
                                                                        primary={value.name}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </ListItem>
                                                    :
                                                    null
                                                }
                                                {/* <Dialog
                                                    open={this.state.open}
                                                    onClose={this.handleClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
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
                                                        <Button onClick={this.handleClose} color="primary">
                                                            ยกเลิก
            </Button>
                                                        <Button onClick={this.ChangeTask} color="primary" autoFocus>
                                                            ทำงาน
            </Button>
                                                    </DialogActions>
                                                </Dialog> */}
                                            </div>
                                        )
                                    }
                                    )
                                    }


                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="FrameCenter">
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

                        {<Grid container spacing={4}>
                            <Paper className={classes.paper}>Doing</Paper>
                        </Grid>}
                        <div className="list-wrapper">
                            <div className="card2">
                                <div className="container2">
                                    {task.map((value) => {
                                        return (
                                            <div>
                                                {value.isDone === 'Doing' ?

                                                    <ListItem
                                                        key={value.workId}
                                                        button
                                                        onClick={() => this.handleTaskOpen(value, 'task')}
                                                    >
                                                        <div className="list-wrapper">
                                                            <div className="card3">
                                                                <div className="container2">
                                                                    <ListItemText
                                                                        primary={value.name}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </ListItem>
                                                    :
                                                    null
                                                }
                                            </div>
                                        )
                                    }
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="FrameRight">
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

                        <Grid container spacing={4}>
                            <Paper className={classes.paper}>Done</Paper>


                        </Grid>
                        <div className="list-wrapper">
                            <div className="card2">
                                <div className="container2">
                                    {task.map((value) => {
                                        return (
                                            <div>
                                                {value.isDone === 'Done' ?

                                                    <ListItem
                                                        key={value.workId}
                                                        button
                                                        onClick={() => this.handleEditOpen(value, 'task')}
                                                    >
                                                        <div className="list-wrapper">
                                                            <div className="card3">
                                                                <div className="container2">
                                                                    <ListItemText
                                                                        primary={value.name}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </ListItem>
                                                    :
                                                    null
                                                }
                                            </div>

                                        )
                                    }
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <TaskEdit
                        handleToggleEditTask={this.handleToggleEditTask}
                        editItem={editItem}
                        changeTask={this.changeTask}
                        handleClose={this.handleClose}
                        {...this.state}
                    />


                </div>




                {/* <div className="list-wrapper">
                    <div class="card2" >
                        <div class="container2">
                            <h4><b>1</b></h4>
                            <p>description</p>
                        </div>
                      
                    </div>

                    <Grid container spacing={4}>
                        <Paper className={classes.paper}>To Do</Paper>

                    </Grid>
                </div>
                <div className="list-wrapper">
                    <div class="card2" >
                        <div class="container2">
                            <h4><b>2</b></h4>
                            <p>description</p>
                        </div>
                        
                    </div>

                    {<Grid container spacing={4}>
                        <Paper className={classes.paper}>Doing</Paper>
                    </Grid>}
                </div>
                <div className="list-wrapper">
                    <div class="card2" >
                        <div class="container2">
                            <h4><b>3</b></h4>
                            <p>description</p>

                        </div>
                       
                    </div>

                    <Grid container spacing={8}>
                        <Paper className={classes.paper}>Done</Paper>


                    </Grid>
                </div> */}


                {/* <Grid container spacing={24}>
                    <Grid item xs={4}   >
                        <Paper className={classes.paper}>To Do</Paper>

                    </Grid>
                    <Grid item xs={4} >
                        <Paper className={classes.paper}>Doing</Paper>

                    </Grid>
                    <Grid item xs={4} >
                        <Paper className={classes.paper}>Done</Paper>

                    </Grid>
                </Grid> */}









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
            Taskitem: []
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
    handleEditOpen = (value, index) => {
        this.setState({ item: value, openEdit: true, selectedTaskIndex: index })
        console.log(index)
    }
    handleToggleEditTask = () => {
        this.setState({ openEdit: !this.state.openEdit })
    }


    changeTask = (value) => {
        this.props.changeTask(value)
        console.log(value)
    }

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
                isDone: 'toDo',
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
        const { classes, roomName, roomMember } = this.props;


        return (

            <div className="list-wrapper">
                <Button onClick={() => this.onButtonTaskBack(roomName, 'work')} >
                    ย้อนกลับ
                </Button>
                <Button onClick={this.handleClickOpen}>
                    เพิ่มงาน
                </Button>

                <UserWork

                />

                <Grid container spacing={12}>
                    <Grid container item xs={4} spacing={12}>
                        <FormRow classes={classes}
                            task={this.props.task}
                            changeTask={this.changeTask}
                            handleEditOpen={this.handleEditOpen}
                            handleToggleEditTask={this.handleToggleEditTask}

                        />
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
