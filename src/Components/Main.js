import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import firebase, { db, auth } from '../Config/Firebase';
import Room from './Room';
import Work from './Work';
import Navigation from './Navigation';
import AddRoom from './AddRoom';
import Task from './Task';

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
        }
    }

    componentWillMount() {
        this.queryRoom()
        this.queryWork()
    }


    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    addRoom = (roomName) => {
        var { room } = this.state
        var { user } = this.props
        var self = this

        var Room = {
            name: roomName,
        }

        const updateRoom = update(room, { $push: [Room] })

        roomRef.add(Room)
            .then(function (docRef) {
                const RoomLength = updateRoom.length
                const id = docRef.id
                const member = {
                    userId: user.uid,
                    userRole: 'teacher',
                    roomId: id,
                }
                updateRoom[RoomLength - 1].id = id
                self.onAddMember(member)

            })

        self.setState({
            roomName: '',
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
                const id = docRef.id
                updateWork[WorkLength - 1].id = id
                self.onArrayUpdate(updateWork)
            })

        self.setState({
            workName: ''
        }, () => {
            console.log(updateWork)
        })

    }

    onArrayUpdate = (updateWorks) => {
        this.setState({ work: updateWorks }, () => {
        })
    }


    onAddMember = (member) => {


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
        var uid = this.props.user.uid
        var self = this
        const queryMemberRef = roomMemberRef.where('userId', '==', uid)

        queryMemberRef
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    const { roomId } = doc.data()
                    roomRef.doc(roomId)
                        .get()
                        .then(function (doc2) {
                            room.push({
                                name: doc2.data().name,
                                id: doc2.id,
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

    queryWork = () => {
        var work = []
        var roomName = this.state.roomName
        var self = this

        const queryworkRef = workRef.where('room', '==', roomName)

        queryworkRef
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    work.push({

                    })

                })
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
        this.setState({
            roomName: value,
            pageWork: page
        }, () => {
            console.log(this.state.roomName, this.state.page)
        }
        )
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

    // deleteRoom = () =>  {
    //     this.setState()
    // }

    renderPage = () => {
        const { pageWork, roomName, room, page, work } = this.state

        switch (pageWork) {
            case 'room':
                return (
                    <div>
                        <AddRoom
                            roomName={roomName}

                            addRoom={this.addRoom}
                        />
                        <Room
                            room={room}
                            user={this.props.user}

                            addRoom={this.addRoom}
                            pageChange={this.pageChange}
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

                            pageChange={this.pageChange}
                            addWork={this.addWork}


                        />
                    </div>
                );
            case 'task':
                return (
                    <Task
                        roomName={roomName}
                        page={page}
                        user={this.props.user}
                        pageChange={this.pageChange}
                    />
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


                        <Avatar alt={user.email} src={user.photoURL} className={classes.avatar} />

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