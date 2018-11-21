import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
            <React.Fragment>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>To Do</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>Doing</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>Done</Paper>
                </Grid>
            </React.Fragment>
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
            <div className={classes.root}>
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