import React, { Component } from 'react';
import firebase, { db, auth } from '../Config/Firebase';

import moment from 'moment';
import 'moment/locale/th';

import PostsWorkEdit from './PostsWorkEdit';
import Comment from './Comment';
import Paper from '@material-ui/core/Paper';

import FileLogo from '../Picture/fileLogo.jpg'

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
import Link from '@material-ui/core/Link';

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
    width: '100%',
  },

  outerDivCard: {
    width: '100%',
  },

  innerDivCard: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
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

  cardFile: {
    display: 'flex',
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
  },

  content: {
    flex: '1 0 auto',
  },

  cover: {
    width: 100,
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
      anchorEl: null,
      postEditItem: [],
      open: false,
    }
  }

  componentDidMount() {
    var { posts, comment, commitPost } = this.state;
    var { roomName, user } = this.props;
    var self = this
    var newPost = []
    var storageRef = firebase.storage().ref();
    var queryPost = postsRef.where("roomId", "==", roomName.roomId)

    queryPost
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            userRef.doc(change.doc.data().userId)
              .get()
              .then(function (doc) {
                var fileName = change.doc.data().fileName
                // var file = storageRef.child(`/postFile/${fileName}`);

                var detectFile = fileName.substr(fileName.length - 4);

                // file.getMetadata().then(function (metadata) {
                newPost.push({
                  post: change.doc.data().post,
                  userName: doc.data().displayName,
                  photoURL: doc.data().photoURL,
                  date: change.doc.data().date.toDate(),
                  postId: change.doc.id,
                  fileName: fileName,
                  fileURL: change.doc.data().fileURL,
                  fileType: detectFile,
                })

                self.setState({
                  commitPost: newPost
                }, () =>
                    console.log(self.state.commitPost)
                )

                // }).catch(function (error) {

                // });
              })
          }
          if (change.type === "modified") {

          }

          if (change.type === "removed") {
            const postDeleteIndex = self.state.commitPost.findIndex(item => item.postId === change.doc.id)
            if (postDeleteIndex >= 0) {
              const deletePost = update(self.state.commitPost, { $splice: [[postDeleteIndex, 1]] })
              self.setState({
                commitPost: deletePost,

              }, () => {
                newPost.splice(postDeleteIndex, 1)
                console.log(self.state.commitPost, 'newEditwork', postDeleteIndex, 'workDeleteIndex')
              })
              // self.props.queryWork(roomName)
            }
          }
        });
      });
  }




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

  handleExpandClick = (value) => {
    this.setState({
      expanded: value === this.state.expanded ? false : value
    }, () => {
      console.log(this.state.expanded)
    });
  };

  handleMenuOpen = (event, value) => {
    this.setState({
      anchorEl: event.currentTarget,
      postUpdateItem: value,
    }, () => {
      console.log(this.state.postUpdateItem)
    });

  };

  handleMenuClose = () => {
    this.setState({
      anchorEl: null,
      postUpdateItem: [],
    });
  };

  editPostOpen = (check) => {
    this.setState({
      open: check === this.state.open ? false : check,
      anchorEl: null,
    });
  }

  editPostClose = () => {
    this.setState({
      open: false
    })
  }


  render() {
    const { commitPost, fileURL, fileName, expanded, anchorEl, postUpdateItem, open, check } = this.state;
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
        <div className={classes.outerDivCard} >
          <main className={classes.innerDivCard}>
            {commitPost.map((value) => {
              return (
                <div>
                  <Card className={classes.card}>
                    <CardHeader
                      avatar={
                        <Avatar alt="Remy Sharp" src={value.photoURL} className={classes.avatar} />
                      }
                      action={
                        <IconButton
                          aria-owns={anchorEl ? 'simple-menu' : null}
                          aria-haspopup="true"
                          color="inherit"
                          onClick={(event) => this.handleMenuOpen(event, value)}>
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={value.userName}
                      subheader={moment(value.date).format('lll')}
                    />

                    <CardContent>
                      {value.fileType === ".png" ?
                        < img src={value.fileURL} className={classes.media} alt={value.fileName} />
                        :
                        value.fileType === "jpeg" ?
                          < img src={value.fileURL} className={classes.media} alt={value.fileName} />
                          :
                          value.fileType === ".jpg" ?
                            < img src={value.fileURL} className={classes.media} alt={value.fileName} />
                            :
                            value.fileType === "docx" ?
                              <Card className={classes.cardFile}>
                                <CardMedia
                                  className={classes.cover}
                                  image={FileLogo}
                                  title="Live from space album cover"
                                />
                                <div className={classes.details}>
                                  <CardContent className={classes.content}>
                                    <Typography component="h5" variant="h5">
                                      <Link href={value.fileURL}>
                                        {value.fileName}
                                      </Link>
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                      Word File
                                </Typography>
                                  </CardContent>

                                </div>
                              </Card>
                              :
                              value.fileType === "pptx" ?
                                <Card className={classes.cardFile}>
                                  <CardMedia
                                    className={classes.cover}
                                    image={FileLogo}
                                    title="Live from space album cover"
                                  />
                                  <div className={classes.details}>
                                    <CardContent className={classes.content}>
                                      <Typography component="h5" variant="h5">
                                        <Link href={value.fileURL}>
                                          {value.fileName}
                                        </Link>
                                      </Typography>
                                      <Typography variant="subtitle1" color="textSecondary">
                                        PowerPoint File
                                </Typography>
                                    </CardContent>

                                  </div>
                                </Card>
                                :


                                value.fileType === "xlsx" ?
                                  <Card className={classes.cardFile}>
                                    <CardMedia
                                      className={classes.cover}
                                      image={FileLogo}
                                      title="Live from space album cover"
                                    />
                                    <div className={classes.details}>
                                      <CardContent className={classes.content}>
                                        <Typography component="h5" variant="h5">
                                          <Link href={value.fileURL}>
                                            {value.fileName}
                                          </Link>
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                          Excel File
                                </Typography>
                                      </CardContent>

                                    </div>
                                  </Card>
                                  :
                                  value.fileType === ".pdf" ?
                                    <Card className={classes.cardFile}>
                                      <CardMedia
                                        className={classes.cover}
                                        image={FileLogo}
                                        title="Live from space album cover"
                                      />
                                      <div className={classes.details}>
                                        <CardContent className={classes.content}>
                                          <Typography component="h5" variant="h5">
                                            <Link href={value.fileURL}>
                                              {value.fileName}
                                            </Link>
                                          </Typography>
                                          <Typography variant="subtitle1" color="textSecondary">
                                            PDF File
                                </Typography>
                                        </CardContent>

                                      </div>
                                    </Card>
                                    :
                                    value.fileType === "" ?
                                      null
                                      :
                                      <Card className={classes.cardFile}>
                                        <CardMedia
                                          className={classes.cover}
                                          image={FileLogo}
                                          title="Live from space album cover"
                                        />
                                        <div className={classes.details}>
                                          <CardContent className={classes.content}>
                                            <Typography component="h5" variant="h5">
                                              <Link href={value.fileURL}>
                                                {value.fileName}
                                              </Link>
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary">
                                              File
                                </Typography>
                                          </CardContent>

                                        </div>
                                      </Card>
                      }
                    </CardContent>
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
              )
            }
            )}
          </main>
        </div>
        <PostsWorkEdit
          anchorEl={anchorEl}
          postUpdateItem={postUpdateItem}
          open={open}
          check={check}

          handleMenuOpen={this.handleMenuOpen}
          handleMenuClose={this.handleMenuClose}
          editPostOpen={this.editPostOpen}
          editPostClose={this.editPostClose}
        />
      </div >

    )
  }
}



PostsWork.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostsWork);