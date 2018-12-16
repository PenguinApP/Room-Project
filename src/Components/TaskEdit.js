import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Upload from './Upload'

import './Task.css'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({


})

class TaskEdit extends Component {
    constructor() {
        super()
        this.state = {
            value: 'toDo',
            comment: '',
            fileURL: null,
            fileName: null,
        };
    }

    onFileData = (file) => {
        this.setState({
            fileName: file.fileName,
            fileURL: file.fileURL,
        });
        console.log(file)
    }

    changeResponsibleUser = (value) => {
        const { comment, fileName, fileURL } = this.state
        const { taskItem, roomUser, user, handleClose } = this.props

        if (value === 'Doing') {
            var taskUpdate = {
                name: taskItem.name,
                startAt: taskItem.startAt,
                endAt: taskItem.endAt,
                content: taskItem.content,
                comment: taskItem.comment,
                isDone: value,
                workId: taskItem.workId,
                workGroupId: taskItem.workGroupId,
                taskId: taskItem.taskId,
                fileName: taskItem.fileName,
                fileURL: taskItem.fileURL,
                displayName: null,
                photoURL: null,
                responsibleUser: user.uid,
            }
            this.props.changeTask(taskUpdate, 'Doing')
            console.log(taskUpdate)
        } else {
            if (!comment.trim()) {
                alert('กรุณากรอกรายละเอียดงาน')
                this.setState({ comment: '' })
            } else {
                var taskUpdateDone = {
                    name: taskItem.name,
                    startAt: taskItem.startAt,
                    endAt: taskItem.endAt,
                    content: taskItem.content,
                    comment: comment,
                    isDone: value,
                    workId: taskItem.workId,
                    workGroupId: taskItem.workGroupId,
                    taskId: taskItem.taskId,
                    fileName: fileName,
                    fileURL: fileURL,
                    displayName: null,
                    photoURL: null,
                    responsibleUser: user.uid,
                }
                this.props.changeTask(taskUpdateDone, 'Done')
                console.log(taskUpdate)
                this.setState({
                    comment: '',
                    fileURL: null,
                    fileName: null,
                })

            }
        }
        handleClose()
    }

    cancleTask = (value) => {
        const { comment, fileName, fileURL } = this.state
        const { taskItem, roomUser, user, handleClose } = this.props
        if (value === 'toDo') {
            var taskUpdate = {
                name: taskItem.name,
                startAt: taskItem.startAt,
                endAt: taskItem.endAt,
                content: taskItem.content,
                comment: '',
                isDone: value,
                workId: taskItem.workId,
                workGroupId: taskItem.workGroupId,
                taskId: taskItem.taskId,
                fileName: null,
                fileURL: null,
                displayName: null,
                photoURL: null,
                responsibleUser: null,
            }
            this.props.changeTask(taskUpdate, 'toDo')
            console.log(taskUpdate)
        } else {
            var taskUpdate = {
                name: taskItem.name,
                startAt: taskItem.startAt,
                endAt: taskItem.endAt,
                content: taskItem.content,
                comment: '',
                isDone: value,
                workId: taskItem.workId,
                workGroupId: taskItem.workGroupId,
                taskId: taskItem.taskId,
                fileName: null,
                fileURL: null,
                displayName: taskItem.displayName,
                photoURL: taskItem.photoURL,
                responsibleUser: taskItem.responsibleUser,
            }
            this.props.changeTask(taskUpdate, 'Doing')
            console.log(taskUpdate)
        }
        handleClose()
    }

    handleOnchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    };


    render() {
        const { classes, taskItem, roomUser, userRes, user, task, handleClose, roomName } = this.props

        return (
            <Dialog
                open={this.props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {roomName.roomRole === 'student' ?
                    <div>
                        {taskItem.isDone === 'toDo' ?

                            <div>
                                <DialogTitle id="alert-dialog-title">{taskItem.name}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        คำอธิบายงาน : {taskItem.content || '-'}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        ยกเลิก
                            </Button>
                                    <Button onClick={() => this.changeResponsibleUser('Doing')} color="primary" autoFocus>
                                        รับผิดชอบงานนี้
                            </Button>
                                </DialogActions>
                            </div>
                            :
                            <div>
                                {taskItem.isDone === 'Doing' ?
                                    < div >

                                        {taskItem.responsibleUser === userRes ?
                                            <div>
                                                <DialogTitle id="alert-dialog-title">{taskItem.name}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        {taskItem.content}
                                                    </DialogContentText>

                                                    <TextField
                                                        margin="dense"
                                                        id="comment"
                                                        label="เพิ่มรายละเอียดงาน"
                                                        type="text"
                                                        name="comment"
                                                        onChange={this.handleOnchange}
                                                        value={this.state.content}
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
                                                    <Button onClick={() => this.cancleTask('toDo')} color="primary">
                                                        ยกเลิกการทำงานนี้
                                            </Button>
                                                    <Button onClick={handleClose} color="primary">
                                                        ยกเลิก
                                            </Button>
                                                    <Button onClick={() => this.changeResponsibleUser('Done')} color="primary" autoFocus>
                                                        งานเสร็จสิ้น
                                    </Button>
                                                </DialogActions>
                                            </div>

                                            :
                                            <div>
                                                <DialogTitle id="alert-dialog-title">คุณไม่ได้รับผิดชอบงานนี้</DialogTitle>
                                            </div>
                                        }

                                    </div>
                                    :
                                    <div>
                                        <DialogTitle id="alert-dialog-title">{taskItem.name}</DialogTitle>
                                        <DialogContent>
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src={taskItem.photoURL} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={taskItem.displayName}
                                                // secondary=
                                                //     <React.Fragment>
                                                //         <Typography component="span" className={classes.inline} color="textPrimary">
                                                //             Ali Connors
                                                //     </Typography>
                                                //         {" — I'll be in your neighborhood doing errands this…"}
                                                //     </React.Fragment>
                                                // }
                                                />
                                            </ListItem>
                                            <DialogContentText id="alert-dialog-description">
                                                คำอธิบายงาน : {taskItem.content || '-'}
                                            </DialogContentText>
                                            <DialogContentText id="alert-dialog-description">
                                                รายละเอียดงาน : {taskItem.comment || '-'}
                                            </DialogContentText>
                                            <DialogContentText id="alert-dialog-description">
                                                ไฟล์งาน : {<a href={taskItem.fileURL} target="_blank"> {taskItem.fileName}</a> || '-'}
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => this.cancleTask('Doing')} color="primary">
                                                แก้งานนี้
                                    </Button>
                                        </DialogActions>
                                    </div>
                                }
                            </div>
                        }
                    </div>

                    :

                    <div>
                        {taskItem.isDone === 'toDo' ?
                            <div>
                                <DialogTitle id="alert-dialog-title">{taskItem.name}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        คำอธิบายงาน : {taskItem.content || '-'}
                                    </DialogContentText>

                                </DialogContent>
                                {/* <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        ยกเลิก
                                    </Button>
                                    <Button onClick={() => this.changeResponsibleUser('Doing')} color="primary" autoFocus>
                                        รับผิดชอบงานนี้
                                    </Button>
                                </DialogActions> */}
                            </div>
                            :
                            <div>
                                {taskItem.isDone === 'Doing' ?

                                    <div>
                                        <DialogTitle id="alert-dialog-title">{taskItem.name}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                คำอธิบายงาน : {taskItem.content || '-'}
                                            </DialogContentText>
                                            <DialogContentText id="alert-dialog-description">
                                                ผู้รับผิดชอบงานนี้
                                    </DialogContentText>
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src={taskItem.photoURL} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={taskItem.displayName}
                                                // secondary=
                                                //     <React.Fragment>
                                                //         <Typography component="span" className={classes.inline} color="textPrimary">
                                                //             Ali Connors
                                                //     </Typography>
                                                //         {" — I'll be in your neighborhood doing errands this…"}
                                                //     </React.Fragment>
                                                // }
                                                />
                                            </ListItem>
                                        </DialogContent>
                                        {/* <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        ยกเลิก
                                    </Button>
                                    <Button onClick={() => this.changeResponsibleUser('Doing')} color="primary" autoFocus>
                                        รับผิดชอบงานนี้
                                    </Button>
                                </DialogActions> */}
                                    </div>

                                    :
                                    <div>
                                        <DialogTitle id="alert-dialog-title">{taskItem.name}</DialogTitle>
                                        <DialogContent>

                                            <DialogContentText id="alert-dialog-description">
                                                คำอธิบายงาน : {taskItem.content || '-'}
                                            </DialogContentText>
                                            <DialogContentText id="alert-dialog-description">
                                                รายละเอียดงาน : {taskItem.comment || '-'}
                                            </DialogContentText>
                                            <DialogContentText id="alert-dialog-description">
                                                ไฟล์งาน : {<a href={taskItem.fileURL} target="_blank"> {taskItem.fileName}</a> || '-'}
                                            </DialogContentText>

                                            <DialogContentText id="alert-dialog-description">
                                                ผู้รับผิดชอบงานนี้
                                         </DialogContentText>
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src={taskItem.photoURL} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={taskItem.displayName}
                                                // secondary=
                                                //     <React.Fragment>
                                                //         <Typography component="span" className={classes.inline} color="textPrimary">
                                                //             Ali Connors
                                                //     </Typography>
                                                //         {" — I'll be in your neighborhood doing errands this…"}
                                                //     </React.Fragment>
                                                // }
                                                />
                                            </ListItem>
                                        </DialogContent>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                }


            </Dialog>

        )

    }

}

TaskEdit.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskEdit);

