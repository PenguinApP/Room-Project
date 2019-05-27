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

import moment from 'moment';
const postsRef = db.collection('posts')
const commentRef = db.collection('comment')

const styles = theme => ({
    textField: {
        // marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class PostsWorkEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            workEdit: [],
        }
    }

    handleEditSubmit = (id) => {
        const { item } = this.props
        var endDate = document.getElementById("endDate").value
        var endTime = document.getElementById("endTime").value
        var endAt = endDate + 'T' + endTime
        var time = new Date()
        console.log(endAt)

        var workUpdate = {
            name: document.getElementById("name").value,
            startAt: item.startAt,
            endAt: new Date(endAt),
            content: document.getElementById("content").value,
            isDone: item.isDone,
            roomId: item.roomId,
            roomRole: item.roomRole,
            workId: id,
            workGroupId: item.workGroupId,
            workGroup: item.workGroup,
            workRole: item.workRole,

        }

        this.props.editPostClose()

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
        const { postUpdateItem, classes, open, anchorEl, editPostOpen, editPostClose, deletePost, handleMenuClose } = this.props
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
                            id="name"
                            label="ชื่องาน"
                            type="name"
                            fullWidth
                        // defaultValue={item.name}
                        />

                        <TextField
                            margin="dense"
                            id="content"
                            label="รายละเอียด"
                            type="text"
                            name="content"
                            fullWidth
                        // defaultValue={item.content}
                        // onChange={item.content}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={editPostClose} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={() => this.handleEditSubmit(postUpdateItem)} color="primary">
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
                        <Button onClick={() => this.deleteCommentPost(postUpdateItem.postId)} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog >



            </div >
        )
    }
}

export default withStyles(styles)(PostsWorkEdit);