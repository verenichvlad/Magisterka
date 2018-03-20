import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import EmptyContainer from '../../EmptyContainer';
import DropUpload from './profile/DropUpload';
import DocumentStatusViewer from './profile/DocumentStatusViewer';
import ProfileForm from './profile/ProfileForm';
import StationProfiles from '../../../api/stationProfiles/stationProfiles';

const Profile = props => (
  <EmptyContainer>
    <h3>Station Profile</h3>
    <div id="rate" className="anchor" />
    <div className="box box-primary">
      <div className="box-header with-border">
        <h3 className="box-title">Rating</h3>
      </div>
      <div className="box-body">
        <div className="row">
          <div className="col-md-4">
            <h4 className="modal-tile">Your current rating (in points): &nbsp;
              {props.profile && <span className="bold">{props.profile.score}</span>}
            </h4>
          </div>
          <div className="col-md-4">
            <h4 className="modal-tile">
              {!props.verif && <span className="label bg-red moderation-label">Not verified</span>}
              {props.verif && <span className="label bg-green moderation-label">Verified</span>}
            </h4>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-4">
            <h4 className="pricebox__price-name">The rating rises for:</h4>
            <ul className="pricebox__list">
              <li>responses to applications (+1.5 per estimate)</li>
              <li>Verification (+100 and the icon {'"Verified"'})</li>
              <li>fullness of profile (from 1 to 100)</li>
              <li>activity on the site (+3 for every 10 ratings)</li>
              <li>customer reviews (+25 for positive customer feedback)</li>
              <li>paid tariff / account (on PRO +250 every month)</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4 className="pricebox__price-name">Important!</h4>
            <ul className="pricebox__list">
              <li>
              Rating is one of the most important criteria for a car owner's decision-making
                                 about recording exactly in your service station (after the price
                                 and location)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>


    <div id="profileInfo" className="anchor" />
    <div className="box box-primary">
      <div className="box-header with-border">
        <h3 className="box-title">Profile Info</h3>
      </div>
      <ProfileForm profile={props.profile} />
    </div>


    <div id="verification" className="anchor" />
    <div className="box box-primary">
      <div className="box-header with-border">
        <h3 className="box-title">Verification</h3>
      </div>
      <div className="box-body">
        <h4 className="modal-tile">Common status: &nbsp;
          {!props.verif && <span className="label bg-red moderation-label">Not verified</span>}
          {props.verif && <span className="label bg-green moderation-label">Verified</span>}
        </h4>
        <hr />
        <div className="row">
          <div className="col-md-4">
            <DocumentStatusViewer />
          </div>
          <div className="col-md-4">
            <h4 className="modal-tile">
              <DropUpload />
            </h4>
          </div>
        </div>
      </div>
    </div>
  </EmptyContainer>
);

const trackedComponent = withTracker(() => {
  Meteor.subscribe('getProfileOfCurrentStation');

  return {
    profile: StationProfiles.find().fetch()[0],
  };
})(Profile);

export default trackedComponent;
