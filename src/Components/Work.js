import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import firebase, { db, auth } from '../Config/Firebase';
import update from 'immutability-helper';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const itemRef = db.collection('Work')

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
            work: [],
        }
    }

    handleOnchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {
        var { work } = this.state
        var { user, roomName } = this.props
        var self = this

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
                room: roomName.id,
            }

            const updateWork = update(work, { $push: [Work] })

            itemRef.add(Work)
                .then(function (docRef) {
                    const WorkLength = updateWork.length
                    const id = docRef.id
                    updateWork[WorkLength - 1].id = id
                    self.onArrayUpdate(updateWork)
                })

            self.setState({ workName: '' }, () => {
                console.log(updateWork)
            })

        }

        // itemTask.push(task)
    }

    handleTaskOpen = (value, page) => {

        this.props.handleWorkOpen(value, page)


        console.log(value, page)
    };

    onArrayUpdate = (updateWorks) => {
        this.setState({ work: updateWorks }, () => {
        })
    }

    render() {
        const { classes } = this.props;
        const { work } = this.state;
        return (
            <div>
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

                <div>
                    {work.map((value) => {
                        return (
                            <ListItem
                                key={value.id}
                                button
                                onClick={() => this.handleTaskOpen(value, 'task')}
                            >
                                <ListItemText
                                    primary={value.name}
                                />
                            </ListItem>


                        )
                    }
                    )
                    }

                </div>

            </div>




        )
    }
}


Work.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Work);

