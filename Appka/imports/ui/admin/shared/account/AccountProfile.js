import React from 'react';

import Pricebox from './Pricebox';
import ProfileSettingsBox from './ProfileSettingsBox';
import NotificationSettingsBox from './NotificationsSettingsBox';

export default ({ currentUser }) => (
  <div className="row">
    <div className="col-md-9">
      <h3>Account settings</h3>
      <ProfileSettingsBox currentUser={currentUser} />
      <NotificationSettingsBox userProfile={currentUser.profile} />
      <Pricebox />
    </div>
  </div>
);
