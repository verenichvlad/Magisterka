import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

// CSS libs
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../../node_modules/admin-lte/dist/css/AdminLTE.min.css';
import '../../../../node_modules/admin-lte/dist/css/skins/skin-red.min.css';

// JS libs
import '../../../../node_modules/jquery/dist/jquery.min.js';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../../../node_modules/fastclick/lib/fastclick.js';
import '../../../../node_modules/slimscroll/lib/slimscroll.js';
import '../../../../node_modules/admin-lte/dist/js/adminlte.min.js';

// Utils / Shared
import PrivateRoutes from './../../../util/PrivateRoutes';
import AccountProfile from '../shared/account/AccountProfile';

// Admin general
import AdminTitleBar from './AdminTitleBar';
import AdminSideMenu from './AdminSideMenu';
import AdminFooter from './AdminFooter';

// Carowner
import CarOwnerOrders from './../carOwner/CarOwnerOrders';
import CarOwnerSupport from './../carOwner/CarOwnerSupport';

// Tstation
import TstatProfile from '../tstation/Profile';
import TstatClients from '../tstation/Clients';
import TstatOrders from '../tstation/Orders';

const adminLayout = ({
  isAuthenticated, currentUser, location, notifications,
}) => (
  <div className="fixed skin-red">
    {currentUser &&
    <div className="wrapper">
      {/* HEADER */}
      <AdminTitleBar currentUser={currentUser} notifications={notifications} />
      {/* MENU */}
      <AdminSideMenu userType={currentUser.profile.userType} location={location} />
      {/* CONTENT */}
      <div className="content-wrapper">
        <section className="content">
          <Switch>
            {currentUser.profile.userType === 'cowner' &&
              <PrivateRoutes isAuthenticated={isAuthenticated}>
                <Route
                  path="/cowner/account"
                  render={props => <AccountProfile {...props} currentUser={currentUser} />}
                />
                <Route path="/cowner/orders" component={CarOwnerOrders} />
                <Route path="/cowner/support" component={CarOwnerSupport} />
              </PrivateRoutes>}
            {currentUser.profile.userType === 'tstation' &&
              <PrivateRoutes isAuthenticated={isAuthenticated}>
                <Route
                  path="/tstation/account"
                  render={props => <AccountProfile {...props} currentUser={currentUser} />}
                />
                <Route path="/tstation/profile" component={TstatProfile} />
                <Route path="/tstation/clients" component={TstatClients} />
                <Route path="/tstation/orders" component={TstatOrders} />
                <Route path="/tstation/support" component={CarOwnerSupport} />
              </PrivateRoutes>}
          </Switch>
        </section>
      </div>
      {/* FOOTER */}
      <AdminFooter />
    </div>
  }
  </div>
);

export default withTracker(() => ({
  isAuthenticated: Meteor.userId(),
  currentUser: Meteor.user(),
  notifications: [],
}))(adminLayout);
