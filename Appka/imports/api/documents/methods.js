import { Meteor } from 'meteor/meteor';
import Documents from './documents';

Meteor.methods({
  'documents.removeFileWithId': function (_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Documents.remove({ _id });
  },
});
