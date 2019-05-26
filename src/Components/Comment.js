import React, { Component } from 'react';
import firebase, { db, auth } from '../Config/Firebase';
import moment from 'moment';
import 'moment/locale/th';

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

const commentRef = db.collection('comment')
const userRef = db.collection('user')


const styles = theme => ({

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '80%',
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

})

class Comment extends Component {

  constructor(props) {
    super(props)
    this.state = {
      comment: '',
      commitComment: [],

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
                newComment.push({
                  comment: change.doc.data().comment,
                  userName: doc.data().displayName,
                  photoURL: doc.data().photoURL,
                  date: change.doc.data().date.toDate(),
                  commentId: change.doc.id,
                })

                console.log(change.doc.data());
                self.setState({
                  commitComment: newComment
                }, () =>
                    console.log(self.state.commitComment)
                )
              })
          }
          if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
          }
        });
      });
  }

  handleSubmitComment = () => {
    var { comment } = this.state;
    var { user, expanded } = this.props;

    var newComment = {
      comment: comment,
      userId: user.uid,
      date: new Date(),
      postId: expanded,

    }
    console.log(newComment);
    commentRef.add(newComment);
  }

  handleOnchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { commitComment } = this.state;
    const { classes } = this.props;
    return (

      <CardContent>

        <div class="ui comments">
          <h3 class="ui dividing header">Comments</h3>

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

          {commitComment.map((value) => {
            return (
              <div>
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

              </div>
            )
          })}

        </div>

      </CardContent>

    )
  }
}

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comment);