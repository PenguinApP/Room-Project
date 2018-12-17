import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Upload from './Upload';

import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Hidden from "@material-ui/core/Hidden";


import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fade';

import moment from 'moment';

const styles = theme => ({
    addAllTask: {
        textAlign: 'right',
    },
});

class CancleSubmitFile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            workAllForm: false,
            content: '',
            fileURL: null,
            fileName: null,
        }
    }

    onFileData = (file) => {
        this.setState({
            fileName: file.fileName,
            fileURL: file.fileURL,
        });
        console.log(file)
    }
    handleClickOpen = () => {
        this.setState({ workAllForm: true });
    };

    handleClose = () => {
        this.setState({ workAllForm: false });
    };

    handleOnchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    cancleWorkAll = (roomName) => {
        var { content, fileName, fileURL } = this.state
        var { addRoom, cancleWorkAll } = this.props
        var self = this

        var workUnDone = {
            content: roomName.content,
            contentWork: roomName.contentWork,
            endAt: roomName.startAt,
            isDone: roomName.isDone,
            name: roomName.name,
            roomId: roomName.roomId,
            roomRole: roomName.roomRole,
            startAt: roomName.startAt,
            submitDate: new Date(),
            workDone: 'ยังไม่ส่งงาน',
            workGroup: roomName.workGroup,
            workGroupId: roomName.workGroupId,
            workId: roomName.workId,
            workRole: roomName.workRole,
        }

        cancleWorkAll(workUnDone)
    }

    render() {
        const { classes, roomName } = this.props
        const { workAllForm, content } = this.state
        return (
            <span>

                <Button onClick={() => this.handleClickOpen()} >
                    ยกเลิกส่งงาน
                </Button>

                <Dialog
                    open={workAllForm}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        ยกเลิกการส่งงานหรือไม่
                    </DialogTitle>

                    <DialogContent>

                        <DialogContentText>
                            หากยกเลิกส่งงาน งานที่ส่งมาก่อนหน้านี้จะหายไป
                        </DialogContentText>


                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            ยกเลิก
                        </Button>
                        <Button onClick={() => this.cancleWorkAll(roomName)} color="primary">
                            ยกเลิกส่งงาน
                        </Button>
                    </DialogActions>
                </Dialog>

            </span>
        )
    }
}
CancleSubmitFile.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CancleSubmitFile);