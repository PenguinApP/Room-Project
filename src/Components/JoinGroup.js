import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import firebase, { db, auth } from '../Config/Firebase';

import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Hidden from "@material-ui/core/Hidden";

const roomRef = db.collection('room')
const roomMemberRef = db.collection('roomMember')

const styles = theme => ({
    addRoom: {
        textAlign: 'right',
    },
});

class JoinGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    joinGroupMem = () => {
        var { itemGroup, roomName, joinGroupMem, user, joinGroupDialogClose } = this.props

        var newMemGroup = {
            groupId: itemGroup.groupId,
            workGroup: itemGroup.name
        }

        joinGroupMem(roomName, newMemGroup)
        joinGroupDialogClose()
    }

    render() {
        const { classes } = this.props
        const { roomId } = this.state
        const { dialogJoinOpen, joinGroupDialogClose, itemGroup } = this.props
        return (
            <div>
                <Dialog
                    open={dialogJoinOpen}
                    onClose={joinGroupDialogClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Join Group</DialogTitle>

                    <DialogContent>

                        <DialogContentText>
                            คุณต้องการเข้ากลุ่ม {itemGroup.name} ใช่หรือไม่
                        </DialogContentText>

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={joinGroupDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.joinGroupMem} color="primary">
                            Join Room
                        </Button>
                    </DialogActions>

                </Dialog>

            </div>
        )
    }
}
JoinGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(JoinGroup);