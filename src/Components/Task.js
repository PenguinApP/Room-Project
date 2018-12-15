import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import firebase, { db, auth } from '../Config/Firebase';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Upload from './Upload';
import WorkStudentShow from './WorkStudentShow';
import PushWorkAll from './PushWorkAll';

import './Task.css';
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

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import update from 'immutability-helper';

import PicDummy from '../Picture/User-dummy-300x300.png';
import PicPom from '../Picture/image_big_5a7139a336b78.jpg';
import Pic1 from '../Picture/7cc0c4cdecada53d94a10ae0582843b4.jpg';
import Pic2 from '../Picture/work2.jpg';
import Pic3 from '../Picture/work3.jpg';


const roomRef = db.collection('room')
const roomMemberRef = db.collection('roomMember')
const workRef = db.collection('work')
const taskRef = db.collection('task')
const userRef = db.collection('user')
const workGroupMemberRef = db.collection('workGroupMember')
const workGroupRef = db.collection('workGroup')

const drawerWidth = 240;
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    root2: {
        flexGrow: 1,
        width: '400px',

        textAlign: 'center'


    },
    demo: {
        height: 240,
    },
    paper: {
        padding: theme.spacing.unit * 1,
        height: 40,
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
    card4: {
        maxWidth: 300,
    },
    media: {
        height: 140,
    },
    btnTask: {
        width: '20px',
        textAlign: 'center',

    },

    addAllTask: {
        textAlign: 'right',
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
        const { user } = this.props
        this.setState({
            open: true,
            taskItem: value,
            userRes: user.uid,
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
        const { classes, task, editItem, roomUser, userRes, roomName } = this.props;


        return (
            <div>
                <Hidden smUp implementation="css">
                    <div style={{

                        top: '160px',
                        left: '0px',
                        right: '0px',
                        bottom: '0px',

                        position: 'absolute',
                        cursor: 'pointer',


                        // backgroundColor: 'rgba(255,200,200,0.5)',
                    }}>

                        <div className="FrameLeft" >
                            <div className="list-wrapper">
                                <Card className={classes.card4}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="responsive"
                                            className={classes.media}
                                            image={Pic1}
                                            title="To Do"
                                        />

                                    </CardActionArea>
                                </Card>

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
                                <Card className={classes.card4}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="responsive"
                                            className={classes.media}
                                            image={Pic2}
                                            title="To Do"
                                        />

                                    </CardActionArea>
                                </Card>

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
                                <Card className={classes.card4}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="responsive"
                                            className={classes.media}
                                            image={Pic3}
                                            title="To Do"
                                        />

                                    </CardActionArea>
                                </Card>

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
                        // width: '100%',
                        // height: '100%',
                        top: '160px',

                        left: '240px',
                        right: '0px',
                        bottom: '0px',

                        position: 'absolute',
                        cursor: 'pointer',


                        // backgroundColor: 'rgba(255,200,200,0.5)',
                    }}>

                        <div className="FrameLeft" >
                            <div className="list-wrapper">
                                <Card className={classes.card4}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="responsive"
                                            className={classes.media}
                                            image={Pic1}
                                            title="To Do"
                                        />

                                    </CardActionArea>
                                </Card>


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
                                <Card className={classes.card4}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="responsive"
                                            className={classes.media}
                                            image={Pic2}
                                            title="To Do"
                                        />

                                    </CardActionArea>
                                </Card>
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
                                <Card className={classes.card4}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="responsive"
                                            className={classes.media}
                                            image={Pic3}
                                            title="To Do"
                                        />

                                    </CardActionArea>
                                </Card>

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
                    userRes={userRes}
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
            content: '',
            fileURL: null,
            fileName: null,
            Taskitem: [],
            value: 0,
            pageTask: 'task',
            studentShow: [],
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
        var { taskName, content, fileName, fileURL } = this.state
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
                content: content,
                comment: '',
                isDone: 'toDo',
                workId: roomName.workId,
                workGroupId: roomName.workGroupId,
                fileName: fileName,
                fileURL: fileURL,
                responsibleUser: null,
            }

            this.props.addTask(Task)

            self.setState({
                taskName: '',
                content: '',
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

    handlePageChange = (event, value) => {
        const { roomName } = this.props
        if (value === 0) {
            this.setState({ value }, () => {
                console.log(value)
            });
        } else if (value === 1) {

            this.setState({ value }, () => {

                console.log(value)
            });
        }

    };

    renderTaskPage = () => {
        const { pageTask, value } = this.state
        const { classes, roomName, roomMember, setBG, addGroup, roomUser, workGroup, task, workMember, emailAll, queryEmailUser, addGroupMember, user, studentShow, addWorkAll, joinGroupMem, requestGroupMember } = this.props;

        switch (value) {
            case 1:
                return (
                    <div>
                        <WorkStudentShow
                            roomName={roomName}
                            studentShow={studentShow}
                        />


                    </div>
                );
            case 'taskFile':
                return (
                    <div>



                    </div>
                );
            case 0:
                return (
                    <div className="list-btn">
                        <Button onClick={() => this.onButtonTaskBack(roomName, 'work')} >
                            ย้อนกลับ
                        </Button>
                        {roomName.roomRole === 'student' && roomName.workRole !== 'no group' && roomName.workRole !== 'รอยืนยัน' ?
                            <Button onClick={this.handleClickOpen}>
                                เพิ่มงาน
                            </Button>
                            :
                            null
                        }


                        <UserWork
                            user={user}
                            addGroup={addGroup}
                            roomName={roomName}
                            roomUser={roomUser}
                            workGroup={workGroup}
                            workMember={workMember}
                            roomMember={roomMember}
                            emailAll={emailAll}
                            queryEmailUser={queryEmailUser}
                            addGroupMember={addGroupMember}
                            joinGroupMem={joinGroupMem}
                            requestGroupMember={requestGroupMember}
                        />
                        {roomName.roomRole === 'student' && roomName.workRole !== 'no group' && roomName.workRole !== 'รอยืนยัน' ?
                            <div className={classes.addAllTask}>
                                <PushWorkAll
                                    roomName={roomName}
                                    addWorkAll={addWorkAll}
                                />
                            </div>
                            :
                            null
                        }


                        <Grid container spacing={12}>
                            <Grid container item xs={4} spacing={12}>
                                <FormRow classes={classes}
                                    task={this.props.task}
                                    user={this.props.user}
                                    roomUser={roomUser}
                                    roomName={roomName}
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
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="ชื่องาน"
                                    id="custom-css-input"
                                    name="taskName"
                                    onChange={this.handleOnchange}
                                    value={this.state.taskName}
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    id="content"
                                    label="คำอธิบายงาน"
                                    type="text"
                                    name="content"
                                    onChange={this.handleOnchange}
                                    value={this.state.content}
                                    fullWidth
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
                )

        }
    }

    render() {
        const { classes, roomName, roomMember, setBG, addGroup, roomUser, workGroup, task, workMember, emailAll, queryEmailUser, addGroupMember, user } = this.props;
        return (
            <div>
                {roomName.roomRole === 'teacher' ?
                    <div className={classes.btnTask}>
                        <Paper className={classes.root2}>
                            <Tabs
                                value={this.state.value}
                                onChange={this.handlePageChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab label="Task Management" />
                                <Tab label="นักเรียน" />
                            </Tabs>
                        </Paper>
                    </div>
                    :
                    null
                }
                <div >
                    {this.renderTaskPage()}
                </div >
            </div>
        );
    }
}
Task.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Task);
