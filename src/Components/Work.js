import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import firebase, { db, auth } from '../Config/Firebase';
import update from 'immutability-helper';
import moment from 'moment';
import 'moment/locale/th';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { BottomNavigationAction } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';

import UserRoom from './UserRoom';
import WorkEdit from './WorkEdit';
import AddWork from './AddWork'

const workRef = db.collection('work')
const workGroupMemberRef = db.collection('workGroupMember')
const workGroupRef = db.collection('workGroup')

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        // backgroundColor: theme.palette.background.paper,
    },
    // layout: {
    //     width: 'auto',
    //     marginLeft: theme.spacing.unit * 2,
    //     marginRight: theme.spacing.unit * 2,
    //     [theme.breakpoints.up(800 + theme.spacing.unit * 2 * 2)]: {
    //         width: 800,
    //         marginLeft: 'auto',
    //         marginRight: 'auto',
    //     },
    // },
    container: {
        margin: 'auto',
        width: '100%',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    cssLabel: {
        '&$cssFocused': {
            color: '#00CCFF',
        },
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: '#00CCFF',
        },
    },
    // button: {
    //     margin: theme.spacing.unit,
    //     backgroundColor: '#00CCFF',
    //     color: 'white',
    // },
    button: {
        margin: theme.spacing.unit,
    },

    addUser: {
        textAlign: 'right',
    },
    list: {
        width: 250,
    },
    listColor: {
        backgroundColor: theme.palette.background.paper
    },
    fullList: {
        width: 'auto',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
});


class Work extends Component {

    constructor(props) {
        super(props)
        this.state = {
            workName: '',
            openUser: false,
            openEdit: false,
            openDelete: false,
            anchorEl: null,
            item: [],
            work: []
        }
    }

