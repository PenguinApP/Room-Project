import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import firebase, { db, auth } from '../Config/Firebase';
import update from 'immutability-helper';

import Button from '@material-ui/core/Button';

import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import AddIcon from '@material-ui/icons/Add';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { BottomNavigationAction } from "@material-ui/core";


const drawerWidth = 240;

const styles = theme => ({
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

class UserRoom extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dialogOpen: false,
            drawerOpen: false,
        }
    }

    onOpenUserDrawer = () => {
        this.setState({
            drawerOpen: true,
        });
    }

    onCloseUserDrawer = () => {
        this.setState({
            drawerOpen: false,
        });
    }

    addUserDialogOpen = () => {
        this.setState({
            dialogOpen: false,
        })
    }


    render() {
        const { classes } = this.props
        const { drawerOpen } = this.state
        return (
            <span>
                <Button onClick={() => this.onOpenUserDrawer()} >
                    User
                </Button>

                <Drawer
                    className={classes.drawer}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    open={drawerOpen}
                    anchor="right"
                    variant="persistent"

                // onClose={this.toggleDrawer()}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.onCloseUserDrawer}>
                            {/* {theme.direction === 'rtl' ? <ChevronLeftIcon /> :  */}
                            <ChevronRightIcon />
                        </IconButton>
                        <IconButton onClick={this.addUserDialogOpen} >
                            <AddIcon />
                        </IconButton>
                    </div>

                    <Divider />

                    <div>

                    </div>

                </Drawer>
            </span>
        )
    }
}

UserRoom.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserRoom);
