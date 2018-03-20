import React from 'react';
import { createUser } from './../../actions/meteorSpecific';
import { setAuthForm } from './../../actions/ui';
import { connect } from 'react-redux';

class SignupForm extends React.Component {
  state = {
    email: '',
    password: '',
    passwordRep: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    const userData = {
      email,
      password,
      profile: {
        userType: this.props.userType,
      },
    };

    const cb = (err) => {
      err && alert(err);
      !err && this.props.dispatch(setAuthForm('login'));
    };

    this.props.dispatch(createUser(userData, cb));
  }

  render() {
    return (
      <div className="auth-form">
        <form className="auth-form__form" noValidate>
          <div>
            <label className="auth-form__lbl">Enter email:</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="auth-form__tbox"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label className="auth-form__lbl">Enter password:</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="auth-form__tbox"
              autoComplete="new-password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label className="auth-form__lbl">Repeat password:</label>
            <input
              name="passwordRep"
              type="password"
              placeholder="Password repeat"
              className="auth-form__tbox"
              value={this.state.passwordRep}
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleSubmit} className="auth-form__btn">Create account</button>
        </form>
      </div>
    );
  }
}

export default connect()(SignupForm);