    componentDidMount() {

        const { roomName, user } = this.props
        const self = this
        var newWork = []
        workRef.where("roomId", "==", roomName.roomId)
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {
                    if (change.type === "added") {
                        // console.log(change.doc.id, 'wordAdd')
                        if (roomName.roomRole === 'teacher') {
                            // self.props.queryWork(roomName)
                            workRef.doc(change.doc.id)
                                .get()
                                .then(function (doc) {
                                    newWork.push({
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
                                        workDone: '',
                                    })
                                    self.setState({
                                        work: newWork
                                    }, () =>
                                            console.log(self.state.work)
                                    )
                                })
                        } else if (roomName.roomRole === 'student') {

                            workRef.doc(change.doc.id)
                                .get()
                                .then(function (doc) {
                                    newWork.push({
                                        name: doc.data().name,
                                        startAt: doc.data().startAt.toDate(),
                                        endAt: doc.data().endAt.toDate(),
                                        content: doc.data().content,
                                        isDone: doc.data().isDone,
                                        contentWork: '',
                                        roomId: doc.data().roomId,
                                        roomRole: 'student',
                                        workId: doc.id,
                                        workGroupId: 'no group',
                                        workGroup: 'no group',
                                        workRole: 'no group',
                                        workDone: 'ยังไม่ส่งงาน',
                                    })

                                    self.setState({
                                        work: newWork
                                    }, () =>
                                            console.log(self.state.work)
                                    )

                                    workGroupRef.where('workId', '==', change.doc.id)
                                        .get()
                                        .then(function (querySnapshot) {
                                            querySnapshot.forEach(function (doc2) {
                                                workGroupMemberRef.where('workGroupId', '==', doc2.id).where('userId', '==', user.uid)
                                                    .get()
                                                    .then(function (querySnapshot) {
                                                        querySnapshot.forEach(function (doc3) {
                                                            var workUpdate = {
                                                                name: doc.data().name,
                                                                startAt: doc.data().startAt.toDate(),
                                                                endAt: doc.data().endAt.toDate(),
                                                                content: doc.data().content,
                                                                isDone: doc.data().isDone,
                                                                contentWork: '',
                                                                roomId: doc.data().roomId,
                                                                roomRole: 'student',
                                                                workId: doc.id,
                                                                workGroupId: doc2.id,
                                                                workGroup: doc2.data().name,
                                                                workRole: doc3.data().role,
                                                                workDone: doc2.data().workDone,
                                                            }
                                                            const updateWorkIndex = newWork.findIndex(item => item.workId === workUpdate.workId)
                                                            newWork.splice(updateWorkIndex, 1, workUpdate)
                                                            self.setState({
                                                                work: newWork
                                                            }, () =>
                                                                    console.log(self.state.work)
                                                            )
                                                        })
                                                    })
                                            })
                                        })

                                })
                        }
                    }

                    if (change.type === "modified") {
                        if (roomName.roomRole === 'teacher') {
                            var workEdit = {
                                name: change.doc.data().name,
                                startAt: change.doc.data().startAt.toDate(),
                                endAt: change.doc.data().endAt.toDate(),
                                content: change.doc.data().content,
                                isDone: change.doc.data().isDone,
                                contentWork: '',
                                roomId: change.doc.data().roomId,
                                roomRole: 'teacher',
                                workId: change.doc.id,
                                workGroupId: 'no group',
                                workGroup: 'no group',
                                workRole: 'teacher',
                                workDone: '',
                            }
                            const workEditIndex = self.state.work.findIndex(item => item.workId === change.doc.id)
                            const updateEditWork = update(self.state.work, { [workEditIndex]: { $set: workEdit } })
                            self.setState({
                                work: updateEditWork,
                            }, () => {
                                newWork.splice(workEditIndex, 1, workEdit)
                                console.log(self.state.work, 'newEditWork')
                            })
                            console.log(workEdit)
                        } else if (roomName.roomRole === 'student') {
                            var workEdit = {
                                name: change.doc.data().name,
                                startAt: change.doc.data().startAt.toDate(),
                                endAt: change.doc.data().endAt.toDate(),
                                content: change.doc.data().content,
                                isDone: change.doc.data().isDone,
                                contentWork: '',
                                roomId: change.doc.data().roomId,
                                roomRole: 'student',
                                workId: change.doc.id,
                                workGroupId: 'no group',
                                workGroup: 'no group',
                                workRole: 'no group',
                                workDone: 'ยังไม่ส่งงาน',
                            }
                            const workEditIndex = self.state.work.findIndex(item => item.workId === change.doc.id)
                            const updateEditWork = update(self.state.work, { [workEditIndex]: { $set: workEdit } })
                            self.setState({
                                work: updateEditWork,
                            }, () => {
                                newWork.splice(workEditIndex, 1, workEdit)
                                console.log(self.state.work, 'newEditWork')
                            })
                            console.log(workEdit)

                            workGroupRef.where('workId', '==', change.doc.id)
                                .get()
                                .then(function (querySnapshot) {
                                    querySnapshot.forEach(function (doc2) {
                                        workGroupMemberRef.where('workGroupId', '==', doc2.id).where('userId', '==', user.uid)
                                            .get()
                                            .then(function (querySnapshot) {
                                                querySnapshot.forEach(function (doc3) {
                                                    var workEditUpdate = {
                                                        name: change.doc.data().name,
                                                        startAt: change.doc.data().startAt.toDate(),
                                                        endAt: change.doc.data().endAt.toDate(),
                                                        content: change.doc.data().content,
                                                        isDone: change.doc.data().isDone,
                                                        contentWork: '',
                                                        roomId: change.doc.data().roomId,
                                                        roomRole: 'student',
                                                        workId: change.doc.id,
                                                        workGroupId: doc2.id,
                                                        workGroup: doc2.data().name,
                                                        workRole: doc3.data().role,
                                                        workDone: doc2.data().workDone,
                                                    }
                                                    const updateWorkIndex = newWork.findIndex(item => item.workId === workEditUpdate.workId)
                                                    const updateEditWork = update(self.state.work, { [workEditIndex]: { $set: workEditUpdate } })
                                                    newWork.splice(updateWorkIndex, 1, workEditUpdate)
                                                    self.setState({
                                                        work: updateEditWork,
                                                    }, () => {
                                                        // newWork.splice(workEditIndex, 1, workEdit)
                                                        console.log(self.state.work, 'newEditWork')
                                                    })
                                                    console.log(workEdit)
                                                })
                                            })
                                    })
                                })

                        }
                    }

                    if (change.type === "removed") {
                        const workDeleteIndex = self.state.work.findIndex(item => item.workId === change.doc.id)
                        if (workDeleteIndex >= 0) {
                            const deleteWork = update(self.state.work, { $splice: [[workDeleteIndex, 1]] })
                            self.setState({
                                work: deleteWork,

                            }, () => {
                                newWork.splice(workDeleteIndex, 1)
                                console.log(self.state.work, 'newEditwork', workDeleteIndex, 'workDeleteIndex')
                            })
                            // self.props.queryWork(roomName)
                        }
                    }
                });
            });
    }

    // updateStudentWork = () => {

    // }

    editItem = (item) => {
        this.setState({
            openEdit: false
        })
        this.props.editWork(item)

        console.log(item)
    }

    deleteWork = (id) => {
        this.setState({
            openDelete: false
        })
        this.props.querydeleteWork(id)
    }

    handleTaskPageOpen = (value, page) => {

        this.props.pageChange(value, page)

        console.log(value, page)
    };

    onButtonWorkBack = (value, page) => {

        this.props.backPage(value, page)

        console.log(page)
    };

    handleMenuOpen = (event, value) => {
        this.setState({
            anchorEl: event.currentTarget,
            item: value
        }, () => {
            console.log(this.state.item)
        });

    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    onOpenUserDrawer = () => {
        this.setState({
            openUser: true,
        });
    }

    onCloseUserDrawer = () => {
        this.setState({
            openUser: false,
        });
    }

    editWorkOpen = () => {
        this.setState({
            openEdit: true,
            anchorEl: null,
        });
    }

    editWorkClose = () => {
        this.setState({
            openEdit: false
        })
    }

    deleteWorkOpen = () => {
        this.setState({
            openDelete: true,
            anchorEl: null,
        });
    }

    deleteWorkClose = () => {
        this.setState({
            openDelete: false
        })
    }

    render() {
        const { work, open, anchorEl, item, openEdit, openDelete } = this.state
        const { classes, workW8, theme, user, roomName, roomMember, addRoomMember, queryEmailUser, emailAll, onClearEmail, roomUser, addWork } = this.props;

        return (
            <div>
                <div>
                    <AddWork
                        // roomUser={roomUser}
                        addWork={addWork}
                        roomName={roomName}
                    />

                    <Button onClick={() => this.onButtonWorkBack(null, 'room')} variant="contained" className={classes.button}>
                        ย้อนกลับ
                        </Button>

                    <UserRoom
                        user={user}
                        roomMember={roomMember}
                        roomName={roomName}
                        // roomUser={roomUser}
                        emailAll={emailAll}
                        addRoomMember={addRoomMember}
                        queryEmailUser={queryEmailUser}
                        onClearEmail={onClearEmail}
                    />
                </div>
                <br />
                <List>

                    {work.map((value) => {
                        return (
                            <div>
                                <ListItem
                                    key={value.workId}
                                    className={classes.listColor}
                                    button
                                    onClick={() => this.handleTaskPageOpen(value, 'task')}
                                >
                                    {value.workGroup === 'no group' ?
                                        <ListItemText
                                            primary={value.name}
                                            secondary={
                                                <React.Fragment>
                                                    กำหนดส่ง {moment(value.endAt).format('ll')} เวลา {moment(value.endAt).format('HH:mm')}
                                                </React.Fragment>
                                            }
                                        />
                                        :
                                        <ListItemText
                                            primary={value.name}
                                            secondary={
                                                <React.Fragment>
                                                    กำหนดส่ง {moment(value.endAt).format('ll')} เวลา {moment(value.endAt).format('HH:mm')} กลุ่ม : {value.workGroup}
                                                </React.Fragment>
                                            }
                                        />
                                    }
                                    {roomName.roomRole === 'teacher' ?
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
                                        < ListItemSecondaryAction >
                                            {value.endAt < value.submitDate ?
                                                <div>
                                                    {value.workDone === 'ส่งงานแล้ว' ?
                                                        < Typography variant="body1" gutterBottom>
                                                            ส่งงานช้า
                                                        </Typography>
                                                        :
                                                        <Typography variant="body1" gutterBottom>
                                                            {value.workDone}
                                                        </Typography>
                                                    }
                                                </div>
                                                :
                                                <Typography variant="body1" gutterBottom>
                                                    {value.workDone}
                                                </Typography>
                                            }
                                        </ListItemSecondaryAction>
                                    }
                                </ListItem>
                                <br />
                            </div >
                        )
                    }
                    )
                    }
                </List>
                <WorkEdit
                    item={item}
                    openEdit={openEdit}
                    openDelete={openDelete}
                    anchorEl={anchorEl}

                    editWorkOpen={this.editWorkOpen}
                    editWorkClose={this.editWorkClose}
                    deleteWorkOpen={this.deleteWorkOpen}
                    deleteWorkClose={this.deleteWorkClose}
                    handleMenuClose={this.handleMenuClose}
                    editItem={this.editItem}
                    deleteWork={this.deleteWork}
                />

            </div >
        )
    }
}


Work.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(Work);

