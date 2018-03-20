import Valuations from './valuations';

Meteor.methods({
  'valuations.createValuation': function (valuation) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    valuation.userId = this.userId;

    Valuations.insert(valuation);
  },
});
