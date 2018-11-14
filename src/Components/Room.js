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

        }
    }


    handleWorkOpen = () => {


    };


    render() {
        const { room, classes } = this.props;
        // const bull = <span className={classes.bullet}>•</span>;

        return (
            <div class="frame">

                {room.map((value) => {
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

                            <div class="card">
                                <div class="container">
                                    <h4><b>{value.name}</b></h4>
                                    <p>description</p>
                                </div>
                            </div>

                    )
                }
                )
                }

            </div>
        )
    }
}

Room.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Room);