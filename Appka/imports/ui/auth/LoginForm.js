import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginWithPassword } from './../../actions/meteorSpecific';
import { setUserType } from './../../actions/auth';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    const userData = { email, password };

    const cb = (err) => {
      if (err) {
        alert(err);
      } else {
        const userType = Meteor.user().profile.userType;
        this.props.dispatch(setUserType(userType));
        this.props.history.push(`/${userType}/account`);
      }
    };

    this.props.dispatch(loginWithPassword(userData, cb));
  };

  render() {
    return (
      <div className="auth-form">
        <form className="auth-form__form" noValidate>
          <div>
            <label className="auth-form__lbl">Email</label>
            <div>
              <input
                name="email"
                type="text"
                placeholder="Email"
                className="auth-form__tbox"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div>
            <label className="auth-form__lbl">Password</label>
            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="auth-form__tbox"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <button className="auth-form__btn" onClick={this.handleSubmit}>Login</button>
          <a href="#" className="restore-password-link">Forgot password?</a>
        </form>
      </div>
    );
  }
}

export default connect()(withRouter(LoginForm));
