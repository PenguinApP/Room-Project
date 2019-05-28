import React, { Component } from 'react';
import firebase, { db, auth } from '../Config/Firebase';
import moment from 'moment';
import 'moment/locale/th';
import update from 'immutability-helper';

import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import EditComment from './EditComment';
import Hidden from "@material-ui/core/Hidden";

const commentRef = db.collection('comment')
const userRef = db.collection('user')


const styles = theme => ({

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '60%',
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  avatar: {
    margin: 10,
  },
  editComment: {
    position: 'right'
  },
  settingBtn: {
    position: 'absolute',
    top: 25,
    right: 5,

  }

})

class Comment extends Component {

  constructor(props) {
    super(props)
    this.state = {
      comment: '',
      commitComment: [],
      anchorEl: null,
      item: [],
      openEdit: false,
      openDelete: false,
    }
  }

  componentDidMount() {
    var { expanded, user } = this.props;
    var self = this
    var newComment = []
    var queryComment = commentRef.where("postId", "==", expanded);

    queryComment
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            userRef.doc(change.doc.data().userId)
              .get()
              .then(function (doc) {
                var date = change.doc.data().date.toDate()
                newComment.push({
                  comment: change.doc.data().comment,
                  userName: doc.data().displayName,
                  photoURL: doc.data().photoURL,
                  date: date,
                  commentId: change.doc.id,
                })
                var commentSort = newComment.sort(function (x, y) {
                  var a = new Date(x.date);
                  var b = new Date(y.date);

                  return b - a;
                });
                console.log(change.doc.data());
                self.setState({
                  commitComment: commentSort
                }, () =>
                    console.log(self.state.commitComment)
                )
              })
          }
          if (change.type === "modified") {
            userRef.doc(change.doc.data().userId)
              .get()
              .then(function (doc) {
                var commentEdit = {
                  comment: change.doc.data().comment,
                  userName: doc.data().displayName,
                  photoURL: doc.data().photoURL,
                  date: change.doc.data().date.toDate(),
                  commentId: change.doc.id,
                }
                const commentEditIndex = self.state.commitComment.findIndex(item => item.commentId === change.doc.id)
                const updateEditComment = update(self.state.commitComment, { [commentEditIndex]: { $set: commentEdit } })
                self.setState({
                  commitComment: updateEditComment
                }, () => {
                  newComment.splice(commentEditIndex, 1, commentEdit)
                  console.log(self.state.commitComment)
                })
              })
            console.log(change.doc.data());

          }
          if (change.type === "removed") {
            // console.log(change.doc.id, "delete")
            const commentDeleteIndex = self.state.commitComment.findIndex(item => item.commentId === change.doc.id)
            if (commentDeleteIndex >= 0) {
              const deleteComment = update(self.state.commitComment, { $splice: [[commentDeleteIndex, 1]] })
              self.setState({
                commitComment: deleteComment,

              }, () => {
                newComment.splice(commentDeleteIndex, 1)
                console.log(self.state.commitComment)
              })
            }

          }
        });
      });
  }

  
  handleSubmitComment = () => {
    var { comment } = this.state;
    var { user, expanded } = this.props;

    if (!comment.trim()) {
      alert('กรุณาใส่ข้อความก่อนทำการคอมเมนต์')
    }else {
    var newComment = {
      comment: comment,
      userId: user.uid,
      date: new Date(),
      postId: expanded,

    }
    this.setState({
      comment: '',
    })
    console.log(newComment);
    commentRef.add(newComment);
  }
  }


  handleOnchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleMenuOpen = (event, value) => {
    this.setState({
      anchorEl: event.currentTarget,
      item: value
    }, () => console.log(this.state.item))

  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

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
    const { commitComment, anchorEl, item, openEdit, openDelete } = this.state;
    const { classes } = this.props;
    return (

      <CardContent>

        <div class="ui comments">
          <h3 class="ui dividing header">Comments</h3>

          <Hidden smUp implementation="css">
            <div class="field">
              <TextField
                id="outlined-textarea"
                label="แสดงความคิดเห็นในห้องเรียน"
                multiline
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                variant="outlined"
                name="comment"
                value={this.state.comment}
                onChange={this.handleOnchange}
              />
              <IconButton aria-label="send" onClick={() => this.handleSubmitComment()} >
                <SendIcon
                  style={{ fontSize: 50 }}
                />
              </IconButton>
            </div>
          </Hidden>

          <Hidden xsDown implementation="css">
            <div class="field">
              <TextField
                id="outlined-textarea"
                label="แสดงความคิดเห็นในห้องเรียน"
                multiline
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                variant="outlined"
                name="comment"
                value={this.state.comment}
                onChange={this.handleOnchange}
              />
              <IconButton aria-label="send" onClick={() => this.handleSubmitComment()} >
                <SendIcon
                  style={{ fontSize: 60 }}
                />
              </IconButton>
            </div>
          </Hidden>

          {commitComment.map((value) => {
            return (

              <div>
                <Hidden smUp implementation="css">
                  <List className={classes.root}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={value.photoURL} className={classes.avatar} />
                      </ListItemAvatar>

                      <ListItemText
                        primary={<React.Fragment>{value.userName}
                          <Typography
                            className={classes.inline}
                            color="textSecondary"
                          >
                            < ListItemSecondaryAction className={classes.settingBtn}>
                              <IconButton onClick={(event) => this.handleMenuOpen(event, value)}>
                                <MoreVertIcon />
                              </IconButton>
                            </ ListItemSecondaryAction>


                            <br />
                            {moment(value.date).format('lll')}



                          </Typography>
                        </React.Fragment>}
                        secondary={
                          <React.Fragment>

                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              <br />
                              {value.comment}

                            </Typography>

                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </List>
                </Hidden>


                <Hidden xsDown implementation="css">
                  <List className={classes.root}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={value.photoURL} className={classes.avatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={<React.Fragment>{value.userName}
                          <Typography
                            className={classes.inline}
                            color="textSecondary"
                          >
                            &nbsp;&nbsp;&nbsp;&nbsp;
                          {moment(value.date).format('lll')}

                            < ListItemSecondaryAction >
                              <IconButton onClick={(event) => this.handleMenuOpen(event, value)}>
                                <MoreVertIcon />
                              </IconButton>
                            </ ListItemSecondaryAction>

                          </Typography>
                        </React.Fragment>}
                        secondary={
                          <React.Fragment>

                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              <br />
                              {value.comment}

                            </Typography>

                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </List>
                </Hidden>
              </div>

            )
          })}

        </div>
        <EditComment
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
        />
      </CardContent>



    )
  }
}

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comment);