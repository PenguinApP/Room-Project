import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Work from './Work'
import './Room.css'

const styles = {
    card: {
        width: 300,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        textAlign: 'left',
    },
    pos: {
        marginBottom: 12,
    },
};


class Room extends Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 'room',
            roomName: []
        }
    }


    handleWorkOpen = (value) => {
        this.setState({
            page: 'work'
        })
        this.setState({
            roomName: value,
        })
        this.props.roomName(value)


        console.log(value)
    };




    render() {
        const { room, classes } = this.props;
        const { page, roomName } = this.state;
        // const bull = <span className={classes.bullet}>•</span>;


        return (
            < div class="frame" >
                {page === 'room' ?
                    <div>
                        {this.props.room.map((value) => {
                            return (
                                // <ListItem
                                //     key={value.id}
                                //     button
                                //     onClick={() => this.handleWorkOpen(value)}
                                // >
                                //     <ListItemText
                                //         primary={value.name}
                                //     />
                                // </ListItem>

                                <div class="card" >
                                    <div class="container">
                                        <h4><b>{value.name}</b></h4>
                                        <p>description</p>
                                    </div>
                                    <Button onClick={() => this.handleWorkOpen(value)} >
                                        เข้าห้อง
                                </Button>
                                </div>

                            )
                        }
                        )
                        }

                    </div>
                    :
                    <Work
                        roomName={roomName}
                        user={this.props.user}
                    />
                }

                
            </div >



        )
    }
}

Room.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Room);