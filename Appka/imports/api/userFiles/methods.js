import { Meteor } from 'meteor/meteor';
import UserFiles from './userFiles';

Meteor.methods({
  'userFiles.removeFilesForOrder': function (orderId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    UserFiles.remove({ 'meta.orderId': orderId });
  },
  'userFiles.removeFilesWithId': function (_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    UserFiles.remove({ _id });
  },
});
