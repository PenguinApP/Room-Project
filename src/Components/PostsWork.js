import React, { Component } from 'react';
import firebase, { db, auth } from '../Config/Firebase';
import moment from 'moment';
import 'moment/locale/th';
import Comment from './Comment';

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
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import update from 'immutability-helper';

const roomRef = db.collection('room')
const roomMemberRef = db.collection('roomMember')
const workRef = db.collection('work')
const taskRef = db.collection('task')
const userRef = db.collection('user')
const workGroupMemberRef = db.collection('workGroupMember')
const workGroupRef = db.collection('workGroup')
const postsRef = db.collection('Posts')


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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
    maxWidth: 500,
  },
  media: {
    height: 0,
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
});


class PostsWork extends Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      posts: '',
      comment: '',
      commitPost: [],
      postId:[],
    }
  }

  componentDidMount() {
    var { posts, comment, commitPost } = this.state;
    var { roomName, user } = this.props;
    var self = this
    var commitPost = []
    var queryPost = postsRef.where("roomId", "==", roomName.roomId)

    queryPost
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            self.queryPost()
          }
          if (change.type === "modified") {

          }

          if (change.type === "removed") {

          }
        });
      });
  }

  handleExpandClick = (id) => {
    this.setState(state => ({ expanded: !state.expanded,
    postId:id 
  }),()=>{console.log(this.state.postId);});
  
};
  

  handleSubmitPost = () => {
    var { posts, comment, commitPost } = this.state;
    var { roomName, user } = this.props;

    var newPost = {
      post: posts,
      userName: user.displayName,
      photoURL: user.photoURL,
      date: new Date(),
      roomId: roomName.roomId,
    }

    postsRef.add(newPost);

    this.setState({
      posts: ''
    })
  }

  handleOnchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmitComment = () => {

  }

  queryPost = () => {
    var { posts, comment, commitPost } = this.state;
    var { roomName, user } = this.props;
    var self = this
    var commitPost = []
    var queryPost = postsRef.where("roomId", "==", roomName.roomId)

    queryPost
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          commitPost.push({
            post: doc.data().post,
            userName: doc.data().userName,
            photoURL: doc.data().photoURL,
            date: doc.data().date.toDate(),
            postId: doc.id,
          })

          self.setState({
            commitPost
          }, () =>
              console.log(self.state.commitPost)
          )
        })
      })

  }


  render() {
    const { commitPost } = this.state;
    const { classes } = this.props;

    return (

      <div className="postNav">
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
        <Button onClick={this.handleSubmitPost} variant="contained" className={classes.button}>
          แชร์
                </Button>

        {commitPost.map((value) => {
          return (
            <div>
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
              
              <CardContent>
                <Typography component="p">
                  {value.post}
                </Typography>
              </CardContent>
              <CardActions className={classes.actions} disableActionSpacing>
                <IconButton aria-label="Add to favorites">
                  <FavoriteIcon />
                </IconButton>
                
                <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.expanded,
                  })}
                  onClick={() => this.handleExpandClick(value.postId)}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Comment
              expanded = {this.state.expanded}
              postId = {this.state.postId}/>
            </Card>
            <br/>
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