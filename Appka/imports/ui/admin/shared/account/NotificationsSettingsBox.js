import React from 'react';
import { connect } from 'react-redux';

import { updateCurrentUserNotificationSettings } from './../../../../actions/meteorSpecific';


class NotificationsSettingsBox extends React.Component {
  state = {
    allowPhoneNotifications: this.props.userProfile.allowPhoneNotifications,
    allowEmailNotifications: this.props.userProfile.allowEmailNotifications,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.checked,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { allowPhoneNotifications, allowEmailNotifications } = this.state;
    const settings = { allowPhoneNotifications, allowEmailNotifications };

    const cb = (err) => {
      if (err) {
        alert(err);
      }
    };

    this.props.dispatch(updateCurrentUserNotificationSettings(settings, cb));
  };

  render() {
    return (
      <div id="notifications" className="box box-primary">
        <div className="box-header with-border">
          <h3 className="box-title">Notifications setup</h3>
        </div>
        <div className="box-body">
          <form noValidate>
            <div className="row">
              <div className="col-md-4">
                <div className="checkbox">
                  <label>
                    <input
                      name="allowPhoneNotifications"
                      type="checkbox"
                      onChange={this.handleChange}
                      defaultChecked={this.state.allowPhoneNotifications}
                    /> Enable phone notifications
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input
                      name="allowEmailNotifications"
                      type="checkbox"
                      onChange={this.handleChange}
                      defaultChecked={this.state.allowEmailNotifications}
                    /> Enable Email notifications
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="box-footer">
          <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(NotificationsSettingsBox);
