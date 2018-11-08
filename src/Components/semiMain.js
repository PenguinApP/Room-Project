import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import firebase, { db, auth } from '../Config/Firebase';
import update from 'immutability-helper';

import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import DraftsIcon from '@material-ui/icons/Drafts';
import MenuIcon from "@material-ui/icons/Menu";

import Room from './Room';
import Work from './Work';



const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: "flex"
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
        }
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
    }
});

const itemRef = db.collection('Room')

class SemiMain extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            mobileOpen: false,
            roomForm: false,
            room: [],
            roomName: '',
        }
    }

    componentDidMount() {
        this.queryRoom()
    }


    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    handleListItemClick = (event, index) => {
        this.setState({ selectedIndex: index });
    };

    handleClickOpen = () => {
        this.setState({ roomForm: true });
    };

    handleClose = () => {
        this.setState({ roomForm: false });
    };

    handleOnchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addRoom = () => {
        var { room, roomName } = this.state
        var self = this

        if (!roomName.trim()) {
            alert('กรุณากรอกชื่องาน')
            self.setState({ roomName: '', })
        } else {

            var Room = {
                name: roomName,
            }

            const updateRoom = update(room, { $push: [Room] })

            itemRef.add(Room)
                .then(function (docRef) {
                    const RoomLength = updateRoom.length
                    const id = docRef.id
                    updateRoom[RoomLength - 1].id = id
                    self.onArrayUpdate(updateRoom)
                })

            self.setState({ roomName: '' }, () => {
                console.log(updateRoom)
            })
        }
    }

    onArrayUpdate = (updateRooms) => {
        this.setState({ room: updateRooms }, () => {
        })
    }


    queryRoom = () => {
        var room = []
        // var uid = this.state.user.uid
        var self = this

        // const queryRef = itemRef.where('user', '==', uid)
        itemRef.get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    //   var isd = new Date(doc.data().startAt.toDate());
                    //   var ied = new Date(doc.data().endAt.toDate());
                    //   var Bes = isd.toDateString();
                    //   var Bee = ied.toDateString();
                    //   var sdstring = moment(Bes).format('YYYY-MM-DD');
                    //   var edstring = moment(Bee).format('YYYY-MM-DD');
                    room.push({
                        name: doc.data().name,
                        // content: doc.data().content,
                        // startAt: sdstring,
                        // endAt: edstring,
                        // isDone: doc.data().isDone,
                        // id: doc.id,
                    })
                    //console.log(doc.id, " => ", doc.data());
                });
                self.setState({ room }, () => {
                    //   self.onFilterTask(self.state.filterTaskType)
                })

            })
        // .catch(function (error) {
        //     3
        //     console.log("Error getting documents: ", error);
        // });
    };
    render() {
        const { classes, theme } = this.props;
        const { selectedIndex, roomForm, mobileOpen, roomName, room } = this.state;
        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>

                    <ListItem
                        button
                        selected={selectedIndex === 0}
                        onClick={event => this.handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Room" />
                    </ListItem>
                    <ListItem
                        button
                        selected={selectedIndex === 1}
                        onClick={event => this.handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="ตั้งค่า" />
                    </ListItem>

                </List>
                <Divider />
                {selectedIndex === 0 ?
                    <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>Create Room</Button>
                    :
                    null
                }
            </div>
        );

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
                        <Typography variant="h6" color="inherit" noWrap>
                            Room
                </Typography>
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
                            {drawer}
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
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    {selectedIndex === 0 ?
                        // <Room
                        //     room={room} />

                        <Work /> 
                        :
                        null
                    }
                </main>



                <Dialog
                    open={roomForm}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create Room</DialogTitle>

                    <DialogContent>
                        {/* <DialogContentText>
                            Room Name
                        </DialogContentText> */}
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Room Name"
                            type="Room"
                            name="roomName"
                            fullWidth
                            value={roomName}
                            onChange={this.handleOnchange}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.addRoom} color="primary">
                            Create Room
                        </Button>
                    </DialogActions>

                </Dialog>



            </div>
        );
    }
}

SemiMain.propTypes = {
    classes: PropTypes.object.isRequired,
    container: PropTypes.object,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SemiMain);