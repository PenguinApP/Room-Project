import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import firebase, { db, auth } from '../Config/Firebase';
import Room from './Room';
import Work from './Work';
import Navigation from './Navigation';
import AddRoom from './AddRoom';
import Task from './Task';
import Upload from './Upload';
import PicDummy from '../Picture/User-dummy-300x300.png'

import update from 'immutability-helper';

import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import DraftsIcon from '@material-ui/icons/Drafts';
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from '@material-ui/icons/AccountCircle';

const roomRef = db.collection('room')
const roomMemberRef = db.collection('roomMember')
const workRef = db.collection('work')
const taskRef = db.collection('task')
const userRef = db.collection('user')

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: "flex"
    },
    grow: {
        flexGrow: 1,
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        backgroundColor: '#00CCFF',
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        margin: 10,

    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
    addRoom: {
        textAlign: 'right',
    },
});

class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 'room',
            pageWork: 'room',
            mobileOpen: false, 
            anchorEl: null,
            room: [],
            roomName: [],
            roomMember: [],
            work: [],
            task: [],
            user: null,
            roomUser: [],
            email: '',
            setBG: '0px',
        }
    }

    componentWillMount() {
        this.queryRoom()
    }

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    addRoom = (Room) => {
        var { room } = this.state
        var { user } = this.props
        var self = this

        var Room = {
            name: Room.roomName,
            subject: Room.subject,
        }

        const updateRoom = update(room, { $push: [Room] })

        roomRef.add(Room)
            .then(function (docRef) {
                const RoomLength = updateRoom.length
                const roomId = docRef.id
                const member = {
                    userId: user.uid,
                    userRole: 'teacher',
                    roomId: roomId,
                }
                updateRoom[RoomLength - 1].roomId = roomId
                self.onAddFirstMember(member)

            })

        self.setState({
            room: updateRoom,
        }, () => {
            console.log(updateRoom)
        })
    }

    addWork = (Work) => {
        var { work } = this.state
        var self = this


        const updateWork = update(work, { $push: [Work] })

        workRef.add(Work)
            .then(function (docRef) {
                const WorkLength = updateWork.length
                const workId = docRef.id
                updateWork[WorkLength - 1].workId = workId
                self.onArrayUpdate(updateWork)
            })

        self.setState({

        }, () => {
            console.log(updateWork)
        })

    }

    addTask = (Task) => {
        var { task } = this.state
        var self = this


        const updateTask = update(task, { $push: [Task] })

        taskRef.add(Task)
            .then(function (docRef) {
                const TaskLength = updateTask.length
                const taskId = docRef.id
                updateTask[TaskLength - 1].taskId = taskId
            })

        self.setState({
            task: updateTask,
        }, () => {
            console.log(updateTask)
        })
    }

    addRoomMember = (newMember) => {
        var { roomMember, email } = this.state
        var self = this
        var uid = this.props.user.uid
        const queryUserRef = userRef.where('email', '==', newMember.email)

        queryUserRef
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {

                    var email = doc.data().email

                    var member = {
                        userId: doc.id,
                        userRole: newMember.userRole,
                        roomId: newMember.roomId,
                    }

                    var memberRef = {
                        displayName: doc.data().displayName,
                        email: email,
                        photoURL: doc.data().photoURL,
                        userRole: newMember.userRole,
                    }

                    const updateRoomMember = update(roomMember, { $push: [memberRef] })

                    roomMemberRef.add(member)
                        .then(function (docRef) {
                            const memberLength = updateRoomMember.length
                            const roomMemberId = docRef.id
                            updateRoomMember[memberLength - 1].roomMemberId = roomMemberId
                        })

                    self.setState({
                        email: email,
                        roomMember: updateRoomMember,
                    }, () => {
                        console.log(email, roomMember)
                    })
                })
            }, () => {
                // if (this.state.email === '') {
                //     alert('ไม่มี email นี้ในระบบ')
                // } else {
                //     this.onClearEmail()
                // }
            })
        console.log(newMember)
    }

    editRoom = (roomEdit) => {
        const { room } = this.state
        const id = roomEdit.roomId
        const editIndex = room.findIndex(item => item.roomId === id)
        const editItem = update(room, { [editIndex]: { $set: roomEdit } })
        // this.onArrayUpdate(editItem)
        roomRef.doc(id).set({
            name: roomEdit.name,
            subject: roomEdit.subject,
        }, { merge: true });
        this.setState({
            room: editItem,
        }, () => {
            console.log(this.state.room)
        })
    }

    deleteRoom = (roomDelete) => {
        const { room } = this.state
        const id = roomDelete
        var index = room.findIndex(item => item.roomId === id)
        //console.log(this.state.items,'before')
        //console.log(index,'index')
        const deleteRoom = update(room, { $splice: [[index, 1]] })

        workRef.where('roomId', '==', id)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {

                    taskRef.where('workId', '==', doc.id)
                        .get()
                        .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc2) {
                                taskRef.doc(doc2.id).delete()
                                workRef.doc(doc.id).delete()

                            })
                        })
                })
            })

        roomMemberRef.where('roomId', '==', id)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    roomMemberRef.doc(doc.id).delete()
                })
            })

        roomRef.doc(id).delete()
        this.setState({
            room: deleteRoom,
        })
        console.log(deleteRoom)
    };


    onArrayUpdate = (updateWorks) => {
        this.setState({ work: updateWorks }, () => {
            console.log(this.state.work)
        })
    }

    onAddFirstMember = (member) => {

        // var RoomMember = {
        //     memberID: user.uid,
        //     memberRole: 'Teacher',
        //     roomID: room.id
        // }

        // const updateRoomMember = update(roomMember, { $push: [RoomMember] })

        roomMemberRef.add(member)

        //     .then(function (docRef) {
        //         const RoomMemberLength = updateRoomMember.length
        //         const id = docRef.id
        //         updateRoomMember[RoomMemberLength - 1].id = id
        //     })

    }

    queryRoom = () => {
        var room = []
        var roomMember = []
        var uid = this.props.user.uid
        var self = this
        const queryRoomRef = roomMemberRef.where('userId', '==', uid)

        queryRoomRef
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    const { roomId } = doc.data()

                    roomRef.doc(roomId)
                        .get()
                        .then(function (doc2) {
                            room.push({
                                name: doc2.data().name,
                                subject: doc2.data().subject,
                                roomId: doc2.id,
                            })
                            self.setState({ room }, () => {
                                console.log(room)
                            })
                        })
                })
                // .catch(function (error) {
                //     3
                //     console.log("Error getting documents: ", error);
                // });
            })
    };

    queryWork = (value) => {
        var work = []
        var self = this
        const queryWorkRef = workRef.where('roomId', '==', value.roomId)

        queryWorkRef
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    work.push({
                        name: doc.data().name,
                        startAt: doc.data().startAt,
                        endAt: doc.data().endAt,
                        content: doc.data().content,
                        isDone: doc.data().isDone,
                        roomId: doc.data().roomId,
                        workId: doc.id,
                    })
                    self.setState({ work }, () => {
                        console.log(work)
                    })
                })
            })
        // .catch(function (error) {
        //     3
        //     console.log("Error getting documents: ", error);
        // });


    }

    queryTask = (value) => {
        var task = []
        var self = this
        const queryTaskRef = taskRef.where('workId', '==', value.workId)

        queryTaskRef
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    task.push({
                        name: doc.data().name,
                        startAt: doc.data().startAt,
                        endAt: doc.data().endAt,
                        content: doc.data().content,
                        isDone: doc.data().isDone,
                        roomId: doc.data().roomId,
                        workId: doc.data().workId,
                        taskId: doc.id
                    })
                    self.setState({ task }, () => {
                        console.log(task)
                    })
                })
            })
        // .catch(function (error) {
        //     3
        //     console.log("Error getting documents: ", error);
        // });

    }

    queryMemberRoom = (value) => {
        var roomMember = []
        var self = this
        const queryMemberRef = roomMemberRef.where('roomId', '==', value.roomId)

        queryMemberRef
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    const { userId } = doc.data()
                    const { userRole } = doc.data()
                    userRef.doc(userId)
                        .get()
                        .then(function (doc2) {
                            roomMember.push({
                                displayName: doc2.data().displayName,
                                email: doc2.data().email,
                                photoURL: doc2.data().photoURL,
                                userRole: userRole,
                                roomMemberId: doc2.id,
                            })
                            self.setState({ roomMember }, () => {
                                console.log(roomMember)
                            })
                        })
                })
            })

        console.log(value)
    }

    queryUserRoom = (value) => {
        var roomUser = []
        var self = this
        var uid = this.props.user.uid
        const queryMemberRef = roomMemberRef.where('roomId', '==', value.roomId).where('userId', '==', uid)

        queryMemberRef
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    const { userId } = doc.data()
                    const { userRole } = doc.data()
                    userRef.doc(userId)
                        .get()
                        .then(function (doc2) {
                            roomUser.push({
                                displayName: doc2.data().displayName,
                                email: doc2.data().email,
                                photoURL: doc2.data().photoURL,
                                userRole: userRole,
                                userId: doc2.id,
                            })
                            self.setState({ roomUser }, () => {
                                console.log(roomUser)
                            })
                        })
                })
            })

        console.log(value)
    }

    onClearEmail = () => {
        this.setState({
            email: ''
        })
    }

    handleMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleMenu = (menu) => {
        this.setState({ anchorEl: null });
        this.props.changeMenu(menu)
    };

    pageChange = (value, page) => {
        if (page === 'work') {
            this.queryWork(value)
            this.queryMemberRoom(value)
            this.queryUserRoom(value)
            this.setState({
                roomName: value,
                pageWork: page
            }, () => {
                console.log(this.state.roomName)
            })
        }
        else {
            this.queryTask(value)
            this.setState({
                roomName: value,
                pageWork: page
            }, () => {
                console.log(this.state.roomName)
            })
        }


    }

    backPage = (roomName, page) => {
        if (page === 'room') {
            this.queryRoom()

            this.setState({
                pageWork: page,
                roomName: [],
            })
            console.log(roomName, page)
        } else if (page === 'work') {

            this.queryWork(roomName)

            this.setState({
                pageWork: page

            })

        }

    }

    changeTask = (value) => {
        const { task } = this.state
        const id = value.taskId
        const editIndex = task.findIndex(item => item.taskId === id)
        const editItem = update(task, { [editIndex]: { $set: value } })
        // this.onArrayUpdate(editItem)
        taskRef.doc(id).set({
            isDone: value.isDone
        }, { merge: true });
        this.setState({
            task: editItem,
        }, () => {
            console.log(this.state.task)
        })

        console.log(value)
    }


    logout = (Page) => {
        firebase.auth().signOut();
        this.props.onsetUserNull(Page)
    }

    handleListItemClick = (page) => {
        this.setState({ page: page }, () => {
            console.log(this.state.page)
        });
    };

    renderPage = () => {
        const { pageWork, roomName, room, page, work, roomMember, roomUser } = this.state

        switch (pageWork) {
            case 'room':
                return (
                    <div>
                        <AddRoom
                            roomName={roomName}

                            addRoom={this.addRoom}
                        />
                        <Room
                            page={page}
                            room={room}
                            user={this.props.user}

                            addRoom={this.addRoom}
                            pageChange={this.pageChange}
                            deleteRoom={this.deleteRoom}
                            editRoom={this.editRoom}
                        />
                    </div>
                );
            case 'work':
                return (
                    <div>
                        {/* <AddWork /> */}

                        <Work
                            roomName={roomName}
                            user={this.props.user}
                            work={work}
                            roomMember={roomMember}
                            roomUser={roomUser}

                            pageChange={this.pageChange}
                            addWork={this.addWork}
                            backPage={this.backPage}
                            addRoomMember={this.addRoomMember}


                        />

                    </div>
                );
            case 'task':
                return (
                    <Task
                        roomName={roomName}
                        task={this.state.task}
                        user={this.props.user}
                        setBG={this.state.setBG}
                        roomMember={roomMember}

                        pageChange={this.pageChange}
                        addTask={this.addTask}
                        backPage={this.backPage}
                        changeTask={this.changeTask}
                        
                    />
                )

            case 'testUpload':
                return (
                    <Upload />
                )
        }
    }

    render() {
        const { classes, theme, user } = this.props;
        const { page, mobileOpen, roomName, room, anchorEl } = this.state;


        return (
            <div className={classes.root}>

                <CssBaseline />

                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>

                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>


                        <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
                            {roomName.name || 'Room'}
                        </Typography>


                        <Avatar alt={user.email} src={user.photoURL || PicDummy} className={classes.avatar} />

                        <IconButton
                            aria-owns={anchorEl ? 'simple-menu' : null}
                            aria-haspopup="true"
                            color="inherit"
                            onClick={this.handleMenuOpen}
                            color="inherit"
                        >
                            <MoreVertIcon />
                        </IconButton>

                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={() => this.logout('Home')}>Logout</MenuItem>

                        </Menu>

                    </Toolbar>
                </AppBar>

                <nav className={classes.drawer}>
                    {/* The implementation can be swap with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={theme.direction === "rtl" ? "right" : "left"}
                            open={mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            ModalProps={{
                                keepMounted: true // Better open performance on mobile.
                            }}
                        >
                            <Navigation
                                handleListItemClick={this.handleListItemClick}
                            />

                        </Drawer>
                    </Hidden>

                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            variant="permanent"
                            open
                        >
                            <Navigation
                                handleListItemClick={this.handleListItemClick}
                            />
                        </Drawer>
                    </Hidden>

                </nav>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {page === 'room' ?
                        <div>
                            {this.renderPage()}
                        </div>
                        : null
                    }
                </main>

            </div>
        );
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
    container: PropTypes.object,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Main);
