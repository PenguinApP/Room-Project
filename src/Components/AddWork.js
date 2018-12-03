import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Hidden from "@material-ui/core/Hidden";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';




const styles = theme => ({
    addRoom: {
        textAlign: 'right',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class AddWork extends Component {

    constructor() {
        super()
        this.state = {
            workName: '',
            endDate: '',
            workForm: false,
            
        };
    }

    addWork = () => {
        var { workName } = this.state
        var { addWork, roomName } = this.props
        var self = this

        var Work = {
            name: workName,
            startAt: new Date(),
            endAt: new Date(),
            content: '',
            isDone: false,
            roomId: roomName.roomId,
        }
        if (!workName.trim()) {
            alert('กรุณากรอกชื่อห้อง')
            self.setState({ workName: '' })
        } else {
            addWork(Work)
            self.setState({ workName: '', workForm: false })
        }
    }

    handleClickOpen = () => {
        this.setState({ workForm: true });
    };

    handleClose = () => {
        this.setState({ workForm: false });
    };

    handleOnchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        const { classes } = this.props
        const { workForm, workName, subject } = this.state
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen} >Create Work</Button>
                <Dialog
                    open={workForm}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create Work</DialogTitle>

                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="work"
                            label="workName"
                            type="work"
                            name="workName"
                            fullWidth
                            value={workName}
                            onChange={this.handleOnchange}
                        />
                        <form className={classes.container} noValidate>
                            <TextField
                                id="date"
                                label="End Date"
                                type="date"
                                defaultValue={this.state.endDate}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.addWork} color="primary">
                            Create Work
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}

export default withStyles(styles)(AddWork);