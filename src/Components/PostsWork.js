import React, { Component } from 'react';
import firebase, { db, auth } from '../Config/Firebase';
import moment from 'moment';
import 'moment/locale/th';
import Comment from './Comment';
import Paper from '@material-ui/core/Paper';

import pic from '../Picture/image_big_5a7139a336b78.jpg'

import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import SendIcon from '@material-ui/icons/Send';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import update from 'immutability-helper';
import { Upload } from 'antd';
import { green } from '@material-ui/core/colors';
import { O_WRONLY } from 'constants';

const roomRef = db.collection('room')
const roomMemberRef = db.collection('roomMember')
const workRef = db.collection('work')
const taskRef = db.collection('task')
const userRef = db.collection('user')
const workGroupMemberRef = db.collection('workGroupMember')
const workGroupRef = db.collection('workGroup')
const postsRef = db.collection('posts')

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '96%',
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },

  card: {
    maxWidth: 700,
  },

  outerDivCard: {
    width: '100%',
  },

  innerDivCard: {
    display: 'table',
    margin: 'auto',
    justifyContent: 'center',
  },


  media: {
    width: '100%',
  },

  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  avatarTest: {
    backgroundColor: red[500],
  },
  postFrame: {

  },
  input: {
    display: 'none',
  },
});


class PostsWork extends Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      posts: '',
      commitPost: [],
      uploadValue: 0,
      fileURL: '',
      fileName: '',
      postId: '',
    }
  }

  componentDidMount() {
    var { posts, comment, commitPost } = this.state;
    var { roomName, user } = this.props;
    var self = this
    var newPost = []

    var queryPost = postsRef.where("roomId", "==", roomName.roomId)

    queryPost
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            userRef.doc(change.doc.data().userId)
              .get()
              .then(function (doc) {
                newPost.push({
                  post: change.doc.data().post,
                  userName: doc.data().displayName,
                  photoURL: doc.data().photoURL,
                  date: change.doc.data().date.toDate(),
                  postId: change.doc.id,
                  fileName: change.doc.data().fileName,
                  fileURL: change.doc.data().fileURL,
                })
                self.setState({
                  commitPost: newPost
                }, () =>
                    console.log(self.state.commitPost)
                )
              })
          }
          if (change.type === "modified") {

          }

          if (change.type === "removed") {

          }
        });
      });
  }

  handleExpandClick = (value) => {
    this.setState({
      expanded: value === this.state.expanded ? false : value
    }, () => {
      console.log(this.state.expanded)
    });
  };


  handleSubmitPost = () => {
    var { posts, comment, commitPost, fileName, fileURL } = this.state;
    var { roomName, user } = this.props;

    var newPost = {
      post: posts,
      userId: user.uid,
      date: new Date(),
      roomId: roomName.roomId,
      fileName: fileName,
      fileURL: fileURL,
    }

    console.log(newPost);
    postsRef.add(newPost);

    this.setState({
      posts: '',
      fileName: '',
      fileURL: '',
      uploadValue: 0,
    }, () =>
        console.log(this.state.fileName, this.state.fileURL))
  }


  handleOnchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmitComment = () => {

  }

  onButtonWorkBack = (value, page) => {

    this.props.backPage(value, page)

    console.log(page)
  };

  onFileData = (file) => {
    this.setState({
      fileName: file.fileName,
      fileURL: file.fileURL,
    });
  }

  handleUpload = (event) => {
    var self = this;
    var file = event.target.files[0];
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

        var fileUpload = {
          fileURL: downloadURL,
          fileName: fileName,
        }

        self.setState({
          uploadValue: 100,
          fileURL: downloadURL,
          fileName: fileName
        });

        self.onFileData(fileUpload)

      });
    });
  }




  render() {
    const { commitPost, fileURL, fileName, expanded } = this.state;
    const { classes, user } = this.props;

    return (

      <div className="postNav">
        <Paper className="postFrame" color="primary">
          <TextField
            id="outlined-textarea"
            label="แลกเปลี่ยนความรู้ในห้องเรียน"
            multiline
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="outlined"
            name="posts"
            value={this.state.posts}
            onChange={this.handleOnchange}
          />
          <div>

            <input type="file" onChange={this.handleUpload} id="contained-button-file" className={classes.input} />
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span" className={classes.button} >Upload</Button>
            </label>
            <progress value={this.state.uploadValue} max="100">
              {this.state.uploadValue} %
            </progress>
            <br />
            <a href={fileURL} target="_blank"> {fileName}</a>


          </div>
        </Paper>

        <Button onClick={this.handleSubmitPost} variant="contained" className={classes.button}>
          แชร์
        </Button>

        <Button onClick={() => this.onButtonWorkBack(null, 'room')} variant="contained" className={classes.button} >
          ย้อนกลับ
        </Button>
        <br />
        <br />
        <br />

        {commitPost.map((value) => {
          return (
            <div className={classes.outerDivCard} >
              <div className={classes.innerDivCard}>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar alt="Remy Sharp" src={value.photoURL} className={classes.avatar} />
                    }
                    action={
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={value.userName}
                    subheader={moment(value.date).format('lll')}
                  />

                  <img src={value.fileURL} className={classes.media} alt={value.fileName} />

                  <CardContent>
                    <Typography component="p">
                      {value.post}
                    </Typography>
                  </CardContent>

                  <CardActions className={classes.actions} disableActionSpacing>

                    <IconButton
                      className={classnames(classes.expand, {
                        [classes.expandOpen]: this.state.expanded === value.postId,
                      })}
                      onClick={() => this.handleExpandClick(value.postId)}
                      aria-expanded={this.state.expanded === value.postId}
                      aria-label="Show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={this.state.expanded === value.postId} timeout="auto" unmountOnExit>
                    <Comment
                      user={user}
                      expanded={expanded}
                    />
                  </Collapse>
                </Card>

                <br />

              </div>
            </div>

          )
        })}
      </div >

    )
  }
}



PostsWork.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostsWork);