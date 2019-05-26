import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import firebase, { db, auth } from '../Config/Firebase';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Upload from './Upload';
import WorkStudentShow from './WorkStudentShow';
import PushWorkAll from './PushWorkAll';
import CancleSubmitFile from './CancleSubmitFile';

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
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
import TaskPick from './TaskPick';
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
        width: '100%',

        textAlign: 'center'


    },

    rootList: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
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
        width: '100%',
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
            anchorEl: null,
            itemEdit: [],
            openEdit: false,
            openDelete: false,
            task: [],
        };
    }

    componentDidMount() {
        const { roomName } = this.props
        const self = this
        var newTask = []
        taskRef.where("workId", "==", roomName.workId).where("workGroupId", "==", roomName.workGroupId)
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {
                    if (roomName.roomRole === "student") {
                        if (change.type === "added") {

                            if (change.doc.data().responsibleUser) {
                                userRef.doc(change.doc.data().responsibleUser)
                                    .get()
                                    .then(function (doc) {
                                        newTask.push({
                                            name: change.doc.data().name,
                                            startAt: change.doc.data().startAt.toDate(),
                                            endAt: change.doc.data().endAt.toDate(),
                                            content: change.doc.data().content,
                                            comment: change.doc.data().comment,
                                            isDone: change.doc.data().isDone,
                                            fileName: change.doc.data().fileName,
                                            fileURL: change.doc.data().fileURL,
                                            responsibleUser: change.doc.data().responsibleUser,
                                            displayName: doc.data().displayName,
                                            photoURL: doc.data().photoURL,
                                            workId: change.doc.data().workId,
                                            workGroupId: change.doc.data().workGroupId,
                                            taskId: change.doc.id
                                        })
                                        self.setState({
                                            task: newTask
                                        }, () => { console.log(self.state.task) }
                                        )
                                    })
                            } else {
                                newTask.push({
                                    name: change.doc.data().name,
                                    startAt: change.doc.data().startAt.toDate(),
                                    endAt: change.doc.data().endAt.toDate(),
                                    content: change.doc.data().content,
                                    comment: change.doc.data().comment,
                                    isDone: change.doc.data().isDone,
                                    fileName: change.doc.data().fileName,
                                    fileURL: change.doc.data().fileURL,
                                    responsibleUser: change.doc.data().responsibleUser,
                                    displayName: '',
                                    photoURL: '',
                                    workId: change.doc.data().workId,
                                    workGroupId: change.doc.data().workGroupId,
                                    taskId: change.doc.id
                                })
                                self.setState({
                                    task: newTask
                                }, () => { console.log(self.state.task) }
                                )
                            }
                        }


                        if (change.type === "modified") {
                            if (change.doc.data().responsibleUser) {
                                userRef.doc(change.doc.data().responsibleUser)
                                    .get()
                                    .then(function (doc) {
                                        var taskEdit = {
                                            name: change.doc.data().name,
                                            startAt: change.doc.data().startAt.toDate(),
                                            endAt: change.doc.data().endAt.toDate(),
                                            content: change.doc.data().content,
                                            comment: change.doc.data().comment,
                                            isDone: change.doc.data().isDone,
                                            fileName: change.doc.data().fileName,
                                            fileURL: change.doc.data().fileURL,
                                            responsibleUser: change.doc.data().responsibleUser,
                                            displayName: doc.data().displayName,
                                            photoURL: doc.data().photoURL,
                                            workId: change.doc.data().workId,
                                            workGroupId: change.doc.data().workGroupId,
                                            taskId: change.doc.id
                                        }
                                        const taskEditIndex = self.state.task.findIndex(item => item.taskId === change.doc.id)
                                        const updateEditTask = update(self.state.task, { [taskEditIndex]: { $set: taskEdit } })
                                        self.setState({
                                            task: updateEditTask,
                                        }, () => {
                                            newTask.splice(taskEditIndex, 1, taskEdit)
                                            console.log(self.state.task, 'newEdittask')
                                        })
                                        console.log(taskEdit)
                                    })
                            } else {
                                var taskEdit = {
                                    name: change.doc.data().name,
                                    startAt: change.doc.data().startAt.toDate(),
                                    endAt: change.doc.data().endAt.toDate(),
                                    content: change.doc.data().content,
                                    comment: change.doc.data().comment,
                                    isDone: change.doc.data().isDone,
                                    fileName: change.doc.data().fileName,
                                    fileURL: change.doc.data().fileURL,
                                    responsibleUser: change.doc.data().responsibleUser,
                                    displayName: null,
                                    photoURL: null,
                                    workId: change.doc.data().workId,
                                    workGroupId: change.doc.data().workGroupId,
                                    taskId: change.doc.id
                                }
                                const taskEditIndex = self.state.task.findIndex(item => item.taskId === change.doc.id)
                                const updateEditTask = update(self.state.task, { [taskEditIndex]: { $set: taskEdit } })
                                self.setState({
                                    task: updateEditTask,
                                }, () => {
                                    newTask.splice(taskEditIndex, 1, taskEdit)
                                    console.log(self.state.task, 'newEdittask')
                                })
                            }
                        }

                        if (change.type === "removed") {
                            const taskDeleteIndex = self.state.task.findIndex(item => item.taskId === change.doc.id)
                            if (taskDeleteIndex >= 0) {
                                const deleteTask = update(self.state.task, { $splice: [[taskDeleteIndex, 1]] })
                                self.setState({
                                    task: deleteTask,

                                }, () => {
                                    newTask.splice(taskDeleteIndex, 1)
                                    console.log(self.state.task, 'newEditTask', taskDeleteIndex, 'taskDeleteIndex')
                                })
                            }
                        }
                    }
                });
            });
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

    handleMenuOpen = (event, value) => {
        this.setState({
            anchorEl: event.currentTarget,
            itemEdit: value
        }, () => {
            console.log(this.state.itemEdit)
        });

    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    editTaskOpen = () => {
        this.setState({
            openEdit: true,
            anchorEl: null,
        });
    }

    editTaskClose = () => {
        this.setState({
            openEdit: false
        })
    }

    deleteTaskOpen = () => {
        this.setState({
            openDelete: true,
            anchorEl: null,
        });
    }

    deleteTaskClose = () => {
        this.setState({
            openDelete: false
        })
    }

    deleteTask = (value) => {
        this.props.deleteTask(value)
        this.setState({
            openDelete: false
        })
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    changeTask = (value, isDone) => {
        this.props.changeTask(value, isDone)

    }

    render() {
        const { anchorEl } = this.state;
        const { classes, editItem, roomUser, userRes, roomName, editTask } = this.props;
        var { task } = roomName.roomRole === 'student' ? this.state : this.props;

        return (
            <div>
                <Hidden smUp implementation="css">
                    <div class="board-wrapperUp">
                        <div class="board-main-content">
                            <div class="board-canvas">
                                <div id="board" class="u-fancy-scrollbar">
                                    <div class="list-wrapper-ApP">
                                        <div class="listApP">
                                            <div class="list-headerApP is-menu-shown">
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
                                                <Paper className={classes.paper}>To Do</Paper>
                                            </div>
                                            <div class="list-cardsApP u-fancy-scrollbar">
                                                <List className={classes.root}>
                                                    {task.map((value) => {
                                                        return (
                                                            <div>
                                                                {value.isDone === 'toDo' ?

                                                                    <ListItem
                                                                        key={value.workId}
                                                                        button
                                                                        onClick={() => this.handleClickOpen(value)}
                                                                    >
                                                                        <ListItemText
                                                                            primary={value.name}
                                                                        />
                                                                        {roomName.roomRole === 'student' ?
                                                                            < ListItemSecondaryAction >
                                                                                <IconButton
                                                                                    aria-owns={anchorEl ? 'simple-menu' : null}
                                                                                    aria-haspopup="true"
                                                                                    color="inherit"
                                                                                    onClick={(event) => this.handleMenuOpen(event, value)}
                                                                                >
                                                                                    <MoreVertIcon
                                                                                    />
                                                                                </IconButton>
                                                                            </ListItemSecondaryAction>
                                                                            :
                                                                            null}
                                                                    </ListItem>
                                                                    :
                                                                    null
                                                                }

                                                            </div>
                                                        )
                                                    }
                                                    )
                                                    }
                                                </List>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="list-wrapper-ApP">
                                        <div class="listApP">
                                            <div class="list-headerApP is-menu-shown">
                                                <Card className={classes.card4}>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            component="img"
                                                            alt="responsive"
                                                            className={classes.media}
                                                            image={Pic2}
                                                            title="Doing"
                                                        />

                                                    </CardActionArea>
                                                </Card>
                                                <Paper className={classes.paper}>Doing</Paper>
                                            </div>
                                            <div class="list-cardsApP u-fancy-scrollbar">
                                                <List className={classes.root}>
                                                    {task.map((value) => {
                                                        return (
                                                            <div>
                                                                {value.isDone === 'Doing' ?

                                                                    <ListItem
                                                                        key={value.workId}

                                                                        button
                                                                        onClick={() => this.handleClickOpen(value)}
                                                                    >
                                                                        <ListItemAvatar>
                                                                            <Avatar alt="Remy Sharp" src={value.photoURL} />
                                                                        </ListItemAvatar>
                                                                        <ListItemText
                                                                            primary={value.name}
                                                                        />

                                                                    </ListItem>
                                                                    :
                                                                    null
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                    )
                                                    }
                                                </List>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="list-wrapper-ApP">
                                        <div class="listApP">
                                            <div class="list-headerApP is-menu-shown">
                                                <Card className={classes.card4}>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            component="img"
                                                            alt="responsive"
                                                            className={classes.media}
                                                            image={Pic3}
                                                            title="Done"
                                                        />

                                                    </CardActionArea>
                                                </Card>
                                                <Paper className={classes.paper}>Done</Paper>
                                            </div>
                                            <div class="list-cardsApP u-fancy-scrollbar">
                                                <List className={classes.root}>
                                                    {task.map((value) => {
                                                        return (
                                                            <div>
                                                                {value.isDone === 'Done' ?

                                                                    <ListItem
                                                                        key={value.workId}
                                                                        button
                                                                        onClick={() => this.handleClickOpen(value)}
                                                                    >
                                                                        <ListItemAvatar>
                                                                            <Avatar alt="Remy Sharp" src={value.photoURL} />
                                                                        </ListItemAvatar>
                                                                        <ListItemText
                                                                            primary={value.name}
                                                                        />
                                                                    </ListItem>
                                                                    :
                                                                    null
                                                                }
                                                            </div>

                                                        )
                                                    }
                                                    )
                                                    }
                                                </List>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Hidden>
                <Hidden xsDown implementation="css">
                    <div class="board-wrapper">
                        <div class="board-main-content">
                            <div class="board-canvas">
                                <div id="board" class="u-fancy-scrollbar">
                                    <div class="list-wrapper-ApP">
                                        <div class="listApP">
                                            <div class="list-headerApP is-menu-shown">
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
                                                <Paper className={classes.paper}>To Do</Paper>
                                            </div>
                                            <div class="list-cardsApP u-fancy-scrollbar">
                                                <List className={classes.root}>
                                                    {task.map((value) => {
                                                        return (
                                                            <div>
                                                                {value.isDone === 'toDo' ?

                                                                    <ListItem
                                                                        key={value.workId}
                                                                        button
                                                                        onClick={() => this.handleClickOpen(value)}
                                                                    >
                                                                        <ListItemText
                                                                            primary={value.name}
                                                                        />
                                                                        {roomName.roomRole === 'student' ?
                                                                            < ListItemSecondaryAction >
                                                                                <IconButton
                                                                                    aria-owns={anchorEl ? 'simple-menu' : null}
                                                                                    aria-haspopup="true"
                                                                                    color="inherit"
                                                                                    onClick={(event) => this.handleMenuOpen(event, value)}
                                                                                >
                                                                                    <MoreVertIcon
                                                                                    />
                                                                                </IconButton>
                                                                            </ListItemSecondaryAction>
                                                                            :
                                                                            null}
                                                                    </ListItem>
                                                                    :
                                                                    null
                                                                }

                                                            </div>
                                                        )
                                                    }
                                                    )
                                                    }
                                                </List>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="list-wrapper-ApP">
                                        <div class="listApP">
                                            <div class="list-headerApP is-menu-shown">
                                                <Card className={classes.card4}>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            component="img"
                                                            alt="responsive"
                                                            className={classes.media}
                                                            image={Pic2}
                                                            title="Doing"
                                                        />

                                                    </CardActionArea>
                                                </Card>
                                                <Paper className={classes.paper}>Doing</Paper>
                                            </div>
                                            <div class="list-cardsApP u-fancy-scrollbar">
                                                <List className={classes.root}>
                                                    {task.map((value) => {
                                                        return (
                                                            <div>
                                                                {value.isDone === 'Doing' ?

                                                                    <ListItem
                                                                        key={value.workId}

                                                                        button
                                                                        onClick={() => this.handleClickOpen(value)}
                                                                    >
                                                                        <ListItemAvatar>
                                                                            <Avatar alt="Remy Sharp" src={value.photoURL} />
                                                                        </ListItemAvatar>
                                                                        <ListItemText
                                                                            primary={value.name}
                                                                        />

                                                                    </ListItem>
                                                                    :
                                                                    null
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                    )
                                                    }
                                                </List>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="list-wrapper-ApP">
                                        <div class="listApP">
                                            <div class="list-headerApP is-menu-shown">
                                                <Card className={classes.card4}>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            component="img"
                                                            alt="responsive"
                                                            className={classes.media}
                                                            image={Pic3}
                                                            title="Done"
                                                        />

                                                    </CardActionArea>
                                                </Card>
                                                <Paper className={classes.paper}>Done</Paper>
                                            </div>
                                            <div class="list-cardsApP u-fancy-scrollbar">
                                                <List className={classes.root}>
                                                    {task.map((value) => {
                                                        return (
                                                            <div>
                                                                {value.isDone === 'Done' ?

                                                                    <ListItem
                                                                        key={value.workId}
                                                                        button
                                                                        onClick={() => this.handleClickOpen(value)}
                                                                    >
                                                                        <ListItemAvatar>
                                                                            <Avatar alt="Remy Sharp" src={value.photoURL} />
                                                                        </ListItemAvatar>
                                                                        <ListItemText
                                                                            primary={value.name}
                                                                        />
                                                                    </ListItem>
                                                                    :
                                                                    null
                                                                }
                                                            </div>

                                                        )
                                                    }
                                                    )
                                                    }
                                                </List>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Hidden>
                <TaskPick
                    user={this.props.user}
                    task={task}
                    userRes={userRes}
                    roomUser={roomUser}
                    roomName={roomName}
                    handleToggleEditTask={this.handleToggleEditTask}
                    editItem={editItem}
                    changeTask={this.changeTask}
                    handleClose={this.handleClose}
                    {...this.state}
                />

                <TaskEdit
                    {...this.state}
                    editTaskOpen={this.editTaskOpen}
                    editTaskClose={this.editTaskClose}
                    deleteTaskOpen={this.deleteTaskOpen}
                    deleteTaskClose={this.deleteTaskClose}
                    deleteTask={this.deleteTask}
                    handleMenuClose={this.handleMenuClose}
                    editTask={editTask}
                    deleteTask={this.deleteTask}
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
            task: [],
        }
    }

    handleTaskQuery = (value) => {
        var newTask = []
        var self = this
        const queryTaskRef = taskRef.where('workId', '==', value.workId).where('workGroupId', '==', value.groupId)

        queryTaskRef
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    const { responsibleUser } = doc.data()
                    if (responsibleUser) {
                        userRef.doc(responsibleUser)
                            .get()
                            .then(function (doc2) {
                                newTask.push({
                                    name: doc.data().name,
                                    startAt: doc.data().startAt.toDate(),
                                    endAt: doc.data().endAt.toDate(),
                                    content: doc.data().content,
                                    comment: doc.data().comment,
                                    isDone: doc.data().isDone,
                                    fileName: doc.data().fileName,
                                    fileURL: doc.data().fileURL,
                                    responsibleUser: doc.data().responsibleUser,
                                    displayName: doc2.data().displayName,
                                    photoURL: doc2.data().photoURL,
                                    workId: doc.data().workId,
                                    workGroupId: doc.data().workGroupId,
                                    taskId: doc.id
                                })
                                self.setState({ task: newTask }, () => {
                                    console.log(self.state.task)
                                })
                            })
                    } else {
                        newTask.push({
                            name: doc.data().name,
                            startAt: doc.data().startAt.toDate(),
                            endAt: doc.data().endAt.toDate(),
                            content: doc.data().content,
                            comment: doc.data().comment,
                            isDone: doc.data().isDone,
                            fileName: doc.data().fileName,
                            fileURL: doc.data().fileURL,
                            responsibleUser: doc.data().responsibleUser,
                            displayName: '',
                            photoURL: '',
                            workId: doc.data().workId,
                            workGroupId: doc.data().workGroupId,
                            taskId: doc.id
                        })
                    }
                    self.setState({ task: newTask }, () => {
                        console.log(self.state.task)
                    })
                })
            })
        // .catch(function (error) {
        //     3
        //     console.log("Error getting documents: ", error);
        // });
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


    changeTask = (value, isDone) => {
        this.props.changeTask(value, isDone)
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
        const { pageTask, value, task } = this.state
        const { classes, roomName, roomMember, setBG, addGroup, roomUser, workGroup, workMember, emailAll, queryEmailUser, addGroupMember, user, studentShow, addWorkAll, joinGroupMem, requestGroupMember, cancleWorkAll, editTask, deleteTask, queryTask } = this.props;

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
                    <div>
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
                                task={task}
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
                                handleTaskQuery={this.handleTaskQuery}
                            />
                            {roomName.roomRole === 'student' && roomName.workRole !== 'no group' && roomName.workRole !== 'รอยืนยัน' ?

                                <div>
                                    {roomName.workDone === 'ส่งงานแล้ว' ?
                                        <CancleSubmitFile
                                            roomName={roomName}
                                            cancleWorkAll={cancleWorkAll}
                                        />
                                        :
                                        < PushWorkAll
                                            roomName={roomName}
                                            addWorkAll={addWorkAll}
                                        />
                                    }
                                </div>
                                :
                                null
                            }

                        </div>


                        {/* <Grid container spacing={12}>
                        <Grid container item xs={4} spacing={12}> */}
                        <FormRow classes={classes}
                            task={this.props.task}
                            user={this.props.user}
                            roomUser={roomUser}
                            roomName={roomName}
                            task={task}
                            changeTask={this.changeTask}
                            handleEditOpen={this.handleEditOpen}
                            handleToggleEditTask={this.handleToggleEditTask}
                            editTask={editTask}
                            deleteTask={deleteTask}
                            queryTask={queryTask}
                        />
                        {/* </Grid>
                    </Grid> */}



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
