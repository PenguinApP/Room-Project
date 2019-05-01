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
import JoinRoom from "./JoinRoom";
import PostsWork from "./PostsWork";

import moment from 'moment';

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
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
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
const Posts = db.collection('Posts')

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
        backgroundColor: '#009688',
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
        width: drawerWidth,
        backgroundColor: '#37474F'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        // backgroundColor: '#E0F2F1',
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
    bottomNavUp: {
        position: 'fixed',
        width: '100%',
        bottom: 0,
        right: '25%',
        left: '35%',
        marginLeft: '-35%',
    },
    bottomNavDown:{
        position: 'fixed',
        width: '100%',
        bottom: 0,
        right: '25%',
        left: '50%',
        marginLeft: '-45%',
    }

});

class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 'room',
            pageWork: 'room',
            subPageRoom: 0,
            mobileOpen: false,
            anchorEl: null,
            room: [],
            roomName: [],
            roomMember: [],
            roomUser: [],
            work: [],
            workW8: null,
            workGroup: [],
            workMember: [],
            workRole: '',
            workCheck: false,
            task: [],
            userRole: null,
            emailAll: [],
            setBG: '0px',
            studentShow: [],
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        var self = this
        const { roomName } = this.state
        const { user } = this.props
        var room = []
        const queryRoomRef = roomMemberRef.where("userId", "==", user.uid)

        queryRoomRef
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {
                    if (change.type === "added") {
                        console.log(change.doc.data().roomId, "add")
                        roomRef.doc(change.doc.data().roomId)
                            .get()
                            .then(function (doc) {
                                room.push({
                                    roomId: doc.id,
                                    name: doc.data().name,
                                    subject: doc.data().subject,
                                    roomRole: change.doc.data().userRole,
                                })
                                self.setState({
                                    room: room
                                }, () => {
                                    console.log(room, 'room')
                                })
                            })
                    }
                    if (change.type === "modified") {

                    }
                    if (change.type === "removed") {

                    }
                });
            });

        roomRef
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {
                    if (change.type === "modified") {
                        console.log(change.doc.id, "edit")
                        roomMemberRef.where("roomId", "==", change.doc.id).where("userId", "==", user.uid)
                            .get()
                            .then(function (querySnapshot) {
                                querySnapshot.forEach(function (doc) {
                                    const { roomId } = doc.data()
                                    roomRef.doc(roomId)
                                        .get()
                                        .then(function (doc2) {
                                            var roomEdit = {
                                                roomId: doc2.id,
                                                name: doc2.data().name,
                                                subject: doc2.data().subject,
                                                roomRole: doc.data().userRole,
                                            }
                                            const editIndex = self.state.room.findIndex(item => item.roomId === change.doc.id)
                                            const updateEditRoom = update(self.state.room, { [editIndex]: { $set: roomEdit } })
                                            self.setState({
                                                room: updateEditRoom,
                                            }, () => {
                                                console.log(self.state.room)
                                            })
                                        })
                                })
                            })
                    }
                    if (change.type === "removed") {
                        console.log(change.doc.id, "delete")
                        var index = room.findIndex(item => item.roomId === change.doc.id)
                        const deleteRoom = update(room, { $splice: [[index, 1]] })
                        self.setState({
                            room: deleteRoom,
                        }, () => {
                            console.log(self.state.room)
                        })
                    }
                })
            })

    }
    componentWillUnmount() {

    }

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    addRoom = (Room) => {
        var { room } = this.state
        var { user } = this.props
        var self = this

        var newRoom = {
            name: Room.name,
            subject: Room.subject,
            roomRole: 'teacher',
        }

        const updateRoom = update(room, { $push: [newRoom] })

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

        // this.setState({
        //     room: updateRoom,
        // }, () => {
        //     console.log(this.state.room)
        // })
    }

    addWork = (Work) => {
        var { work } = this.state
        var self = this

        var newWork = {
            name: Work.name,
            startAt: Work.startAt,
            endAt: Work.endAt,
            content: Work.content,
            isDone: Work.isDone,
            roomId: Work.roomId,
            roomRole: 'teacher',
            workGroupId: 'no group',
            workGroup: 'no group',
            workRole: 'teacher',
            workDone: 'teacher',
        }

        const updateWork = update(work, { $push: [newWork] })

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
            console.log(this.state.task)
        })
    }

    addRoomMember = (newMember) => {
        var { roomMember } = this.state
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
                        roomRole: newMember.userRole,
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



    addGroup = (newGroup, value) => {
        var { workGroup, roomName } = this.state
        var self = this
        var group = {
            name: newGroup.name,
            workId: newGroup.workId,
            workDone: 'ยังไม่ส่งงาน',
            contentWork: '',
            fileURL: null,
            fileName: null,
            submitDate: new Date()
        }

        var newRoomName = {
            name: value.name,
            startAt: value.startAt,
            endAt: value.endAt,
            content: value.content,
            contentWork: '',
            isDone: value.isDone,
            roomId: value.roomId,
            roomRole: value.roomRole,
            workId: value.workId,
            workGroup: newGroup.name,
            workRole: newGroup.role,
            workDone: 'ยังไม่ส่งงาน',
        }

        const updateWorkGroup = update(workGroup, { $push: [group] })

        const updateRoomName = update(roomName, { $set: newRoomName })

        workGroupRef.add(group)
            .then(function (docRef) {
                const groupLength = updateWorkGroup.length
                const groupLength2 = updateRoomName.length
                const groupId = docRef.id
                const workGroupMember = {
                    userId: newGroup.userId,
                    role: newGroup.role,
                    workGroupId: groupId,
                }
                updateWorkGroup[groupLength - 1].groupId = groupId
                updateRoomName.workGroupId = groupId
                self.onAddFirstWorkMember(workGroupMember)
                self.queryMemberWork(updateRoomName)
            })

        self.setState({
            workGroup: updateWorkGroup,
            roomName: updateRoomName,

        }, () => {
            console.log(this.state.workGroup, this.state.roomName)
        })
    }

    addGroupMember = (newMember) => {
        var { workMember } = this.state
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
                        role: newMember.userRole,
                        workGroupId: newMember.workGroupId,
                    }

                    var memberRef = {
                        userId: doc.id,
                        displayName: doc.data().displayName,
                        email: email,
                        photoURL: doc.data().photoURL,
                        workRole: newMember.userRole,
                        workGroupId: newMember.workGroupId,
                    }

                    const updateWorkMember = update(workMember, { $push: [memberRef] })

                    workGroupMemberRef.add(member)
                        .then(function (docRef) {
                            const memberLength = updateWorkMember.length
                            const workMemberId = docRef.id
                            updateWorkMember[memberLength - 1].workGroupMemberId = workMemberId
                        })

                    self.setState({
                        workMember: updateWorkMember,
                    }, () => {
                        console.log(updateWorkMember)
                    })
                })
            })
        console.log(newMember)
    }

    addWorkAll = (workAll) => {
        const { roomName } = this.state
        const id = workAll.workGroupId
        var newRoomName = {
            content: '',
            contentWork: workAll.contentWork,
            endAt: roomName.endAt,
            isDone: roomName.isDone,
            name: roomName.name,
            roomId: roomName.roomId,
            roomRole: roomName.roomRole,
            startAt: roomName.startAt,
            workDone: workAll.workDone,
            workGroup: roomName.workGroup,
            workGroupId: workAll.workGroupId,
            workId: workAll.workId,
            workRole: roomName.workRole,

        }
        console.log(roomName)

        workGroupRef.doc(id).set({
            contentWork: workAll.contentWork,
            workDone: workAll.workDone,
            fileURL: workAll.fileURL,
            fileName: workAll.fileName,
            submitDate: workAll.submitDate
        }, { merge: true });
        this.setState({
            roomName: newRoomName,
        }, () => {
            console.log(this.state.roomName)
        })
        console.log(workAll)
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
        // const editIndex = room.findIndex(item => item.roomId === id)
        // const updataEditRoom = update(room, { [editIndex]: { $set: roomEdit } })
        // this.onArrayUpdate(editItem)
        roomRef.doc(id).set({
            name: roomEdit.name,
            subject: roomEdit.subject,
        }, { merge: true });
        // this.setState({
        //     room: updataEditRoom,
        // }, () => {
        //     console.log(this.state.room)
        // })
    }

    editWork = (workEdit) => {
        const { work } = this.state
        const id = workEdit.workId
        const editIndex = work.findIndex(item => item.workId === id)

        const updateEditWork = update(work, { [editIndex]: { $set: workEdit } })
        // this.onArrayUpdate(editItem)
        workRef.doc(id).set({
            name: workEdit.name,
            content: workEdit.content,
            endAt: workEdit.endAt,
        }, { merge: true });
        this.setState({
            work: updateEditWork,
        }, () => {
            console.log(this.state.work)
        })
    }

    editTask = (taskEdit) => {
        const { task } = this.state
        const id = taskEdit.taskId
        const editIndex = task.findIndex(item => item.taskId === id)

        const updateEditTask = update(task, { [editIndex]: { $set: taskEdit } })

        taskRef.doc(id).set({
            name: taskEdit.name,
            content: taskEdit.content,
        }, { merge: true });
        this.setState({
            task: updateEditTask,
        }, () => {
            console.log(this.state.task)
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
        // var index = room.findIndex(item => item.roomId === id)

        // const deleteRoom = update(room, { $splice: [[index, 1]] })


        workRef.where('roomId', '==', id)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    deleteWorkId.push({
                        workId: doc.id
                    })
                    deleteWorkId.map((value) => {
                        workRef.doc(value.workId).delete()
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



        this.deleteRoom(id)
    };

    deleteRoom = (id) => {
        roomRef.doc(id).delete()
        // this.setState({
        //     room: deleteRoom
        // }, () => {
        //     console.log(this.state.room)
        // })
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

    deleteTask = (value) => {
        const { task } = this.state
        const id = value.taskId

        var index = task.findIndex(item => item.taskId === id)

        const deleteTask = update(task, { $splice: [[index, 1]] })

        taskRef.doc(id).delete()

        this.setState({
            task: deleteTask,
        }, () => {
            console.log(this.state.task)
        })
    }

    onArrayUpdate = (updateWorks) => {
        this.setState({ work: updateWorks }, () => {
            console.log(this.state.work)
        })
    }

    joinRoomMember = (roomId) => {
        var { roomMember } = this.state
        var self = this
        var { user } = this.props

        var member = {
            userId: user.uid,
            userRole: 'student',
            roomId: roomId,
        }

        var memberUpdate = {
            displayName: user.name,
            email: user.email,
            photoURL: user.photoURL,
            roomRole: 'student',
        }

        const updateRoomMember = update(roomMember, { $push: [memberUpdate] })

        roomMemberRef.add(member)
            .then(function (docRef) {
                const memberLength = updateRoomMember.length
                const roomMemberId = docRef.id
                updateRoomMember[memberLength - 1].roomMemberId = roomMemberId
            })

        self.setState({
            roomMember: updateRoomMember,
        }, () => {
            this.queryRoom()
        })
    }

    joinGroupMem = (roomNameOld, newMemGroup) => {
        var { roomName } = this.state
        var { user } = this.props

        var member = {
            userId: user.uid,
            role: 'รอยืนยัน',
            workGroupId: newMemGroup.groupId,
        }

        var roomNameUpdate = {
            content: roomNameOld.content,
            contentWork: roomNameOld.contentWork,
            endAt: roomNameOld.endAt,
            isDone: roomNameOld.isDone,
            name: roomNameOld.name,
            roomId: roomNameOld.roomId,
            roomRole: roomNameOld.roomRole,
            startAt: roomNameOld.startAt,
            workDone: roomNameOld.workDone,
            workGroup: newMemGroup.name,
            workGroupId: newMemGroup.groupId,
            workId: roomNameOld.wordId,
            workRole: 'รอยืนยัน',
        }

        workGroupMemberRef.add(member)
        this.queryMemberWork(member)
        this.setState({
            roomName: roomNameUpdate
        }, () => {
            console.log(this.state.roomName)
        })

    }

    requestGroupMember = (value) => {
        var { workMember } = this.state
        var id = value.workGroupMemberId
        var self = this

        if (value.workRole === 'member') {
            var acceptMember = {
                userId: value.userId,
                role: value.workRole,
                workGroupId: value.workGroupId,

            }

            var updateMember = {
                userId: value.userId,
                displayName: value.displayName,
                email: value.email,
                photoURL: value.photoURL,
                workGroupId: value.workGroupId,
                workGroupMemberId: value.workGroupMemberId,
                workRole: value.workRole,
            }

            const editIndex = workMember.findIndex(item => item.workGroupMemberId === id)

            const updateworkMember = update(workMember, { [editIndex]: { $set: updateMember } })

            workGroupMemberRef.doc(id).set({
                role: value.workRole,
            }, { merge: true });
            this.setState({
                workMember: updateworkMember,
            }, () => {
                console.log(self.state.workMember)
            })

        } else {
            workGroupMemberRef.doc(id).delete()
        }
    }

    cancleWorkAll = (value) => {

        const { roomName } = this.state
        const id = value.workGroupId

        workGroupRef.doc(id).set({
            workDone: 'ยังไม่ส่งงาน',
            contentWork: '',
            fileName: null,
            fileURL: null,
        }, { merge: true });
        this.setState({
            roomName: value,
        }, () => {
            console.log(this.state.work)
        })

        console.log(value)
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
                                roomRole: doc.data().userRole,
                            })
                            self.setState({ room }, () => {
                                console.log(self.state.room, 'room')
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
        if (value.roomRole === 'teacher') {
            queryWorkRef
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        work.push({
                            name: doc.data().name,
                            startAt: doc.data().startAt.toDate(),
                            endAt: doc.data().endAt.toDate(),
                            content: doc.data().content,
                            isDone: doc.data().isDone,
                            contentWork: '',
                            roomId: doc.data().roomId,
                            roomRole: 'teacher',
                            workId: doc.id,
                            workGroupId: 'no group',
                            workGroup: 'no group',
                            workRole: 'teacher',
                            workDone: 'unDone',
                        })
                        self.setState({ work }, () => {
                            console.log(self.state.work, 'work')
                            // self.onSetWork(self.state.work)
                        })
                    })
                })
            // .catch(function (error) {
            //     3
            //     console.log("Error getting documents: ", error);
            // });
        } else {
            queryWorkRef
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        work.push({
                            name: doc.data().name,
                            startAt: doc.data().startAt.toDate(),
                            endAt: doc.data().endAt.toDate(),
                            content: doc.data().content,
                            isDone: doc.data().isDone,
                            roomId: doc.data().roomId,
                            contentWork: '',
                            roomRole: 'student',
                            workId: doc.id,
                            workGroupId: 'no group',
                            workGroup: 'no group',
                            workRole: 'no group',
                            workDone: 'ยังไม่ส่งงาน',
                        })
                        self.setState({ work }, () => {
                            console.log(self.state.work, 'work')
                            self.queryWorkStudentGroup()
                        })
                    })
                })
        }
    }

    queryWorkStudentGroup = () => {
        const { work } = this.state
        var workUpdate = [];
        var uid = this.props.user.uid
        var self = this
        const queryGroupMemberRef = workGroupMemberRef.where('userId', '==', uid)

        queryGroupMemberRef
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    const { workGroupId } = doc.data()

                    workGroupRef.doc(workGroupId)
                        .get()
                        .then(function (doc2) {
                            const { workId } = doc2.data()
                            workRef.doc(workId)
                                .get()
                                .then(function (doc3) {
                                    workUpdate.push({
                                        name: doc3.data().name,
                                        startAt: doc3.data().startAt.toDate(),
                                        endAt: doc3.data().endAt.toDate(),
                                        content: doc3.data().content,
                                        isDone: doc3.data().isDone,
                                        contentWork: doc2.data().contentWork,
                                        roomId: doc3.data().roomId,
                                        roomRole: 'student',
                                        workId: doc3.id,
                                        workGroupId: doc2.id,
                                        workGroup: doc2.data().name,
                                        workRole: doc.data().role,
                                        workDone: doc2.data().workDone,
                                        submitDate: doc2.data().submitDate.toDate()
                                    })
                                    self.queryWorkGroupUpdate(workUpdate)
                                    // workUpdate.map((value) => {
                                    //     const updateIndex = work.findIndex(item => item.workId === value.workId)

                                    //     const updateWork = update(work, { [updateIndex]: { $set: value } })

                                    //     self.setState({ work: updateWork }, () => {
                                    //         console.log(self.state.work, 'workUpdate')
                                    //         // self.onSetWork(self.state.work)
                                    //     })

                                    // })

                                })
                        })
                })

            })

    }

    // onSetWork = (work) => {
    //     this.setState({ work: work }, () => {
    //         console.log(this.state.work, 'workUpdate')
    //     })
    // }

    queryWorkGroupUpdate = (workUpdate) => {
        const { work } = this.state

        workUpdate.map((value) => {

            const updateIndex = work.findIndex(item => item.workId === value.workId)

            const updateWork = update(work, { [updateIndex]: { $set: value } })

            this.setState({ work: updateWork }, () => {
                console.log(this.state.work, 'workUpdate')
                // self.onSetWork(self.state.work)
            })

        })
    }


    queryTask = (value) => {
        var task = []
        var self = this
        const queryTaskRef = taskRef.where('workId', '==', value.workId).where('workGroupId', '==', value.workGroupId)

        queryTaskRef
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    const { responsibleUser } = doc.data()
                    if (responsibleUser) {
                        userRef.doc(responsibleUser)
                            .get()
                            .then(function (doc2) {
                                task.push({
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
                            })
                    } else {
                        task.push({
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
                    self.setState({ task }, () => {
                        console.log(self.state.task)
                    })
                })
            })
        // .catch(function (error) {
        //     3
        //     console.log("Error getting documents: ", error);
        // });
    }

    handleTaskQuery = (value) => {
        var task = []
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
                                task.push({
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
                                self.setState({ task }, () => {
                                    console.log(self.state.task)
                                })
                            })
                    } else {
                        task.push({
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
                    self.setState({ task }, () => {
                        console.log(self.state.task)
                    })
                })
            })
        // .catch(function (error) {
        //     3
        //     console.log("Error getting documents: ", error);
        // });
    }



    queryWorkTaskBack = (roomNameBack) => {
        const { roomName } = this.state
        var self = this
        var uid = this.props.user.uid
        var roomId = roomNameBack.roomId
        const queryRoleRef = roomMemberRef.where('roomId', '==', roomId).where('userId', '==', uid)

        roomRef.doc(roomId)
            .get()
            .then(function (doc) {
                queryRoleRef
                    .get()
                    .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc2) {
                            var newRoomName = {
                                name: doc.data().name,
                                subject: doc.data().subject,
                                roomId: doc.id,
                                roomRole: doc2.data().userRole,
                            }
                            const updateRoomName = update(roomName, { $set: newRoomName })

                            self.setState({ roomName: updateRoomName }, () => {
                                console.log(self.state.roomName)
                            })
                        })

                    })
            })
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
                                roomRole: userRole,
                                roomMemberId: doc2.id,
                            })
                            self.setState({ roomMember }, () => {
                                console.log(self.state.roomMember, 'roomMember')
                            })
                        })
                })
            })

    }

    queryGroupWork = (value) => {
        var workGroup = []
        var self = this

        const queryGroupRef = workGroupRef.where('workId', '==', value.workId)

        queryGroupRef
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    workGroup.push({
                        name: doc.data().name,
                        workId: doc.data().workId,
                        groupId: doc.id,
                    })
                    self.setState({ workGroup }, () => {
                        console.log(self.state.workGroup, 'workGroup')
                    })
                })
            })
    }


    queryMemberWork = (value) => {
        var groupName = []
        var workMember = []
        var self = this
        // const queryWorkRef = workGroupRef.where('workId', '==', value.workId).where('workGroupId', '==', value.workGroupId)


        // queryWorkRef
        //     .get()
        //     .then(function (querySnapshot) {
        //         querySnapshot.forEach(function (doc) {
        //             var groupname = {
        //                 workGroupId: doc.id
        //             }
        const queryWorkMemberRef = workGroupMemberRef.where('workGroupId', '==', value.workGroupId)
        queryWorkMemberRef
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    const { userId } = doc.data()
                    const { role } = doc.data()
                    userRef.doc(userId)
                        .get()
                        .then(function (doc2) {
                            workMember.push({
                                userId: doc2.id,
                                displayName: doc2.data().displayName,
                                email: doc2.data().email,
                                photoURL: doc2.data().photoURL,
                                workRole: role,
                                workGroupId: doc.data().workGroupId,
                                workGroupMemberId: doc.id,
                            })
                            self.setState({ workMember }, () => {
                                console.log(self.state.workMember, 'workMember')
                            })
                        })
                })
            })

        //     })
        // })

    }


    // queryUserRoom = (value) => {
    //     var self = this
    //     var uid = this.props.user.uid
    //     const queryMemberRef = roomMemberRef.where('roomId', '==', value.roomId).where('userId', '==', uid)

    //     queryMemberRef
    //         .get()
    //         .then(function (querySnapshot) {
    //             querySnapshot.forEach(function (doc) {
    //                 const { userId } = doc.data()
    //                 const { userRole } = doc.data()
    //                 userRef.doc(userId)
    //                     .get()
    //                     .then(function (doc2) {
    //                         var roomUser = {
    //                             displayName: doc2.data().displayName,
    //                             email: doc2.data().email,
    //                             photoURL: doc2.data().photoURL,
    //                             userRole: userRole,
    //                             workRole: null,
    //                             userId: doc2.id,
    //                         }
    //                         self.onSetUserRoom(roomUser, 'roomUser')
    //                     })
    //             })
    //         })

    //     console.log(value)
    // }

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

    // checkMember = () => {
    //     var { email } = this.state
    //     var { emailAll } = this.props
    //     var self = this
    //     var emailAllFilter = emailAll.find(value => value.email === email)
    //     if (emailAllFilter) {
    //         self.setState({
    //             emailCheck: emailAllFilter.email
    //         }, () => {
    //             this.addMember()
    //         })
    //     } else {
    //         this.addMember()
    //     }
    // }


    queryMemberStudentRoom = (value) => {

        var studentShow = []
        var self = this
        const queryRoomMemRef = roomMemberRef.where('roomId', '==', value.roomId).where('userRole', '==', 'student')

        queryRoomMemRef
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    const { userId } = doc.data()

                    userRef.doc(userId)
                        .get()
                        .then(function (doc2) {
                            studentShow.push({
                                studentName: doc2.data().displayName,
                                email: doc2.data().email,
                                photoURL: doc2.data().photoURL,
                                studentId: userId,
                                groupName: 'ยังไม่มีกลุ่ม',
                                workDone: 'ยังไม่ส่งงาน',
                                submitDate: new Date(),
                                fileName: '',
                                fileURL: '',
                                contentWork: '',
                            })
                            self.setState({ studentShow }, () => {
                                console.log(self.state.studentShow)

                            })
                        })
                })
            })
        this.queryStudentGroup(value)
    }

    queryStudentGroup = (value) => {
        var groupWork = []
        var uid = this.props.user.uid
        var self = this

        const queryGroupWorkRef = workGroupRef.where('workId', '==', value.workId)

        queryGroupWorkRef
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {

                    var groupWork = {
                        groupId: doc.id,
                        groupName: doc.data().name,
                        workDone: doc.data().workDone,
                        fileName: doc.data().fileName,
                        fileURL: doc.data().fileURL,
                        contentWork: doc.data().contentWork,
                        submitDate: doc.data().submitDate.toDate()
                    }

                    const queryGroupMemberRef = workGroupMemberRef.where('workGroupId', '==', groupWork.groupId)

                    queryGroupMemberRef
                        .get()
                        .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                                const { userId } = doc.data()
                                userRef.doc(userId)
                                    .get()
                                    .then(function (doc2) {
                                        var studentShow = {
                                            studentName: doc2.data().displayName,
                                            email: doc2.data().email,
                                            photoURL: doc2.data().photoURL,
                                            studentId: userId,
                                            groupName: groupWork.groupName,
                                            workDone: groupWork.workDone,
                                            fileName: groupWork.fileName,
                                            fileURL: groupWork.fileURL,
                                            contentWork: groupWork.contentWork,
                                            submitDate: groupWork.submitDate
                                        }
                                        console.log(studentShow)
                                        self.onSetStudentWork(studentShow)

                                    })

                            })

                        })

                })


            })


    }


    onSetStudentWork = (studentValue) => {
        const { studentShow } = this.state

        const updateIndex = studentShow.findIndex(item => item.studentId === studentValue.studentId)

        const updateStudent = update(studentShow, { [updateIndex]: { $set: studentValue } })

        this.setState({ studentShow: updateStudent }, () => {
            console.log(this.state.studentShow, 'studentUpdate')
            // self.onSetWork(self.state.work)
        })

    }


    // onSetUserRoom = (roomUser) => {
    //     this.setState({
    //         roomUser: roomUser
    //     }, () => {
    //         console.log(this.state.roomUser)
    //     })
    // }

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
            this.setState({
                roomName: value,
                pageWork: page
            }, () => {
                console.log(this.state.roomName, 'roomNameWork')
            })
        }
        else if (value.workGroup === 'no group') {
            // this.queryTask(value)

            this.queryGroupWork(value)
            this.queryMemberStudentRoom(value)
            this.setState({
                roomName: value,
                pageWork: page
            }, () => {
                console.log(this.state.roomName, 'roomNameTask')
            })
        } else {

            // this.queryTask(value)

            this.queryMemberWork(value)

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

            this.setState({
                pageWork: page,
                roomName: [],
                work: [],
                workW8: [],
                roomMember: [],
                task: [],
                workGroup: [],
                studentShow: [],
            })
            console.log(roomName, page)
        } else if (page === 'work') {
            if (roomName.roomRole === 'teacher') {
                this.queryWorkTaskBack(roomName)
                // this.queryWork(roomName)

                this.setState({
                    pageWork: page,
                    task: [],
                    workGroup: [],
                    workMember: [],
                })
            } else {
                this.queryWorkTaskBack(roomName)
                this.queryWorkStudentGroup()
                this.setState({
                    pageWork: page,
                    task: [],
                    workGroup: [],
                    workMember: [],
                })
            }


        }

    }

    changeTask = (value, isDone) => {
        const { task } = this.state
        const id = value.taskId
        var self = this

        // if (isDone === 'toDo') {
        //     const editIndex = task.findIndex(item => item.taskId === id)
        //     const editItem = update(task, { [editIndex]: { $set: value } })
        //     self.setState({
        //         task: editItem,
        //     }, () => {
        //         console.log(self.state.task)
        //     })
        // } else {
        //     userRef.doc(value.responsibleUser)
        //         .get()
        //         .then(function (doc) {
        //             var updateTask = {
        //                 comment: value.comment,
        //                 content: value.content,
        //                 displayName: doc.data().displayName,
        //                 endAt: value.endAt,
        //                 fileName: value.fileName,
        //                 fileURL: value.fileURL,
        //                 isDone: value.isDone,
        //                 name: value.name,
        //                 photoURL: doc.data().photoURL,
        //                 responsibleUser: value.responsibleUser,
        //                 startAt: value.startAt,
        //                 taskId: value.taskId,
        //                 workGroupId: value.workGroupId,
        //                 workId: value.workId,

        //             }
        //             const editIndex = task.findIndex(item => item.taskId === id)
        //             const editItem = update(task, { [editIndex]: { $set: updateTask } })

        //             self.setState({
        //                 task: editItem,
        //             }, () => {
        //                 console.log(self.state.task)
        //             })
        //         })
        // }

        // this.onArrayUpdate(editItem)
        taskRef.doc(id).set({
            comment: value.comment,
            isDone: value.isDone,
            responsibleUser: value.responsibleUser,
            fileName: value.fileName,
            fileURL: value.fileURL,
        }, { merge: true });

        console.log(value)
    }


    logout = (Page) => {
        firebase.auth().signOut();
        this.props.onsetUserNull(Page)
    }

    handleListItemClick = (page) => {
        if (page === 'room') {
            this.setState({
                page: page,
                pageWork: page,
                roomName: [],
                work: [],
                workW8: [],
                roomMember: [],
                task: [],
            }, () => {
                console.log(this.state.page)
            });
        } else {
            this.setState({
                page: page
            }, () => {
                console.log(this.state.page)
            });
        }
    };

    handleDrawerOpen = () => {
        this.setState({ desktopOpen: true });
    };

    handleDrawerClose = () => {
        this.setState({ desktopOpen: false });
    };

    handleWorkNavChange = (event, subPageRoom) => {
        this.setState({ subPageRoom });
    };

    renderWorkPage = () => {
        const { roomName, work, roomMember, emailAll, workW8, subPageRoom } = this.state
        const { user } = this.props
        return (
            subPageRoom === 0 ?
                <div>
                    <PostsWork
                        roomName={roomName}
                        user={user}
                    />
                </div>
                :

                <div>
                    <Work

                        roomName={roomName}
                        user={this.props.user}
                        work={work}
                        roomMember={roomMember}
                        // roomUser={roomUser}
                        emailAll={emailAll}
                        workW8={workW8}

                        pageChange={this.pageChange}
                        addWork={this.addWork}
                        backPage={this.backPage}
                        addRoomMember={this.addRoomMember}
                        editWork={this.editWork}
                        querydeleteWork={this.querydeleteWork}
                        queryEmailUser={this.queryEmailUser}
                        onClearEmail={this.onClearEmail}
                        queryWork={this.queryWork}
                    />
                </div>
        )

    }

    renderPage = () => {
        const { pageWork, roomName, room, page, work, task, roomMember, roomUser, workGroup, emailAll, workW8, workMember, studentShow, subPageRoom } = this.state
        const { classes } = this.props;

        switch (pageWork) {
            case 'room':
                return (
                    <div>
                        <AddRoom
                            roomName={roomName}
                            addRoom={this.addRoom}
                        />
                        <JoinRoom
                            joinRoomMember={this.joinRoomMember}
                            user={this.props.user}
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
                        {this.renderWorkPage()}
<br/><br/>
                        <div className={classes.bottomNavCenter}>
                        <Hidden smUp implementation="css">
                            <BottomNavigation
                                value={subPageRoom}
                                onChange={this.handleWorkNavChange}
                                showLabels
                                className={classes.bottomNavUp}
                            >
                                <BottomNavigationAction label="หน้าแรก" icon={<RestoreIcon />} />
                                <BottomNavigationAction label="งาน" icon={<FavoriteIcon />} />
                            </BottomNavigation>
                            </Hidden>

                            <Hidden xsDown implementation="css">
                            <BottomNavigation
                                value={subPageRoom}
                                onChange={this.handleWorkNavChange}
                                showLabels
                                className={classes.bottomNavDown}
                            >
                                <BottomNavigationAction label="หน้าแรก" icon={<RestoreIcon />} />
                                <BottomNavigationAction label="งาน" icon={<FavoriteIcon />} />
                            </BottomNavigation>
                            </Hidden>
                        </div>

                    </div>

                );
            case 'task':
                return (
                    <Task
                        roomName={roomName}
                        task={task}
                        room={room}
                        user={this.props.user}
                        setBG={this.state.setBG}
                        roomMember={roomMember}
                        // roomUser={roomUser}
                        emailAll={emailAll}
                        workGroup={workGroup}
                        workMember={workMember}
                        roomMember={roomMember}
                        studentShow={studentShow}

                        pageChange={this.pageChange}
                        addTask={this.addTask}
                        backPage={this.backPage}
                        changeTask={this.changeTask}
                        addGroup={this.addGroup}
                        queryEmailUser={this.queryEmailUser}
                        addGroupMember={this.addGroupMember}
                        addWorkAll={this.addWorkAll}
                        joinGroupMem={this.joinGroupMem}
                        requestGroupMember={this.requestGroupMember}
                        handleTaskQuery={this.handleTaskQuery}
                        cancleWorkAll={this.cancleWorkAll}
                        editTask={this.editTask}
                        deleteTask={this.deleteTask}
                        queryTask={this.queryTask}
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