import React from 'react';
import { connect } from 'react-redux';

import { updateCurrentUser } from '../../../../actions/meteorSpecific';
import EmptyContainer from '../../../EmptyContainer';
import CbGenerator from '../../../../util/MeteorActionCallback';

class ProfileSettingsBox extends React.Component {
  state = {
    name: this.props.currentUser.profile.name,
    nameErr: '',
    phone: this.props.currentUser.profile.phoneNumber,
    phoneErr: '',
    email: this.props.currentUser.emails[0].address,
    emailErr: '',
    password: '',
    passwordRep: '',
    passwordErr: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      name, phone, email, password,
    } = this.state;
    const userData = {
      name, phone, email, password,
    };

    this.props.dispatch(updateCurrentUser(userData, CbGenerator({
      header: 'Manage Your Profile',
      message: 'Profile was successfully recorded',
      errorMessage: 'Profile was NOT recorded',
    })));
  };

  render() {
    return (
      <EmptyContainer>
        <div id="profile" className="anchor" />
        <div className="box box-primary">
          <div className="box-header with-border">
            <h3 className="box-title">Profile and contacts</h3>
          </div>
          <div className="box-body">
            <form noValidate>
              <div className="row">

                <div className="col-md-4">

                  <div className={`form-group ${this.state.nameErr && 'has-error'}`}>
                    <label>Your name</label>
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className={`form-group ${this.state.phoneErr && 'has-error'}`}>
                    <label>Phone*</label>
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="fa fa-phone" />
                      </span>
                      <input
                        name="phone"
                        type="text"
                        className="form-control"
                        value={this.state.phone}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className={`form-group ${this.state.emailErr && 'has-error'}`}>
                    <label>E-mail address</label>
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="fa fa-envelope" />
                      </span>
                      <input
                        name="email"
                        type="text"
                        className="form-control"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className={`form-group ${this.state.passwordErr && 'has-error'}`}>
                    <label>Change password</label>
                    <input
                      name="password"
                      type="password"
                      placeholder="New password"
                      className="form-control"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    <p className="help-block">The password must be at least 6 characters long</p>
                  </div>

                  <div className={`form-group ${this.state.passwordErr && 'has-error'}`}>
                    <label>Change password</label>
                    <input
                      name="passwordRep"
                      type="password"
                      placeholder="Password confirmation"
                      className="form-control"
                      value={this.state.passwordRep}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="box-footer">
            <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Save</button>
          </div>
        </div>
      </EmptyContainer>
    );
  }
}

export default connect()(ProfileSettingsBox);
