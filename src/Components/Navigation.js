import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from 'classnames';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InboxIcon from "@material-ui/icons/MoveToInbox";

import MailIcon from "@material-ui/icons/Mail";
import DraftsIcon from '@material-ui/icons/Drafts';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import Help from '@material-ui/icons/Help';
import Home from '@material-ui/icons/Home';
import ViewList from '@material-ui/icons/ViewList';
import Assignment from '@material-ui/icons/Assignment';

const theme = createMuiTheme({
    palette: {
        primary: {
            // light: '#757ce8',
            main: '#FAFAFA',
            // dark: '#002884',
            // contrastText: '#fff',
        },
    },
});

const styles = theme => ({
    root: {
        display: "flex"
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
    Button: {
        textAlign: 'center'
    },
    Header: {
        margin: 'auto',
        width: '100%',
        // padding: '10px 0',
        fontSize: 24,
    },
    item: {
        paddingTop: 4,
        paddingBottom: 4,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    itemCategory: {
        backgroundColor: '#263238',
        paddingTop: 16,
        paddingBottom: 16,
    },
    room: {
        fontSize: 24,
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.common.white,
    },

    itemList: {
        color: '#CFD8DC',
    },

    divider: {
        marginTop: theme.spacing.unit * 2,
    },

    dividerLight: {
        color: '#e0e0e0',
    },
    nested: {
        paddingLeft: '32px',
    },

    itemListWorkLink: {
        color: '#a3aaad',
    },
});

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // selectedPage: 'room',
            // roomForm: false,
            // roomName: '',

        }
    }

    handleListItemClick = (event, page) => {
        // this.setState({ selectedPage: page });
        this.props.handleListItemClick(page)
    };

    // addRoom = () => {
    //     var { roomName } = this.state
    //     var { addRoom } = this.props
    //     var self = this
    //     if (!roomName.trim()) {
    //         alert('กรุณากรอกชื่องาน')
    //         self.setState({ roomName: '', })
    //     } else {
    //         addRoom(roomName)
    //         self.setState({ roomName: '', })
    //     }
    // }

    render() {
        const { classes, theme, handleDrawerClose, roomName, roomLink, roomLinkWorkCheck, pageNav } = this.props;
        const { selectedPage, roomForm, mobileOpen, room, } = this.state;
        return (
            <div>
                <List disablePadding>
                    <ListItem className={classNames(classes.room, classes.item, classes.itemCategory)}>
                        Room
                    </ListItem>

                    <ListItem
                        button
                        selected={pageNav === 'home'}
                        onClick={event => this.handleListItemClick(event, 'home')}
                    >
                        <ListItemIcon
                            classes={{
                                root: classes.itemList
                            }}
                        >
                            <Home />
                        </ListItemIcon>

                        <ListItemText
                            classes={{
                                primary: classes.itemList,
                            }}
                        >
                            หน้าหลัก
                        </ListItemText>

                    </ListItem>

                    {roomLink == 0 ?
                        null
                        :
                        <div>
                            <ListItem
                                button
                                selected={pageNav === 'room' && roomLinkWorkCheck === false}
                                onClick={event => this.handleListItemClick(event, 'room')}
                            >
                                <ListItemIcon
                                    classes={{
                                        root: classes.itemList
                                    }}
                                >
                                    <ViewList />
                                </ListItemIcon>

                                <ListItemText
                                    classes={{
                                        primary: classes.itemList,
                                    }}
                                >
                                    {roomLink.roomName}
                                </ListItemText>

                            </ListItem>
                            {roomLink.workName ?
                                <List component="div" disablePadding>
                                    <ListItem
                                        selected={pageNav === 'room' && roomLinkWorkCheck === true}
                                        className={classes.nested}>
                                        <ListItemIcon
                                            classes={{
                                                root: classes.itemListWorkLink
                                            }}>
                                            <Assignment />
                                        </ListItemIcon>
                                        <ListItemText
                                            classes={{
                                                primary: classes.itemListWorkLink,
                                            }}
                                        >
                                            {roomLink.workName}
                                        </ListItemText>
                                    </ListItem>
                                </List>
                                :
                                null
                            }
                        </div>

                    }

                    <ListItem
                        button
                        selected={pageNav === 'help'}
                        onClick={event => this.handleListItemClick(event, 'help')}
                    >

                        <ListItemIcon
                            classes={{
                                root: classes.itemList
                            }}
                        >
                            <Help />
                        </ListItemIcon>

                        <ListItemText
                            classes={{
                                primary: classes.itemList,
                            }}
                        >
                            วิธีใช้
                        </ListItemText>

                    </ListItem>


                </List>

                {/* <Dialog
                    open={roomForm}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >

                    <DialogTitle id="form-dialog-title">Create Room</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Room Name
                        </DialogContentText>
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

                </Dialog> */}

            </div >

        )
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
    container: PropTypes.object,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Navigation);
