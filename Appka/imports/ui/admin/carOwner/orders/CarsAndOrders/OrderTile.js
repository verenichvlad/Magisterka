import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import moment from 'moment';

import UserFiles from '../../../../../api/userFiles/userFiles';
import { setEditOrderPopup } from '../../../../../actions/ui';

const orderTile = (props) => {
  const { order } = props;
  const thumbnailLink = props.userFile ? props.userFile.link() : null;
  return (
    <li>
      <i className={`fa fa-wrench ${order.moderationStatus === 'complete' ? 'bg-green' : 'bg-red'}`} />
      <div className="timeline-item">
        <span className="time"><i className="fa fa-calendar-o" />
        &nbsp; Deadline: {moment(order.deadline).format('D MMMM YYYY, hh:mm')}
        </span>

        <h3 className="timeline-header">
          <a href="#">{order.parts}</a>
        </h3>

        <div className="timeline-body clearfix">
          <div className="row">
            <div className="col-md-6">
              <h4>You have <span className="bold">0</span> valuations</h4>
              <p>Geo: {order.location} ~{order.maxDistance}км</p>
              <button
                className="btn btn-sm btn-info"
                onClick={() => { props.dispatch(setEditOrderPopup(true, order.carId, order._id)); }}
              >Edit
              </button>
            </div>
            <div className="col-lg-3 margin-bottom">
              <h4>Moderation status:</h4>
              {!order.moderationPassed && <span className="label bg-red moderation-label">Not verified</span>}
              {order.moderationPassed && <span className="label bg-green moderation-label">Verified</span>}
            </div>
            <div className="col-lg-3">
              {thumbnailLink && <img src={thumbnailLink} alt="" className="seized img-thumbnail" />}
              {!thumbnailLink && <img src="/img/placeholder.png" alt="" className="seized img-thumbnail" />}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

const trackedComponent = withTracker(({ order }) => {
  const userFilesSub = Meteor.subscribe('getUserFilesForOrder', order._id);

  return {
    userFilesReady: userFilesSub.ready(),
    userFile: UserFiles.findOne({ isImage: true, 'meta.orderId': order._id }),
  };
})(orderTile);

export default connect()(trackedComponent);
