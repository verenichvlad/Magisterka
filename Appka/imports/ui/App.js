import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Route, Switch } from 'react-router-dom';

import PrivateRoutes from './../util/PrivateRoutes';
import AuthLayout from './auth/AuthLayout';
import AdminLayout from './admin/layout/AdminLayout';
import Index from './landing/Index';

const App = () => (
  <Switch>
    <Route exact path="/" component={Index} />
    <Route path="/authPage/:type" component={AuthLayout} />
    <PrivateRoutes isAuthenticated={!!Meteor.userId()}>
      <Route path="/cowner" component={AdminLayout} />
      <Route path="/tstation" component={AdminLayout} />
    </PrivateRoutes>
  </Switch>
);

export default App;
