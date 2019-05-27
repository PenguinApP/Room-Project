import React, { Component } from 'react';
import firebase, { db, auth } from '../Config/Firebase';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const commentRef = db.collection('comment')
const styles = theme => ({
    
});

class CommentEdit extends Component {

    constructor(props) {
      super(props)
      this.state = {
       
  
      }
    }

    handleEditSubmit = () => {
        const {item} = this.props

    
    commentRef.doc(item.commentId).set({
        comment: document.getElementById("comment").value,
        }, { merge: true });
        this.props.editWorkClose();
    }

    deleteWork = (id) => {
        this.props.deleteWorkClose()
        commentRef.doc(id).delete()
    }
    

    


    render() {
        const { item, openEdit, openDelete, anchorEl, editWorkOpen, editWorkClose, deleteWorkOpen, deleteWorkClose,  handleMenuClose, } = this.props
        return (
    
        <div>
            <Menu
                    id={item.workId}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => editWorkOpen()}>แก้ไข</MenuItem>

                    <MenuItem onClick={() => deleteWorkOpen()}>ลบ</MenuItem>
                </Menu>

                <Dialog
                    open={openEdit}
                    onClose={editWorkClose}
                    aria-labelledby="form-dialog-title"
                >  
                <DialogTitle id="form-dialog-title">{"แก้ไข"}</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="comment"
                            label="ความคิดเห็น"
                            type="text"
                            fullWidth
                            defaultValue={item.comment}
                        />
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={editWorkClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleEditSubmit()} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                
                </Dialog>  

                <Dialog
                    open={openDelete}
                    onClose={editWorkClose}
                    aria-labelledby="form-dialog-title"
                >

                    <DialogTitle id="form-dialog-title">{"ลบ"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            เมื่อลบงานแล้วจะไม่สามารถกู้คืนได้
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={deleteWorkClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.deleteWork(item.commentId)} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
        </div>
        )
      }
    }
    
    Comment.propTypes = {
      classes: PropTypes.object.isRequired,
    };
    
    export default withStyles(styles)(CommentEdit);