import React, { Component } from 'react';
import firebase, { db, auth } from '../Config/Firebase';
import moment from 'moment';
import 'moment/locale/th';

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

const roomRef = db.collection('room')
const roomMemberRef = db.collection('roomMember')
const workRef = db.collection('work')
const taskRef = db.collection('task')
const userRef = db.collection('user')
const workGroupMemberRef = db.collection('workGroupMember')
const workGroupRef = db.collection('workGroup')
const posts = db.collection('Posts')


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
    maxWidth: 400,
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
    backgroundColor: red[500],
  },
});


class PostsWork extends Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      post: '',
      comment: '',
      commitPost: [],
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };
    handlePost = () => {
        var { post, comment, commitPost } = this.state;
        var { roomName, user } = this.props;
        var newPost = {
            post: post,
            userName: user.displayName,
            photoURL: user.photoURL,
            date: new Date(),
        }
        const allPost = update(commitPost, { $push: [newPost] })
        posts.add(newPost);
        this.setState({
            commitPost: allPost,
            post: '',

        })

        console.log(allPost);
    }

    handleOnchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleComment = () => {

    }


    render() {
        const { commitPost } = this.state;
        const { classes } = this.props;

        return (

            <div>
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
                    name="post"
                    value={this.state.post}
                    onChange={this.handleOnchange}
                />
                <Button onClick={this.handlePost} variant="contained" className={classes.button}>
                    แชร์
                </Button>

                {commitPost.map((value) => {
                    return (
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar  src={commitPost.photoURL}/>
                                    
                                }
                                action={
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={commitPost.userName}
                                subheader={moment(commitPost.date).format('lll')}
                            />
                            <CardMedia
                                className={classes.media}
                                image="/static/images/cards/paella.jpg"
                                title="Paella dish"
                            />
                            <CardContent>
                                <Typography component="p">
                                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
                            </CardContent>
                            <CardActions className={classes.actions} disableActionSpacing>
                                <IconButton aria-label="Add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="Share">
                                    <ShareIcon />
                                </IconButton>
                                <IconButton
                                    className={classnames(classes.expand, {
                                        [classes.expandOpen]: this.state.expanded,
                                    })}
                                    onClick={this.handleExpandClick}
                                    aria-expanded={this.state.expanded}
                                    aria-label="Show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <div class="ui small comments">
                                        <h3 class="ui dividing header">Comments</h3>

                                        <form class="ui reply form">
                                            <div class="field">
                                                <textarea></textarea>
                                            </div>
                                            <IconButton aria-label="send">
                                                <SendIcon />
                                            </IconButton>
                                        </form>
                                        <div class="comment">
                                            <a class="avatar">

                                            </a>
                                            <div class="content">
                                                <a class="author">Elliot Fu</a>
                                                <div class="metadata">
                                                    <span class="date">Yesterday at 12:30AM</span>
                                                </div>
                                                <div class="text">
                                                    <p>This has been very useful for my research. Thanks as well!</p>
                                                </div>
                                                <div class="actions">
                                                    <a class="reply">Reply</a>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </CardContent>
                            </Collapse>
                        </Card>
                    )
                })}

            </div >
        );
    }
}

PostsWork.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostsWork);