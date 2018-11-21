import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import './Task.css'
import './Room.css'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class FormRow extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div className="list-wrapper">
                    <div class="card" >
                        <div class="container">
                            <h4><b>1</b></h4>
                            <p>description</p>
                        </div>
                        {/* <Button onClick={() => this.handleWorkOpen(value)} >
                            เข้าห้อง
                                </Button> */}
                    </div>

                    {/* <Grid item xs={4}>
                        <Paper className={classes.paper}>To Do</Paper>
                    </Grid> */}
                </div>
                <div className="list-wrapper">
                    <div class="card" >
                        <div class="container">
                            <h4><b>2</b></h4>
                            <p>description</p>
                        </div>
                        {/* <Button onClick={() => this.handleWorkOpen(value)} >
                            เข้าห้อง
                                </Button> */}
                    </div>

                    {/* <Grid item xs={4}>
                        <Paper className={classes.paper}>Doing</Paper>
                    </Grid> */}
                </div>
                <div className="list-wrapper">
                    <div class="card" >
                        <div class="container">
                            <h4><b>3</b></h4>
                            <p>description</p>
                        </div>
                        {/* <Button onClick={() => this.handleWorkOpen(value)} >
                            เข้าห้อง
                                </Button> */}
                    </div>

                    {/* <Grid item xs={4}>
                    <Paper className={classes.paper}>Done</Paper>
                </Grid> */}
                </div>
            </div>
        );
    }
}
FormRow.propTypes = {
    classes: PropTypes.object.isRequired,
};

class NestedGrid extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className="list-wrapper">
                <Grid container spacing={8}>
                    <Grid container item xs={12} spacing={24}>
                        <FormRow classes={classes} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
NestedGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedGrid);