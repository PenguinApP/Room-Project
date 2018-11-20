import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import firebase, { db, auth } from '../Config/Firebase';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import update from 'immutability-helper';

const styles = theme => ({
    container: {
        margin: 'auto',
        width: '100%',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    cssLabel: {
        '&$cssFocused': {
            color: '#00CCFF',
        },
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: '#00CCFF',
        },
    },
    button: {
        margin: theme.spacing.unit,
        backgroundColor: '#00CCFF',
        color: 'white',
    },
});

class Work extends Component {

    constructor(props) {
        super(props)
        this.state = {
            workName: '',

        }
    }

    handleOnchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = () => {
        if (!this.state.workName.trim()) {
            alert('กรุณากรอกชื่องาน')
            this.setState({ name: '', })
        } else {
            var Work = {
                name: this.state.workName,
                startAt: new Date(),
                endAt: new Date(),
                content: '',
                isDone: false,
                room: this.props.roomName,
                user: this.props.user.uid
            }
            this.setState({ workName: '' })
            console.log(Work)
        }

        // itemTask.push(task)
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <FormControl className={classes.margin}>
                    <InputLabel
                        FormLabelClasses={{
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                        }}
                        htmlFor="custom-css-input"
                    >
                        เพิ่มงาน
                    </InputLabel>
                    <Input
                        classes={{
                            underline: classes.cssUnderline,
                        }}
                        id="custom-css-input"
                        name="workName"
                        onChange={this.handleOnchange}
                        value={this.state.workName}
                    />
                </FormControl>
                <Button onClick={this.handleSubmit} variant="fab" className={classes.button}>
                    <AddIcon />
                </Button>



            </div>
        )
    }
}


Work.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Work);

