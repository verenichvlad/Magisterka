import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './../../../actions/meteorSpecific';

class AdminTitleBar extends React.Component {
  handleLogout = (e) => {
    e.preventDefault();

    const cb = (err) => {
      err && alert('Logout issue');
      this.props.history.push('/');
    };

    this.props.dispatch(logout(cb));
  }

  render() {
    const { currentUser, notifications } = this.props;
    let userTypeStr = 'Logged in as ';

    switch (currentUser.profile.userType) {
      case 'cowner': userTypeStr += 'Car owner'; break;
      case 'tstation': userTypeStr += 'Tech station'; break;
      default: userTypeStr = 'We dont know who you are';
    }

    return (
      <header className="main-header">

        <a href="#" className="logo">
          <span className="logo-mini">Masters</span>
          <span className="logo-lg"><b>Masters</b></span>
        </a>

        <nav className="navbar navbar-static-top">
          <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </a>

          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li>
                <a className="disable-hover">
                  {userTypeStr}
                </a>
              </li>
              <li className="dropdown notifications-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="fa fa-bell-o" />
                  {notifications.length > 0
                    ? <span className="label label-warning">{notifications.length}</span>
                    : undefined}

                </a>
                <ul className="dropdown-menu">
                  <li className="header">You have {notifications.length} notifications</li>
                  <li>
                    <ul className="menu">
                      <li>
                        <a href="#">
                          <i className="fa fa-users text-aqua" />
                          BMW evaluation ...
                          <p>5 minutes ago</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="footer"><a href="#">Watch more</a></li>
                </ul>
              </li>

              <li className="dropdown user user-menu">
                <Link to={`/${this.props.currentUser.profile.userType}/account`}>
                  <i className="fa fa-user-circle-o" />
                  <span className="hidden-xs">{this.props.currentUser.profile.name}</span>
                </Link>
              </li>
              <li>
                <a href="#" onClick={this.handleLogout}>
                  <i className="fa fa-sign-out" /> Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default connect()(withRouter(AdminTitleBar));
