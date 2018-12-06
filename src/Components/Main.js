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
import AddWork from './AddWork'

import update from 'immutability-helper';
import classNames from 'classnames';

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
const workGroupMemberRef = db.collection('workGroupMember')
const workGroupRef = db.collection('workGroup')

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
    // appBar: {
    //     transition: theme.transitions.create(['margin', 'width'], {
    //         easing: theme.transitions.easing.sharp,
    //         duration: theme.transitions.duration.leavingScreen,
    //     }),
    //     marginLeft: drawerWidth,
    //     [theme.breakpoints.up("sm")]: {
    //         width: `calc(100% - ${drawerWidth}px)`
    //     },
    //     backgroundColor: '#00CCFF',
    // },
    // appBarShift: {
    //     width: `calc(100% - ${drawerWidth}px)`,
    //     marginLeft: drawerWidth,
    //     transition: theme.transitions.create(['margin', 'width'], {
    //         easing: theme.transitions.easing.easeOut,
    //         duration: theme.transitions.duration.enteringScreen,
    //     }),
    // },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    menuButtonXsDown: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
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
            roomUser: [],
            work: [],
            workGroup: [],
            workMember: [],
            task: [],
            user: null,
            emailAll: [],
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
                self.onAddFirstMemberGroup(member)

            })

        self.setState({
            room: updateRoom,
        }, () => {
            console.log(room)
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
            console.log(work)
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
            console.log(task)
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
            })
        console.log(newMember)
    }

    addGroup = (newGroup) => {
        var { workGroup } = this.state
        var self = this
        var group = {
            name: newGroup.name,
            workId: newGroup.workId,
        }

        const updateWorkGroup = update(workGroup, { $push: [group] })

        workGroupRef.add(group)
            .then(function (docRef) {
                const groupLength = updateWorkGroup.length
                const groupId = docRef.id
                const workGroupMember = {
                    userId: newGroup.userId,
                    role: newGroup.role,
                    workGroupId: groupId,
                }
                updateWorkGroup[groupLength - 1].groupId = groupId
                self.onAddFirstWorkMember(workGroupMember)

            })

        self.setState({
            workGroup: updateWorkGroup,
        }, () => {
            console.log(workGroup)
        })
    }

    onAddFirstMemberGroup = (member) => {

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

    onAddFirstWorkMember = (workGroupMember) => {

        workGroupMemberRef.add(workGroupMember)

    }

    editRoom = (roomEdit) => {
        const { room } = this.state
        const id = roomEdit.roomId
        const editIndex = room.findIndex(item => item.roomId === id)
        const updataEditRoom = update(room, { [editIndex]: { $set: roomEdit } })
        // this.onArrayUpdate(editItem)
        roomRef.doc(id).set({
            name: roomEdit.name,
            subject: roomEdit.subject,
        }, { merge: true });
        this.setState({
            room: updataEditRoom,
        }, () => {
            console.log(this.state.room)
        })
    }

    editWork = (workEdit) => {
        const { work } = this.state
        const id = workEdit.workId
        const editIndex = work.findIndex(item => item.workId === id)


        const updateEditWork = update(work, { [editIndex]: { $set: workEdit } })
        // this.onArrayUpdate(editItem)
        workRef.doc(id).set({
            name: workEdit.name,

        }, { merge: true });
        this.setState({
            work: updateEditWork,
        }, () => {
            console.log(this.state.work)
        })
    }

    queryDeleteRoom = (roomDelete) => {
        const { room } = this.state
        const id = roomDelete
        var deleteWorkId = []
        var deleteTaskId = []
        var deleteRoomMemberId = []
        var deleteGroupId = []
        var deleteGroupMemberId = []
        var index = room.findIndex(item => item.roomId === id)

        const deleteRoom = update(room, { $splice: [[index, 1]] })


        workRef.where('roomId', '==', id)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    deleteWorkId.push({
                        workId: doc.id
                    })
                    taskRef.where('workId', '==', doc.id)
                        .get()
                        .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc2) {
                                deleteTaskId.push({
                                    taskId: doc2.id
                                })
                                deleteTaskId.map((value) => {
                                    taskRef.doc(value.taskId).delete()
                                })
                            })
                        })
                    workGroupRef.where('workId', '==', doc.id)
                        .get()
                        .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc2) {
                                deleteGroupId.push({
                                    groupId: doc2.id
                                })
                                workGroupMemberRef.where('workGroupId', '==', doc2.id)
                                    .get()
                                    .then(function (querySnapshot) {
                                        querySnapshot.forEach(function (doc3) {
                                            deleteGroupMemberId.push({
                                                groupMemberId: doc3.id
                                            })
                                            deleteGroupId.map((value) => {
                                                workGroupRef.doc(value.groupId).delete()
                                            })
                                            deleteGroupMemberId.map((value) => {
                                                workGroupMemberRef.doc(value.groupMemberId).delete()
                                            })
                                            deleteWorkId.map((value) => {
                                                workRef.doc(value.workId).delete()
                                            })
                                        })
                                    })
                            })
                        })
                })
            })

        roomMemberRef.where('roomId', '==', id)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    deleteRoomMemberId.push({
                        roomMemberId: doc.id
                    })
                    deleteRoomMemberId.map((value) => {
                        roomMemberRef.doc(value.roomMemberId).delete()
                    })
                })
            })



        this.deleteRoom(id, deleteRoom)
    };

    deleteRoom = (id, deleteRoom) => {
        roomRef.doc(id).delete()
        this.setState({
            room: deleteRoom,
        }, () => {
            console.log(this.state.room)
        })
    }

    querydeleteWork = (workDelete) => {
        const { work } = this.state
        const id = workDelete
        var deleteTaskId = []
        var deleteGroupId = []
        var deleteGroupMemberId = []
        var index = work.findIndex(item => item.workId === id)
        const deleteWork = update(work, { $splice: [[index, 1]] })


        workGroupRef.where('workId', '==', id)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    deleteGroupId.push({
                        groupId: doc.id
                    })
                    workGroupMemberRef.where('workGroupId', '==', doc.id)
                        .get()
                        .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc2) {
                                deleteGroupMemberId.push({
                                    groupMemberId: doc2.id
                                })
                                deleteGroupId.map((value) => {
                                    workGroupRef.doc(value.groupId).delete()
                                })
                                deleteGroupMemberId.map((value) => {
                                    workGroupMemberRef.doc(value.groupMemberId).delete()
                                })
                            })
                        })
                })
            })

        taskRef.where('workId', '==', id)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    deleteTaskId.push({
                        taskId: doc.id
                    })
                    deleteTaskId.map((value) => {
                        taskRef.doc(value.taskId).delete()
                    })
                })
            })

        this.deleteWork(id, deleteWork)
    };

    deleteWork = (id, deleteWork) => {
        workRef.doc(id).delete()
        this.setState({
            work: deleteWork,
        }, () => {
            console.log(this.state.work)
        })
    }

    onArrayUpdate = (updateWorks) => {
        this.setState({ work: updateWorks }, () => {
            console.log(this.state.work)
        })
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
                            var roomUser = {
                                displayName: doc2.data().displayName,
                                email: doc2.data().email,
                                photoURL: doc2.data().photoURL,
                                userRole: userRole,
                                workRole: null,
                                userId: doc2.id,
                            }
                            self.onSetUserRoom(roomUser)
                        })
                })
            })

        console.log(value)
    }

    queryEmailUser = () => {
        var emailAll = []
        var self = this
        userRef
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    emailAll.push({
                        email: doc.data().email
                    })
                    self.setState({
                        emailAll
                    }, () => {
                        console.log(emailAll)
                    })
                })
            })
    }

    onSetUserRoom = (roomUser) => {
        this.setState({
            roomUser: roomUser
        }, () => {
            console.log(this.state.roomUser)
        })
    }

    onClearEmail = () => {
        this.setState({
            emailAll: [],
        }, () => {
            console.log(this.state.emailAll)
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
                console.log(this.state.roomName, 'roomNameWork')
            })
        }
        else {
            this.queryTask(value)


            this.setState({
                roomName: value,
                pageWork: page
            }, () => {
                console.log(this.state.roomName, 'roomNameTask')
            })
        }


    }

    backPage = (roomName, page) => {
        if (page === 'room') {
            this.queryRoom()

            this.setState({
                pageWork: page,
                roomName: [],
                work: [],
                roomMember: [],
                task: [],
            })
            console.log(roomName, page)
        } else if (page === 'work') {

            this.queryWork(roomName)

            this.setState({
                pageWork: page,
                task: [],

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

    handleDrawerOpen = () => {
        this.setState({ desktopOpen: true });
    };

    handleDrawerClose = () => {
        this.setState({ desktopOpen: false });
    };

    renderPage = () => {
        const { pageWork, roomName, room, page, work, task, roomMember, roomUser, workGroup, emailAll } = this.state

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
                            queryDeleteRoom={this.queryDeleteRoom}
                            editRoom={this.editRoom}
                            queryEmailUser={this.queryEmailUser}
                        />
                    </div>
                );
            case 'work':
                return (
                    <div>
                        <AddWork
                            roomName={roomName}
                            addWork={this.addWork}
                        />

                        <Work
                            roomName={roomName}
                            user={this.props.user}
                            work={work}
                            roomMember={roomMember}
                            roomUser={roomUser}
                            emailAll={emailAll}

                            pageChange={this.pageChange}
                            addWork={this.addWork}
                            backPage={this.backPage}
                            addRoomMember={this.addRoomMember}
                            editWork={this.editWork}
                            querydeleteWork={this.querydeleteWork}
                            queryEmailUser={this.queryEmailUser}
                            onClearEmail={this.onClearEmail}
                        />

                    </div>
                );
            case 'task':
                return (
                    <Task
                        roomName={roomName}
                        task={task}
                        user={this.props.user}
                        setBG={this.state.setBG}
                        roomMember={roomMember}
                        roomUser={roomUser}
                        workGroup={workGroup}

                        pageChange={this.pageChange}
                        addTask={this.addTask}
                        backPage={this.backPage}
                        changeTask={this.changeTask}
                        addGroup={this.addGroup}
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
        const { page, mobileOpen, roomName, room, anchorEl, desktopOpen } = this.state;


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
                            disableGutters={!desktopOpen}
                            aria-owns={anchorEl ? 'simple-menu' : null}
                            aria-haspopup="true"
                            color="inherit"
                            onClick={this.handleMenuOpen}
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
                            variant="persistent"
                            anchor="left"
                            open
                        >
                            <Navigation
                                handleListItemClick={this.handleListItemClick}
                                handleDrawerClose={this.handleDrawerClose}
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
