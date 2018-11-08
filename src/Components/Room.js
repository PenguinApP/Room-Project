import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class Room extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }
    }


    handleWorkOpen = () => {

        
    };


    render() {
        const { room } = this.props;
        return (
            <div>
                <List component="nav">
                    {room.map((value) => {
                        return (
                            <ListItem
                                key={value.id}
                                button
                                onClick={() => this.handleWorkOpen(value)}
                            >
                                <ListItemText
                                    primary={value.name}
                                />
                            </ListItem>
                        )
                    }
                    )
                    }
                </List>
            </div>
        )
    }
}

Room.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Room);