import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import firebase, { db, auth } from '../Config/Firebase';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import moment from 'moment';
const postsRef = db.collection('posts')
const commentRef = db.collection('comment')

const styles = theme => ({
    textField: {
        // marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing.unit,
    },
    chip: {
        margin: theme.spacing.unit,
    },
});

class PostsWorkEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            workEdit: [],
            uploadValue: 0,
            fileURL: '',
            fileName: '',
            fileCheck: true,
        }
    }

    handleEditSubmit = (postEditItem) => {
        const { fileName, fileURL } = this.state;
        postsRef.doc(postEditItem.postId).set({
            post: document.getElementById("post").value,
            fileName: fileName,
            fileURL: fileURL,
        }, { merge: true });

        this.setState({
            fileName: '',
            fileURL: '',
            uploadValue: 0,
            fileCheck: true,
        })

        this.props.editPostClose()
        console.log(postEditItem, document.getElementById("post").value)
    }

    handleUpload = (event) => {
        var self = this;
        var file = event.target.files[0];
        if (file) {
            var storageRef = firebase.storage().ref(`/postFile/${file.name}`);
            var task = storageRef.put(file);

            task.on('state_changed', snapshot => {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({
                    uploadValue: percentage
                })
            }, error => {
                console.log(error.message);

            }, function () {
                task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log('The download URL : ', downloadURL, 'file name : ', file.name);
                    var fileName = file.name

                    self.setState({
                        uploadValue: 100,
                        fileURL: downloadURL,
                        fileName: fileName,
                        fileCheck: true,
                    });

                });
            });
        }
    }

    handleDeleteFileBeforeUpload = () => {
        this.setState({
            uploadValue: 0,
            fileURL: '',
            fileName: '',
            fileCheck: false,
        })
    }

    deleteCommentPost = (id) => {
        var deleteComment = []

        commentRef.where("postId", "==", id)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    deleteComment.push({
                        commentId: doc.id
                    })
                    deleteComment.map((value) => {
                        commentRef.doc(value.commentId).delete()
                    })
                })
            })

        this.deletePost(id)
    }

    deletePost = (id) => {
        postsRef.doc(id).delete()
        this.props.editPostClose()
    }


    render() {
        const { postEditItem, classes, open, anchorEl, editPostOpen, editPostClose, deletePost, handleMenuClose } = this.props
        return (
            <div>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => editPostOpen('edit')}>แก้ไข</MenuItem>

                    <MenuItem onClick={() => editPostOpen('delete')}>ลบ</MenuItem>
                </Menu >
                <Dialog
                    open={open === 'edit' ? true : false}
                    onClose={editPostClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{"แก้ไข"}</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="post"
                            label="ชื่องาน"
                            type="text"
                            fullWidth
                            defaultValue={postEditItem.post}
                        />

                    </DialogContent>

                    <DialogContent>
                        <div>
                            <input type="file" onChange={this.handleUpload} id="contained-button-file-edit" className={classes.input} />
                            <label htmlFor="contained-button-file-edit">
                                <Button variant="contained" component="span" className={classes.button} >Upload</Button>
                            </label>
                            <progress value={this.state.uploadValue} max="100">
                                {this.state.uploadValue} %
                            </progress>
                            <br />
                            {postEditItem.fileName && this.state.fileName === "" && this.state.fileCheck === true ?
                                <div>
                                    <Chip
                                        label={postEditItem.fileName}
                                        className={classes.chip}
                                        component="a"
                                        color="secondary"
                                        href={postEditItem.fileURL}
                                        target="_blank"
                                        clickable
                                    />
                                    <IconButton aria-label="Delete" onClick={() => { this.handleDeleteFileBeforeUpload() }}>
                                        <DeleteIcon fontSize="medium" />
                                    </IconButton>
                                </div>
                                :
                                this.state.fileName ?
                                    <div>
                                        <Chip
                                            label={this.state.fileName}
                                            className={classes.chip}
                                            component="a"
                                            color="secondary"
                                            href={this.state.fileURL}
                                            target="_blank"
                                            clickable
                                        />
                                        <IconButton aria-label="Delete" onClick={() => { this.handleDeleteFileBeforeUpload() }}>
                                            <DeleteIcon fontSize="medium" />
                                        </IconButton>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={editPostClose} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={() => this.handleEditSubmit(postEditItem)} color="primary">
                            Submit
                    </Button>
                    </DialogActions>
                </Dialog >

                <Dialog
                    open={open === 'delete' ? true : false}
                    onClose={editPostClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{"ลบ"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            เมื่อลบโพสต์แล้วจะไม่สามารถกู้คืนได้
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={editPostClose} color="primary">
                            Cancel
                            </Button>
                        <Button onClick={() => this.deleteCommentPost(postEditItem.postId)} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog >



            </div >
        )
    }
}

export default withStyles(styles)(PostsWorkEdit);