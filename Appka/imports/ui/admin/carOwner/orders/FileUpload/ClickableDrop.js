import React from 'react';
import moment from 'moment';
import { filesize } from 'meteor/mrt:filesize';
import EmptyContainer from '../../../../EmptyContainer';
import UserFiles from '../../../../../api/userFiles/userFiles';

class ClickableDrop extends React.Component {
  state = {
    upload: [],
    currentlyUploading: false,
    progress: 0,
  };

  estimateDuration = () => {
    const duration = moment.duration(this.state.upload.estimateTime.curValue);
    let hours = `${duration.hours()}`;
    if (hours.length <= 1) {
      hours = `0${hours}`;
    }
    let minutes = `${duration.minutes()}`;
    if (minutes.length <= 1) {
      minutes = `0${minutes}`;
    }
    let seconds = `${duration.seconds()}`;
    if (seconds.length <= 1) {
      seconds = `0${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
  };

  handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const clickableDrop = document.getElementById('clickableDrop');
    if (clickableDrop.className.indexOf('clickableDrop_file-over') < 0) {
      clickableDrop.className += ' clickableDrop_file-over';
    }
    e.dataTransfer.dropEffect = 'copy';
  };

  handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const clickableDrop = document.getElementById('clickableDrop');
    if (clickableDrop.className.indexOf('clickableDrop_file-over') > -1) {
      clickableDrop.className = clickableDrop.className.replace(' clickableDrop_file-over', '');
    }
  };

  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const clickableDrop = document.getElementById('clickableDrop');
    if (clickableDrop.className.indexOf('clickableDrop_file-over') > -1) {
      clickableDrop.className = clickableDrop.className.replace(' clickableDrop_file-over', '');
    }
    e.dataTransfer.dropEffect = 'copy';
    this.handleFileInput(e, e.dataTransfer.files);
  };

  handleSimpleSubmit = (e) => {
    e.preventDefault();
    this.handleFileInput(e, e.currentTarget.files);
  };

  handleProgress = (progress) => {
    this.setState({
      progress,
    });
  };

  handleAferUpload = () => {
    this.setState({
      upload: [],
      progress: 0,
      currentlyUploading: false,
    });
  };

  handleUploadError = (error) => {
    alert(error);
  };

  handleFileInput = (e, files) => {
    const file = files[0];
    const insertObject = {
      file,
      meta: {
        orderId: this.props.orderId,
      },
      streams: 'dynamic',
      chunkSize: 'dynamic',
      allowWebWorkers: true,
    };

    const matchesReqs = file.size <= 100 * 1024 * 1024 && /png|jpg|jpeg|mp4/i.test(file.type);
    if (!matchesReqs) {
      this.handleAferUpload();
      return;
    }

    const upload = UserFiles.insert(insertObject);

    this.setState({
      upload,
      currentlyUploading: true,
    });

    upload.on('progress', this.handleProgress);
    upload.on('uploaded', this.handleAferUpload);
    upload.on('error', this.handleUploadError);
  };

  render() {
    let duration;
    let speed;

    if (this.state.currentlyUploading) {
      duration = this.estimateDuration();
      speed = `${filesize(this.state.upload.estimateSpeed.curValue, { bits: true })}/s`;
    }

    return (
      <div
        id="clickableDrop"
        className="clickableDrop"
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
      >
        <input
          id="userfile"
          type="file"
          className="invisible"
          name="userfile"
          required=""
          onChange={this.handleSimpleSubmit}
        />

        {!this.state.currentlyUploading &&
        <label className="clickableDrop__button" id="fakeUpload" htmlFor="userfile">
          <i className="fa fa-cloud-upload clickableDrop__icon" />
          <h2 className="clickableDrop__header">Upload file</h2>
        </label>}

        {this.state.currentlyUploading &&
        <EmptyContainer>
          <h1 className="percentage">{this.state.progress}%</h1>
          <progress max="100" value={this.state.progress} />
          <p>{duration}&nbsp;·&nbsp;{speed}</p>
        </EmptyContainer>}
      </div>
    );
  }
}

export default ClickableDrop;
