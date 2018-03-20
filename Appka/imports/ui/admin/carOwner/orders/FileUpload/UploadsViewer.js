import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import FlipMove from 'react-flip-move';
import { connect } from 'react-redux';

import { removeFilesWithId } from '../../../../../actions/meteorSpecific';
import UserFiles from '../../../../../api/userFiles/userFiles';

class UploadsViewer extends React.Component {
  handleFileRemove = (_id) => {
    const cb = (error) => {
      if (error) {
        alert(error);
      }
    };

    this.props.dispatch(removeFilesWithId(_id, cb));
  }

  render() {
    return (
      <div className="box margin-top">

        <div className="box-header with-border">
          <h3 className="box-title">Управление загрузками</h3>
        </div>

        <div className="box-body">
          <ul className="products-list product-list-in-box">
            <FlipMove maintainContainerHeight duration={700}>
              {this.props.userFiles.map((file) => {
                let fileCursor = UserFiles.findOne({ _id: file._id });
                return (
                  <li key={file._id} className="item upl-viewer__item">
                    <div className="product-img">
                      {file.isImage && <img src={fileCursor.link()} alt="Product " />}
                      {file.isVideo && <i className="fa fa-file-video-o upl-viewer__icon" />}
                    </div>

                    <div className="product-info">
                      <a className="product-title">
                        {file.name}
                        <span role="button" onClick={() => this.handleFileRemove(file._id)} className="btn-box-tool pull-right">
                          <i className="fa fa-times" />
                        </span>
                      </a>
                      <span className="product-description">
                        Нажите чтобы просмотреть
                      </span>
                    </div>
                  </li>
                );
              })}
            </FlipMove>
          </ul>
        </div>
        <div className="box-footer text-center">
          <a href="#" className="uppercase">Как правильно снять материл</a>
        </div>
      </div>
    );
  }
}

export default connect()(withTracker(({ orderId }) => {
  const userFilesSub = Meteor.subscribe('getUserFilesForOrder', orderId);

  return {
    userFilesReady: userFilesSub.ready(),
    userFiles: UserFiles.find({ 'meta.orderId': orderId }).fetch(),
  };
})(UploadsViewer));
