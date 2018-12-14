import React, { Component } from 'react';
import firebase from 'firebase';


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
        var storageRef = firebase.storage().ref(`/studentFile/${file.name}`);
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

    // onFileData = (file) => {
    //     this.props.handleSubmit(file)
    // }

    render() {
        const { fileURL, fileName } = this.state;
        return (
            <div>

                <progress value={this.state.uploadValue} max="100">
                    {this.state.uploadValue} %
                </progress>
                <br />

                <input type="file" onChange={this.handleUpload} />
                <br />

                <a href={fileURL} target="_blank"> {fileName}</a>
            </div>



        );
    }


}
export default FileUpload;