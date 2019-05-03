import React, { Component } from 'react';
import firebase, { db, auth } from '../Config/Firebase';

import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';

class Comment extends Component{

    constructor(props) {
        super(props)
        this.state = {
        
        }
      }   
render(){
    
    return(
        <Collapse in={this.props.expanded} id={this.props.postId} timeout="auto" unmountOnExit>
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
                      <img src="/images/avatar/small/elliot.jpg"/>
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
    )
}
}

export default Comment;