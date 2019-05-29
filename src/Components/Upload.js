import React, { Component } from 'react';
import firebase from 'firebase';
import { withStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    chip: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class FileUpload extends Component {

    constructor() {
        super();
        this.state = {
            uploadValue: 0,
            fileURL: null,
            fileName: null,
        };
    }
    handleUpload = (event) => {
        var self = this;
        var file = event.target.files[0];
        if (file) {
            var storageRef = firebase.storage().ref(`/taskFile/${file.name}`);
            var task = storageRef.put(file);

            task.on('state_changed', snapshot => {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({
                    uploadValue: percentage
                })
            }, error => {
                console.log(error.message);

            }, function () {
                task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log('The download URL : ', downloadURL, 'file name : ', file.name);
                    var fileName = file.name

                    var fileUpload = {
                        fileURL: downloadURL,
                        fileName: fileName,
                    }

                    self.setState({
                        uploadValue: 100,
                        fileURL: downloadURL,
                        fileName: fileName
                    });

                    self.props.onFileData(fileUpload)

                });
            });
        }
    }

    // onFileData = (file) => {
    //     this.props.handleSubmit(file)
    // }

    handleDeleteFileBeforeUpload = () => {

        var fileUpload = {
            fileURL: '',
            fileName: '',
        }
        this.setState({
            uploadValue: 0,
            fileURL: fileUpload.fileURL,
            fileName: fileUpload.fileName,
        })
        this.props.onFileData(fileUpload)
    }

    render() {
        const { fileURL, fileName } = this.state;
        const { classes } = this.props;
        return (
            <div>

                <progress value={this.state.uploadValue} max="100">
                    {this.state.uploadValue} %
                </progress>
                <br />

                <input type="file" onChange={this.handleUpload} id="contained-button-file-task" className={classes.input} />
                <label htmlFor="contained-button-file-task">
                    &nbsp;&nbsp;<Button variant="contained" component="span" className={classes.button} >Upload</Button>
                </label>
                <br />

                {fileName ?
                    <div>
                        <Chip
                            label={fileName}
                            className={classes.chip}
                            component="a"
                            color="secondary"
                            href={fileURL}
                            target="_blank"
                            clickable
                        />
                        <IconButton aria-label="Delete" onClick={() => { this.handleDeleteFileBeforeUpload() }}>
                            <DeleteIcon fontSize="medium" />
                        </IconButton>
                    </div>
                    :
                    null
                }

            </div>



        );
    }


}
export default withStyles(styles)(FileUpload);