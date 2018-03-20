import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import FlipMove from 'react-flip-move';
import { connect } from 'react-redux';

import { removeDocumentWithId } from '../../../../actions/meteorSpecific';
import Documents from '../../../../api/documents/documents';
import CbGenerator from '../../../../util/MeteorActionCallback';

class DocumentStatusViewer extends React.Component {
  handleFileRemove = (_id) => {
    const data = {
      header: 'File management',
      message: 'File was successfully deleted',
      errorMessage: 'File wasnt deleted',
    };

    this.props.dispatch(removeDocumentWithId(_id, CbGenerator(data)));
  }

  render() {
    return (
      <div className="box margin-top">

        <div className="box-header with-border">
          <h3 className="box-title">Verification status</h3>
        </div>

        <div className="box-body">
          <FlipMove maintainContainerHeight duration={700}>
            {this.props.documentsReady && this.props.documents.map((file) => {
                let fileCursor = Documents.findOne({ _id: file._id });
                return (
                  <div className="row" key={file._id}>
                    <div className="col-md-2">
                      {file.isImage && <img className="seized" src={fileCursor.link()} alt="Product" />}
                      {file.isPDF && <i className="fa fa-file-pdf-o upl-viewer__icon" />}
                      <hr />
                    </div>
                    <div className="col-md-5">
                      <p>{file.name}</p>
                      <a target="_blank" href={fileCursor.link()}>Click to show</a>
                    </div>
                    <div className="col-md-4">
                      {!this.props.verif && <span className="label bg-red moderation-label">Not verified</span>}
                      {this.props.verif && <span className="label bg-green moderation-label">Verified</span>}
                    </div>
                    <div className="col-md-1">
                      <span role="button" onClick={() => this.handleFileRemove(file._id)} className="btn-box-tool pull-right">
                        <i className="fa fa-times" />
                      </span>
                    </div>
                  </div>
                );
              })}
          </FlipMove>
        </div>
        <div className="box-footer text-center">
          <span>Supported formats: png, jpg, jpeg, pdf less than 20 mb</span>
        </div>
      </div>
    );
  }
}

export default connect()(withTracker(() => {
  const documentsSub = Meteor.subscribe('getDocumentsOfUser', Meteor.userId());

  return {
    documentsReady: documentsSub.ready(),
    documents: Documents.find().fetch(),
  };
})(DocumentStatusViewer));
