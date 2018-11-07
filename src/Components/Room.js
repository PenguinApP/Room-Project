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
    render() {
        const { Room } = this.props;
        return (
            <div>
                 <List component="nav">
                        {Room.map((value) => {
                            return (
                                <ListItem
                                    key={value.id}
                                    button
                                    onClick={() => this.handleEditOpen(value)}
                                >
                            
                                        <ListItemText
                                            primary={value.roomName}
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