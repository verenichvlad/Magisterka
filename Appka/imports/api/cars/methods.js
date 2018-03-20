import Cars from './cars';

Meteor.methods({
  'cars.insertForCurrentUser': function (document) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    document.userId = this.userId;

    Cars.insert(document);
  },
});
