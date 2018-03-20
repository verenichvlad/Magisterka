import React from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { setAuthForm } from './../../actions/ui';

const authLayout = (props) => {
  const { dispatch, activeAuthForm } = props;
  const linkUserTypeParam = props.match.params.type;

  let authPageTitle = '';
  switch (linkUserTypeParam) {
    case 'cowner': authPageTitle = 'Car owner authorisation and registration'; break;
    case 'tstation': authPageTitle = 'Tech station authorisation and registration'; break;
    case 'admin': authPageTitle = 'Admin authorisation and registration'; break;
    case 'partner': authPageTitle = 'Partner authorisation and registration'; break;
    default: authPageTitle = 'No title found, contact support';
  }

  const switchToLoginBtnCSS = `button-switch__button ${activeAuthForm === 'login' && 'button-switch__button_inactive'}`;
  const switchToRegistrationBtnCSS = `button-switch__button ${activeAuthForm === 'signup' && 'button-switch__button_inactive'}`;

  return (
    <div className="page-container">
      <div className="auth-title">
        <h2 className="auth-title__title">{authPageTitle}</h2>
      </div>

      <div className="auth-control-container">
        <div className="auth-control">
          <div className="button-switch">
            <button className={switchToLoginBtnCSS} onClick={() => { dispatch(setAuthForm('login')); }}>
              Login
            </button>
            <button className={switchToRegistrationBtnCSS} onClick={() => { dispatch(setAuthForm('signup')); }}>
              Register
            </button>
          </div>

          {activeAuthForm === 'login' && <LoginForm />}
          {activeAuthForm === 'signup' && <SignupForm userType={linkUserTypeParam} />}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  activeAuthForm: state.ui.activeAuthForm,
});

export default connect(mapStateToProps)(authLayout);
