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

class PushWorkAll extends Component {
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

    addWorkAll = () => {
        var { content, fileName, fileURL } = this.state
        var { addRoom, roomName, addWorkAll } = this.props
        var self = this

        if (!content.trim()) {
            alert('กรุณากรอกรายละเอียดงาน')
            this.setState({ comment: '' })
        } else if (fileURL && fileName){
            var workDone = {
                name: roomName.name,
                workId: roomName.workId,
                workGroupId: roomName.workGroupId,
                workDone: 'ส่งงานแล้ว',
                contentWork: content,
                fileURL: fileURL,
                fileName: fileName,
                submitDate: new Date()
            }

            addWorkAll(workDone)
            self.setState({
                content: '',
                roomForm: false,
                fileURL: null,
                fileName: null,
            })
            this.handleClose()
        }else{
            alert('กรุณาส่งไฟล์งาน')
            this.setState({ 
                fileURL: null,
                fileName: null, 
            })
        }

    }

    render() {
        const { classes, roomName } = this.props
        const { workAllForm, content } = this.state
        return (
            <span>
                <Button onClick={() => this.handleClickOpen()} >
                    ส่งงาน
                </Button>

                <Dialog
                    open={workAllForm}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        ส่งงาน {roomName.name}
                    </DialogTitle>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="content"
                            label="คำอธิบายงาน"
                            type="text"
                            name="content"
                            onChange={this.handleOnchange}
                            value={content}
                            fullWidth
                        />
                        <DialogContentText><br />
                            อัพโหลดไฟล์งาน(PDF)
                        </DialogContentText>

                        <Upload
                            onFileData={this.onFileData}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            ยกเลิก
                        </Button>
                        <Button onClick={() => this.addWorkAll(roomName)} color="primary">
                            ส่งงานสุดท้าย
                        </Button>
                    </DialogActions>
                </Dialog>

            </span>
        )
    }
}
PushWorkAll.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(PushWorkAll);