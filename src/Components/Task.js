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
import Hidden from "@material-ui/core/Hidden";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TaskEdit from './TaskEdit';
import UserWork from './UserWork';

const drawerWidth = 240;
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
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        backgroundColor: '#00CCFF',
    },
});

class FormRow extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            taskItem: [],
            userRes: '',

        };
    }

    handleClickOpen = (value) => {
        const { roomUser } = this.props
        this.setState({
            open: true,
            taskItem: value,
            userRes: roomUser.userId,
        }, () => {
            console.log(this.state.taskItem)
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
        const { classes, task, editItem, roomUser } = this.props;


        return (
            <div>
                <Hidden smUp implementation="css">
                    <div style={{
                        width: '100%',
                        height: '100%',

                        top: '150px',
                        left: '0px',
                        right: '0px',
                        bottom: '0px',

                        position: 'absolute',
                        cursor: 'pointer',


                        backgroundColor: 'rgba(255,200,200,0.5)',
                    }}>

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
                    </div>
                </Hidden>

                <Hidden xsDown implementation="css">
                    <div style={{
                        width: '100%',
                        height: '100%',

                        top: '150px',
                        left: '240px',
                        right: '0px',
                        bottom: '0px',

                        position: 'absolute',
                        cursor: 'pointer',


                        backgroundColor: 'rgba(255,200,200,0.5)',
                    }}>

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
                    </div>

                </Hidden >
                <TaskEdit
                    user={this.props.user}
                    task={task}
                    roomUser={roomUser}
                    handleToggleEditTask={this.handleToggleEditTask}
                    editItem={editItem}
                    changeTask={this.changeTask}
                    handleClose={this.handleClose}
                    {...this.state}
                />
            </div >
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
                responsibleUser: null,
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
        const { classes, roomName, roomMember, setBG, addGroup, roomUser, workGroup, task } = this.props;
        return (

            <div className="list-wrapper">
                <Button onClick={() => this.onButtonTaskBack(roomName, 'work')} >
                    ย้อนกลับ
                </Button>
                <Button onClick={this.handleClickOpen}>
                    เพิ่มงาน
                </Button>

                <UserWork
                    user={this.props.user}
                    addGroup={addGroup}
                    roomName={roomName}
                    roomUser={roomUser}
                    workGroup={workGroup}
                />
                <Grid container spacing={12}>
                    <Grid container item xs={4} spacing={12}>
                        <FormRow classes={classes}
                            task={this.props.task}
                            user={this.props.user}
                            roomUser={roomUser}
                            task={task}
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
                            user={this.props.user}
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
