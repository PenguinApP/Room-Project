import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import firebase, { db, auth } from '../Config/Firebase';
import update from 'immutability-helper';
import moment from 'moment';
import 'moment/locale/th';

import PicDummy from '../Picture/User-dummy-300x300.png'

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
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

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        // backgroundColor: theme.palette.background.paper,
    },
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
    button: {
        margin: theme.spacing.unit,
        backgroundColor: '#00CCFF',
        color: 'white',
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


class WorkStudentShow extends Component {

    constructor(props) {
        super(props)
        this.state = {
            workName: '',
            openUser: false,
            openEdit: false,
            openDelete: false,
            anchorEl: null,
            item: [],

        }
    }

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
        const { open, anchorEl, item, openEdit, openDelete } = this.state
        const { classes, roomName, studentShow } = this.props;

        return (
            <div>
                {/* <div>
                    <AddWork
                        // roomUser={roomUser}
                        addWork={addWork}
                        roomName={roomName}
                    />

                    <Button onClick={() => this.onButtonWorkBack(null, 'room')} >
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
                </div> */}
                <br />

                <List className={classes.root}>

                    {studentShow.map((value) => {
                        return (
                            <div>
                                <ListItem
                                    key={value.workId}
                                    className={classes.listColor}

                                // onClick={() => this.handleTaskPageOpen(value, 'task')}
                                >
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={value.photoURL || PicDummy} />
                                    </ListItemAvatar>
                                    {value.groupName === 'ยังไม่มีกลุ่ม' ?
                                        <ListItemText
                                            primary={value.studentName}
                                            secondary={
                                                <React.Fragment>
                                                    {value.groupName}
                                                </React.Fragment>
                                            }

                                        />
                                        :
                                        <ListItemText
                                            primary={value.studentName}
                                            secondary={
                                                <React.Fragment>
                                                    กลุ่ม : {value.groupName}
                                                </React.Fragment>
                                            }

                                        />
                                    }
                                    <ListItemSecondaryAction>
                                        <Typography variant="body1" gutterBottom>
                                            {value.workDone}
                                        </Typography>

                                    </ListItemSecondaryAction>
                                    {/* {roomName.roomRole === 'teacher' ?
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
                                        null
                                    } */}
                                </ListItem>
                                <br />
                            </div >
                        )
                    }
                    )
                    }
                </List>

                {/* <WorkFile
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
                /> */}

            </div>
        )
    }
}


WorkStudentShow.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkStudentShow);