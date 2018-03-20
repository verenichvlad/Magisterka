import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

// LOGIN_WITH_PASSWORD
export const loginWithPassword = ({ email, password }, cb) => () => {
  Meteor.loginWithPassword({ email }, password, cb);
};
// LOGOUT
export const logout = cb => () => {
  Meteor.logout(cb);
  // dispatch usertype
};
// CREATE_USER
export const createUser = (userData, cb) => () => {
  Accounts.createUser(userData, cb);
};

// UPDATE_CURRENT_USER
export const updateCurrentUser = (updates, cb) => () => {
  Meteor.call('users.updateCurrent', updates, cb);
};

// UPDATE_CURRENT_USER_NOTIFICATION_SETTINGS
export const updateCurrentUserNotificationSettings = newSettings => () => {
  Meteor.call('users.updateNotificationSettings', newSettings);
};

// ADD_CAR
export const addCarForCurrentUser = (newCar, cb) => () => {
  Meteor.call('cars.insertForCurrentUser', newCar, cb);
};

// ADD_ORDER
export const addOrderForCurrentUser = (newOrder, cb) => () => {
  Meteor.call('orders.insertForCurrentUser', newOrder, cb);
};

// EDIT_ORDER
export const updateOrderForCurrentUser = (orderId, updates) => () => {
  Meteor.call('orders.updateForCurrentUser', orderId, updates);
};

// REMOVE_FILE_WITH_ID
export const removeFilesWithId = (_id, cb) => () => {
  Meteor.call('userFiles.removeFilesWithId', _id, cb);
};

// REMOVE_DOCUMENT_WITH_ID
export const removeDocumentWithId = (_id, cb) => () => {
  Meteor.call('documents.removeFileWithId', _id, cb);
};

// REMOVE_FILES_FOR_ORDER
export const removeFilesForOrder = (orderId, cb) => () => {
  Meteor.call('userFiles.removeFilesForOrder', orderId, cb);
};

// CREATE_CLAIM
export const createClaim = (claim, cb) => () => {
  Meteor.call('claims.createClaim', claim, cb);
};

// CREATE_EVALUATION
export const createValuation = (valuation, cb) => () => {
  Meteor.call('valuations.createValuation', valuation, cb);
};

// UPDATE_STATION_PROFILE
export const updateStationProfile = (profile, cb) => () => {
  Meteor.call('stationProfiles.updateStationProfile', profile, cb);
};

// INCREASE_STATION_RATING
export const increaseStationRating = (value, cb) => () => {
  Meteor.call('stationProfiles.increaseRating', value, cb);
};
