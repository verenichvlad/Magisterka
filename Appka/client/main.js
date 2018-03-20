import { Meteor } from 'meteor/meteor';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from '../imports/ui/App';
import configureStore from './../imports/store/configureStore';

const store = configureStore();

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

Meteor.startup(() => {
  ReactDOM.render(app, document.getElementById('app'));
});
